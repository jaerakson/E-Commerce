import { orderRepo, cartRepo, couponRepo, productRepo } from "../repositories";
import { v4 as uuid } from "uuid";
import type { CartItemWithProduct, Coupon, OrderWithItems } from "../repositories/interfaces";

const TAX_RATE = 0.08; // 8%
const FREE_SHIPPING_THRESHOLD = 50000; // $500 in cents
const STANDARD_SHIPPING = 1500; // $15
const EXPRESS_SHIPPING = 3500; // $35

function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `AE-${timestamp}-${random}`;
}

function computeShipping(subtotal: number, method: string): number {
  if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return method === "express" ? EXPRESS_SHIPPING : STANDARD_SHIPPING;
}

function computeDiscount(subtotal: number, coupon: Coupon | null): number {
  if (!coupon || !coupon.active) return 0;
  if (subtotal < coupon.min_order) return 0;
  if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) return 0;

  if (coupon.type === "percent") {
    return Math.round(subtotal * (coupon.value / 100));
  }
  // fixed amount (cents)
  return Math.min(coupon.value, subtotal);
}

export async function validateCoupon(code: string): Promise<{ error: string } | { coupon: Coupon }> {
  const coupon = await couponRepo.findByCode(code);
  if (!coupon) return { error: "Invalid coupon code" };
  if (!coupon.active) return { error: "Coupon is no longer active" };
  if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
    return { error: "Coupon has expired" };
  }
  return { coupon };
}

export async function createOrder(
  userId: string,
  input: {
    delivery_method?: string;
    address_id?: string;
    coupon_code?: string;
  },
): Promise<{ order: OrderWithItems } | { error: string }> {
  const cartItems = await cartRepo.findByUserId(userId);
  if (cartItems.length === 0) {
    return { error: "Cart is empty" };
  }

  const deliveryMethod = input.delivery_method ?? "standard";
  const subtotal = cartItems.reduce((s, i) => s + i.product_price * i.quantity, 0);
  const shippingFee = computeShipping(subtotal, deliveryMethod);
  const tax = Math.round(subtotal * TAX_RATE);

  let coupon: Coupon | null = null;
  if (input.coupon_code) {
    const result = await validateCoupon(input.coupon_code);
    if ("error" in result) return result;
    coupon = result.coupon;
  }

  const discount = computeDiscount(subtotal, coupon);
  const total = subtotal + shippingFee + tax - discount;

  const orderId = uuid();
  const orderItems = cartItems.map((ci) => ({
    order_id: orderId,
    product_id: ci.product_id,
    name: ci.product_name,
    size: ci.size,
    color: ci.color,
    quantity: ci.quantity,
    unit_price: ci.product_price,
  }));

  const order = await orderRepo.create(
    {
      id: orderId,
      user_id: userId,
      order_number: generateOrderNumber(),
      status: "confirmed",
      subtotal,
      shipping_fee: shippingFee,
      tax,
      discount,
      total,
      delivery_method: deliveryMethod,
      address_id: input.address_id ?? null,
      coupon_id: coupon?.id ?? null,
    },
    orderItems,
  );

  // Clear the cart after successful order
  await cartRepo.clearCart(userId);

  return { order };
}

export async function getOrders(userId: string) {
  return orderRepo.findByUserId(userId);
}

export async function getOrderById(orderId: string) {
  return orderRepo.findById(orderId);
}
