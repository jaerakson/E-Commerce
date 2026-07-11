import type { Metadata } from "next";

export const metadata: Metadata = { title: "Collections — AETHER" };

export default function CollectionsPage() {
  return (
    <>
<nav className="fixed top-0 w-full z-50 bg-pitch-black bg-opacity-80 backdrop-blur-xl border-b border-surface-container-high transition-transform duration-300" id="navbar">
<div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-6 w-full max-w-container-max mx-auto">

<a className="font-display-lg text-display-lg-mobile md:text-display-lg text-pure-white tracking-tighter uppercase leading-none" href="#">
                AETHER
            </a>

<div className="hidden md:flex items-center space-x-gutter">
<a className="font-label-caps text-label-caps text-primary-container font-bold border-b-2 border-primary-container pb-1 uppercase" href="#">Collections</a>
<a className="font-label-caps text-label-caps text-on-surface-variant hover:text-pure-white transition-colors duration-300 hover:text-primary-container uppercase" href="#">New Arrivals</a>
<a className="font-label-caps text-label-caps text-on-surface-variant hover:text-pure-white transition-colors duration-300 hover:text-primary-container uppercase" href="#">Curations</a>
<a className="font-label-caps text-label-caps text-on-surface-variant hover:text-pure-white transition-colors duration-300 hover:text-primary-container uppercase" href="#">Boutique</a>
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

<div className="group flex flex-col bg-pitch-black rounded-xl overflow-hidden border border-surface-container-low hover:border-surface-variant transition-all duration-300 relative">
<div className="absolute top-4 left-4 z-10">
<span className="bg-pure-white text-pitch-black font-label-caps text-label-caps px-3 py-1 rounded-full uppercase">Bestseller</span>
</div>
<div className="aspect-[4/5] relative overflow-hidden bg-surface-deep">
<img className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out" src="/assets/stitch/stitch-14.jpg"/>
</div>
<div className="p-6 flex flex-col flex-1 justify-between">
<div>
<h3 className="font-headline-md text-[20px] text-pure-white mb-2 font-bold uppercase tracking-wide">Apex Shell Jacket</h3>
<p className="font-body-md text-silver-mist mb-4">GORE-TEX Pro</p>
</div>
<div className="flex items-center justify-between mt-auto">
<span className="font-body-lg text-pure-white font-bold">$795</span>
<button className="bg-surface-deep text-pure-white hover:bg-pure-white hover:text-pitch-black transition-colors w-10 h-10 flex items-center justify-center rounded-DEFAULT border border-surface-variant">
<span className="material-symbols-outlined text-lg">add</span>
</button>
</div>
</div>
</div>

<div className="group flex flex-col bg-pitch-black rounded-xl overflow-hidden border border-surface-container-low hover:border-surface-variant transition-all duration-300 relative">
<div className="absolute top-4 left-4 z-10">
<span className="bg-pure-white text-pitch-black font-label-caps text-label-caps px-3 py-1 rounded-full uppercase">New</span>
</div>
<div className="aspect-[4/5] relative overflow-hidden bg-surface-deep">
<img className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out" src="/assets/stitch/stitch-39.jpg"/>
</div>
<div className="p-6 flex flex-col flex-1 justify-between">
<div>
<h3 className="font-headline-md text-[20px] text-pure-white mb-2 font-bold uppercase tracking-wide">Chronos Titanium</h3>
<p className="font-body-md text-silver-mist mb-4">Automatic Movement</p>
</div>
<div className="flex items-center justify-between mt-auto">
<span className="font-body-lg text-pure-white font-bold">$4,200</span>
<button className="bg-surface-deep text-pure-white hover:bg-pure-white hover:text-pitch-black transition-colors w-10 h-10 flex items-center justify-center rounded-DEFAULT border border-surface-variant">
<span className="material-symbols-outlined text-lg">add</span>
</button>
</div>
</div>
</div>

<div className="group flex flex-col bg-pitch-black rounded-xl overflow-hidden border border-surface-container-low hover:border-surface-variant transition-all duration-300 relative">
<div className="aspect-[4/5] relative overflow-hidden bg-surface-deep">
<img className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out" src="/assets/stitch/stitch-03.jpg"/>
</div>
<div className="p-6 flex flex-col flex-1 justify-between">
<div>
<h3 className="font-headline-md text-[20px] text-pure-white mb-2 font-bold uppercase tracking-wide">Eclipse Aviator</h3>
<p className="font-body-md text-silver-mist mb-4">Polarized Carbon</p>
</div>
<div className="flex items-center justify-between mt-auto">
<span className="font-body-lg text-pure-white font-bold">$345</span>
<button className="bg-surface-deep text-pure-white hover:bg-pure-white hover:text-pitch-black transition-colors w-10 h-10 flex items-center justify-center rounded-DEFAULT border border-surface-variant">
<span className="material-symbols-outlined text-lg">add</span>
</button>
</div>
</div>
</div>
</div>
</div>
</main>

<footer className="w-full relative bg-pitch-black border-t border-surface-container-high py-section-gap">
<div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto gap-8">
<div className="font-display-lg-mobile text-display-lg-mobile text-pure-white uppercase leading-none tracking-tighter">
                AETHER
            </div>
<div className="flex flex-wrap justify-center gap-6">
<a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors duration-200 uppercase" href="#">Sustainability</a>
<a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors duration-200 uppercase" href="#">Privacy Policy</a>
<a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors duration-200 uppercase" href="#">Terms of Service</a>
<a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors duration-200 uppercase" href="#">Shipping &amp; Returns</a>
</div>
<div className="font-body-md text-body-md text-silver-mist text-center md:text-right">
                © 2024 AETHER. ALL RIGHTS RESERVED.
            </div>
</div>
</footer>
    </>
  );
}
