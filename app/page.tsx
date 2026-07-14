import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = { title: "AETHER — Premium E-Commerce" };

export default function HomePage() {
  return (
    <>
<header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-none shadow-none">
<div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20 max-w-container-max mx-auto">

<nav className="hidden md:flex gap-gutter items-center">
<a className="text-on-surface-variant hover:text-pure-white transition-colors hover:text-primary transition-all duration-300 font-body-md text-body-md opacity-100 hover:opacity-80" href="/collections">Collections</a>
<a className="text-primary font-bold border-b-2 border-primary pb-1 font-body-md text-body-md opacity-80 scale-95 transition-all" href="/">New Arrivals</a>
<a className="text-on-surface-variant hover:text-pure-white transition-colors hover:text-primary transition-all duration-300 font-body-md text-body-md opacity-100 hover:opacity-80" href="/curations">Curations</a>
<a className="text-on-surface-variant hover:text-pure-white transition-colors hover:text-primary transition-all duration-300 font-body-md text-body-md opacity-100 hover:opacity-80" href="/collections">Boutique</a>
</nav>

<button aria-label="Open Menu" className="md:hidden text-pure-white p-2">
<span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 0"}}>menu</span>
</button>

<a className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg tracking-tighter text-pure-white absolute left-1/2 transform -translate-x-1/2 md:static md:translate-x-0" href="/">
                AETHER
            </a>

<div className="flex items-center gap-4 text-pure-white">
<a href="/search" aria-label="Search" className="hover:text-primary transition-colors opacity-100 hover:opacity-80">
<span className="material-symbols-outlined" data-icon="search" style={{fontVariationSettings: "'FILL' 0"}}>search</span>
</a>
<a href="/bag" aria-label="shopping_bag" className="hover:text-primary transition-colors opacity-100 hover:opacity-80">
<span className="material-symbols-outlined" data-icon="shopping_bag" style={{fontVariationSettings: "'FILL' 0"}}>shopping_bag</span>
</a>
<a href="/login" aria-label="person" className="hover:text-primary transition-colors opacity-100 hover:opacity-80 hidden md:block">
<span className="material-symbols-outlined" data-icon="person" style={{fontVariationSettings: "'FILL' 0"}}>person</span>
</a>
</div>
</div>
</header>

<main className="pt-20">

<section className="bg-pitch-black w-full min-h-[921px] flex flex-col md:flex-row relative">
<div className="flex-1 flex flex-col justify-center px-margin-mobile md:px-margin-desktop py-section-gap z-10 max-w-2xl md:ml-auto">
<h1 className="font-display-lg-mobile md:font-display-xl text-display-lg-mobile md:text-display-xl text-pure-white mb-6 uppercase leading-[0.9]">
                    ELEVATE<br/>YOUR<br/>ESSENCE
                </h1>
<p className="font-body-lg text-body-lg text-silver-mist mb-10 max-w-md">
                    Discover a curated selection of premium essentials designed to redefine your everyday aesthetic with uncompromising quality and bold sophistication.
                </p>
<a className="inline-flex items-center justify-center bg-primary-container text-pure-white font-label-caps text-label-caps py-4 px-8 rounded-lg w-fit transition-transform hover:scale-[0.98] active:scale-95" href="/collections">
                    SHOP NEW ARRIVAL
                </a>
</div>
<div className="flex-1 relative w-full min-h-[512px] md:min-h-full">
<Image fill className="object-cover" src="/assets/stitch/stitch-26.jpg" alt="Hero editorial image" />

<div className="absolute inset-0 bg-gradient-to-r from-pitch-black via-pitch-black/50 to-transparent hidden md:block"></div>
<div className="absolute inset-0 bg-gradient-to-t from-pitch-black via-pitch-black/50 to-transparent md:hidden"></div>
</div>
</section>

<section className="bg-surface-deep py-section-gap w-full">
<div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
<div className="flex justify-between items-end mb-10">
<h2 className="font-headline-md text-headline-md text-pure-white uppercase tracking-wider">Best Sellers</h2>
<a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors uppercase pb-1 border-b border-silver-mist hover:border-pure-white" href="/collections">View All</a>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">

<div className="group cursor-pointer">
<div className="relative bg-charcoal-canvas rounded-xl overflow-hidden aspect-[4/5] mb-4">
<Image fill className="object-cover transition-transform duration-700 group-hover:scale-105" src="/assets/stitch/stitch-02.jpg" alt="Obsidian Tote" />
<div className="absolute top-4 left-4 bg-pure-white text-pitch-black font-label-caps text-label-caps px-3 py-1 rounded-full uppercase tracking-wider">
                                Bestseller
                            </div>

<div className="absolute inset-0 bg-pitch-black/0 group-hover:bg-pitch-black/10 transition-colors duration-300"></div>
</div>
<div className="flex justify-between items-start">
<div>
<h3 className="font-body-lg text-body-lg text-pure-white font-medium">Obsidian Tote</h3>
<p className="font-body-md text-body-md text-silver-mist mt-1">Italian Calfskin</p>
</div>
<span className="font-body-lg text-body-lg text-pure-white font-medium">$890</span>
</div>
</div>

<div className="group cursor-pointer">
<div className="relative bg-charcoal-canvas rounded-xl overflow-hidden aspect-[4/5] mb-4">
<Image fill className="object-cover transition-transform duration-700 group-hover:scale-105" src="/assets/stitch/stitch-40.jpg" alt="Architect Blazer" />
<div className="absolute top-4 left-4 bg-pure-white text-pitch-black font-label-caps text-label-caps px-3 py-1 rounded-full uppercase tracking-wider">
                                Bestseller
                            </div>
</div>
<div className="flex justify-between items-start">
<div>
<h3 className="font-body-lg text-body-lg text-pure-white font-medium">Architect Blazer</h3>
<p className="font-body-md text-body-md text-silver-mist mt-1">Structured Wool</p>
</div>
<span className="font-body-lg text-body-lg text-pure-white font-medium">$1,200</span>
</div>
</div>

<div className="group cursor-pointer">
<div className="relative bg-charcoal-canvas rounded-xl overflow-hidden aspect-[4/5] mb-4">
<Image fill className="object-cover transition-transform duration-700 group-hover:scale-105" src="/assets/stitch/stitch-13.jpg" alt="Chronos Timepiece" />
<div className="absolute top-4 left-4 bg-pure-white text-pitch-black font-label-caps text-label-caps px-3 py-1 rounded-full uppercase tracking-wider">
                                Bestseller
                            </div>
</div>
<div className="flex justify-between items-start">
<div>
<h3 className="font-body-lg text-body-lg text-pure-white font-medium">Chronos Timepiece</h3>
<p className="font-body-md text-body-md text-silver-mist mt-1">Brushed Steel</p>
</div>
<span className="font-body-lg text-body-lg text-pure-white font-medium">$2,450</span>
</div>
</div>

<div className="group cursor-pointer">
<div className="relative bg-charcoal-canvas rounded-xl overflow-hidden aspect-[4/5] mb-4">
<Image fill className="object-cover transition-transform duration-700 group-hover:scale-105" src="/assets/stitch/stitch-15.jpg" alt="Eclipse Eyewear" />
<div className="absolute top-4 left-4 bg-pure-white text-pitch-black font-label-caps text-label-caps px-3 py-1 rounded-full uppercase tracking-wider">
                                Bestseller
                            </div>
</div>
<div className="flex justify-between items-start">
<div>
<h3 className="font-body-lg text-body-lg text-pure-white font-medium">Eclipse Eyewear</h3>
<p className="font-body-md text-body-md text-silver-mist mt-1">Matte Acetate</p>
</div>
<span className="font-body-lg text-body-lg text-pure-white font-medium">$420</span>
</div>
</div>
</div>
</div>
</section>

<section className="bg-background py-section-gap relative">
<div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
<div className="text-center mb-12">
<h2 className="font-accent-serif text-accent-serif text-pure-white mb-4">The Editorial</h2>
<p className="font-body-md text-body-md text-silver-mist max-w-xl mx-auto">Explore our latest visual narrative, blending structural design with organic movement.</p>
</div>
<div className="relative w-full aspect-square md:aspect-[21/9] rounded-xl overflow-hidden">
<Image fill className="object-cover" src="/assets/stitch/stitch-38.jpg" alt="Editorial campaign" />

<div className="absolute inset-0 border border-surface-bright/20 rounded-xl pointer-events-none"></div>
</div>
</div>
</section>

<section className="bg-pitch-black py-32 flex flex-col items-center justify-center text-center px-margin-mobile">
<h2 className="font-accent-serif text-[40px] leading-[48px] md:text-accent-serif text-pure-white max-w-3xl mb-12 italic">
                "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away."
            </h2>
<button className="bg-surface-container border border-silver-mist/30 text-pure-white font-label-caps text-label-caps py-4 px-10 hover:bg-surface-bright transition-colors rounded-none">
                EXPLORE ALL
            </button>
</section>
</main>

<footer className="bg-pitch-black w-full border-t border-surface-container-high/50">
<div className="flex flex-col md:flex-row justify-between items-start md:items-center px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto">
<div className="mb-8 md:mb-0">
<a className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-pure-white tracking-tighter" href="/">
                    AETHER
                </a>
</div>
<nav className="flex flex-col md:flex-row gap-6 mb-8 md:mb-0">
<a className="font-body-md text-body-md text-silver-mist hover:text-secondary-container transition-colors opacity-100 hover:opacity-80" href="/brand-story">Sustainability</a>
<a className="font-body-md text-body-md text-silver-mist hover:text-secondary-container transition-colors opacity-100 hover:opacity-80" href="#">Shipping</a>
<a className="font-body-md text-body-md text-silver-mist hover:text-secondary-container transition-colors opacity-100 hover:opacity-80" href="#">Returns</a>
<a className="font-body-md text-body-md text-silver-mist hover:text-secondary-container transition-colors opacity-100 hover:opacity-80" href="#">Privacy</a>
<a className="font-body-md text-body-md text-silver-mist hover:text-secondary-container transition-colors opacity-100 hover:opacity-80" href="/contact">Contact</a>
</nav>
<div className="font-label-caps text-label-caps text-silver-mist uppercase tracking-widest text-sm">
                © 2024 AETHER LUXURY. ALL RIGHTS RESERVED.
            </div>
</div>
</footer>
    </>
  );
}
