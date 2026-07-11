import type { Metadata } from "next";

export const metadata: Metadata = { title: "Order History — AETHER" };

export default function OrdersPage() {
  return (
    <>
<header className="bg-background dark:bg-background border-b border-surface-variant docked full-width top-0 z-50 flat no shadows text-primary dark:text-primary">
<div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
<div className="font-display-lg text-display-lg-mobile tracking-tighter text-on-background dark:text-on-background">
                AETHER
            </div>
<div className="hidden md:flex gap-8">

</div>
<div className="flex items-center gap-4">
<button className="hover:text-primary transition-colors duration-300">
<span className="material-symbols-outlined" data-icon="shopping_bag">shopping_bag</span>
</button>
</div>
</div>
</header>

<main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap flex flex-col md:flex-row gap-gutter">

<aside className="w-full md:w-64 flex flex-col gap-4">
<h1 className="font-headline-md text-headline-md text-pure-white mb-8">Account</h1>
<nav className="flex flex-col gap-2">
<a className="flex items-center justify-between p-4 bg-surface-deep text-pure-white rounded-lg inset-border-active font-label-caps text-label-caps transition-transform scale-95" href="#">
<span>Profile &amp; Settings</span>
<span className="material-symbols-outlined text-[18px]">person</span>
</a>
<a className="flex items-center justify-between p-4 charcoal-canvas text-on-surface-variant hover:text-pure-white rounded-lg inset-border font-label-caps text-label-caps transition-colors" href="#">
<span>Order History</span>
<span className="material-symbols-outlined text-[18px]">history</span>
</a>
<a className="flex items-center justify-between p-4 charcoal-canvas text-on-surface-variant hover:text-pure-white rounded-lg inset-border font-label-caps text-label-caps transition-colors" href="#">
<span>Saved Items</span>
<span className="material-symbols-outlined text-[18px]">favorite</span>
</a>
<a className="flex items-center justify-between p-4 charcoal-canvas text-on-surface-variant hover:text-pure-white rounded-lg inset-border font-label-caps text-label-caps transition-colors mt-8" href="#">
<span>Sign Out</span>
<span className="material-symbols-outlined text-[18px]">logout</span>
</a>
</nav>
</aside>

<section className="flex-grow flex flex-col gap-section-gap">

<div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
<div className="charcoal-canvas rounded-xl p-8 inset-border flex flex-col justify-between min-h-[200px]">
<div>
<h2 className="font-label-caps text-label-caps text-silver-mist mb-2">Personal Details</h2>
<p className="font-headline-md text-[24px] leading-[32px] text-pure-white">Alexander Sterling</p>
<p className="font-body-md text-body-md text-silver-mist mt-1">alexander.sterling@example.com</p>
</div>
<button className="bg-surface-deep inset-border-light text-pure-white font-label-caps text-label-caps py-3 px-6 rounded-none w-max mt-6 hover:bg-surface-variant transition-colors">
                        Edit Profile
                    </button>
</div>
<div className="charcoal-canvas rounded-xl p-8 inset-border flex flex-col justify-between min-h-[200px]">
<div>
<h2 className="font-label-caps text-label-caps text-silver-mist mb-2">Default Shipping</h2>
<p className="font-body-md text-body-md text-pure-white">123 Luxury Lane, Penthouse 4</p>
<p className="font-body-md text-body-md text-silver-mist mt-1">New York, NY 10001, USA</p>
</div>
<button className="bg-surface-deep inset-border-light text-pure-white font-label-caps text-label-caps py-3 px-6 rounded-none w-max mt-6 hover:bg-surface-variant transition-colors">
                        Manage Addresses
                    </button>
</div>
</div>

<div>
<div className="flex justify-between items-end mb-8 border-b border-surface-variant pb-4">
<h2 className="font-headline-md text-headline-md text-pure-white">Recent Orders</h2>
<a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white underline transition-colors" href="/collections">View All</a>
</div>
<div className="flex flex-col gap-4">

<div className="charcoal-canvas rounded-xl p-4 md:p-6 inset-border flex flex-col md:flex-row items-center gap-6">
<div className="w-full md:w-32 h-32 flex-shrink-0 bg-surface-deep rounded-lg overflow-hidden">
<img className="w-full h-full object-cover" src="/assets/stitch/stitch-31.jpg"/>
</div>
<div className="flex-grow flex flex-col gap-2 w-full">
<div className="flex justify-between items-start">
<div>
<p className="font-label-caps text-label-caps text-silver-mist">Order #AET-9942</p>
<h3 className="font-body-lg text-body-lg text-pure-white mt-1">Obsidian Weekender Tote</h3>
</div>
<span className="bg-pure-white text-pitch-black font-label-caps text-[10px] px-3 py-1 rounded-full">Shipped</span>
</div>
<p className="font-body-md text-body-md text-silver-mist">Placed on Oct 12, 2024</p>
<div className="flex justify-between items-center mt-4">
<p className="font-headline-md text-[20px] text-pure-white">$1,250.00</p>
<button className="text-silver-mist hover:text-pure-white font-label-caps text-label-caps transition-colors flex items-center gap-1">
                                    Track <span className="material-symbols-outlined text-[16px]">local_shipping</span>
</button>
</div>
</div>
</div>

<div className="charcoal-canvas rounded-xl p-4 md:p-6 inset-border flex flex-col md:flex-row items-center gap-6 opacity-75 hover:opacity-100 transition-opacity">
<div className="w-full md:w-32 h-32 flex-shrink-0 bg-surface-deep rounded-lg overflow-hidden">
<img className="w-full h-full object-cover" src="/assets/stitch/stitch-16.jpg"/>
</div>
<div className="flex-grow flex flex-col gap-2 w-full">
<div className="flex justify-between items-start">
<div>
<p className="font-label-caps text-label-caps text-silver-mist">Order #AET-8831</p>
<h3 className="font-body-lg text-body-lg text-pure-white mt-1">Titanium Chronograph</h3>
</div>
<span className="bg-surface-variant text-silver-mist font-label-caps text-[10px] px-3 py-1 rounded-full inset-border">Delivered</span>
</div>
<p className="font-body-md text-body-md text-silver-mist">Placed on Sep 04, 2024</p>
<div className="flex justify-between items-center mt-4">
<p className="font-headline-md text-[20px] text-pure-white">$3,400.00</p>
<button className="text-silver-mist hover:text-pure-white font-label-caps text-label-caps transition-colors flex items-center gap-1">
                                    View Receipt <span className="material-symbols-outlined text-[16px]">receipt_long</span>
</button>
</div>
</div>
</div>
</div>
</div>
</section>
</main>

<footer className="bg-pitch-black dark:bg-pitch-black border-t border-surface-variant flat no shadows text-primary-container dark:text-primary-container">
<div className="flex flex-col md:flex-row justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto gap-8">
<div className="font-display-lg text-display-lg-mobile text-on-surface">
                AETHER
            </div>
<div className="flex flex-wrap justify-center gap-6">
<a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors" href="/collections">Collections</a>
<a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors" href="/brand-story">Sustainability</a>
<a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors" href="#">Shipping</a>
<a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors" href="#">Returns</a>
<a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors" href="#">Privacy</a>
</div>
<div className="font-body-md text-body-md text-silver-mist text-center md:text-right">
                © 2024 AETHER LUXURY RETAIL. ALL RIGHTS RESERVED.
            </div>
</div>
</footer>
    </>
  );
}
