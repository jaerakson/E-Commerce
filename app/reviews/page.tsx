import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = { title: "Reviews — AETHER" };

export default function ReviewsPage() {
  return (
    <>
<nav className="fixed top-0 w-full z-50 bg-pitch-black bg-opacity-80 backdrop-blur-xl border-b border-surface-container-high">
<div className="flex justify-between items-center px-margin-desktop py-6 w-full max-w-container-max mx-auto">
<div className="font-display-lg text-display-lg text-pure-white tracking-tighter uppercase">AETHER</div>
<div className="hidden md:flex items-center space-x-8">
<a className="font-label-caps text-label-caps text-on-surface-variant hover:text-pure-white transition-colors duration-300" href="/collections">Collections</a>
<a className="font-label-caps text-label-caps text-on-surface-variant hover:text-pure-white transition-colors duration-300" href="/">New Arrivals</a>
<a className="font-label-caps text-label-caps text-primary-container font-bold border-b-2 border-primary-container pb-1" href="/curations">Curations</a>
<a className="font-label-caps text-label-caps text-on-surface-variant hover:text-pure-white transition-colors duration-300" href="/collections">Boutique</a>
</div>
<div className="flex items-center space-x-6">
<button className="text-pure-white hover:text-primary-container transition-all duration-200 active:opacity-80 active:scale-95">
<span className="material-symbols-outlined" data-icon="search">search</span>
</button>
<button className="text-pure-white hover:text-primary-container transition-all duration-200 active:opacity-80 active:scale-95">
<span className="material-symbols-outlined" data-icon="shopping_bag">shopping_bag</span>
</button>
</div>
</div>
</nav>
<main className="pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">

<header className="mb-section-gap text-center md:text-left">
<h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-pure-white uppercase mb-4 tracking-tighter">THE VOICES</h1>
<p className="font-body-lg text-body-lg text-silver-mist max-w-2xl">
                A curated chronicle of experiences. Real perspectives from our community on the intersection of form, function, and luxury.
            </p>
</header>

<div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-surface-container-high pb-8 gap-8">
<div className="flex gap-12">
<div>
<div className="text-primary-container flex items-center gap-1 mb-1">
<span className="material-symbols-outlined star-fill" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined star-fill" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined star-fill" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined star-fill" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined star-fill" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
</div>
<div className="font-headline-md text-headline-md text-pure-white">4.9 / 5.0</div>
<div className="font-label-caps text-label-caps text-silver-mist">BASED ON 12,402 REVIEWS</div>
</div>
<div className="hidden sm:block">
<div className="font-headline-md text-headline-md text-pure-white">98%</div>
<div className="font-label-caps text-label-caps text-silver-mist">WOULD RECOMMEND</div>
</div>
</div>
<div className="flex gap-4 w-full md:w-auto">
<button className="flex-1 md:flex-none px-6 py-3 bg-charcoal-canvas border border-silver-mist text-pure-white font-label-caps text-label-caps hover:bg-surface-deep transition-all">
                    FILTER BY PRODUCT
                </button>
<button className="flex-1 md:flex-none px-8 py-3 bg-primary-container text-pure-white font-label-caps text-label-caps rounded-lg hover:opacity-90 transition-all">
                    WRITE A REVIEW
                </button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">

<div className="lg:col-span-2 row-span-2 group relative overflow-hidden rounded-xl bg-surface-deep p-12 flex flex-col justify-between border border-transparent hover:border-primary-container/30 transition-all duration-500">
<div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700">
<div className="w-full h-full bg-cover bg-center" data-alt="A high-end cinematic photograph of a luxury AETHER jacket worn by a model in a brutalist architectural setting. The lighting is moody and directional, casting long shadows that emphasize the premium fabric texture. Deep blacks and silver mist tones dominate the palette, reflecting a minimalist dark-mode aesthetic." style={{backgroundImage: "url('/assets/stitch/stitch-30.jpg')"}}></div>
<div className="absolute inset-0 cinematic-overlay"></div>
</div>
<div className="relative z-10">
<div className="flex items-center gap-2 text-primary-container mb-6">
<span className="material-symbols-outlined star-fill" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined star-fill" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined star-fill" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined star-fill" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined star-fill" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
</div>
<h3 className="font-accent-serif text-accent-serif text-pure-white leading-tight mb-8">"Beyond any outerwear I've owned—the technical precision meets high-fashion effortlessly."</h3>
</div>
<div className="relative z-10 flex items-center gap-6 mt-auto">
<div className="relative w-16 h-16 rounded-full border-2 border-primary-container p-1 overflow-hidden">
<Image width={64} height={64} className="w-full h-full object-cover rounded-full" src="/assets/stitch/stitch-28.jpg" alt="Reviewer" />
</div>
<div>
<div className="font-headline-md text-headline-md text-pure-white text-2xl">MARCUS VANE</div>
<div className="font-label-caps text-label-caps text-silver-mist">VERIFIED PURCHASER • NEW YORK, NY</div>
</div>
</div>
</div>

<div className="bg-surface-deep rounded-xl p-8 border border-surface-container-high hover:border-primary-container/20 transition-all">
<div className="flex justify-between items-start mb-6">
<div className="text-primary-container">
<span className="material-symbols-outlined star-fill" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined star-fill" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined star-fill" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined star-fill" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined star-fill" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
</div>
<span className="font-label-caps text-[10px] bg-pure-white text-pitch-black px-2 py-0.5 rounded-full">NEW</span>
</div>
<h4 className="font-headline-md text-headline-md text-pure-white text-xl mb-4 uppercase tracking-wide">SILVER-MIST PARKA</h4>
<p className="font-body-md text-body-md text-silver-mist mb-8 leading-relaxed italic">
                    "The silhouette is architectural. I wore this through a London downpour and remained bone-dry while looking like I'd just stepped off a runway."
                </p>
<div className="flex items-center gap-4">
<div className="font-label-caps text-label-caps text-pure-white">ELARA J.</div>
<div className="w-px h-4 bg-surface-container-high"></div>
<div className="font-label-caps text-label-caps text-silver-mist">LONDON, UK</div>
</div>
</div>

<div className="bg-surface-deep rounded-xl overflow-hidden flex flex-col border border-surface-container-high hover:border-primary-container/20 transition-all">
<div className="h-64 relative group overflow-hidden">
<Image fill className="object-cover group-hover:scale-105 transition-transform duration-700" src="/assets/stitch/stitch-23.jpg" alt="Product" />
<div className="absolute inset-0 bg-pitch-black/20"></div>
</div>
<div className="p-8">
<div className="text-primary-container mb-4">
<span className="material-symbols-outlined star-fill" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined star-fill" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined star-fill" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined star-fill" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 0"}}>star</span>
</div>
<p className="font-body-md text-body-md text-on-surface mb-6">"Impeccable build quality. The zippers feel machined from solid blocks of steel. A heavy piece, but worth the weight."</p>
<div className="font-label-caps text-label-caps text-silver-mist">SANTIAGO R. • ARCHITECT</div>
</div>
</div>

<div className="relative rounded-xl overflow-hidden group aspect-[4/5]">
<Image fill className="object-cover group-hover:scale-105 transition-transform duration-1000" src="/assets/stitch/stitch-07.jpg" alt="Product editorial" />
<div className="absolute inset-0 bg-gradient-to-t from-pitch-black via-pitch-black/20 to-transparent p-8 flex flex-col justify-end">
<div className="text-primary-container mb-2">
<span className="material-symbols-outlined star-fill" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined star-fill" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined star-fill" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined star-fill" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined star-fill" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
</div>
<p className="font-body-md text-body-md text-pure-white mb-4 line-clamp-3 italic">"AETHER isn't just clothing, it's an armor for the modern explorer. I trust it implicitly in every climate I face."</p>
<div className="font-label-caps text-label-caps text-silver-mist">NATHAN D. • PHOTOJOURNALIST</div>
</div>
</div>

<div className="bg-surface-deep rounded-xl p-8 border border-surface-container-high flex flex-col justify-center items-center text-center">
<div className="text-primary-container mb-6 scale-125">
<span className="material-symbols-outlined star-fill" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined star-fill" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined star-fill" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined star-fill" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined star-fill" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
</div>
<h4 className="font-headline-md text-headline-md text-pure-white text-2xl mb-4 italic">"Pure perfection."</h4>
<p className="font-body-md text-body-md text-silver-mist mb-6">Simple, direct, and exactly what I expected from AETHER.</p>
<div className="font-label-caps text-label-caps text-primary-container">SARAH K.</div>
</div>

<div className="lg:col-span-1 bg-surface-deep rounded-xl p-8 border border-surface-container-high relative overflow-hidden group">
<div className="relative z-10">
<div className="text-primary-container mb-4">
<span className="material-symbols-outlined star-fill" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined star-fill" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined star-fill" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined star-fill" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined star-fill" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
</div>
<h4 className="font-label-caps text-label-caps text-pure-white mb-4 uppercase">TECHNICAL SHELL V4</h4>
<p className="font-body-md text-body-md text-on-surface mb-8">"The matte finish is exquisite. Every interaction with the garment—the magnetic snaps, the micro-fleece lining—feels considered."</p>
</div>
<div className="mt-auto relative z-10 flex items-center justify-between">
<div className="font-label-caps text-label-caps text-silver-mist">JAMES L.</div>
<button className="w-12 h-12 flex items-center justify-center rounded-full border border-silver-mist text-pure-white hover:bg-primary-container hover:border-primary-container transition-all">
<span className="material-symbols-outlined">play_arrow</span>
</button>
</div>

<div className="absolute bottom-0 right-0 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
<span className="material-symbols-outlined text-[160px]" style={{fontVariationSettings: "'wght' 100"}}>verified</span>
</div>
</div>
</div>

<div className="mt-section-gap text-center">
<button className="inline-flex items-center gap-4 px-12 py-5 bg-transparent border border-surface-container-high text-pure-white font-label-caps text-label-caps hover:bg-surface-deep transition-all group">
                LOAD MORE EXPERIENCES
                <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform">keyboard_arrow_down</span>
</button>
</div>
</main>

<footer className="w-full relative bg-pitch-black border-t border-surface-container-high mt-section-gap">
<div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop py-section-gap w-full max-w-container-max mx-auto gap-8">
<div className="font-display-lg-mobile text-display-lg-mobile text-pure-white">AETHER</div>
<div className="flex flex-wrap justify-center gap-8">
<a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors duration-200" href="/brand-story">Sustainability</a>
<a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors duration-200" href="/brand-story">Privacy Policy</a>
<a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors duration-200" href="/brand-story">Terms of Service</a>
<a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors duration-200" href="/contact">Shipping & Returns</a>
</div>
<div className="font-label-caps text-label-caps text-silver-mist">© 2024 AETHER. ALL RIGHTS RESERVED.</div>
</div>
</footer>


<div className="fixed top-0 left-0 w-[300px] h-[300px] bg-primary-container/5 rounded-full blur-[100px] pointer-events-none z-[60] hidden lg:block" id="cursor-glow"></div>
    </>
  );
}
