import type { Metadata } from "next";

export const metadata: Metadata = { title: "Shopping Bag — AETHER" };

export default function BagPage() {
  return (
    <>
<header className="bg-pitch-black dark:bg-pitch-black text-pure-white dark:text-pure-white fixed top-0 w-full z-50 bg-pitch-black bg-opacity-80 backdrop-blur-xl border-b border-surface-container-high">
<div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-6 w-full max-w-container-max mx-auto">
<nav className="hidden md:flex space-x-8">
<a className="text-on-surface-variant hover:text-pure-white transition-colors duration-300 font-label-caps text-label-caps uppercase" href="#">Collections</a>
<a className="text-on-surface-variant hover:text-pure-white transition-colors duration-300 font-label-caps text-label-caps uppercase" href="#">New Arrivals</a>
<a className="text-on-surface-variant hover:text-pure-white transition-colors duration-300 font-label-caps text-label-caps uppercase" href="#">Curations</a>
<a className="text-on-surface-variant hover:text-pure-white transition-colors duration-300 font-label-caps text-label-caps uppercase" href="#">Boutique</a>
</nav>
<div className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-pure-white tracking-tighter uppercase cursor-pointer hover:text-primary-container transition-all duration-200">
                AETHER
            </div>
<div className="flex space-x-6 items-center">
<span className="material-symbols-outlined cursor-pointer text-on-surface-variant hover:text-pure-white transition-colors duration-300" data-icon="search">search</span>
<span className="material-symbols-outlined cursor-pointer text-primary-container font-bold border-b-2 border-primary-container pb-1" data-icon="shopping_bag">shopping_bag</span>
</div>
</div>
</header>

<main className="flex-grow pt-[120px] pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
<div className="mb-12">
<h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg uppercase tracking-tighter">Your Bag</h1>
<p className="font-body-lg text-body-lg text-silver-mist mt-2">2 items</p>
</div>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">

<div className="lg:col-span-8 flex flex-col gap-6">

<div className="bg-surface-deep p-6 rounded-lg border border-surface-container-high flex flex-col sm:flex-row gap-6 relative">
<button className="absolute top-6 right-6 text-silver-mist hover:text-pure-white transition-colors">
<span className="material-symbols-outlined">close</span>
</button>
<div className="w-full sm:w-48 h-64 sm:h-auto bg-surface-container rounded-DEFAULT overflow-hidden shrink-0">
<img className="w-full h-full object-cover" src="/assets/stitch/stitch-18.jpg"/>
</div>
<div className="flex flex-col justify-between flex-grow">
<div>
<h3 className="font-headline-md text-headline-md uppercase">Obsidian Shell</h3>
<p className="font-body-lg text-body-lg text-silver-mist mt-1">Size: M | Color: Black</p>
</div>
<div className="flex justify-between items-end mt-8 sm:mt-0">
<div className="flex items-center bg-pitch-black border border-surface-container-high rounded-DEFAULT">
<button className="px-4 py-2 text-silver-mist hover:text-pure-white">-</button>
<span className="font-body-md text-body-md px-4 border-l border-r border-surface-container-high">1</span>
<button className="px-4 py-2 text-silver-mist hover:text-pure-white">+</button>
</div>
<div className="font-body-lg text-body-lg font-bold">
                                $450.00
                            </div>
</div>
</div>
</div>

<div className="bg-surface-deep p-6 rounded-lg border border-surface-container-high flex flex-col sm:flex-row gap-6 relative">
<button className="absolute top-6 right-6 text-silver-mist hover:text-pure-white transition-colors">
<span className="material-symbols-outlined">close</span>
</button>
<div className="w-full sm:w-48 h-64 sm:h-auto bg-surface-container rounded-DEFAULT overflow-hidden shrink-0">
<img className="w-full h-full object-cover" src="/assets/stitch/stitch-25.jpg"/>
</div>
<div className="flex flex-col justify-between flex-grow">
<div>
<h3 className="font-headline-md text-headline-md uppercase">Monolith Runners</h3>
<p className="font-body-lg text-body-lg text-silver-mist mt-1">Size: 10 | Color: Graphite</p>
</div>
<div className="flex justify-between items-end mt-8 sm:mt-0">
<div className="flex items-center bg-pitch-black border border-surface-container-high rounded-DEFAULT">
<button className="px-4 py-2 text-silver-mist hover:text-pure-white">-</button>
<span className="font-body-md text-body-md px-4 border-l border-r border-surface-container-high">1</span>
<button className="px-4 py-2 text-silver-mist hover:text-pure-white">+</button>
</div>
<div className="font-body-lg text-body-lg font-bold">
                                $280.00
                            </div>
</div>
</div>
</div>
</div>

<div className="lg:col-span-4 mt-8 lg:mt-0">
<div className="bg-surface-container-lowest p-8 border border-surface-container-high rounded-lg sticky top-[120px]">
<h2 className="font-headline-md text-headline-md uppercase mb-8 border-b border-surface-container-high pb-4">Summary</h2>
<div className="flex justify-between mb-4 font-body-lg text-body-lg text-silver-mist">
<span>Subtotal</span>
<span className="text-pure-white">$730.00</span>
</div>
<div className="flex justify-between mb-4 font-body-lg text-body-lg text-silver-mist">
<span>Estimated Shipping</span>
<span className="text-pure-white">Complimentary</span>
</div>
<div className="flex justify-between mb-8 font-body-lg text-body-lg text-silver-mist">
<span>Taxes</span>
<span className="text-pure-white">Calculated at checkout</span>
</div>
<div className="flex justify-between mb-8 font-headline-md text-headline-md border-t border-surface-container-high pt-4">
<span>Total</span>
<span>$730.00</span>
</div>
<button className="w-full bg-primary-container text-pure-white font-label-caps text-label-caps py-6 rounded-lg uppercase tracking-widest hover:opacity-90 transition-opacity flex justify-center items-center gap-2">
                        PROCEED TO CHECKOUT
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
</button>
<div className="mt-6 flex items-center justify-center gap-4 text-silver-mist">
<span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>lock</span>
<span className="font-label-caps text-label-caps">Secure Checkout</span>
</div>
</div>
</div>
</div>
</main>

<footer className="bg-pitch-black dark:bg-pitch-black text-silver-mist dark:text-silver-mist w-full relative bg-pitch-black border-t border-surface-container-high">
<div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop py-section-gap w-full max-w-container-max mx-auto gap-8 md:gap-0">
<div className="font-display-lg-mobile text-display-lg-mobile text-pure-white uppercase tracking-tighter">
                AETHER
            </div>
<div className="flex flex-wrap justify-center gap-6">
<a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors duration-200 uppercase" href="#">Sustainability</a>
<a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors duration-200 uppercase" href="#">Privacy Policy</a>
<a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors duration-200 uppercase" href="#">Terms of Service</a>
<a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors duration-200 uppercase" href="#">Shipping &amp; Returns</a>
</div>
<div className="font-body-md text-body-md">
                © 2024 AETHER. ALL RIGHTS RESERVED.
            </div>
</div>
</footer>
    </>
  );
}
