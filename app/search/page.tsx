import type { Metadata } from "next";

export const metadata: Metadata = { title: "Search Results — AETHER" };

export default function SearchPage() {
  return (
    <>
<header className="bg-background dark:bg-background text-primary dark:text-primary docked full-width top-0 z-50 flat no shadows border-b border-surface-variant flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto sticky top-0">
<div className="font-display-lg text-display-lg-mobile tracking-tighter text-on-background dark:text-on-background">
            AETHER
        </div>
<div className="flex items-center gap-6">
<div className="hidden md:flex relative inset-border-focus inset-border bg-pitch-black rounded-none h-10 items-center px-4">
<span className="material-symbols-outlined text-silver-mist text-[20px] mr-2">search</span>
<input className="bg-transparent border-none text-silver-mist font-body-md focus:outline-none focus:ring-0 w-64 placeholder-silver-mist" placeholder="Search..." type="text" defaultValue="Minimalist Outerwear"/>
</div>
<button className="hover:text-primary transition-colors duration-300">
<span className="material-symbols-outlined text-on-background text-[24px]">shopping_bag</span>
</button>
</div>
</header>
<main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-32 pb-section-gap flex flex-col md:flex-row gap-gutter">

<aside className="w-full md:w-1/4 shrink-0 space-y-8">
<div className="font-display-lg text-display-lg-mobile md:font-display-lg md:text-display-lg text-pure-white mb-8">
                RESULTS FOR <br/><span className="text-primary-container">"MINIMALIST OUTERWEAR"</span>
</div>
<div className="bg-surface-deep rounded-lg p-6 space-y-6">
<div>
<h3 className="font-label-caps text-label-caps text-pure-white mb-4 border-b border-surface-variant pb-2 uppercase">Category</h3>
<div className="space-y-3">
<label className="flex items-center gap-3 cursor-pointer group">
<input className="appearance-none w-4 h-4 rounded-sm border border-silver-mist defaultChecked:bg-action-raspberry defaultChecked:border-transparent transition-colors relative before:content-[''] before:absolute before:inset-0 before:bg-no-repeat before:bg-center defaultChecked:before:bg-[url('data:image/svg+xml;utf8,&lt;svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 16 16\' fill=\'white\'&gt;&lt;path d=\'M6 10.5L3.5 8l-.7.7L6 11.9l8-8-.7-.7z\'/&gt;&lt;/svg&gt;')]" type="checkbox"/>
<span className="font-body-md text-body-md text-silver-mist group-hover:text-pure-white transition-colors">Coats &amp; Jackets</span>
</label>
<label className="flex items-center gap-3 cursor-pointer group">
<input defaultChecked className="appearance-none w-4 h-4 rounded-sm border border-silver-mist defaultChecked:bg-action-raspberry defaultChecked:border-transparent transition-colors relative before:content-[''] before:absolute before:inset-0 before:bg-no-repeat before:bg-center defaultChecked:before:bg-[url('data:image/svg+xml;utf8,&lt;svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 16 16\' fill=\'white\'&gt;&lt;path d=\'M6 10.5L3.5 8l-.7.7L6 11.9l8-8-.7-.7z\'/&gt;&lt;/svg&gt;')]" type="checkbox"/>
<span className="font-body-md text-body-md text-pure-white transition-colors">Trench Coats</span>
</label>
<label className="flex items-center gap-3 cursor-pointer group">
<input className="appearance-none w-4 h-4 rounded-sm border border-silver-mist defaultChecked:bg-action-raspberry defaultChecked:border-transparent transition-colors relative before:content-[''] before:absolute before:inset-0 before:bg-no-repeat before:bg-center defaultChecked:before:bg-[url('data:image/svg+xml;utf8,&lt;svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 16 16\' fill=\'white\'&gt;&lt;path d=\'M6 10.5L3.5 8l-.7.7L6 11.9l8-8-.7-.7z\'/&gt;&lt;/svg&gt;')]" type="checkbox"/>
<span className="font-body-md text-body-md text-silver-mist group-hover:text-pure-white transition-colors">Blazers</span>
</label>
</div>
</div>
<div>
<h3 className="font-label-caps text-label-caps text-pure-white mb-4 border-b border-surface-variant pb-2 uppercase">Price Range</h3>
<div className="space-y-4">
<div className="flex items-center justify-between font-label-caps text-label-caps text-silver-mist">
<span>$200</span>
<span>$1500+</span>
</div>
<div className="h-1 bg-surface-variant rounded-full relative">
<div className="absolute left-[20%] right-[30%] h-full bg-action-raspberry rounded-full"></div>
<div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-4 h-4 bg-pure-white rounded-full cursor-pointer"></div>
<div className="absolute right-[30%] top-1/2 -translate-y-1/2 w-4 h-4 bg-pure-white rounded-full cursor-pointer"></div>
</div>
</div>
</div>
<div>
<h3 className="font-label-caps text-label-caps text-pure-white mb-4 border-b border-surface-variant pb-2 uppercase">Material</h3>
<div className="flex flex-wrap gap-2">
<button className="px-4 py-2 bg-surface border border-surface-variant text-silver-mist hover:text-pure-white hover:border-pure-white font-label-caps text-label-caps transition-colors rounded-none">WOOL</button>
<button className="px-4 py-2 bg-action-raspberry text-pure-white font-label-caps text-label-caps rounded-none">CASHMERE</button>
<button className="px-4 py-2 bg-surface border border-surface-variant text-silver-mist hover:text-pure-white hover:border-pure-white font-label-caps text-label-caps transition-colors rounded-none">NYLON</button>
</div>
</div>
</div>
</aside>

<section className="w-full md:w-3/4">
<div className="flex justify-between items-center mb-8 border-b border-surface-variant pb-4">
<p className="font-body-md text-body-md text-silver-mist">Showing 12 results</p>
<div className="flex items-center gap-4">
<span className="font-label-caps text-label-caps text-silver-mist uppercase">Sort By:</span>
<select className="bg-pitch-black inset-border text-pure-white font-body-md px-4 py-2 rounded-none focus:outline-none focus:ring-1 focus:ring-secondary-fixed appearance-none cursor-pointer pr-10 relative">
<option>Recommended</option>
<option>Price: Low to High</option>
<option>Price: High to Low</option>
<option>Newest Arrivals</option>
</select>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">

<div className="bg-surface rounded-xl overflow-hidden group cursor-pointer border border-surface-variant hover:border-surface-tint transition-colors duration-300 flex flex-col h-full">
<div className="relative h-[400px] w-full overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="/assets/stitch/stitch-21.jpg"/>
<div className="absolute top-4 left-4 bg-pure-white text-pitch-black font-label-caps text-label-caps px-3 py-1 rounded-full uppercase">New</div>
</div>
<div className="p-6 flex flex-col flex-grow justify-between">
<div>
<h4 className="font-headline-md text-headline-md text-pure-white mb-2 line-clamp-2">Obsidian Wool Overcoat</h4>
<p className="font-body-md text-body-md text-silver-mist mb-4">Italian Cashmere Blend</p>
</div>
<div className="flex items-end justify-between mt-auto">
<span className="font-headline-md text-headline-md text-pure-white">$895</span>
<button className="bg-action-raspberry text-pure-white rounded-lg w-10 h-10 flex items-center justify-center hover:bg-inverse-primary transition-colors">
<span className="material-symbols-outlined">add</span>
</button>
</div>
</div>
</div>

<div className="bg-surface rounded-xl overflow-hidden group cursor-pointer border border-surface-variant hover:border-surface-tint transition-colors duration-300 flex flex-col h-full">
<div className="relative h-[400px] w-full overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="/assets/stitch/stitch-10.jpg"/>
</div>
<div className="p-6 flex flex-col flex-grow justify-between">
<div>
<h4 className="font-headline-md text-headline-md text-pure-white mb-2 line-clamp-2">Structure Trench</h4>
<p className="font-body-md text-body-md text-silver-mist mb-4">Technical Water-Resistant Nylon</p>
</div>
<div className="flex items-end justify-between mt-auto">
<span className="font-headline-md text-headline-md text-pure-white">$1,150</span>
<button className="bg-action-raspberry text-pure-white rounded-lg w-10 h-10 flex items-center justify-center hover:bg-inverse-primary transition-colors">
<span className="material-symbols-outlined">add</span>
</button>
</div>
</div>
</div>

<div className="bg-surface rounded-xl overflow-hidden group cursor-pointer border border-surface-variant hover:border-surface-tint transition-colors duration-300 flex flex-col h-full">
<div className="relative h-[400px] w-full overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="/assets/stitch/stitch-09.jpg"/>
<div className="absolute top-4 left-4 bg-pure-white text-pitch-black font-label-caps text-label-caps px-3 py-1 rounded-full uppercase">Bestseller</div>
</div>
<div className="p-6 flex flex-col flex-grow justify-between">
<div>
<h4 className="font-headline-md text-headline-md text-pure-white mb-2 line-clamp-2">Midnight Architect Blazer</h4>
<p className="font-body-md text-body-md text-silver-mist mb-4">Heavyweight Wool Crepe</p>
</div>
<div className="flex items-end justify-between mt-auto">
<span className="font-headline-md text-headline-md text-pure-white">$750</span>
<button className="bg-action-raspberry text-pure-white rounded-lg w-10 h-10 flex items-center justify-center hover:bg-inverse-primary transition-colors">
<span className="material-symbols-outlined">add</span>
</button>
</div>
</div>
</div>
</div>
<div className="mt-12 flex justify-center">
<button className="bg-surface-deep text-pure-white font-label-caps text-label-caps uppercase px-8 py-4 inset-border hover:bg-surface-variant transition-colors rounded-none">Load More Results</button>
</div>
</section>
</main>

<footer className="bg-pitch-black dark:bg-pitch-black border-t border-surface-variant flex flex-col md:flex-row justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto mt-auto">
<div className="font-display-lg text-display-lg-mobile text-on-surface mb-6 md:mb-0">
            AETHER
        </div>
<nav className="flex flex-wrap justify-center gap-6 mb-6 md:mb-0 font-body-md text-body-md">
<a className="text-silver-mist hover:text-pure-white transition-colors opacity-80 hover:opacity-100" href="/collections">Collections</a>
<a className="text-silver-mist hover:text-pure-white transition-colors opacity-80 hover:opacity-100" href="/brand-story">Sustainability</a>
<a className="text-silver-mist hover:text-pure-white transition-colors opacity-80 hover:opacity-100" href="#">Shipping</a>
<a className="text-silver-mist hover:text-pure-white transition-colors opacity-80 hover:opacity-100" href="#">Returns</a>
<a className="text-silver-mist hover:text-pure-white transition-colors opacity-80 hover:opacity-100" href="#">Privacy</a>
</nav>
<div className="font-label-caps text-label-caps text-silver-mist uppercase">
            © 2024 AETHER LUXURY RETAIL. ALL RIGHTS RESERVED.
        </div>
</footer>
    </>
  );
}
