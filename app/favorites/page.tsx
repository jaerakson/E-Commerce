import type { Metadata } from "next";

export const metadata: Metadata = { title: "Favorites — AETHER" };

export default function FavoritesPage() {
  return (
    <>
<nav className="fixed top-0 w-full z-50 bg-pitch-black bg-opacity-80 backdrop-blur-xl border-b border-surface-container-high">
<div className="flex justify-between items-center px-margin-desktop py-6 w-full max-w-container-max mx-auto">
<a className="font-display-lg text-display-lg text-pure-white tracking-tighter uppercase" href="#">AETHER</a>
<div className="hidden md:flex items-center space-x-10">
<a className="font-label-caps text-label-caps text-on-surface-variant hover:text-pure-white transition-colors duration-300" href="#">Collections</a>
<a className="font-label-caps text-label-caps text-on-surface-variant hover:text-pure-white transition-colors duration-300" href="#">New Arrivals</a>
<a className="font-label-caps text-label-caps text-on-surface-variant hover:text-pure-white transition-colors duration-300" href="#">Curations</a>
<a className="font-label-caps text-label-caps text-on-surface-variant hover:text-pure-white transition-colors duration-300" href="#">Boutique</a>
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
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">

<div className="group relative bg-charcoal-canvas rounded-xl overflow-hidden product-card-hover transition-transform duration-500 hover:-translate-y-2">
<div className="aspect-[3/4] relative overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="/assets/stitch/stitch-34.jpg"/>
<div className="absolute top-4 right-4 z-10">
<button className="w-10 h-10 rounded-full glass-blur bg-pitch-black/40 border border-white/10 flex items-center justify-center text-primary-container hover:bg-primary-container hover:text-pure-white transition-all duration-300">
<span className="material-symbols-outlined filled-heart" style={{fontVariationSettings: "'FILL' 1"}}>favorite</span>
</button>
</div>
<div className="absolute top-4 left-4">
<span className="bg-pure-white text-pitch-black px-3 py-1 font-label-caps text-[10px] rounded-full uppercase">New Arrival</span>
</div>
</div>
<div className="p-6">
<div className="flex justify-between items-start mb-1">
<h3 className="font-headline-md text-lg text-pure-white uppercase tracking-tight">Kinetica Structural Blazer</h3>
<p className="font-body-lg font-bold text-pure-white">$1,240</p>
</div>
<p className="font-body-md text-silver-mist text-sm mb-4">Technical Wool Blend</p>
<button className="w-full py-3 bg-pitch-black border border-surface-deep text-pure-white font-label-caps text-[11px] hover:bg-pure-white hover:text-pitch-black transition-all duration-300 uppercase tracking-widest">
                            Add to Cart
                        </button>
</div>
</div>

<div className="group relative bg-charcoal-canvas rounded-xl overflow-hidden product-card-hover transition-transform duration-500 hover:-translate-y-2">
<div className="aspect-[3/4] relative overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="/assets/stitch/stitch-36.jpg"/>
<div className="absolute top-4 right-4 z-10">
<button className="w-10 h-10 rounded-full glass-blur bg-pitch-black/40 border border-white/10 flex items-center justify-center text-primary-container hover:bg-primary-container hover:text-pure-white transition-all duration-300">
<span className="material-symbols-outlined filled-heart" style={{fontVariationSettings: "'FILL' 1"}}>favorite</span>
</button>
</div>
</div>
<div className="p-6">
<div className="flex justify-between items-start mb-1">
<h3 className="font-headline-md text-lg text-pure-white uppercase tracking-tight">Obsidian Monolith Frames</h3>
<p className="font-body-lg font-bold text-pure-white">$450</p>
</div>
<p className="font-body-md text-silver-mist text-sm mb-4">Handcrafted Acetate</p>
<button className="w-full py-3 bg-pitch-black border border-surface-deep text-pure-white font-label-caps text-[11px] hover:bg-pure-white hover:text-pitch-black transition-all duration-300 uppercase tracking-widest">
                            Add to Cart
                        </button>
</div>
</div>

<div className="group relative bg-charcoal-canvas rounded-xl overflow-hidden product-card-hover transition-transform duration-500 hover:-translate-y-2">
<div className="aspect-[3/4] relative overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="/assets/stitch/stitch-27.jpg"/>
<div className="absolute top-4 right-4 z-10">
<button className="w-10 h-10 rounded-full glass-blur bg-pitch-black/40 border border-white/10 flex items-center justify-center text-primary-container hover:bg-primary-container hover:text-pure-white transition-all duration-300">
<span className="material-symbols-outlined filled-heart" style={{fontVariationSettings: "'FILL' 1"}}>favorite</span>
</button>
</div>
</div>
<div className="p-6">
<div className="flex justify-between items-start mb-1">
<h3 className="font-headline-md text-lg text-pure-white uppercase tracking-tight">Axiom Leather Tote</h3>
<div className="text-right">
<p className="font-body-lg font-bold text-pure-white">$2,100</p>
<p className="text-[10px] text-silver-mist line-through">$2,850</p>
</div>
</div>
<p className="font-body-md text-silver-mist text-sm mb-4">Vachetta Hide</p>
<button className="w-full py-3 bg-pitch-black border border-surface-deep text-pure-white font-label-caps text-[11px] hover:bg-pure-white hover:text-pitch-black transition-all duration-300 uppercase tracking-widest">
                            Add to Cart
                        </button>
</div>
</div>

<div className="group relative bg-charcoal-canvas rounded-xl overflow-hidden product-card-hover transition-transform duration-500 hover:-translate-y-2">
<div className="aspect-[3/4] relative overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="/assets/stitch/stitch-06.jpg"/>
<div className="absolute top-4 right-4 z-10">
<button className="w-10 h-10 rounded-full glass-blur bg-pitch-black/40 border border-white/10 flex items-center justify-center text-primary-container hover:bg-primary-container hover:text-pure-white transition-all duration-300">
<span className="material-symbols-outlined filled-heart" style={{fontVariationSettings: "'FILL' 1"}}>favorite</span>
</button>
</div>
<div className="absolute top-4 left-4">
<span className="bg-primary-container text-pure-white px-3 py-1 font-label-caps text-[10px] rounded-full uppercase">Limited</span>
</div>
</div>
<div className="p-6">
<div className="flex justify-between items-start mb-1">
<h3 className="font-headline-md text-lg text-pure-white uppercase tracking-tight">Vortex Hybrid Sneaker</h3>
<p className="font-body-lg font-bold text-pure-white">$890</p>
</div>
<p className="font-body-md text-silver-mist text-sm mb-4">Tech-Knit / Carbon</p>
<button className="w-full py-3 bg-pitch-black border border-surface-deep text-pure-white font-label-caps text-[11px] hover:bg-pure-white hover:text-pitch-black transition-all duration-300 uppercase tracking-widest">
                            Add to Cart
                        </button>
</div>
</div>
</div>

<div className="hidden flex-col items-center justify-center py-32 text-center" id="empty-state">
<span className="material-symbols-outlined text-6xl text-surface-variant mb-6" data-icon="favorite_border">favorite_border</span>
<h2 className="font-display-lg-mobile text-pure-white mb-4">Your vault is empty</h2>
<p className="font-body-lg text-silver-mist mb-8 max-w-sm">Start curating your personal collection of AETHER pieces.</p>
<a className="px-8 py-4 bg-primary-container text-pure-white font-label-caps rounded-lg hover:opacity-90 transition-all" href="#">Explore Collections</a>
</div>
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
<img className="w-full h-full object-cover grayscale opacity-60 hover:opacity-100 transition-opacity duration-500" src="/assets/stitch/stitch-17.jpg"/>
</div>
<div className="aspect-square bg-pitch-black overflow-hidden rounded-lg">
<img className="w-full h-full object-cover grayscale opacity-60 hover:opacity-100 transition-opacity duration-500" src="/assets/stitch/stitch-19.jpg"/>
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
<a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors duration-200" href="#">Sustainability</a>
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
