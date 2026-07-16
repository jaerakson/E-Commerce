"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import Link from "next/link";
import HeaderCartIcon from "@/components/HeaderCartIcon";

export default function MyAccountPage() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authLoading) return;
    if (!user) router.push("/login");
  }, [user, authLoading, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-pitch-black flex items-center justify-center">
        <span className="material-symbols-outlined text-5xl text-silver-mist animate-spin">
          progress_activity
        </span>
      </div>
    );
  }

  const displayName = user
    ? `${(user as { first_name?: string }).first_name ?? ""} ${(user as { last_name?: string }).last_name ?? ""}`.trim() || user.email
    : "Guest";

  return (
    <>
      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 bg-pitch-black bg-opacity-80 backdrop-blur-xl border-b border-surface-container-high">
        <nav className="flex justify-between items-center px-margin-desktop py-6 w-full max-w-container-max mx-auto">
          <Link href="/" className="font-display-lg text-display-lg text-pure-white tracking-tighter uppercase">
            AETHER
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link className="text-on-surface-variant hover:text-pure-white transition-colors duration-300 font-label-caps text-label-caps uppercase" href="/collections">Collections</Link>
            <Link className="text-on-surface-variant hover:text-pure-white transition-colors duration-300 font-label-caps text-label-caps uppercase" href="/">New Arrivals</Link>
            <Link className="text-on-surface-variant hover:text-pure-white transition-colors duration-300 font-label-caps text-label-caps uppercase" href="/curations">Curations</Link>
            <Link className="text-primary-container font-bold border-b-2 border-primary-container pb-1 font-label-caps text-label-caps uppercase" href="/account">Boutique</Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/search" className="text-pure-white hover:text-primary-container transition-all duration-200 active:scale-95">
              <span className="material-symbols-outlined">search</span>
            </Link>
            <HeaderCartIcon />
            <Link href="/account" className="w-8 h-8 rounded-full border border-primary-container p-0.5 block">
              <div className="w-full h-full bg-surface-container-high rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-sm text-silver-mist">person</span>
              </div>
            </Link>
          </div>
        </nav>
      </header>

      <main className="pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Profile Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-block bg-pure-white text-pitch-black px-3 py-1 rounded-full font-label-caps text-label-caps mb-4">
              PLATINUM MEMBER
            </span>
            <h1 className="font-display-lg text-display-lg text-pure-white uppercase tracking-tight">
              {displayName}
            </h1>
          </div>
          <Link
            href="/account/settings"
            className="bg-primary-container text-pure-white px-8 py-3 rounded-lg font-label-caps text-label-caps uppercase hover:brightness-110 active:scale-95 transition-all duration-200 w-full md:w-auto text-center"
          >
            Edit Profile
          </Link>
        </header>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-section-gap">
          {/* Summary Card 1: Orders */}
          <Link href="/orders" className="bg-surface-container p-8 rounded-xl border border-surface-container-high hover:border-silver-mist transition-colors duration-300 group cursor-pointer block">
            <div className="flex justify-between items-start mb-12">
              <span className="material-symbols-outlined text-primary-container text-3xl">package_2</span>
              <span className="material-symbols-outlined text-silver-mist group-hover:text-pure-white transition-colors">arrow_forward_ios</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-pure-white mb-2 uppercase italic">Order History</h3>
            <p className="text-silver-mist font-body-md">View your past purchases</p>
          </Link>

          {/* Summary Card 2: Curations */}
          <Link href="/curations" className="bg-surface-container p-8 rounded-xl border border-surface-container-high hover:border-silver-mist transition-colors duration-300 group cursor-pointer block">
            <div className="flex justify-between items-start mb-12">
              <span className="material-symbols-outlined text-primary-container text-3xl">bookmarks</span>
              <span className="material-symbols-outlined text-silver-mist group-hover:text-pure-white transition-colors">arrow_forward_ios</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-pure-white mb-2 uppercase italic">My Curations</h3>
            <p className="text-silver-mist font-body-md">Your personal style vaults</p>
          </Link>

          {/* Summary Card 3: Wishlist */}
          <Link href="/wishlist" className="bg-surface-container p-8 rounded-xl border border-surface-container-high hover:border-silver-mist transition-colors duration-300 group cursor-pointer block">
            <div className="flex justify-between items-start mb-12">
              <span className="material-symbols-outlined text-primary-container text-3xl">favorite</span>
              <span className="material-symbols-outlined text-silver-mist group-hover:text-pure-white transition-colors">arrow_forward_ios</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-pure-white mb-2 uppercase italic">Wishlist</h3>
            <p className="text-silver-mist font-body-md">Saved for later</p>
          </Link>
        </div>

        {/* Section 2: Recent Activity / Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-gutter mb-section-gap">
          <div className="lg:col-span-2 bg-surface-deep p-10 rounded-xl border border-surface-container-high flex flex-col justify-between">
            <div>
              <h2 className="font-label-caps text-label-caps text-silver-mist mb-6 uppercase tracking-widest">Active Shipment</h2>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-pitch-black rounded-lg overflow-hidden border border-surface-container-high flex items-center justify-center">
                  <span className="material-symbols-outlined text-silver-mist">inventory_2</span>
                </div>
                <div>
                  <p className="text-pure-white font-body-lg">Latest Order</p>
                  <p className="text-silver-mist font-label-caps text-[10px]">TRACKING IN PROGRESS</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between text-label-caps">
                <span className="text-silver-mist">STATUS: IN TRANSIT</span>
                <span className="text-primary-container">ETA: UPCOMING</span>
              </div>
              <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-primary-container w-3/4"></div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-surface-container p-10 rounded-xl border border-surface-container-high">
            <h2 className="font-label-caps text-label-caps text-silver-mist mb-8 uppercase tracking-widest">Style Concierge</h2>
            <div className="space-y-6">
              <p className="font-body-lg text-pure-white italic">
                &ldquo;Your winter curation is ready. We&rsquo;ve selected pieces that complement your previous purchases.&rdquo;
              </p>
              <Link href="/curations" className="text-pure-white font-label-caps text-label-caps border-b border-pure-white pb-1 hover:text-primary-container hover:border-primary-container transition-all inline-block">
                VIEW SELECTION
              </Link>
            </div>
          </div>
        </div>

        {/* Section 3: Quick Actions */}
        <section className="mb-section-gap">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="font-label-caps text-label-caps text-primary-container mb-2 uppercase tracking-widest">Account</h2>
              <h3 className="font-display-lg text-display-lg text-pure-white uppercase tracking-tight">Quick Actions</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            <Link href="/account/settings" className="group bg-surface-container p-6 rounded-xl border border-surface-container-high hover:border-silver-mist transition-all duration-300">
              <span className="material-symbols-outlined text-primary-container text-2xl mb-4 block">settings</span>
              <h4 className="text-pure-white font-body-lg mb-1">Account Settings</h4>
              <p className="text-silver-mist font-label-caps text-[11px] uppercase">Update your profile</p>
            </Link>
            <Link href="/favorites" className="group bg-surface-container p-6 rounded-xl border border-surface-container-high hover:border-silver-mist transition-all duration-300">
              <span className="material-symbols-outlined text-primary-container text-2xl mb-4 block">star</span>
              <h4 className="text-pure-white font-body-lg mb-1">Favorites</h4>
              <p className="text-silver-mist font-label-caps text-[11px] uppercase">Your starred items</p>
            </Link>
            <Link href="/reviews" className="group bg-surface-container p-6 rounded-xl border border-surface-container-high hover:border-silver-mist transition-all duration-300">
              <span className="material-symbols-outlined text-primary-container text-2xl mb-4 block">rate_review</span>
              <h4 className="text-pure-white font-body-lg mb-1">My Reviews</h4>
              <p className="text-silver-mist font-label-caps text-[11px] uppercase">Share your experience</p>
            </Link>
            <button
              onClick={() => { logout?.(); router.push("/login"); }}
              className="group bg-surface-container p-6 rounded-xl border border-surface-container-high hover:border-error transition-all duration-300 text-left w-full"
            >
              <span className="material-symbols-outlined text-silver-mist text-2xl mb-4 block group-hover:text-error transition-colors">logout</span>
              <h4 className="text-pure-white font-body-lg mb-1">Sign Out</h4>
              <p className="text-silver-mist font-label-caps text-[11px] uppercase">End your session</p>
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-pitch-black border-t border-surface-container-high">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop py-section-gap w-full max-w-container-max mx-auto">
          <div className="font-display-lg-mobile text-display-lg-mobile text-pure-white mb-8 md:mb-0 uppercase tracking-tighter">AETHER</div>
          <div className="flex flex-wrap justify-center gap-8 mb-8 md:mb-0">
            <Link className="text-silver-mist hover:text-pure-white transition-colors duration-200 font-label-caps text-label-caps uppercase" href="/brand-story">Sustainability</Link>
            <Link className="text-silver-mist hover:text-pure-white transition-colors duration-200 font-label-caps text-label-caps uppercase" href="/brand-story">Privacy Policy</Link>
            <Link className="text-silver-mist hover:text-pure-white transition-colors duration-200 font-label-caps text-label-caps uppercase" href="/contact">Terms of Service</Link>
            <Link className="text-silver-mist hover:text-pure-white transition-colors duration-200 font-label-caps text-label-caps uppercase" href="/contact">Shipping &amp; Returns</Link>
          </div>
          <div className="text-silver-mist font-label-caps text-[10px] tracking-widest uppercase">
            © 2024 AETHER. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </>
  );
}
