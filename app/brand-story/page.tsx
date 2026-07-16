import type { Metadata } from "next";
import HeaderUserIcon from "@/components/HeaderUserIcon";
import HeaderCartIcon from "@/components/HeaderCartIcon";

export const metadata: Metadata = { title: "Brand Story — AETHER" };

export default function BrandStoryPage() {
  return (
    <>
<header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl">
<div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20 max-w-container-max mx-auto">
<nav className="hidden md:flex gap-6">
<a className="text-on-surface-variant hover:text-pure-white transition-colors" href="/collections">Collections</a>
<a className="text-on-surface-variant hover:text-pure-white transition-colors" href="/">New Arrivals</a>
<a className="text-on-surface-variant hover:text-pure-white transition-colors" href="/curations">Curations</a>
<a className="text-on-surface-variant hover:text-pure-white transition-colors" href="/collections">Boutique</a>
</nav>
<div className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg tracking-tighter text-pure-white">
                AETHER
            </div>
<div className="flex gap-4">
<HeaderCartIcon />
<HeaderUserIcon />
</div>
</div>
</header>
<main className="pt-24 pb-section-gap">

<section className="min-h-[819px] flex flex-col justify-center items-center text-center px-margin-mobile md:px-margin-desktop relative">
<div className="absolute inset-0 z-0 opacity-40">
<div className="bg-cover bg-center w-full h-full" data-alt="A stark, high-contrast black and white photograph of monumental brutalist architecture. Deep shadows and stark highlights emphasize geometric precision and scale. Cinematic lighting creates a moody, profound atmosphere, aligning perfectly with a premium, minimalist luxury brand identity." style={{backgroundImage: "url('/assets/stitch/stitch-04.jpg')"}}></div>
</div>
<div className="relative z-10 max-w-4xl mx-auto space-y-8">
<h1 className="font-display-xl text-display-xl uppercase">THE PHILOSOPHY OF ESSENCE</h1>
<p className="font-body-lg text-body-lg text-silver-mist max-w-2xl mx-auto">
                    Stripping away the superfluous to reveal the profound. We believe true luxury lies in the uncompromising pursuit of absolute purity.
                </p>
</div>
</section>

<section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
<div className="md:col-span-5 space-y-6">
<h2 className="font-display-lg text-display-lg">HERITAGE</h2>
<p className="font-body-md text-body-md text-silver-mist">
                        Forged in tradition, refined by modernity. Our legacy is not merely remembered; it is continuously actively distilled into every form we create.
                    </p>
</div>
<div className="md:col-span-7 h-[600px] w-full bg-surface-deep rounded-xl overflow-hidden relative group">
<div className="bg-cover bg-center w-full h-full transition-transform duration-700 group-hover:scale-105" data-alt="Close-up black and white editorial photography of an artisan's hands working on a piece of leather or metal. The lighting is dramatic and directional, highlighting the texture of the material and the meticulous detail of the craftsmanship. A cinematic expression of heritage and skill." style={{backgroundImage: "url('/assets/stitch/stitch-20.jpg')"}}></div>
<div className="absolute inset-0 border-[1px] border-surface-variant pointer-events-none rounded-xl"></div>
</div>
</div>
</section>

<section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
<div className="text-center mb-12">
<h2 className="font-display-lg text-display-lg">CRAFTSMANSHIP</h2>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter auto-rows-[300px]">
<div className="md:col-span-2 md:row-span-2 bg-surface-deep rounded-xl overflow-hidden relative group">
<div className="bg-cover bg-center w-full h-full transition-transform duration-700 group-hover:scale-105" data-alt="High-contrast black and white macro photography of precise stitching or mechanical assembly. The focus is incredibly sharp on the technical detail, with a shallow depth of field blurring the background into deep blacks. The image communicates precision, dedication, and uncompromising quality." style={{backgroundImage: "url('/assets/stitch/stitch-12.jpg')"}}></div>
<div className="absolute bottom-0 left-0 p-8 bg-gradient-to-t from-pitch-black/80 to-transparent w-full">
<span className="font-label-caps text-label-caps text-silver-mist block mb-2">01 — Precision</span>
<h3 className="font-headline-md text-headline-md">The Geometry of Form</h3>
</div>
</div>
<div className="bg-surface-deep rounded-xl overflow-hidden relative p-8 flex flex-col justify-between inset-border-light">
<span className="material-symbols-outlined text-4xl text-silver-mist" data-icon="architecture">architecture</span>
<div>
<span className="font-label-caps text-label-caps text-silver-mist block mb-2">02 — Material</span>
<p className="font-body-md text-body-md">Sourcing only the most resilient and evocative materials, raw and unapologetic.</p>
</div>
</div>
<div className="bg-surface-deep rounded-xl overflow-hidden relative p-8 flex flex-col justify-between inset-border-light">
<span className="material-symbols-outlined text-4xl text-silver-mist" data-icon="hourglass_empty">hourglass_empty</span>
<div>
<span className="font-label-caps text-label-caps text-silver-mist block mb-2">03 — Time</span>
<p className="font-body-md text-body-md">Patience as a medium. True refinement cannot be rushed.</p>
</div>
</div>
</div>
</section>

<section className="py-section-gap w-full relative">
<div className="h-[716px] w-full relative">
<div className="bg-cover bg-center w-full h-full" data-alt="A stark, minimalist black and white landscape photograph featuring a lone, sculptural element in nature, perhaps a solitary rock formation or a quiet expanse of water. The mood is tranquil, eternal, and profound, reflecting a deep respect for the environment and sustainable permanence." style={{backgroundImage: "url('/assets/stitch/stitch-41.jpg')"}}></div>
<div className="absolute inset-0 bg-pitch-black/50"></div>
<div className="absolute inset-0 flex flex-col justify-center items-center text-center px-margin-mobile md:px-margin-desktop">
<h2 className="font-display-lg text-display-lg mb-6">SUSTAINABILITY</h2>
<p className="font-body-lg text-body-lg max-w-3xl text-pure-white">
                         To create something meant to last forever is the ultimate act of environmental respect. We design for permanence, rejecting the ephemeral.
                     </p>
</div>
</div>
</section>
</main>

<footer className="w-full bg-pitch-black">
<div className="flex flex-col md:flex-row justify-between items-start md:items-center px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto border-t-[1px] border-surface-variant">
<div className="font-display-lg-mobile text-display-lg-mobile text-pure-white mb-8 md:mb-0">
                AETHER
            </div>
<nav className="flex flex-wrap gap-6 mb-8 md:mb-0">
<a className="font-body-md text-body-md text-silver-mist hover:text-secondary-container transition-colors opacity-100 hover:opacity-80" href="/brand-story">Sustainability</a>
<a className="font-body-md text-body-md text-silver-mist hover:text-secondary-container transition-colors opacity-100 hover:opacity-80" href="/contact">Shipping</a>
<a className="font-body-md text-body-md text-silver-mist hover:text-secondary-container transition-colors opacity-100 hover:opacity-80" href="/contact">Returns</a>
<a className="font-body-md text-body-md text-silver-mist hover:text-secondary-container transition-colors opacity-100 hover:opacity-80" href="/brand-story">Privacy</a>
<a className="font-body-md text-body-md text-silver-mist hover:text-secondary-container transition-colors opacity-100 hover:opacity-80" href="/contact">Contact</a>
</nav>
<div className="font-body-md text-body-md text-silver-mist">
                © 2024 AETHER LUXURY. ALL RIGHTS RESERVED.
            </div>
</div>
</footer>
    </>
  );
}
