import type { Metadata } from "next";

export const metadata: Metadata = { title: "Checkout — AETHER" };

export default function CheckoutPage() {
  return (
    <>
<header className="w-full flex justify-center py-8 border-b border-surface-variant/50 bg-pitch-black z-50 sticky top-0">
<a className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg tracking-tighter text-on-background" href="#">AETHER</a>
</header>

<main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap grid grid-cols-1 lg:grid-cols-12 gap-gutter">

<div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-12">

<section className="bg-surface rounded-xl p-6 md:p-8 border border-surface-variant/30 inset-shadow-sm">
<h2 className="font-headline-md text-headline-md mb-6 text-pure-white flex items-center gap-3">
<span className="material-symbols-outlined text-primary-container" style={{fontVariationSettings: "'FILL' 1"}}>local_shipping</span>
                    Shipping Information
                </h2>
<form className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="col-span-1 md:col-span-2">
<label className="block font-label-caps text-label-caps text-silver-mist mb-2 uppercase" htmlFor="email">Email Address</label>
<input className="w-full rounded-DEFAULT border-surface-deep bg-pitch-black text-on-surface focus:border-secondary-container focus:ring-0 transition-colors py-3" id="email" placeholder="Enter your email" type="email"/>
</div>
<div>
<label className="block font-label-caps text-label-caps text-silver-mist mb-2 uppercase" htmlFor="first-name">First Name</label>
<input className="w-full rounded-DEFAULT border-surface-deep bg-pitch-black text-on-surface focus:border-secondary-container focus:ring-0 transition-colors py-3" id="first-name" placeholder="First Name" type="text"/>
</div>
<div>
<label className="block font-label-caps text-label-caps text-silver-mist mb-2 uppercase" htmlFor="last-name">Last Name</label>
<input className="w-full rounded-DEFAULT border-surface-deep bg-pitch-black text-on-surface focus:border-secondary-container focus:ring-0 transition-colors py-3" id="last-name" placeholder="Last Name" type="text"/>
</div>
<div className="col-span-1 md:col-span-2">
<label className="block font-label-caps text-label-caps text-silver-mist mb-2 uppercase" htmlFor="address">Address</label>
<input className="w-full rounded-DEFAULT border-surface-deep bg-pitch-black text-on-surface focus:border-secondary-container focus:ring-0 transition-colors py-3" id="address" placeholder="Street Address" type="text"/>
</div>
<div className="col-span-1 md:col-span-2">
<label className="block font-label-caps text-label-caps text-silver-mist mb-2 uppercase" htmlFor="apartment">Apartment, suite, etc. (optional)</label>
<input className="w-full rounded-DEFAULT border-surface-deep bg-pitch-black text-on-surface focus:border-secondary-container focus:ring-0 transition-colors py-3" id="apartment" placeholder="Apartment, suite, etc." type="text"/>
</div>
<div>
<label className="block font-label-caps text-label-caps text-silver-mist mb-2 uppercase" htmlFor="city">City</label>
<input className="w-full rounded-DEFAULT border-surface-deep bg-pitch-black text-on-surface focus:border-secondary-container focus:ring-0 transition-colors py-3" id="city" placeholder="City" type="text"/>
</div>
<div className="grid grid-cols-2 gap-4">
<div>
<label className="block font-label-caps text-label-caps text-silver-mist mb-2 uppercase" htmlFor="state">State/Province</label>
<input className="w-full rounded-DEFAULT border-surface-deep bg-pitch-black text-on-surface focus:border-secondary-container focus:ring-0 transition-colors py-3" id="state" placeholder="State" type="text"/>
</div>
<div>
<label className="block font-label-caps text-label-caps text-silver-mist mb-2 uppercase" htmlFor="zip">ZIP / Postal Code</label>
<input className="w-full rounded-DEFAULT border-surface-deep bg-pitch-black text-on-surface focus:border-secondary-container focus:ring-0 transition-colors py-3" id="zip" placeholder="ZIP" type="text"/>
</div>
</div>
<div className="col-span-1 md:col-span-2">
<label className="block font-label-caps text-label-caps text-silver-mist mb-2 uppercase" htmlFor="phone">Phone</label>
<input className="w-full rounded-DEFAULT border-surface-deep bg-pitch-black text-on-surface focus:border-secondary-container focus:ring-0 transition-colors py-3" id="phone" placeholder="Phone for delivery updates" type="tel"/>
</div>
</form>
</section>

<section className="bg-surface rounded-xl p-6 md:p-8 border border-surface-variant/30">
<h2 className="font-headline-md text-headline-md mb-6 text-pure-white flex items-center gap-3">
<span className="material-symbols-outlined text-primary-container" style={{fontVariationSettings: "'FILL' 1"}}>package_2</span>
                    Delivery Method
                </h2>
<div className="flex flex-col gap-4">
<label className="flex items-center justify-between p-4 border border-surface-deep rounded-DEFAULT cursor-pointer hover:border-silver-mist transition-colors bg-pitch-black relative overflow-hidden group">
<div className="flex items-center gap-4 z-10">
<input defaultChecked className="text-primary-container bg-pitch-black border-surface-deep focus:ring-primary-container focus:ring-offset-pitch-black" name="delivery" type="radio"/>
<div>
<span className="block font-body-lg text-body-lg text-pure-white mb-1">Standard Shipping</span>
<span className="block font-body-md text-body-md text-silver-mist">3-5 Business Days</span>
</div>
</div>
<span className="font-label-caps text-label-caps text-pure-white z-10">FREE</span>
<div className="absolute inset-0 bg-surface-deep opacity-0 group-hover:opacity-20 transition-opacity"></div>
</label>
<label className="flex items-center justify-between p-4 border border-surface-deep rounded-DEFAULT cursor-pointer hover:border-silver-mist transition-colors bg-pitch-black relative overflow-hidden group">
<div className="flex items-center gap-4 z-10">
<input className="text-primary-container bg-pitch-black border-surface-deep focus:ring-primary-container focus:ring-offset-pitch-black" name="delivery" type="radio"/>
<div>
<span className="block font-body-lg text-body-lg text-pure-white mb-1">Express Delivery</span>
<span className="block font-body-md text-body-md text-silver-mist">1-2 Business Days</span>
</div>
</div>
<span className="font-label-caps text-label-caps text-pure-white z-10">$25.00</span>
<div className="absolute inset-0 bg-surface-deep opacity-0 group-hover:opacity-20 transition-opacity"></div>
</label>
</div>
</section>

<section className="bg-surface rounded-xl p-6 md:p-8 border border-surface-variant/30">
<h2 className="font-headline-md text-headline-md mb-6 text-pure-white flex items-center gap-3">
<span className="material-symbols-outlined text-primary-container" style={{fontVariationSettings: "'FILL' 1"}}>credit_card</span>
                    Payment
                </h2>
<div className="mb-6">
<span className="block font-label-caps text-label-caps text-silver-mist mb-3 uppercase">All transactions are secure and encrypted.</span>
<div className="flex gap-2 mb-6">
<div className="h-8 w-12 bg-pure-white rounded flex items-center justify-center text-pitch-black font-bold text-[10px]">VISA</div>
<div className="h-8 w-12 bg-pure-white rounded flex items-center justify-center text-pitch-black font-bold text-[10px]">MC</div>
<div className="h-8 w-12 bg-pure-white rounded flex items-center justify-center text-pitch-black font-bold text-[10px]">AMEX</div>
</div>
</div>
<form className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="col-span-1 md:col-span-2">
<label className="block font-label-caps text-label-caps text-silver-mist mb-2 uppercase" htmlFor="card-number">Card Number</label>
<div className="relative">
<input className="w-full rounded-DEFAULT border-surface-deep bg-pitch-black text-on-surface focus:border-secondary-container focus:ring-0 transition-colors py-3 pl-10" id="card-number" placeholder="0000 0000 0000 0000" type="text"/>
<span className="material-symbols-outlined absolute left-3 top-3.5 text-silver-mist text-[20px]">credit_card</span>
</div>
</div>
<div className="col-span-1 md:col-span-2">
<label className="block font-label-caps text-label-caps text-silver-mist mb-2 uppercase" htmlFor="name-on-card">Name on Card</label>
<input className="w-full rounded-DEFAULT border-surface-deep bg-pitch-black text-on-surface focus:border-secondary-container focus:ring-0 transition-colors py-3" id="name-on-card" placeholder="Name on Card" type="text"/>
</div>
<div>
<label className="block font-label-caps text-label-caps text-silver-mist mb-2 uppercase" htmlFor="expiry">Expiration Date (MM/YY)</label>
<input className="w-full rounded-DEFAULT border-surface-deep bg-pitch-black text-on-surface focus:border-secondary-container focus:ring-0 transition-colors py-3" id="expiry" placeholder="MM / YY" type="text"/>
</div>
<div>
<label className="block font-label-caps text-label-caps text-silver-mist mb-2 uppercase" htmlFor="cvv">Security Code</label>
<input className="w-full rounded-DEFAULT border-surface-deep bg-pitch-black text-on-surface focus:border-secondary-container focus:ring-0 transition-colors py-3" id="cvv" placeholder="CVV" type="text"/>
</div>
</form>
</section>
</div>

<div className="lg:col-span-5 xl:col-span-4">
<div className="bg-surface-deep rounded-xl p-6 md:p-8 sticky top-32 border border-surface-variant/20">
<h3 className="font-headline-md text-headline-md text-pure-white mb-6 border-b border-surface-variant/30 pb-4">Order Summary</h3>

<div className="flex flex-col gap-6 mb-8">

<div className="flex gap-4 items-center">
<div className="w-20 h-24 bg-surface rounded-lg overflow-hidden shrink-0 border border-surface-variant/50 relative">
<img className="w-full h-full object-cover" src="/assets/stitch/stitch-29.jpg"/>
<span className="absolute -top-2 -right-2 bg-silver-mist text-pitch-black font-label-caps text-[10px] w-5 h-5 rounded-full flex items-center justify-center border border-pitch-black z-10">1</span>
</div>
<div className="flex-grow">
<h4 className="font-body-lg text-body-lg text-pure-white mb-1">Obsidian Trench</h4>
<p className="font-body-md text-body-md text-silver-mist mb-1">Size: M</p>
<p className="font-body-md text-body-md text-silver-mist">$1,250.00</p>
</div>
</div>

<div className="flex gap-4 items-center">
<div className="w-20 h-24 bg-surface rounded-lg overflow-hidden shrink-0 border border-surface-variant/50 relative">
<img className="w-full h-full object-cover" src="/assets/stitch/stitch-22.jpg"/>
<span className="absolute -top-2 -right-2 bg-silver-mist text-pitch-black font-label-caps text-[10px] w-5 h-5 rounded-full flex items-center justify-center border border-pitch-black z-10">1</span>
</div>
<div className="flex-grow">
<h4 className="font-body-lg text-body-lg text-pure-white mb-1">Void Aviators</h4>
<p className="font-body-md text-body-md text-silver-mist mb-1">Color: Matte</p>
<p className="font-body-md text-body-md text-silver-mist">$450.00</p>
</div>
</div>
</div>

<div className="flex gap-2 mb-8 pb-8 border-b border-surface-variant/30">
<input className="flex-grow rounded-DEFAULT border-surface-variant bg-pitch-black text-on-surface focus:border-secondary-container focus:ring-0 py-2 px-4 font-body-md" placeholder="Discount code" type="text"/>
<button className="bg-surface-variant text-pure-white font-label-caps text-label-caps uppercase px-6 py-2 rounded-DEFAULT hover:bg-silver-mist hover:text-pitch-black transition-colors duration-300 inset-shadow-sm border border-transparent hover:border-pure-white">Apply</button>
</div>

<div className="flex flex-col gap-3 mb-8">
<div className="flex justify-between font-body-md text-body-md text-silver-mist">
<span>Subtotal</span>
<span className="text-pure-white">$1,700.00</span>
</div>
<div className="flex justify-between font-body-md text-body-md text-silver-mist">
<span>Shipping</span>
<span className="text-pure-white">Calculated next step</span>
</div>
<div className="flex justify-between font-body-md text-body-md text-silver-mist">
<span>Taxes</span>
<span className="text-pure-white">$153.00</span>
</div>
<div className="flex justify-between font-headline-md text-headline-md text-pure-white mt-4 pt-4 border-t border-surface-variant/50 items-end">
<span className="font-body-lg text-body-lg text-silver-mist mb-1">Total</span>
<div className="text-right">
<span className="text-[14px] text-silver-mist font-normal mr-2">USD</span>
<span>$1,853.00</span>
</div>
</div>
</div>

<button className="w-full bg-primary-container text-pure-white font-label-caps text-label-caps uppercase py-4 rounded-lg hover:bg-inverse-primary transition-colors duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] flex justify-center items-center gap-2">
<span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>lock</span>
                    Pay Now
                </button>
<p className="text-center font-body-md text-[12px] text-silver-mist mt-4">
                    By confirming this order, you agree to our Terms of Service and Privacy Policy.
                </p>
</div>
</div>
</main>

<footer className="w-full bg-pitch-black border-t border-surface-variant/30 mt-auto">
<div className="flex flex-col md:flex-row justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-8 max-w-container-max mx-auto text-silver-mist font-label-caps text-label-caps">
<span className="mb-4 md:mb-0">© 2024 AETHER LUXURY RETAIL. ALL RIGHTS RESERVED.</span>
<div className="flex gap-6">
<a className="hover:text-pure-white transition-colors" href="#">Privacy</a>
<a className="hover:text-pure-white transition-colors" href="#">Terms</a>
</div>
</div>
</footer>
    </>
  );
}
