"use client";

import { useState, useEffect } from "react";
import { get } from "@/lib/api/client";
import { useCart } from "@/lib/hooks/useCart";
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
  badge?: string;
}

export default function CollectionsPage() {
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState<string | null>(null);

  useEffect(() => {
    get<Product[]>("/api/products").then((res) => {
      if (res.ok) setProducts(res.data);
      setLoading(false);
    });
  }, []);

  async function handleAdd(productId: string) {
    setAddingId(productId);
    await addItem(productId);
    setAddingId(null);
  }

  return (
    <>
<nav className="fixed top-0 w-full z-50 bg-pitch-black bg-opacity-80 backdrop-blur-xl border-b border-surface-container-high transition-transform duration-300" id="navbar">
<div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-6 w-full max-w-container-max mx-auto">

<a className="font-display-lg text-display-lg-mobile md:text-display-lg text-pure-white tracking-tighter uppercase leading-none" href="/">
                AETHER
            </a>

<div className="hidden md:flex items-center space-x-gutter">
<a className="font-label-caps text-label-caps text-primary-container font-bold border-b-2 border-primary-container pb-1 uppercase" href="/collections">Collections</a>
<a className="font-label-caps text-label-caps text-on-surface-variant hover:text-pure-white transition-colors duration-300 hover:text-primary-container uppercase" href="/">New Arrivals</a>
<a className="font-label-caps text-label-caps text-on-surface-variant hover:text-pure-white transition-colors duration-300 hover:text-primary-container uppercase" href="/curations">Curations</a>
<a className="font-label-caps text-label-caps text-on-surface-variant hover:text-pure-white transition-colors duration-300 hover:text-primary-container uppercase" href="/collections">Boutique</a>
</div>

<div className="flex items-center space-x-6 text-pure-white">
<button className="hover:text-primary-container transition-all duration-200 focus:outline-none">
<span className="material-symbols-outlined text-2xl">search</span>
</button>
<button className="hover:text-primary-container transition-all duration-200 focus:outline-none">
<span className="material-symbols-outlined text-2xl">shopping_bag</span>
</button>

<button className="md:hidden hover:text-primary-container transition-all duration-200 focus:outline-none">
<span className="material-symbols-outlined text-2xl">menu</span>
</button>
</div>
</div>
</nav>

<main className="pt-32 md:pt-40 pb-section-gap px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto">

<header className="mb-16 md:mb-24 text-center md:text-left">
<h1 className="font-display-xl text-display-lg-mobile md:text-display-xl text-pure-white uppercase mb-4 tracking-tighter">THE CURATIONS</h1>
<p className="font-body-lg text-body-lg text-silver-mist max-w-2xl">Discover our meticulously selected array of high-performance technical apparel and accessories. Engineered for the extraordinary.</p>
</header>
<div className="flex flex-col md:flex-row gap-gutter">

<aside className="hidden md:block w-64 flex-shrink-0">
<div className="sticky top-40 space-y-8">

<div>
<h3 className="font-label-caps text-label-caps text-pure-white mb-4 border-b border-surface-container-high pb-2 uppercase">Category</h3>
<ul className="space-y-3 font-body-md text-body-md text-silver-mist">
<li><label className="flex items-center cursor-pointer hover:text-pure-white transition-colors"><input defaultChecked className="form-checkbox h-4 w-4 bg-pitch-black border-surface-deep text-primary-container focus:ring-primary-container focus:ring-offset-pitch-black mr-3" type="checkbox"/> All Categories</label></li>
<li><label className="flex items-center cursor-pointer hover:text-pure-white transition-colors"><input className="form-checkbox h-4 w-4 bg-pitch-black border-surface-deep text-primary-container focus:ring-primary-container focus:ring-offset-pitch-black mr-3" type="checkbox"/> Outerwear</label></li>
<li><label className="flex items-center cursor-pointer hover:text-pure-white transition-colors"><input className="form-checkbox h-4 w-4 bg-pitch-black border-surface-deep text-primary-container focus:ring-primary-container focus:ring-offset-pitch-black mr-3" type="checkbox"/> Watches</label></li>
<li><label className="flex items-center cursor-pointer hover:text-pure-white transition-colors"><input className="form-checkbox h-4 w-4 bg-pitch-black border-surface-deep text-primary-container focus:ring-primary-container focus:ring-offset-pitch-black mr-3" type="checkbox"/> Eyewear</label></li>
</ul>
</div>

<div>
<h3 className="font-label-caps text-label-caps text-pure-white mb-4 border-b border-surface-container-high pb-2 uppercase">Material</h3>
<ul className="space-y-3 font-body-md text-body-md text-silver-mist">
<li><label className="flex items-center cursor-pointer hover:text-pure-white transition-colors"><input className="form-checkbox h-4 w-4 bg-pitch-black border-surface-deep text-primary-container focus:ring-primary-container focus:ring-offset-pitch-black mr-3" type="checkbox"/> Titanium</label></li>
<li><label className="flex items-center cursor-pointer hover:text-pure-white transition-colors"><input className="form-checkbox h-4 w-4 bg-pitch-black border-surface-deep text-primary-container focus:ring-primary-container focus:ring-offset-pitch-black mr-3" type="checkbox"/> Carbon Fiber</label></li>
<li><label className="flex items-center cursor-pointer hover:text-pure-white transition-colors"><input className="form-checkbox h-4 w-4 bg-pitch-black border-surface-deep text-primary-container focus:ring-primary-container focus:ring-offset-pitch-black mr-3" type="checkbox"/> Merino Wool</label></li>
</ul>
</div>
</div>
</aside>

<div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">

{loading && (
  <div className="col-span-full flex justify-center items-center py-24">
    <span className="material-symbols-outlined text-4xl text-silver-mist animate-spin">progress_activity</span>
  </div>
)}

{!loading && products.length === 0 && (
  <div className="col-span-full py-24 text-center">
    <p className="font-body-lg text-body-lg text-silver-mist">No products found.</p>
  </div>
)}

{!loading && products.map((product) => (
  <div key={product.id} className="group flex flex-col bg-pitch-black rounded-xl overflow-hidden border border-surface-container-low hover:border-surface-variant transition-all duration-300 relative">
    {product.badge && (
      <div className="absolute top-4 left-4 z-10">
        <span className="bg-pure-white text-pitch-black font-label-caps text-label-caps px-3 py-1 rounded-full uppercase">{product.badge}</span>
      </div>
    )}
    <div className="aspect-[4/5] relative overflow-hidden bg-surface-deep">
      <img
        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
        src={product.image_url}
        alt={product.name}
      />
    </div>
    <div className="p-6 flex flex-col flex-1 justify-between">
      <div>
        <h3 className="font-headline-md text-[20px] text-pure-white mb-2 font-bold uppercase tracking-wide">{product.name}</h3>
        <p className="font-body-md text-silver-mist mb-4">{product.material}</p>
      </div>
      <div className="flex items-center justify-between mt-auto">
        <span className="font-body-lg text-pure-white font-bold">{formatPrice(product.price)}</span>
        <button
          onClick={() => handleAdd(product.id)}
          disabled={addingId === product.id}
          aria-label={`Add ${product.name} to bag`}
          className="bg-surface-deep text-pure-white hover:bg-pure-white hover:text-pitch-black transition-colors w-10 h-10 flex items-center justify-center rounded-DEFAULT border border-surface-variant disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-lg">
            {addingId === product.id ? "hourglass_empty" : "add"}
          </span>
        </button>
      </div>
    </div>
  </div>
))}
</div>
</div>
</main>

<footer className="w-full relative bg-pitch-black border-t border-surface-container-high py-section-gap">
<div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto gap-8">
<div className="font-display-lg-mobile text-display-lg-mobile text-pure-white uppercase leading-none tracking-tighter">
                AETHER
            </div>
<div className="flex flex-wrap justify-center gap-6">
<a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors duration-200 uppercase" href="/brand-story">Sustainability</a>
<a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors duration-200 uppercase" href="/brand-story">Privacy Policy</a>
<a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors duration-200 uppercase" href="/brand-story">Terms of Service</a>
<a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors duration-200 uppercase" href="/contact">Shipping &amp; Returns</a>
</div>
<div className="font-body-md text-body-md text-silver-mist text-center md:text-right">
                © 2024 AETHER. ALL RIGHTS RESERVED.
            </div>
</div>
</footer>
    </>
  );
}
