"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { post } from "@/lib/api/client";
import Link from "next/link";

export default function AccountSettingsPage() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [marketingEnabled, setMarketingEnabled] = useState(true);
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/login");
      return;
    }
    const u = user as { first_name?: string; last_name?: string; email: string };
    setFirstName(u.first_name ?? "");
    setLastName(u.last_name ?? "");
    setEmail(u.email);
  }, [user, authLoading, router]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    // POST to profile update endpoint
    const res = await post("/api/auth/profile", { first_name: firstName, last_name: lastName });
    setSaving(false);
    if (res.ok) {
      setMessage({ type: "success", text: "Profile updated successfully." });
    } else {
      setMessage({ type: "error", text: "Failed to update profile. Please try again." });
    }
  }

  async function handleSignOut() {
    await logout();
    router.push("/login");
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-pitch-black flex items-center justify-center">
        <span className="material-symbols-outlined text-5xl text-silver-mist animate-spin">
          progress_activity
        </span>
      </div>
    );
  }

  return (
    <>
      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 bg-pitch-black bg-opacity-80 backdrop-blur-xl border-b border-surface-container-high">
        <nav className="flex justify-between items-center px-margin-desktop py-6 w-full max-w-container-max mx-auto">
          <Link href="/" className="font-display-lg text-display-lg text-pure-white tracking-tighter uppercase">
            AETHER
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link className="text-on-surface-variant hover:text-pure-white transition-colors duration-300 font-label-caps text-label-caps" href="/collections">Collections</Link>
            <Link className="text-on-surface-variant hover:text-pure-white transition-colors duration-300 font-label-caps text-label-caps" href="/">New Arrivals</Link>
            <Link className="text-on-surface-variant hover:text-pure-white transition-colors duration-300 font-label-caps text-label-caps" href="/curations">Curations</Link>
            <Link className="text-on-surface-variant hover:text-pure-white transition-colors duration-300 font-label-caps text-label-caps" href="/collections">Boutique</Link>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/search" className="text-pure-white hover:text-primary-container transition-all duration-200 active:scale-95">
              <span className="material-symbols-outlined">search</span>
            </Link>
            <Link href="/bag" className="text-pure-white hover:text-primary-container transition-all duration-200 active:scale-95">
              <span className="material-symbols-outlined">shopping_bag</span>
            </Link>
            <span className="text-primary-container border-b-2 border-primary-container pb-1 font-bold font-label-caps text-label-caps cursor-default">
              Profile
            </span>
          </div>
        </nav>
      </header>

      <main className="pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">

          {/* Sidebar Navigation */}
          <aside className="md:col-span-3">
            <nav className="sticky top-32 flex flex-col gap-8">
              <Link href="/account" className="flex items-center gap-2 group cursor-pointer">
                <span className="material-symbols-outlined text-silver-mist group-hover:text-pure-white transition-colors">arrow_back</span>
                <span className="font-label-caps text-label-caps text-silver-mist group-hover:text-pure-white transition-colors">Dashboard</span>
              </Link>
              <div className="flex flex-col gap-4">
                <p className="font-label-caps text-label-caps text-primary border-l-2 border-primary pl-4">Personal Info</p>
                <a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white pl-4 transition-colors" href="#security">Security</a>
                <a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white pl-4 transition-colors" href="#preferences">Preferences</a>
                <Link className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white pl-4 transition-colors" href="/orders">Order History</Link>
                <button
                  onClick={handleSignOut}
                  className="font-label-caps text-label-caps text-error hover:text-red-400 pl-4 transition-colors mt-8 text-left"
                >
                  Sign Out
                </button>
              </div>

              {/* Sidebar promo card */}
              <div className="mt-12 overflow-hidden rounded-lg relative aspect-[3/4] bg-surface-deep">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <span className="material-symbols-outlined text-primary-container text-5xl mb-4">workspace_premium</span>
                  <p className="font-label-caps text-[10px] text-pure-white opacity-60 mb-1 uppercase text-center">AETHER EXCLUSIVE</p>
                  <p className="font-headline-md text-[18px] leading-tight text-pure-white text-center">Member Rewards</p>
                </div>
              </div>
            </nav>
          </aside>

          {/* Main Form Content */}
          <section className="md:col-span-9 max-w-2xl mx-auto w-full">
            <header className="mb-section-gap">
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-pure-white mb-2">
                Account Settings
              </h1>
              <p className="text-silver-mist font-body-lg">
                Manage your personal profile and digital identity at AETHER.
              </p>
            </header>

            {message && (
              <div className={`mb-8 p-4 rounded font-body-md ${
                message.type === "success"
                  ? "bg-secondary-container/10 border border-secondary-container text-secondary-container"
                  : "bg-primary-container/10 border border-primary-container text-primary-container"
              }`}>
                {message.text}
              </div>
            )}

            <form className="space-y-section-gap" onSubmit={handleSave}>
              {/* Basic Information Section */}
              <div className="space-y-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-full bg-surface-container-highest flex items-center justify-center border border-surface-container-high relative group cursor-pointer">
                    <span className="material-symbols-outlined text-silver-mist text-3xl">person</span>
                    <div className="absolute inset-0 bg-pitch-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-full transition-opacity">
                      <span className="material-symbols-outlined text-pure-white text-xl">edit</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-headline-md text-[20px] text-pure-white">Profile Picture</p>
                    <p className="text-silver-mist font-label-caps text-label-caps">JPG OR PNG, MAX 2MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                  <div className="space-y-2">
                    <label className="font-label-caps text-label-caps text-silver-mist block" htmlFor="firstName">First Name</label>
                    <input
                      id="firstName"
                      className="w-full bg-surface-container-low border border-surface-deep px-4 py-4 text-pure-white font-body-md rounded-none focus:border-secondary-container focus:outline-none transition-all"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-caps text-label-caps text-silver-mist block" htmlFor="lastName">Last Name</label>
                    <input
                      id="lastName"
                      className="w-full bg-surface-container-low border border-surface-deep px-4 py-4 text-pure-white font-body-md rounded-none focus:border-secondary-container focus:outline-none transition-all"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-label-caps text-label-caps text-silver-mist block" htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    className="w-full bg-surface-container-low border border-surface-deep px-4 py-4 text-silver-mist font-body-md rounded-none opacity-60 cursor-not-allowed"
                    type="email"
                    value={email}
                    disabled
                    readOnly
                  />
                  <p className="font-label-caps text-[10px] text-silver-mist">Email address cannot be changed directly.</p>
                </div>
              </div>

              {/* Notification Preferences */}
              <div className="space-y-8" id="preferences">
                <h2 className="font-headline-md text-pure-white border-b border-surface-container-high pb-4">Preferences</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-6 bg-surface-container-low border border-surface-deep">
                    <div>
                      <p className="font-body-lg text-pure-white">Marketing Communications</p>
                      <p className="text-silver-mist text-label-caps">RECEIVE EXCLUSIVE DROPS AND PRIVATE SALES</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setMarketingEnabled(!marketingEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${marketingEnabled ? "bg-primary-container" : "bg-surface-container-high"}`}
                    >
                      <span className={`inline-block h-4 w-4 rounded-full transition-transform ${marketingEnabled ? "translate-x-6 bg-pure-white" : "translate-x-1 bg-silver-mist"}`}></span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-6 bg-surface-container-low border border-surface-deep" id="security">
                    <div>
                      <p className="font-body-lg text-pure-white">Two-Factor Authentication</p>
                      <p className="text-silver-mist text-label-caps">ENHANCED SECURITY FOR YOUR ACCOUNT</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setTwoFAEnabled(!twoFAEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${twoFAEnabled ? "bg-primary-container" : "bg-surface-container-high"}`}
                    >
                      <span className={`inline-block h-4 w-4 rounded-full transition-transform ${twoFAEnabled ? "translate-x-6 bg-pure-white" : "translate-x-1 bg-silver-mist"}`}></span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Personalization Engine Feature Card */}
              <div className="bg-surface-deep p-section-gap rounded-lg space-y-6">
                <p className="font-label-caps text-label-caps text-primary">CURATED EXPERIENCE</p>
                <h3 className="font-headline-md text-pure-white">Personalization Engine</h3>
                <p className="text-silver-mist font-body-md">
                  By enabling our personalization engine, AETHER uses advanced algorithmic modeling to suggest collections based on your sizing, previous acquisitions, and aesthetic browsing patterns.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <span className="bg-pure-white text-pitch-black font-label-caps text-[10px] px-3 py-1 rounded-full">ACTIVE</span>
                  <span className="border border-silver-mist text-silver-mist font-label-caps text-[10px] px-3 py-1 rounded-none">PREMIUM TIER</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row gap-4 pt-12">
                <button
                  className="flex-1 bg-primary-container text-pure-white font-label-caps text-label-caps py-6 rounded-lg hover:bg-opacity-90 transition-all active:scale-95 tracking-widest disabled:opacity-50"
                  type="submit"
                  disabled={saving}
                >
                  {saving ? "SAVING..." : "SAVE CHANGES"}
                </button>
                <Link
                  href="/account"
                  className="flex-1 bg-surface-container-low text-silver-mist font-label-caps text-label-caps py-6 rounded-none hover:text-pure-white transition-all active:scale-95 tracking-widest border border-silver-mist/20 text-center"
                >
                  CANCEL
                </Link>
              </div>
            </form>

            {/* Danger Zone */}
            <div className="mt-section-gap flex items-center justify-between p-8 border border-red-900/30 bg-red-900/5 rounded-lg">
              <div>
                <p className="font-headline-md text-[20px] text-red-400">Delete Account</p>
                <p className="text-silver-mist text-label-caps">PERMANENTLY REMOVE YOUR DATA FROM AETHER</p>
              </div>
              <button className="text-red-400 font-label-caps text-label-caps underline hover:text-red-300 transition-colors">
                DEACTIVATE
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-pitch-black border-t border-surface-container-high w-full relative">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop py-section-gap w-full max-w-container-max mx-auto">
          <div className="font-display-lg-mobile text-display-lg-mobile text-pure-white mb-8 md:mb-0">AETHER</div>
          <div className="flex flex-wrap justify-center gap-8 mb-8 md:mb-0">
            <Link className="text-silver-mist hover:text-pure-white transition-colors duration-200 font-label-caps text-label-caps" href="/brand-story">Sustainability</Link>
            <Link className="text-silver-mist hover:text-pure-white transition-colors duration-200 font-label-caps text-label-caps underline" href="#">Privacy Policy</Link>
            <Link className="text-silver-mist hover:text-pure-white transition-colors duration-200 font-label-caps text-label-caps" href="#">Terms of Service</Link>
            <Link className="text-silver-mist hover:text-pure-white transition-colors duration-200 font-label-caps text-label-caps" href="/contact">Shipping &amp; Returns</Link>
          </div>
          <p className="text-silver-mist font-label-caps text-[10px]">© 2024 AETHER. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </>
  );
}
