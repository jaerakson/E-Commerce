import { cartRepo, productRepo } from "../repositories";
import { v4 as uuid } from "uuid";
import type { CartItemWithProduct } from "../repositories/interfaces";

export async function getCart(userId: string): Promise<CartItemWithProduct[]> {
  return cartRepo.findByUserId(userId);
}

export async function addToCart(
  userId: string,
  input: { product_id: string; size?: string; color?: string; quantity?: number },
) {
  const product = await productRepo.findById(input.product_id);
  if (!product) return { error: "Product not found" };
  if (!product.in_stock) return { error: "Product is out of stock" };

  const size = input.size ?? null;
  const color = input.color ?? null;
  const quantity = input.quantity ?? 1;

  // If same product/size/color already in cart, increment quantity
  const existing = await cartRepo.findExisting(userId, input.product_id, size, color);
  if (existing) {
    return { item: await cartRepo.updateQuantity(existing.id, existing.quantity + quantity) };
  }

  const item = await cartRepo.addItem({
    id: uuid(),
    user_id: userId,
    product_id: input.product_id,
    size,
    color,
    quantity,
  });
  return { item };
}

export async function updateCartItem(itemId: string, quantity: number) {
  if (quantity < 1) return { error: "Quantity must be at least 1" };
  const item = await cartRepo.updateQuantity(itemId, quantity);
  if (!item) return { error: "Cart item not found" };
  return { item };
}

export async function removeCartItem(itemId: string) {
  return cartRepo.removeItem(itemId);
}

export async function clearCart(userId: string) {
  return cartRepo.clearCart(userId);
}

export function computeCartTotals(items: CartItemWithProduct[]) {
  const subtotal = items.reduce((sum, item) => sum + item.product_price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return { subtotal, itemCount };
}
