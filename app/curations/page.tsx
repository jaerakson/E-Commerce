import type { Metadata } from "next";

export const metadata: Metadata = { title: "My Curations — AETHER" };

export default function CurationsPage() {
  return (
    <>
<header className="fixed top-0 w-full z-50 bg-pitch-black bg-opacity-80 backdrop-blur-xl border-b border-surface-container-high">
<nav className="flex justify-between items-center px-margin-desktop py-6 w-full max-w-container-max mx-auto">
<div className="font-display-lg text-display-lg text-pure-white tracking-tighter uppercase">AETHER</div>
<div className="hidden md:flex items-center space-x-8">
<a className="text-on-surface-variant hover:text-pure-white transition-colors duration-300 font-label-caps text-label-caps uppercase" href="/collections">Collections</a>
<a className="text-on-surface-variant hover:text-pure-white transition-colors duration-300 font-label-caps text-label-caps uppercase" href="/">New Arrivals</a>
<a className="text-primary-container font-bold border-b-2 border-primary-container pb-1 font-label-caps text-label-caps uppercase" href="/curations">Curations</a>
<a className="text-on-surface-variant hover:text-pure-white transition-colors duration-300 font-label-caps text-label-caps uppercase" href="/collections">Boutique</a>
</div>
<div className="flex items-center space-x-6">
<button className="material-symbols-outlined text-pure-white hover:opacity-80 transition-all scale-110" data-icon="search">search</button>
<button className="material-symbols-outlined text-pure-white hover:opacity-80 transition-all scale-110 relative" data-icon="shopping_bag">
                    shopping_bag
                    <span className="absolute -top-1 -right-1 bg-primary-container text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">2</span>
</button>
</div>
</nav>
</header>
<main className="pt-32 pb-section-gap px-margin-desktop max-w-container-max mx-auto min-h-screen">

<section className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
<div className="space-y-2">
<span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">Personal Archives</span>
<h1 className="font-display-lg text-display-lg text-pure-white uppercase m-0 leading-none">My Curations</h1>
<p className="font-body-lg text-body-lg text-silver-mist max-w-xl">Your meticulously selected digital vault of aesthetic inspiration, technical essentials, and seasonal focal points.</p>
</div>
<button className="bg-primary-container text-pure-white px-8 py-4 rounded-lg font-label-caps text-label-caps uppercase tracking-widest flex items-center gap-3 hover:opacity-90 active:scale-95 transition-all shadow-lg">
<span className="material-symbols-outlined" data-icon="add_circle">add_circle</span>
                Create New Curation
            </button>
</section>

<div className="flex items-center justify-between border-b border-surface-container-high pb-4 mb-10">
<div className="flex gap-8">
<button className="font-label-caps text-label-caps text-pure-white border-b border-pure-white pb-4">All Folders (8)</button>
<button className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors pb-4">Recent</button>
<button className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors pb-4">Shared</button>
</div>
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-silver-mist cursor-pointer hover:text-pure-white" data-icon="grid_view">grid_view</span>
<span className="material-symbols-outlined text-silver-mist cursor-pointer hover:text-pure-white" data-icon="list">list</span>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">

<div className="group curation-card relative bg-surface-deep rounded-xl overflow-hidden aspect-[4/5] flex flex-col transition-all duration-500 hover:ring-2 hover:ring-primary-container/50">
<div className="h-full w-full relative">
<img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="/assets/stitch/stitch-33.jpg"/>
<div className="absolute inset-0 bg-gradient-to-t from-pitch-black via-transparent to-transparent opacity-80"></div>
<div className="absolute top-4 left-4">
<span className="bg-pure-white text-pitch-black font-label-caps text-[10px] px-3 py-1 rounded-full uppercase">12 Items</span>
</div>
</div>
<div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
<h3 className="font-display-lg-mobile text-display-lg-mobile text-pure-white uppercase mb-2">Winter Essentials</h3>
<p className="font-body-md text-body-md text-silver-mist line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">High-performance technical layers and ultra-fine wool staples for the sub-zero urban explorer.</p>
<div className="flex items-center gap-4 mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
<button className="bg-pure-white text-pitch-black px-4 py-2 rounded font-label-caps text-[10px] uppercase font-bold hover:bg-primary-container hover:text-pure-white transition-colors">View Collection</button>
<button className="material-symbols-outlined text-pure-white" data-icon="more_vert">more_vert</button>
</div>
</div>
</div>

<div className="group curation-card relative bg-surface-deep rounded-xl overflow-hidden aspect-[4/5] flex flex-col transition-all duration-500 hover:ring-2 hover:ring-primary-container/50">
<div className="h-full w-full relative">
<img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="/assets/stitch/stitch-42.jpg"/>
<div className="absolute inset-0 bg-gradient-to-t from-pitch-black via-transparent to-transparent opacity-80"></div>
<div className="absolute top-4 left-4">
<span className="bg-pure-white text-pitch-black font-label-caps text-[10px] px-3 py-1 rounded-full uppercase">08 Items</span>
</div>
</div>
<div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
<h3 className="font-display-lg-mobile text-display-lg-mobile text-pure-white uppercase mb-2">Tech Minimalist</h3>
<p className="font-body-md text-body-md text-silver-mist line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">A curated selection of machined aluminum peripherals and monochromatic hardware for the modern workspace.</p>
<div className="flex items-center gap-4 mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
<button className="bg-pure-white text-pitch-black px-4 py-2 rounded font-label-caps text-[10px] uppercase font-bold hover:bg-primary-container hover:text-pure-white transition-colors">View Collection</button>
<button className="material-symbols-outlined text-pure-white" data-icon="more_vert">more_vert</button>
</div>
</div>
</div>

<div className="group curation-card relative bg-surface-deep rounded-xl overflow-hidden aspect-[4/5] flex flex-col transition-all duration-500 hover:ring-2 hover:ring-primary-container/50">
<div className="h-full w-full relative">
<img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="/assets/stitch/stitch-37.jpg"/>
<div className="absolute inset-0 bg-gradient-to-t from-pitch-black via-transparent to-transparent opacity-80"></div>
<div className="absolute top-4 left-4">
<span className="bg-pure-white text-pitch-black font-label-caps text-[10px] px-3 py-1 rounded-full uppercase">24 Items</span>
</div>
</div>
<div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
<h3 className="font-display-lg-mobile text-display-lg-mobile text-pure-white uppercase mb-2">Tokyo Nocturne</h3>
<p className="font-body-md text-body-md text-silver-mist line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">Streetwear and accessories inspired by the high-contrast neon landscape of Shinjuku after midnight.</p>
<div className="flex items-center gap-4 mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
<button className="bg-pure-white text-pitch-black px-4 py-2 rounded font-label-caps text-[10px] uppercase font-bold hover:bg-primary-container hover:text-pure-white transition-colors">View Collection</button>
<button className="material-symbols-outlined text-pure-white" data-icon="more_vert">more_vert</button>
</div>
</div>
</div>

<div className="group curation-card relative bg-surface-deep rounded-xl overflow-hidden aspect-[4/5] flex flex-col transition-all duration-500 hover:ring-2 hover:ring-primary-container/50">
<div className="h-full w-full relative">
<img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="/assets/stitch/stitch-35.jpg"/>
<div className="absolute inset-0 bg-gradient-to-t from-pitch-black via-transparent to-transparent opacity-80"></div>
<div className="absolute top-4 left-4">
<span className="bg-pure-white text-pitch-black font-label-caps text-[10px] px-3 py-1 rounded-full uppercase">05 Items</span>
</div>
</div>
<div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
<h3 className="font-display-lg-mobile text-display-lg-mobile text-pure-white uppercase mb-2">Brutalist Form</h3>
<p className="font-body-md text-body-md text-silver-mist line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">Homeware and furniture that celebrates the raw honesty of concrete, steel, and glass.</p>
<div className="flex items-center gap-4 mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
<button className="bg-pure-white text-pitch-black px-4 py-2 rounded font-label-caps text-[10px] uppercase font-bold hover:bg-primary-container hover:text-pure-white transition-colors">View Collection</button>
<button className="material-symbols-outlined text-pure-white" data-icon="more_vert">more_vert</button>
</div>
</div>
</div>

<div className="group cursor-pointer border-2 border-dashed border-surface-container-highest rounded-xl flex flex-col items-center justify-center p-12 text-center aspect-[4/5] hover:border-primary-container hover:bg-surface-container-low transition-all duration-300">
<div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-6 group-hover:bg-primary-container transition-colors">
<span className="material-symbols-outlined text-silver-mist text-3xl group-hover:text-pure-white" data-icon="add">add</span>
</div>
<h4 className="font-headline-md text-headline-md text-pure-white uppercase mb-2">New Vault</h4>
<p className="font-body-md text-body-md text-silver-mist">Create a themed space for your next discovery.</p>
</div>
</div>
</main>

<footer className="w-full relative bg-pitch-black border-t border-surface-container-high">
<div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop py-section-gap w-full max-w-container-max mx-auto">
<div className="font-display-lg-mobile text-display-lg-mobile text-pure-white mb-8 md:mb-0">AETHER</div>
<div className="flex flex-col md:flex-row gap-8 mb-8 md:mb-0 text-center md:text-left">
<a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors duration-200 uppercase tracking-widest" href="/brand-story">Sustainability</a>
<a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors duration-200 uppercase tracking-widest" href="#">Privacy Policy</a>
<a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors duration-200 uppercase tracking-widest" href="#">Terms of Service</a>
<a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors duration-200 uppercase tracking-widest" href="#">Shipping &amp; Returns</a>
</div>
<div className="font-body-md text-body-md text-silver-mist font-label-caps text-[10px] tracking-widest">
                © 2024 AETHER. ALL RIGHTS RESERVED.
            </div>
</div>
</footer>

<button className="fixed bottom-10 right-10 w-16 h-16 bg-primary-container text-pure-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-40 md:hidden">
<span className="material-symbols-outlined text-2xl" data-icon="add">add</span>
</button>
    </>
  );
}
