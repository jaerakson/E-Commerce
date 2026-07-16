"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { get, del } from "@/lib/api/client";
import { useCart } from "@/lib/hooks/useCart";
import { useAuth } from "@/lib/hooks/useAuth";
import { formatPrice } from "@/lib/utils/price";
import HeaderUserIcon from "@/components/HeaderUserIcon";

interface WishlistItem {
  id: string;
  product_id: string;
  product_name: string;
  product_price: number;
  product_image_url: string;
  folder_id: string | null;
  folder_name: string | null;
}

export default function WishlistPage() {
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

  async function handleAddToBag(item: WishlistItem) {
    setAddingId(item.id);
    await addItem(item.product_id);
    setAddingId(null);
  }

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl">
        <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20 max-w-container-max mx-auto">
          <button className="md:hidden text-pure-white p-2">
            <span className="material-symbols-outlined" data-icon="menu">menu</span>
          </button>

          <a className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg tracking-tighter text-pure-white md:mr-8" href="/">AETHER</a>

          <div className="hidden md:flex gap-8 items-center h-full">
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-pure-white transition-colors h-full flex items-center" href="/collections">Collections</a>
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-pure-white transition-colors h-full flex items-center" href="/">New Arrivals</a>
            <a className="font-body-md text-body-md text-primary font-bold border-b-2 border-primary pb-1 h-full flex items-center mt-1" href="/curations">Curations</a>
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-pure-white transition-colors h-full flex items-center" href="/collections">Boutique</a>
          </div>

          <div className="flex items-center gap-4 text-pure-white">
            <button className="p-2 hover:text-primary transition-all duration-300 opacity-100 hover:opacity-80">
              <span className="material-symbols-outlined" data-icon="shopping_bag">shopping_bag</span>
            </button>
            <HeaderUserIcon />
          </div>
        </div>
      </nav>

      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-32 pb-section-gap">

        <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="font-display-xl text-display-xl text-pure-white mb-2">CURATIONS</h1>
            <p className="font-body-lg text-body-lg text-silver-mist">Your saved selections for AETHER LUXURY.</p>
          </div>
          <button className="self-start md:self-end bg-surface-deep text-pure-white font-label-caps text-label-caps px-6 py-3 rounded uppercase tracking-widest border border-silver-mist inset-shadow hover:bg-surface-variant transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm" data-icon="ios_share">ios_share</span>
            Share My Curation
          </button>
        </header>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <span className="material-symbols-outlined text-5xl text-silver-mist animate-spin" data-icon="progress_activity">progress_activity</span>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <span className="material-symbols-outlined text-6xl text-surface-variant mb-6" data-icon="bookmark_border">bookmark_border</span>
            <h2 className="font-display-lg-mobile text-pure-white mb-4">Your wishlist is empty</h2>
            <p className="font-body-lg text-silver-mist mb-8 max-w-sm">Save pieces you love and return to them whenever you&apos;re ready.</p>
            <a className="px-8 py-4 bg-primary-container text-pure-white font-label-caps rounded-lg hover:opacity-90 transition-all" href="/collections">Explore Collections</a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {items.map((item) => (
              <article key={item.id} className="bg-surface-container rounded-xl overflow-hidden flex flex-col relative group shadow-[inset_0_0_0_1px_rgba(158,160,169,0.1)]">
                <button
                  aria-label="Remove from Wishlist"
                  onClick={() => handleRemove(item.id)}
                  disabled={removingId === item.id}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-pitch-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-silver-mist hover:text-pure-white hover:bg-pitch-black transition-all disabled:opacity-50"
                >
                  <span className="material-symbols-outlined" data-icon="close">close</span>
                </button>
                <div className="aspect-[4/5] relative overflow-hidden bg-pitch-black">
                  <img
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                    src={item.product_image_url}
                    alt={item.product_name}
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between bg-surface-deep">
                  <div className="mb-6">
                    {item.folder_name && (
                      <span className="inline-block bg-pure-white text-pitch-black font-label-caps text-label-caps px-3 py-1 rounded-full mb-3">{item.folder_name}</span>
                    )}
                    <h2 className="font-headline-md text-headline-md text-pure-white mb-2">{item.product_name}</h2>
                    <p className="font-body-lg text-body-lg text-pure-white">{formatPrice(item.product_price)}</p>
                  </div>
                  <button
                    onClick={() => handleAddToBag(item)}
                    disabled={addingId === item.id}
                    className="w-full bg-primary-container text-pure-white font-label-caps text-label-caps py-4 rounded-lg uppercase tracking-widest hover:bg-inverse-primary transition-colors flex items-center justify-center gap-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] disabled:opacity-60"
                  >
                    <span className="material-symbols-outlined text-sm" data-icon="shopping_bag">shopping_bag</span>
                    {addingId === item.id ? "Adding..." : "Add to Bag"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <footer className="w-full bg-pitch-black mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto gap-8">
          <div className="font-display-lg-mobile md:font-display-lg text-pure-white">AETHER</div>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            <a className="font-body-md text-body-md text-silver-mist hover:text-secondary-container transition-colors opacity-100 hover:opacity-80" href="/brand-story">Sustainability</a>
            <a className="font-body-md text-body-md text-silver-mist hover:text-secondary-container transition-colors opacity-100 hover:opacity-80" href="/contact">Shipping</a>
            <a className="font-body-md text-body-md text-silver-mist hover:text-secondary-container transition-colors opacity-100 hover:opacity-80" href="/contact">Returns</a>
            <a className="font-body-md text-body-md text-silver-mist hover:text-secondary-container transition-colors opacity-100 hover:opacity-80" href="/brand-story">Privacy</a>
            <a className="font-body-md text-body-md text-silver-mist hover:text-secondary-container transition-colors opacity-100 hover:opacity-80" href="/contact">Contact</a>
          </div>
          <div className="font-body-md text-body-md text-silver-mist">
            © 2024 AETHER LUXURY. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </>
  );
}
