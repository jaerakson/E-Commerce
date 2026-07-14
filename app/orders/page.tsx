"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { get } from "@/lib/api/client";
import { useAuth } from "@/lib/hooks/useAuth";
import { formatPrice } from "@/lib/utils/price";

interface Order {
  id: string;
  order_number: string;
  status: string;
  total_amount: number;
  created_at: string;
}

function statusBadge(status: string) {
  const normalized = status.toLowerCase();
  if (normalized === "shipped") {
    return (
      <span className="bg-pure-white text-pitch-black font-label-caps text-[10px] px-3 py-1 rounded-full">
        Shipped
      </span>
    );
  }
  if (normalized === "delivered") {
    return (
      <span className="bg-surface-variant text-silver-mist font-label-caps text-[10px] px-3 py-1 rounded-full inset-border">
        Delivered
      </span>
    );
  }
  if (normalized === "processing") {
    return (
      <span className="bg-secondary-container text-pitch-black font-label-caps text-[10px] px-3 py-1 rounded-full">
        Processing
      </span>
    );
  }
  if (normalized === "cancelled") {
    return (
      <span className="bg-primary-container text-pure-white font-label-caps text-[10px] px-3 py-1 rounded-full">
        Cancelled
      </span>
    );
  }
  return (
    <span className="bg-surface-variant text-silver-mist font-label-caps text-[10px] px-3 py-1 rounded-full inset-border">
      {status}
    </span>
  );
}

function formatDate(iso: string) {
  const date = new Date(iso);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function OrdersPage() {
  const router = useRouter();
  const { user, logout, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!user) return;
    setOrdersLoading(true);
    setOrdersError(null);
    get<Order[]>("/api/orders")
      .then((res) => {
        if (res.ok) setOrders(res.data);
        else setOrdersError(res.error);
      })
      .catch(() => setOrdersError("Failed to load orders. Please try again."))
      .finally(() => setOrdersLoading(false));
  }, [user]);

  async function handleSignOut() {
    await logout();
    router.push("/");
  }

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <span className="font-label-caps text-label-caps text-silver-mist">
          Loading…
        </span>
      </div>
    );
  }

  if (!user) return null;

  const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ") || "Account";

  return (
    <>
      <header className="bg-background dark:bg-background border-b border-surface-variant docked full-width top-0 z-50 flat no shadows text-primary dark:text-primary">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
          <div className="font-display-lg text-display-lg-mobile tracking-tighter text-on-background dark:text-on-background">
            AETHER
          </div>
          <div className="hidden md:flex gap-8"></div>
          <div className="flex items-center gap-4">
            <button className="hover:text-primary transition-colors duration-300">
              <span className="material-symbols-outlined" data-icon="shopping_bag">
                shopping_bag
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap flex flex-col md:flex-row gap-gutter">
        <aside className="w-full md:w-64 flex flex-col gap-4">
          <h1 className="font-headline-md text-headline-md text-pure-white mb-8">Account</h1>
          <nav className="flex flex-col gap-2">
            <a
              className="flex items-center justify-between p-4 bg-surface-deep text-pure-white rounded-lg inset-border-active font-label-caps text-label-caps transition-transform scale-95"
              href="/orders"
            >
              <span>Profile &amp; Settings</span>
              <span className="material-symbols-outlined text-[18px]">person</span>
            </a>
            <a
              className="flex items-center justify-between p-4 charcoal-canvas text-on-surface-variant hover:text-pure-white rounded-lg inset-border font-label-caps text-label-caps transition-colors"
              href="/orders"
            >
              <span>Order History</span>
              <span className="material-symbols-outlined text-[18px]">history</span>
            </a>
            <a
              className="flex items-center justify-between p-4 charcoal-canvas text-on-surface-variant hover:text-pure-white rounded-lg inset-border font-label-caps text-label-caps transition-colors"
              href="/wishlist"
            >
              <span>Saved Items</span>
              <span className="material-symbols-outlined text-[18px]">favorite</span>
            </a>
            <button
              onClick={handleSignOut}
              className="flex items-center justify-between p-4 charcoal-canvas text-on-surface-variant hover:text-pure-white rounded-lg inset-border font-label-caps text-label-caps transition-colors mt-8 text-left w-full"
            >
              <span>Sign Out</span>
              <span className="material-symbols-outlined text-[18px]">logout</span>
            </button>
          </nav>
        </aside>

        <section className="flex-grow flex flex-col gap-section-gap">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <div className="charcoal-canvas rounded-xl p-8 inset-border flex flex-col justify-between min-h-[200px]">
              <div>
                <h2 className="font-label-caps text-label-caps text-silver-mist mb-2">
                  Personal Details
                </h2>
                <p className="font-headline-md text-[24px] leading-[32px] text-pure-white">
                  {fullName}
                </p>
                <p className="font-body-md text-body-md text-silver-mist mt-1">{user.email}</p>
              </div>
              <button className="bg-surface-deep inset-border-light text-pure-white font-label-caps text-label-caps py-3 px-6 rounded-none w-max mt-6 hover:bg-surface-variant transition-colors">
                Edit Profile
              </button>
            </div>
            <div className="charcoal-canvas rounded-xl p-8 inset-border flex flex-col justify-between min-h-[200px]">
              <div>
                <h2 className="font-label-caps text-label-caps text-silver-mist mb-2">
                  Default Shipping
                </h2>
                <p className="font-body-md text-body-md text-pure-white">
                  123 Luxury Lane, Penthouse 4
                </p>
                <p className="font-body-md text-body-md text-silver-mist mt-1">
                  New York, NY 10001, USA
                </p>
              </div>
              <button className="bg-surface-deep inset-border-light text-pure-white font-label-caps text-label-caps py-3 px-6 rounded-none w-max mt-6 hover:bg-surface-variant transition-colors">
                Manage Addresses
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-end mb-8 border-b border-surface-variant pb-4">
              <h2 className="font-headline-md text-headline-md text-pure-white">Recent Orders</h2>
              <a
                className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white underline transition-colors"
                href="/collections"
              >
                View All
              </a>
            </div>

            {ordersLoading && (
              <p className="font-body-md text-body-md text-silver-mist py-8">
                Loading orders…
              </p>
            )}

            {!ordersLoading && ordersError && (
              <p className="font-body-md text-body-md text-primary-container py-8">
                {ordersError}
              </p>
            )}

            {!ordersLoading && !ordersError && orders.length === 0 && (
              <div className="charcoal-canvas rounded-xl p-10 inset-border flex flex-col items-center gap-4 text-center">
                <span className="material-symbols-outlined text-silver-mist text-[48px]">
                  receipt_long
                </span>
                <p className="font-headline-md text-[20px] text-pure-white">No orders yet</p>
                <p className="font-body-md text-body-md text-silver-mist max-w-xs">
                  When you place your first order, it will appear here.
                </p>
                <a
                  href="/collections"
                  className="bg-primary-container text-pure-white font-label-caps text-label-caps py-3 px-8 rounded-none mt-2 hover:opacity-90 transition-opacity"
                >
                  Shop Collections
                </a>
              </div>
            )}

            {!ordersLoading && !ordersError && orders.length > 0 && (
              <div className="flex flex-col gap-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="charcoal-canvas rounded-xl p-4 md:p-6 inset-border flex flex-col md:flex-row items-center gap-6 opacity-90 hover:opacity-100 transition-opacity"
                  >
                    <div className="flex-grow flex flex-col gap-2 w-full">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-label-caps text-label-caps text-silver-mist">
                            Order #{order.order_number}
                          </p>
                        </div>
                        {statusBadge(order.status)}
                      </div>
                      <p className="font-body-md text-body-md text-silver-mist">
                        Placed on {formatDate(order.created_at)}
                      </p>
                      <div className="flex justify-between items-center mt-4">
                        <p className="font-headline-md text-[20px] text-pure-white">
                          {formatPrice(order.total_amount)}
                        </p>
                        <button className="text-silver-mist hover:text-pure-white font-label-caps text-label-caps transition-colors flex items-center gap-1">
                          View Receipt{" "}
                          <span className="material-symbols-outlined text-[16px]">
                            receipt_long
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-pitch-black dark:bg-pitch-black border-t border-surface-variant flat no shadows text-primary-container dark:text-primary-container">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto gap-8">
          <div className="font-display-lg text-display-lg-mobile text-on-surface">AETHER</div>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors"
              href="/collections"
            >
              Collections
            </a>
            <a
              className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors"
              href="/brand-story"
            >
              Sustainability
            </a>
            <a
              className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors"
              href="/contact"
            >
              Shipping
            </a>
            <a
              className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors"
              href="/contact"
            >
              Returns
            </a>
            <a
              className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors"
              href="/brand-story"
            >
              Privacy
            </a>
          </div>
          <div className="font-body-md text-body-md text-silver-mist text-center md:text-right">
            © 2024 AETHER LUXURY RETAIL. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </>
  );
}
