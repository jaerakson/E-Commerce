"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { get, del } from "@/lib/api/client";
import { useCart } from "@/lib/hooks/useCart";
import { useAuth } from "@/lib/hooks/useAuth";
import { formatPrice } from "@/lib/utils/price";

interface WishlistItem {
  id: string;
  product_id: string;
  product_name: string;
  product_price: number;
  product_image_url: string;
  folder_id: string | null;
  folder_name: string | null;
}

export default function FavoritesPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { addItem } = useCart();

  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [addingId, setAddingId] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/login");
      return;
    }
    fetchItems();
  }, [user, authLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  async function fetchItems() {
    setLoading(true);
    const res = await get<WishlistItem[]>("/api/wishlist/items");
    if (res.ok) setItems(res.data);
    setLoading(false);
  }

  async function handleRemove(id: string) {
    setRemovingId(id);
    const res = await del(`/api/wishlist/items/${id}`);
    if (res.ok) setItems((prev) => prev.filter((i) => i.id !== id));
    setRemovingId(null);
  }

  async function handleAddToCart(item: WishlistItem) {
    setAddingId(item.id);
    await addItem(item.product_id);
    setAddingId(null);
  }

  const isEmpty = !loading && items.length === 0;

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-pitch-black bg-opacity-80 backdrop-blur-xl border-b border-surface-container-high">
        <div className="flex justify-between items-center px-margin-desktop py-6 w-full max-w-container-max mx-auto">
          <a className="font-display-lg text-display-lg text-pure-white tracking-tighter uppercase" href="/">AETHER</a>
          <div className="hidden md:flex items-center space-x-10">
            <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-pure-white transition-colors duration-300" href="/collections">Collections</a>
            <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-pure-white transition-colors duration-300" href="/">New Arrivals</a>
            <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-pure-white transition-colors duration-300" href="/curations">Curations</a>
            <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-pure-white transition-colors duration-300" href="/collections">Boutique</a>
          </div>
          <div className="flex items-center space-x-6">
            <button className="text-pure-white hover:text-primary-container transition-all duration-200">
              <span className="material-symbols-outlined" data-icon="search">search</span>
            </button>
            <button className="text-pure-white hover:text-primary-container transition-all duration-200">
              <span className="material-symbols-outlined" data-icon="shopping_bag">shopping_bag</span>
            </button>
            <button className="md:hidden text-pure-white">
              <span className="material-symbols-outlined" data-icon="menu">menu</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-section-gap">

        <section className="px-margin-desktop max-w-container-max mx-auto mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-surface-container-high pb-8">
            <div>
              <p className="font-label-caps text-label-caps text-primary mb-2">CURATED SELECTION</p>
              <h1 className="font-display-lg text-display-lg text-pure-white uppercase">The Favorites</h1>
            </div>
            <div className="mt-6 md:mt-0">
              <p className="font-body-md text-silver-mist max-w-xs">
                Your private vault of architectural silhouettes and limited edition essentials.
              </p>
            </div>
          </div>
        </section>

        <section className="px-margin-desktop max-w-container-max mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <span className="material-symbols-outlined text-5xl text-silver-mist animate-spin" data-icon="progress_activity">progress_activity</span>
            </div>
          ) : isEmpty ? (
            <div className="flex flex-col items-center justify-center py-32 text-center" id="empty-state">
              <span className="material-symbols-outlined text-6xl text-surface-variant mb-6" data-icon="favorite_border">favorite_border</span>
              <h2 className="font-display-lg-mobile text-pure-white mb-4">Your vault is empty</h2>
              <p className="font-body-lg text-silver-mist mb-8 max-w-sm">Start curating your personal collection of AETHER pieces.</p>
              <a className="px-8 py-4 bg-primary-container text-pure-white font-label-caps rounded-lg hover:opacity-90 transition-all" href="/collections">Explore Collections</a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
              {items.map((item) => (
                <div key={item.id} className="group relative bg-charcoal-canvas rounded-xl overflow-hidden product-card-hover transition-transform duration-500 hover:-translate-y-2">
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      src={item.product_image_url}
                      alt={item.product_name}
                    />
                    <div className="absolute top-4 right-4 z-10">
                      <button
                        onClick={() => handleRemove(item.id)}
                        disabled={removingId === item.id}
                        aria-label="Remove from favorites"
                        className="w-10 h-10 rounded-full glass-blur bg-pitch-black/40 border border-white/10 flex items-center justify-center text-primary-container hover:bg-primary-container hover:text-pure-white transition-all duration-300 disabled:opacity-50"
                      >
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-headline-md text-lg text-pure-white uppercase tracking-tight">{item.product_name}</h3>
                      <p className="font-body-lg font-bold text-pure-white">{formatPrice(item.product_price)}</p>
                    </div>
                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={addingId === item.id}
                      className="w-full py-3 mt-4 bg-pitch-black border border-surface-deep text-pure-white font-label-caps text-[11px] hover:bg-pure-white hover:text-pitch-black transition-all duration-300 uppercase tracking-widest disabled:opacity-60"
                    >
                      {addingId === item.id ? "Adding..." : "Add to Cart"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mt-section-gap px-margin-desktop max-w-container-max mx-auto">
          <div className="bg-surface-deep p-12 rounded-xl border border-surface-container-high flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="font-accent-serif text-pure-white italic mb-4">The seasonal edit</h2>
              <p className="font-body-lg text-silver-mist mb-8">Discover pieces hand-selected by our creative directors to complement your current favorites.</p>
              <button className="px-10 py-4 bg-secondary text-on-secondary font-label-caps rounded-none hover:bg-primary-container hover:text-pure-white transition-all duration-300 uppercase tracking-widest">View Curation</button>
            </div>
            <div className="flex-1 w-full grid grid-cols-2 gap-4">
              <div className="aspect-square bg-pitch-black overflow-hidden rounded-lg">
                <img className="w-full h-full object-cover grayscale opacity-60 hover:opacity-100 transition-opacity duration-500" src="/assets/stitch/stitch-17.jpg" alt="" />
              </div>
              <div className="aspect-square bg-pitch-black overflow-hidden rounded-lg">
                <img className="w-full h-full object-cover grayscale opacity-60 hover:opacity-100 transition-opacity duration-500" src="/assets/stitch/stitch-19.jpg" alt="" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full relative bg-pitch-black border-t border-surface-container-high">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop py-section-gap w-full max-w-container-max mx-auto">
          <div className="mb-8 md:mb-0">
            <span className="font-display-lg-mobile text-display-lg-mobile text-pure-white tracking-tighter">AETHER</span>
            <p className="text-[10px] text-silver-mist mt-2 tracking-widest uppercase">Precision. Architecture. Exclusivity.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8 md:mb-0">
            <a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors duration-200" href="/brand-story">Sustainability</a>
            <a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors duration-200" href="#">Privacy Policy</a>
            <a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors duration-200" href="#">Terms of Service</a>
            <a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors duration-200" href="#">Shipping &amp; Returns</a>
          </div>
          <div className="text-[10px] font-label-caps text-silver-mist">
            © 2024 AETHER. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </>
  );
}
