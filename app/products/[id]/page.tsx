"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { get, post } from "@/lib/api/client";
import { useCart } from "@/lib/hooks/useCart";
import { useAuth } from "@/lib/hooks/useAuth";
import { formatPrice } from "@/lib/utils/price";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  material: string;
  stock: number;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const { addItem } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [fetchState, setFetchState] = useState<"loading" | "found" | "not-found">("loading");

  const [addingToBag, setAddingToBag] = useState(false);
  const [addToBagFeedback, setAddToBagFeedback] = useState<"idle" | "success" | "error">("idle");

  const [savingToCurations, setSavingToCurations] = useState(false);
  const [saveToCurationsFeedback, setSaveToCurationsFeedback] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    if (!id) return;
    setFetchState("loading");
    setProduct(null);

    get<Product>(`/api/products/${id}`).then((res) => {
      if (res.ok) {
        setProduct(res.data);
        setFetchState("found");
      } else {
        setFetchState("not-found");
      }
    });
  }, [id]);

  async function handleAddToBag() {
    if (!product || addingToBag) return;
    setAddingToBag(true);
    setAddToBagFeedback("idle");
    const error = await addItem(product.id);
    setAddingToBag(false);
    if (error) {
      setAddToBagFeedback("error");
    } else {
      setAddToBagFeedback("success");
      setTimeout(() => setAddToBagFeedback("idle"), 2500);
    }
  }

  async function handleSaveToCurations() {
    if (!product || savingToCurations) return;
    if (!user) {
      router.push("/login");
      return;
    }
    setSavingToCurations(true);
    setSaveToCurationsFeedback("idle");
    const res = await post("/api/wishlist/items", { product_id: product.id });
    setSavingToCurations(false);
    if (res.ok) {
      setSaveToCurationsFeedback("success");
      setTimeout(() => setSaveToCurationsFeedback("idle"), 2500);
    } else {
      setSaveToCurationsFeedback("error");
    }
  }

  return (
    <>
      <nav
        className="fixed top-0 w-full z-50 bg-pitch-black bg-opacity-80 backdrop-blur-xl border-b border-surface-container-high transition-transform duration-300"
        id="global-nav"
      >
        <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-6 w-full max-w-container-max mx-auto">
          <a
            className="font-display-lg text-display-lg md:font-display-lg md:text-display-lg text-pure-white tracking-tighter uppercase shrink-0"
            href="/"
          >
            AETHER
          </a>

          <ul className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <li>
              <a
                className="font-label-caps text-label-caps text-on-surface-variant hover:text-pure-white transition-colors duration-300"
                href="/collections"
              >
                Collections
              </a>
            </li>
            <li>
              <a
                className="font-label-caps text-label-caps text-on-surface-variant hover:text-pure-white transition-colors duration-300"
                href="/"
              >
                New Arrivals
              </a>
            </li>
            <li>
              <a
                className="font-label-caps text-label-caps text-on-surface-variant hover:text-pure-white transition-colors duration-300"
                href="/curations"
              >
                Curations
              </a>
            </li>
            <li>
              <a
                className="font-label-caps text-label-caps text-on-surface-variant hover:text-pure-white transition-colors duration-300"
                href="/collections"
              >
                Boutique
              </a>
            </li>
          </ul>

          <div className="flex items-center gap-4 shrink-0">
            <a href="/search" aria-label="search" className="text-pure-white hover:text-primary-container transition-all duration-200">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>search</span>
            </a>
            <a href="/bag" aria-label="shopping_bag" className="text-pure-white hover:text-primary-container transition-all duration-200">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>shopping_bag</span>
            </a>
            <button aria-label="Menu" className="md:hidden text-pure-white hover:text-primary-container transition-all duration-200 ml-2">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>menu</span>
            </button>
          </div>
        </div>
      </nav>

      {fetchState === "loading" && (
        <main className="flex-grow flex flex-col items-center justify-center w-full max-w-container-max mx-auto pt-32 pb-section-gap min-h-screen">
          <span className="material-symbols-outlined text-silver-mist animate-spin text-5xl" style={{ fontVariationSettings: "'FILL' 0" }}>
            progress_activity
          </span>
          <p className="font-body-lg text-body-lg text-silver-mist mt-6 tracking-widest uppercase">Loading</p>
        </main>
      )}

      {fetchState === "not-found" && (
        <main className="flex-grow flex flex-col items-center justify-center w-full max-w-container-max mx-auto pt-32 pb-section-gap min-h-screen px-margin-mobile md:px-margin-desktop">
          <span className="material-symbols-outlined text-silver-mist text-6xl mb-6" style={{ fontVariationSettings: "'FILL' 0" }}>
            search_off
          </span>
          <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg mb-4 uppercase">
            Product Not Found
          </h1>
          <p className="font-body-lg text-body-lg text-silver-mist mb-10 text-center max-w-md">
            The product you are looking for does not exist or may have been removed.
          </p>
          <a
            href="/collections"
            className="py-4 px-10 bg-primary-container text-pure-white font-label-caps text-label-caps uppercase tracking-widest rounded hover:bg-pure-white hover:text-pitch-black transition-colors duration-300"
          >
            Browse Collections
          </a>
        </main>
      )}

      {fetchState === "found" && product && (
        <main className="flex-grow flex flex-col gap-section-gap w-full max-w-container-max mx-auto pt-32 pb-section-gap">
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter px-margin-mobile md:px-margin-desktop min-h-[870px] items-center">
            <div className="lg:col-span-7 flex flex-col gap-4 h-full pt-8 lg:pt-0">
              <div className="w-full aspect-[4/5] bg-surface-deep rounded-xl overflow-hidden relative group">
                <img
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={product.image_url}
                />
                <div className="absolute top-4 left-4 bg-pure-white text-pitch-black font-label-caps text-label-caps px-4 py-1.5 rounded-full uppercase">
                  New Arrival
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center h-full pt-8 lg:pt-0 lg:pl-12">
              <nav className="flex items-center gap-2 mb-6 font-label-caps text-label-caps text-silver-mist uppercase tracking-widest">
                <a className="hover:text-pure-white transition-colors" href="/collections">
                  {product.category}
                </a>
                <span>/</span>
                <span className="text-pure-white">{product.name}</span>
              </nav>

              <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg mb-4 uppercase">
                {product.name}
              </h1>

              <p className="font-body-lg text-body-lg text-silver-mist mb-8 max-w-lg">
                {product.description}
              </p>

              <div className="font-accent-serif text-accent-serif mb-10">
                {formatPrice(product.price)}
              </div>

              <div className="flex flex-col gap-4 mb-12">
                <button
                  onClick={handleAddToBag}
                  disabled={addingToBag}
                  className="w-full py-5 px-8 bg-primary-container text-pure-white font-label-caps text-label-caps uppercase tracking-widest rounded flex items-center justify-center gap-3 hover:bg-pure-white hover:text-pitch-black transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {addingToBag ? (
                    <>
                      <span className="material-symbols-outlined animate-spin" style={{ fontVariationSettings: "'FILL' 0" }}>
                        progress_activity
                      </span>
                      Adding…
                    </>
                  ) : addToBagFeedback === "success" ? (
                    <>
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                      Added to Bag
                    </>
                  ) : addToBagFeedback === "error" ? (
                    <>
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                        error
                      </span>
                      Try Again
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                        shopping_bag
                      </span>
                      Add to Bag
                    </>
                  )}
                </button>

                <button
                  onClick={handleSaveToCurations}
                  disabled={savingToCurations}
                  className="w-full py-5 px-8 bg-surface-deep text-pure-white font-label-caps text-label-caps uppercase tracking-widest rounded-none border border-surface-container-highest flex items-center justify-center gap-3 hover:bg-surface-variant transition-colors duration-300 group disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {savingToCurations ? (
                    <>
                      <span className="material-symbols-outlined animate-spin" style={{ fontVariationSettings: "'FILL' 0" }}>
                        progress_activity
                      </span>
                      Saving…
                    </>
                  ) : saveToCurationsFeedback === "success" ? (
                    <>
                      <span className="material-symbols-outlined text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
                        favorite
                      </span>
                      Saved to Curations
                    </>
                  ) : saveToCurationsFeedback === "error" ? (
                    <>
                      <span className="material-symbols-outlined group-hover:text-primary-container transition-colors" style={{ fontVariationSettings: "'FILL' 0" }}>
                        error
                      </span>
                      Try Again
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined group-hover:text-primary-container transition-colors" style={{ fontVariationSettings: "'FILL' 0" }}>
                        favorite
                      </span>
                      Save to Curations
                    </>
                  )}
                </button>
              </div>

              <div className="border-t border-surface-container-high pt-6 flex flex-col gap-6">
                <h3 className="font-headline-md text-headline-md mb-2">Technical Specifications</h3>
                <ul className="flex flex-col gap-4 font-body-md text-body-md text-silver-mist">
                  <li className="flex justify-between border-b border-surface-container-high pb-4">
                    <span className="text-pure-white">Material</span>
                    <span>{product.material}</span>
                  </li>
                  <li className="flex justify-between border-b border-surface-container-high pb-4">
                    <span className="text-pure-white">Category</span>
                    <span>{product.category}</span>
                  </li>
                  <li className="flex justify-between border-b border-surface-container-high pb-4">
                    <span className="text-pure-white">Availability</span>
                    <span>{product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}</span>
                  </li>
                  <li className="flex justify-between border-b border-surface-container-high pb-4">
                    <span className="text-pure-white">SKU</span>
                    <span className="font-mono text-xs tracking-wider">{product.slug}</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="px-margin-mobile md:px-margin-desktop mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <div className="aspect-square bg-surface-deep overflow-hidden">
                <img
                  alt={`${product.name} detail`}
                  className="w-full h-full object-cover"
                  src="/assets/stitch/stitch-32.jpg"
                />
              </div>
              <div className="aspect-square bg-surface-deep flex flex-col justify-center p-12 lg:p-24">
                <h2 className="font-display-xl text-display-xl mb-6">THE ART OF MECHANICS</h2>
                <p className="font-body-lg text-body-lg text-silver-mist">
                  Revealed through an exhibition case back, the bespoke A-24 automatic calibre beats at
                  28,800 vph. Every bridge is hand-beveled, and the mainplate features exquisite perlage
                  finishing, invisible to most, known to you.
                </p>
              </div>
            </div>
          </section>
        </main>
      )}

      <footer className="w-full relative bg-pitch-black border-t border-surface-container-high">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop py-section-gap w-full max-w-container-max mx-auto gap-8">
          <div className="font-display-lg-mobile text-display-lg-mobile text-pure-white uppercase shrink-0">
            AETHER
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4">
            <a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors duration-200" href="/brand-story">
              Sustainability
            </a>
            <a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors duration-200" href="/brand-story">
              Privacy Policy
            </a>
            <a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors duration-200" href="/brand-story">
              Terms of Service
            </a>
            <a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors duration-200" href="/contact">
              Shipping &amp; Returns
            </a>
          </div>
          <div className="font-body-md text-body-md text-silver-mist w-full text-center md:w-auto md:text-left mt-8 md:mt-0">
            © 2024 AETHER. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </>
  );
}
