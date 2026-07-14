"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/hooks/useCart";
import { useAuth } from "@/lib/hooks/useAuth";
import { post } from "@/lib/api/client";
import { formatPrice } from "@/lib/utils/price";
import type { Coupon } from "@/lib/repositories/interfaces";

type ShippingType = "standard" | "express";

const STANDARD_THRESHOLD = 50000; // cents — free standard shipping above this
const STANDARD_FEE = 1500; // cents
const EXPRESS_FEE = 3500; // cents
const TAX_RATE = 0.08;

function shippingFee(subtotal: number, type: ShippingType): number {
  if (type === "standard") return subtotal >= STANDARD_THRESHOLD ? 0 : STANDARD_FEE;
  return EXPRESS_FEE;
}

function computeDiscount(coupon: Coupon, subtotal: number): number {
  if (coupon.type === "percent") {
    return Math.round(subtotal * (coupon.value / 100));
  }
  // "fixed"
  return Math.min(coupon.value, subtotal);
}

export default function CheckoutPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { items, subtotal, loading: cartLoading } = useCart();

  // Redirect unauthenticated users
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
    }
  }, [authLoading, user, router]);

  // Shipping
  const [shippingType, setShippingType] = useState<ShippingType>("standard");

  // Coupon
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);

  // Order
  const [orderError, setOrderError] = useState<string | null>(null);
  const [orderLoading, setOrderLoading] = useState(false);

  // Shipping form state
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  // Pre-fill email from auth user
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        email: prev.email || user.email,
        firstName: prev.firstName || user.first_name,
        lastName: prev.lastName || user.last_name,
        phone: prev.phone || (user.phone ?? ""),
      }));
    }
  }, [user]);

  // Computed order totals
  const shipping = shippingFee(subtotal, shippingType);
  const tax = Math.round(subtotal * TAX_RATE);
  const discount = appliedCoupon ? computeDiscount(appliedCoupon, subtotal) : 0;
  const total = subtotal - discount + shipping + tax;

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  }

  async function handleApplyCoupon() {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    setCouponError(null);
    setAppliedCoupon(null);

    const res = await post<Coupon>("/api/coupons/validate", { code: couponCode.trim() });
    if (res.ok) {
      setAppliedCoupon(res.data);
    } else {
      setCouponError(res.error);
    }
    setCouponLoading(false);
  }

  function handleRemoveCoupon() {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError(null);
  }

  async function handlePayNow() {
    setOrderError(null);
    setOrderLoading(true);

    const body: Record<string, unknown> = {
      shipping_type: shippingType,
    };
    if (appliedCoupon) {
      body.coupon_code = appliedCoupon.code;
    }

    const res = await post<{ id: string; order_number: string }>("/api/orders", body);
    if (res.ok) {
      router.push("/orders");
    } else {
      setOrderError(res.error);
      setOrderLoading(false);
    }
  }

  // Loading / auth guard skeleton
  if (authLoading || cartLoading) {
    return (
      <>
        <header className="w-full flex justify-center py-8 border-b border-surface-variant/50 bg-pitch-black z-50 sticky top-0">
          <a className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg tracking-tighter text-on-background" href="/">AETHER</a>
        </header>
        <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap flex items-center justify-center">
          <span className="font-body-lg text-body-lg text-silver-mist">Loading…</span>
        </main>
      </>
    );
  }

  // Empty cart state
  if (items.length === 0) {
    return (
      <>
        <header className="w-full flex justify-center py-8 border-b border-surface-variant/50 bg-pitch-black z-50 sticky top-0">
          <a className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg tracking-tighter text-on-background" href="/">AETHER</a>
        </header>
        <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap flex flex-col items-center justify-center gap-6 text-center">
          <span className="material-symbols-outlined text-silver-mist" style={{ fontSize: 64 }}>shopping_bag</span>
          <h1 className="font-headline-md text-headline-md text-pure-white">Your bag is empty</h1>
          <p className="font-body-lg text-body-lg text-silver-mist">Add items to your cart before checking out.</p>
          <a
            href="/collections"
            className="bg-primary-container text-pure-white font-label-caps text-label-caps uppercase px-8 py-3 rounded-lg hover:bg-inverse-primary transition-colors duration-300"
          >
            Shop Collections
          </a>
        </main>
      </>
    );
  }

  return (
    <>
      <header className="w-full flex justify-center py-8 border-b border-surface-variant/50 bg-pitch-black z-50 sticky top-0">
        <a className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg tracking-tighter text-on-background" href="/">AETHER</a>
      </header>

      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap grid grid-cols-1 lg:grid-cols-12 gap-gutter">

        {/* ── Left column: forms ── */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-12">

          {/* Shipping Information */}
          <section className="bg-surface rounded-xl p-6 md:p-8 border border-surface-variant/30 inset-shadow-sm">
            <h2 className="font-headline-md text-headline-md mb-6 text-pure-white flex items-center gap-3">
              <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
              Shipping Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2">
                <label className="block font-label-caps text-label-caps text-silver-mist mb-2 uppercase" htmlFor="email">Email Address</label>
                <input
                  className="w-full rounded-DEFAULT border-surface-deep bg-pitch-black text-on-surface focus:border-secondary-container focus:ring-0 transition-colors py-3"
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  value={form.email}
                  onChange={handleFormChange}
                />
              </div>
              <div>
                <label className="block font-label-caps text-label-caps text-silver-mist mb-2 uppercase" htmlFor="firstName">First Name</label>
                <input
                  className="w-full rounded-DEFAULT border-surface-deep bg-pitch-black text-on-surface focus:border-secondary-container focus:ring-0 transition-colors py-3"
                  id="firstName"
                  placeholder="First Name"
                  type="text"
                  value={form.firstName}
                  onChange={handleFormChange}
                />
              </div>
              <div>
                <label className="block font-label-caps text-label-caps text-silver-mist mb-2 uppercase" htmlFor="lastName">Last Name</label>
                <input
                  className="w-full rounded-DEFAULT border-surface-deep bg-pitch-black text-on-surface focus:border-secondary-container focus:ring-0 transition-colors py-3"
                  id="lastName"
                  placeholder="Last Name"
                  type="text"
                  value={form.lastName}
                  onChange={handleFormChange}
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block font-label-caps text-label-caps text-silver-mist mb-2 uppercase" htmlFor="address">Address</label>
                <input
                  className="w-full rounded-DEFAULT border-surface-deep bg-pitch-black text-on-surface focus:border-secondary-container focus:ring-0 transition-colors py-3"
                  id="address"
                  placeholder="Street Address"
                  type="text"
                  value={form.address}
                  onChange={handleFormChange}
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block font-label-caps text-label-caps text-silver-mist mb-2 uppercase" htmlFor="apartment">Apartment, suite, etc. (optional)</label>
                <input
                  className="w-full rounded-DEFAULT border-surface-deep bg-pitch-black text-on-surface focus:border-secondary-container focus:ring-0 transition-colors py-3"
                  id="apartment"
                  placeholder="Apartment, suite, etc."
                  type="text"
                  value={form.apartment}
                  onChange={handleFormChange}
                />
              </div>
              <div>
                <label className="block font-label-caps text-label-caps text-silver-mist mb-2 uppercase" htmlFor="city">City</label>
                <input
                  className="w-full rounded-DEFAULT border-surface-deep bg-pitch-black text-on-surface focus:border-secondary-container focus:ring-0 transition-colors py-3"
                  id="city"
                  placeholder="City"
                  type="text"
                  value={form.city}
                  onChange={handleFormChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-caps text-label-caps text-silver-mist mb-2 uppercase" htmlFor="state">State/Province</label>
                  <input
                    className="w-full rounded-DEFAULT border-surface-deep bg-pitch-black text-on-surface focus:border-secondary-container focus:ring-0 transition-colors py-3"
                    id="state"
                    placeholder="State"
                    type="text"
                    value={form.state}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <label className="block font-label-caps text-label-caps text-silver-mist mb-2 uppercase" htmlFor="zip">ZIP / Postal Code</label>
                  <input
                    className="w-full rounded-DEFAULT border-surface-deep bg-pitch-black text-on-surface focus:border-secondary-container focus:ring-0 transition-colors py-3"
                    id="zip"
                    placeholder="ZIP"
                    type="text"
                    value={form.zip}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block font-label-caps text-label-caps text-silver-mist mb-2 uppercase" htmlFor="phone">Phone</label>
                <input
                  className="w-full rounded-DEFAULT border-surface-deep bg-pitch-black text-on-surface focus:border-secondary-container focus:ring-0 transition-colors py-3"
                  id="phone"
                  placeholder="Phone for delivery updates"
                  type="tel"
                  value={form.phone}
                  onChange={handleFormChange}
                />
              </div>
            </div>
          </section>

          {/* Delivery Method */}
          <section className="bg-surface rounded-xl p-6 md:p-8 border border-surface-variant/30">
            <h2 className="font-headline-md text-headline-md mb-6 text-pure-white flex items-center gap-3">
              <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>package_2</span>
              Delivery Method
            </h2>
            <div className="flex flex-col gap-4">
              <label className="flex items-center justify-between p-4 border border-surface-deep rounded-DEFAULT cursor-pointer hover:border-silver-mist transition-colors bg-pitch-black relative overflow-hidden group">
                <div className="flex items-center gap-4 z-10">
                  <input
                    checked={shippingType === "standard"}
                    onChange={() => setShippingType("standard")}
                    className="text-primary-container bg-pitch-black border-surface-deep focus:ring-primary-container focus:ring-offset-pitch-black"
                    name="delivery"
                    type="radio"
                    value="standard"
                  />
                  <div>
                    <span className="block font-body-lg text-body-lg text-pure-white mb-1">Standard Shipping</span>
                    <span className="block font-body-md text-body-md text-silver-mist">3-5 Business Days</span>
                  </div>
                </div>
                <span className="font-label-caps text-label-caps text-pure-white z-10">
                  {subtotal >= STANDARD_THRESHOLD ? "FREE" : formatPrice(STANDARD_FEE)}
                </span>
                <div className="absolute inset-0 bg-surface-deep opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </label>
              <label className="flex items-center justify-between p-4 border border-surface-deep rounded-DEFAULT cursor-pointer hover:border-silver-mist transition-colors bg-pitch-black relative overflow-hidden group">
                <div className="flex items-center gap-4 z-10">
                  <input
                    checked={shippingType === "express"}
                    onChange={() => setShippingType("express")}
                    className="text-primary-container bg-pitch-black border-surface-deep focus:ring-primary-container focus:ring-offset-pitch-black"
                    name="delivery"
                    type="radio"
                    value="express"
                  />
                  <div>
                    <span className="block font-body-lg text-body-lg text-pure-white mb-1">Express Delivery</span>
                    <span className="block font-body-md text-body-md text-silver-mist">1-2 Business Days</span>
                  </div>
                </div>
                <span className="font-label-caps text-label-caps text-pure-white z-10">{formatPrice(EXPRESS_FEE)}</span>
                <div className="absolute inset-0 bg-surface-deep opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </label>
            </div>
          </section>

          {/* Payment */}
          <section className="bg-surface rounded-xl p-6 md:p-8 border border-surface-variant/30">
            <h2 className="font-headline-md text-headline-md mb-6 text-pure-white flex items-center gap-3">
              <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>credit_card</span>
              Payment
            </h2>
            <div className="mb-6">
              <span className="block font-label-caps text-label-caps text-silver-mist mb-3 uppercase">All transactions are secure and encrypted.</span>
              <div className="flex gap-2 mb-6">
                <div className="h-8 w-12 bg-pure-white rounded flex items-center justify-center text-pitch-black font-bold text-[10px]">VISA</div>
                <div className="h-8 w-12 bg-pure-white rounded flex items-center justify-center text-pitch-black font-bold text-[10px]">MC</div>
                <div className="h-8 w-12 bg-pure-white rounded flex items-center justify-center text-pitch-black font-bold text-[10px]">AMEX</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2">
                <label className="block font-label-caps text-label-caps text-silver-mist mb-2 uppercase" htmlFor="card-number">Card Number</label>
                <div className="relative">
                  <input
                    className="w-full rounded-DEFAULT border-surface-deep bg-pitch-black text-on-surface focus:border-secondary-container focus:ring-0 transition-colors py-3 pl-10"
                    id="card-number"
                    placeholder="0000 0000 0000 0000"
                    type="text"
                  />
                  <span className="material-symbols-outlined absolute left-3 top-3.5 text-silver-mist text-[20px]">credit_card</span>
                </div>
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block font-label-caps text-label-caps text-silver-mist mb-2 uppercase" htmlFor="name-on-card">Name on Card</label>
                <input
                  className="w-full rounded-DEFAULT border-surface-deep bg-pitch-black text-on-surface focus:border-secondary-container focus:ring-0 transition-colors py-3"
                  id="name-on-card"
                  placeholder="Name on Card"
                  type="text"
                />
              </div>
              <div>
                <label className="block font-label-caps text-label-caps text-silver-mist mb-2 uppercase" htmlFor="expiry">Expiration Date (MM/YY)</label>
                <input
                  className="w-full rounded-DEFAULT border-surface-deep bg-pitch-black text-on-surface focus:border-secondary-container focus:ring-0 transition-colors py-3"
                  id="expiry"
                  placeholder="MM / YY"
                  type="text"
                />
              </div>
              <div>
                <label className="block font-label-caps text-label-caps text-silver-mist mb-2 uppercase" htmlFor="cvv">Security Code</label>
                <input
                  className="w-full rounded-DEFAULT border-surface-deep bg-pitch-black text-on-surface focus:border-secondary-container focus:ring-0 transition-colors py-3"
                  id="cvv"
                  placeholder="CVV"
                  type="text"
                />
              </div>
            </div>
          </section>
        </div>

        {/* ── Right column: order summary ── */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="bg-surface-deep rounded-xl p-6 md:p-8 sticky top-32 border border-surface-variant/20">
            <h3 className="font-headline-md text-headline-md text-pure-white mb-6 border-b border-surface-variant/30 pb-4">Order Summary</h3>

            {/* Cart items */}
            <div className="flex flex-col gap-6 mb-8">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="w-20 h-24 bg-surface rounded-lg overflow-hidden shrink-0 border border-surface-variant/50 relative">
                    <img
                      className="w-full h-full object-cover"
                      src={item.product_image_url}
                      alt={item.product_name}
                    />
                    <span className="absolute -top-2 -right-2 bg-silver-mist text-pitch-black font-label-caps text-[10px] w-5 h-5 rounded-full flex items-center justify-center border border-pitch-black z-10">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-body-lg text-body-lg text-pure-white mb-1">{item.product_name}</h4>
                    {item.size && (
                      <p className="font-body-md text-body-md text-silver-mist mb-1">Size: {item.size}</p>
                    )}
                    {item.color && (
                      <p className="font-body-md text-body-md text-silver-mist mb-1">Color: {item.color}</p>
                    )}
                    <p className="font-body-md text-body-md text-silver-mist">
                      {formatPrice(item.product_price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon */}
            <div className="mb-8 pb-8 border-b border-surface-variant/30">
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-surface rounded-lg px-4 py-3 border border-secondary-container/40">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary-container text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      confirmation_number
                    </span>
                    <span className="font-label-caps text-label-caps text-secondary-container uppercase">
                      {appliedCoupon.code}
                    </span>
                    <span className="font-body-md text-body-md text-silver-mist">
                      — {appliedCoupon.type === "percent" ? `${appliedCoupon.value}% off` : `${formatPrice(appliedCoupon.value)} off`}
                    </span>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-silver-mist hover:text-pure-white transition-colors ml-2"
                    aria-label="Remove coupon"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex gap-2">
                    <input
                      className="flex-grow rounded-DEFAULT border-surface-variant bg-pitch-black text-on-surface focus:border-secondary-container focus:ring-0 py-2 px-4 font-body-md"
                      placeholder="Discount code"
                      type="text"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value);
                        if (couponError) setCouponError(null);
                      }}
                      onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                    />
                    <button
                      onClick={handleApplyCoupon}
                      disabled={couponLoading || !couponCode.trim()}
                      className="bg-surface-variant text-pure-white font-label-caps text-label-caps uppercase px-6 py-2 rounded-DEFAULT hover:bg-silver-mist hover:text-pitch-black transition-colors duration-300 inset-shadow-sm border border-transparent hover:border-pure-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {couponLoading ? "…" : "Apply"}
                    </button>
                  </div>
                  {couponError && (
                    <p className="mt-2 font-body-md text-[12px] text-primary-container">{couponError}</p>
                  )}
                </>
              )}
            </div>

            {/* Price breakdown */}
            <div className="flex flex-col gap-3 mb-8">
              <div className="flex justify-between font-body-md text-body-md text-silver-mist">
                <span>Subtotal</span>
                <span className="text-pure-white">{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between font-body-md text-body-md text-silver-mist">
                  <span>Discount</span>
                  <span className="text-secondary-container">−{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between font-body-md text-body-md text-silver-mist">
                <span>Shipping</span>
                <span className="text-pure-white">
                  {shipping === 0 ? "FREE" : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between font-body-md text-body-md text-silver-mist">
                <span>Taxes (8%)</span>
                <span className="text-pure-white">{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between font-headline-md text-headline-md text-pure-white mt-4 pt-4 border-t border-surface-variant/50 items-end">
                <span className="font-body-lg text-body-lg text-silver-mist mb-1">Total</span>
                <div className="text-right">
                  <span className="text-[14px] text-silver-mist font-normal mr-2">USD</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            {/* Error message */}
            {orderError && (
              <p className="mb-4 font-body-md text-[13px] text-primary-container text-center">
                {orderError}
              </p>
            )}

            {/* Pay Now */}
            <button
              onClick={handlePayNow}
              disabled={orderLoading}
              className="w-full bg-primary-container text-pure-white font-label-caps text-label-caps uppercase py-4 rounded-lg hover:bg-inverse-primary transition-colors duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {orderLoading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                  Processing…
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                  Pay Now
                </>
              )}
            </button>
            <p className="text-center font-body-md text-[12px] text-silver-mist mt-4">
              By confirming this order, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </main>

      <footer className="w-full bg-pitch-black border-t border-surface-variant/30 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-8 max-w-container-max mx-auto text-silver-mist font-label-caps text-label-caps">
          <span className="mb-4 md:mb-0">© 2024 AETHER LUXURY RETAIL. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-6">
            <a className="hover:text-pure-white transition-colors" href="#">Privacy</a>
            <a className="hover:text-pure-white transition-colors" href="#">Terms</a>
          </div>
        </div>
      </footer>
    </>
  );
}
