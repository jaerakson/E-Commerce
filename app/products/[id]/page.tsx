import type { Metadata } from "next";

export const metadata: Metadata = { title: "Product — AETHER" };

export default function ProductDetailPage() {
  return (
    <>
<nav className="fixed top-0 w-full z-50 bg-pitch-black bg-opacity-80 backdrop-blur-xl border-b border-surface-container-high transition-transform duration-300" id="global-nav">
<div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-6 w-full max-w-container-max mx-auto">
<a className="font-display-lg text-display-lg md:font-display-lg md:text-display-lg text-pure-white tracking-tighter uppercase shrink-0" href="/">
                AETHER
            </a>

<ul className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
<li>
<a className="font-label-caps text-label-caps text-on-surface-variant hover:text-pure-white transition-colors duration-300" href="/collections">
                        Collections
                    </a>
</li>
<li>
<a className="font-label-caps text-label-caps text-on-surface-variant hover:text-pure-white transition-colors duration-300" href="/">
                        New Arrivals
                    </a>
</li>
<li>
<a className="font-label-caps text-label-caps text-on-surface-variant hover:text-pure-white transition-colors duration-300" href="/curations">
                        Curations
                    </a>
</li>
<li>
<a className="font-label-caps text-label-caps text-on-surface-variant hover:text-pure-white transition-colors duration-300" href="/collections">
                        Boutique
                    </a>
</li>
</ul>
<div className="flex items-center gap-4 shrink-0">
<a href="/search" aria-label="search" className="text-pure-white hover:text-primary-container transition-all duration-200"><span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 0"}}>search</span></a>
<a href="/bag" aria-label="shopping_bag" className="text-pure-white hover:text-primary-container transition-all duration-200">
<span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 0"}}>shopping_bag</span>
</a>
<button aria-label="Menu" className="md:hidden text-pure-white hover:text-primary-container transition-all duration-200 ml-2">
<span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 0"}}>menu</span>
</button>
</div>
</div>
</nav>

<main className="flex-grow flex flex-col gap-section-gap w-full max-w-container-max mx-auto pt-32 pb-section-gap">

<section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter px-margin-mobile md:px-margin-desktop min-h-[870px] items-center">

<div className="lg:col-span-7 flex flex-col gap-4 h-full pt-8 lg:pt-0">
<div className="w-full aspect-[4/5] bg-surface-deep rounded-xl overflow-hidden relative group">
<img alt="Chronos Timepiece Front View" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="/assets/stitch/stitch-01.jpg"/>
<div className="absolute top-4 left-4 bg-pure-white text-pitch-black font-label-caps text-label-caps px-4 py-1.5 rounded-full uppercase">New Arrival</div>
</div>
</div>

<div className="lg:col-span-5 flex flex-col justify-center h-full pt-8 lg:pt-0 lg:pl-12">

<nav className="flex items-center gap-2 mb-6 font-label-caps text-label-caps text-silver-mist uppercase tracking-widest">
<a className="hover:text-pure-white transition-colors" href="#">Timepieces</a>
<span>/</span>
<span className="text-pure-white">Chronos Collection</span>
</nav>
<h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg mb-4">CHRONOS TIMEPIECE</h1>
<p className="font-body-lg text-body-lg text-silver-mist mb-8 max-w-lg">
                    Engineered for precision. The Chronos represents the pinnacle of modern horology, combining architectural steel construction with a complex automatic movement, designed for those who command time.
                </p>
<div className="font-accent-serif text-accent-serif mb-10">
                    $2,450
                </div>
<div className="flex flex-col gap-4 mb-12">
<button className="w-full py-5 px-8 bg-primary-container text-pure-white font-label-caps text-label-caps uppercase tracking-widest rounded flex items-center justify-center gap-3 hover:bg-pure-white hover:text-pitch-black transition-colors duration-300">
<span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>shopping_bag</span>
                        Add to Bag
                    </button>
<button className="w-full py-5 px-8 bg-surface-deep text-pure-white font-label-caps text-label-caps uppercase tracking-widest rounded-none border border-surface-container-highest flex items-center justify-center gap-3 hover:bg-surface-variant transition-colors duration-300 group">
<span className="material-symbols-outlined group-hover:text-primary-container transition-colors" style={{fontVariationSettings: "'FILL' 0"}}>favorite</span>
                        Save to Curations
                    </button>
</div>

<div className="border-t border-surface-container-high pt-6 flex flex-col gap-6">
<h3 className="font-headline-md text-headline-md mb-2">Technical Specifications</h3>
<ul className="flex flex-col gap-4 font-body-md text-body-md text-silver-mist">
<li className="flex justify-between border-b border-surface-container-high pb-4">
<span className="text-pure-white">Case Material</span>
<span>Brushed 316L Stainless Steel</span>
</li>
<li className="flex justify-between border-b border-surface-container-high pb-4">
<span className="text-pure-white">Movement</span>
<span>Automatic Calibre A-24</span>
</li>
<li className="flex justify-between border-b border-surface-container-high pb-4">
<span className="text-pure-white">Water Resistance</span>
<span>50 Meters / 5 ATM</span>
</li>
<li className="flex justify-between border-b border-surface-container-high pb-4">
<span className="text-pure-white">Crystal</span>
<span>Domed Sapphire with AR Coating</span>
</li>
</ul>
</div>
</div>
</section>

<section className="px-margin-mobile md:px-margin-desktop mt-12">
<div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
<div className="aspect-square bg-surface-deep overflow-hidden">
<img alt="Movement Detail" className="w-full h-full object-cover" src="/assets/stitch/stitch-32.jpg"/>
</div>
<div className="aspect-square bg-surface-deep flex flex-col justify-center p-12 lg:p-24">
<h2 className="font-display-xl text-display-xl mb-6">THE ART OF MECHANICS</h2>
<p className="font-body-lg text-body-lg text-silver-mist">
                        Revealed through an exhibition case back, the bespoke A-24 automatic calibre beats at 28,800 vph. Every bridge is hand-beveled, and the mainplate features exquisite perlage finishing, invisible to most, known to you.
                    </p>
</div>
</div>
</section>
</main>

<footer className="w-full relative bg-pitch-black border-t border-surface-container-high">
<div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop py-section-gap w-full max-w-container-max mx-auto gap-8">
<div className="font-display-lg-mobile text-display-lg-mobile text-pure-white uppercase shrink-0">
                AETHER
            </div>
<div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4">
<a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors duration-200" href="/brand-story">Sustainability</a>
<a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors duration-200" href="#">Privacy Policy</a>
<a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors duration-200" href="#">Terms of Service</a>
<a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors duration-200" href="#">Shipping &amp; Returns</a>
</div>
<div className="font-body-md text-body-md text-silver-mist w-full text-center md:w-auto md:text-left mt-8 md:mt-0">
                © 2024 AETHER. ALL RIGHTS RESERVED.
            </div>
</div>
</footer>
    </>
  );
}
