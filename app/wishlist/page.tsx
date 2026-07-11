import type { Metadata } from "next";

export const metadata: Metadata = { title: "Wishlist — AETHER" };

export default function WishlistPage() {
  return (
    <>
<nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl">
<div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20 max-w-container-max mx-auto">

<button className="md:hidden text-pure-white p-2">
<span className="material-symbols-outlined" data-icon="menu">menu</span>
</button>

<a className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg tracking-tighter text-pure-white md:mr-8" href="#">AETHER</a>

<div className="hidden md:flex gap-8 items-center h-full">
<a className="font-body-md text-body-md text-on-surface-variant hover:text-pure-white transition-colors h-full flex items-center" href="#">Collections</a>
<a className="font-body-md text-body-md text-on-surface-variant hover:text-pure-white transition-colors h-full flex items-center" href="#">New Arrivals</a>
<a className="font-body-md text-body-md text-primary font-bold border-b-2 border-primary pb-1 h-full flex items-center mt-1" href="#">Curations</a>
<a className="font-body-md text-body-md text-on-surface-variant hover:text-pure-white transition-colors h-full flex items-center" href="#">Boutique</a>
</div>

<div className="flex items-center gap-4 text-pure-white">
<button className="p-2 hover:text-primary transition-all duration-300 opacity-100 hover:opacity-80">
<span className="material-symbols-outlined" data-icon="shopping_bag">shopping_bag</span>
</button>
<button className="p-2 hover:text-primary transition-all duration-300 opacity-100 hover:opacity-80">
<span className="material-symbols-outlined" data-icon="person">person</span>
</button>
</div>
</div>
</nav>

<main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">

<header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
<div>
<h1 className="font-display-xl text-display-xl text-pure-white mb-2">CURATIONS</h1>
<p className="font-body-lg text-body-lg text-silver-mist">Your saved selections for AETHER LUXURY.</p>
</div>
<button className="self-start md:self-end bg-surface-deep text-pure-white font-label-caps text-label-caps px-6 py-3 rounded uppercase tracking-widest border border-silver-mist inset-shadow hover:bg-surface-variant transition-colors flex items-center gap-2">
<span className="material-symbols-outlined text-sm" data-icon="ios_share">ios_share</span>
                Share My Curation
            </button>
</header>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">

<article className="bg-surface-container rounded-xl overflow-hidden flex flex-col relative group shadow-[inset_0_0_0_1px_rgba(158,160,169,0.1)]">
<button aria-label="Remove from Wishlist" className="absolute top-4 right-4 z-10 w-10 h-10 bg-pitch-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-silver-mist hover:text-pure-white hover:bg-pitch-black transition-all">
<span className="material-symbols-outlined" data-icon="close">close</span>
</button>
<div className="aspect-[4/5] relative overflow-hidden bg-pitch-black">
<img className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700" src="/assets/stitch/stitch-05.jpg"/>
</div>
<div className="p-6 flex flex-col flex-grow justify-between bg-surface-deep">
<div className="mb-6">
<span className="inline-block bg-pure-white text-pitch-black font-label-caps text-label-caps px-3 py-1 rounded-full mb-3">NEW</span>
<h2 className="font-headline-md text-headline-md text-pure-white mb-2">Obsidian Trench</h2>
<p className="font-body-lg text-body-lg text-pure-white">$1,850</p>
</div>
<button className="w-full bg-primary-container text-pure-white font-label-caps text-label-caps py-4 rounded-lg uppercase tracking-widest hover:bg-inverse-primary transition-colors flex items-center justify-center gap-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
<span className="material-symbols-outlined text-sm" data-icon="shopping_bag">shopping_bag</span>
                        Add to Bag
                    </button>
</div>
</article>

<article className="bg-surface-container rounded-xl overflow-hidden flex flex-col relative group shadow-[inset_0_0_0_1px_rgba(158,160,169,0.1)]">
<button aria-label="Remove from Wishlist" className="absolute top-4 right-4 z-10 w-10 h-10 bg-pitch-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-silver-mist hover:text-pure-white hover:bg-pitch-black transition-all">
<span className="material-symbols-outlined" data-icon="close">close</span>
</button>
<div className="aspect-[4/5] relative overflow-hidden bg-pitch-black">
<img className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700" src="/assets/stitch/stitch-24.jpg"/>
</div>
<div className="p-6 flex flex-col flex-grow justify-between bg-surface-deep">
<div className="mb-6">
<h2 className="font-headline-md text-headline-md text-pure-white mb-2">Aero Clasp Bag</h2>
<p className="font-body-lg text-body-lg text-pure-white">$980</p>
</div>
<button className="w-full bg-primary-container text-pure-white font-label-caps text-label-caps py-4 rounded-lg uppercase tracking-widest hover:bg-inverse-primary transition-colors flex items-center justify-center gap-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
<span className="material-symbols-outlined text-sm" data-icon="shopping_bag">shopping_bag</span>
                        Add to Bag
                    </button>
</div>
</article>

<article className="bg-surface-container rounded-xl overflow-hidden flex flex-col relative group shadow-[inset_0_0_0_1px_rgba(158,160,169,0.1)] opacity-75">
<button aria-label="Remove from Wishlist" className="absolute top-4 right-4 z-10 w-10 h-10 bg-pitch-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-silver-mist hover:text-pure-white hover:bg-pitch-black transition-all">
<span className="material-symbols-outlined" data-icon="close">close</span>
</button>
<div className="aspect-[4/5] relative overflow-hidden bg-pitch-black">
<div className="absolute inset-0 bg-pitch-black/40 z-0"></div>
<img className="object-cover w-full h-full grayscale" src="/assets/stitch/stitch-11.jpg"/>
</div>
<div className="p-6 flex flex-col flex-grow justify-between bg-surface-deep">
<div className="mb-6">
<span className="inline-block bg-surface-variant text-silver-mist font-label-caps text-label-caps px-3 py-1 rounded-full mb-3 border border-silver-mist/30">SOLD OUT</span>
<h2 className="font-headline-md text-headline-md text-pure-white mb-2">Monolith Boots</h2>
<p className="font-body-lg text-body-lg text-silver-mist line-through">$1,200</p>
</div>
<button className="w-full bg-surface-container-highest text-silver-mist font-label-caps text-label-caps py-4 rounded-lg uppercase tracking-widest cursor-not-allowed flex items-center justify-center gap-2" disabled>
<span className="material-symbols-outlined text-sm" data-icon="notifications">notifications</span>
                        Notify Me
                    </button>
</div>
</article>
</div>
</main>

<footer className="w-full bg-pitch-black mt-auto">
<div className="flex flex-col md:flex-row justify-between items-start md:items-center px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto gap-8">
<div className="font-display-lg-mobile md:font-display-lg text-pure-white">AETHER</div>
<div className="flex flex-wrap gap-x-8 gap-y-4">
<a className="font-body-md text-body-md text-silver-mist hover:text-secondary-container transition-colors opacity-100 hover:opacity-80" href="#">Sustainability</a>
<a className="font-body-md text-body-md text-silver-mist hover:text-secondary-container transition-colors opacity-100 hover:opacity-80" href="#">Shipping</a>
<a className="font-body-md text-body-md text-silver-mist hover:text-secondary-container transition-colors opacity-100 hover:opacity-80" href="#">Returns</a>
<a className="font-body-md text-body-md text-silver-mist hover:text-secondary-container transition-colors opacity-100 hover:opacity-80" href="#">Privacy</a>
<a className="font-body-md text-body-md text-silver-mist hover:text-secondary-container transition-colors opacity-100 hover:opacity-80" href="#">Contact</a>
</div>
<div className="font-body-md text-body-md text-silver-mist">
                © 2024 AETHER LUXURY. ALL RIGHTS RESERVED.
            </div>
</div>
</footer>
    </>
  );
}
