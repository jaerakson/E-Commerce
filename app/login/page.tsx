"use client";

import { useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login, register } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    let err: string | null;
    if (tab === "login") {
      err = await login(email, password);
    } else {
      if (!firstName || !lastName) {
        setError("First and last name are required");
        setLoading(false);
        return;
      }
      err = await register({ email, password, first_name: firstName, last_name: lastName });
    }

    setLoading(false);
    if (err) {
      setError(err);
    } else {
      router.push("/");
    }
  }

  return (
    <>
<main className="flex-grow flex flex-col md:flex-row">

<div className="hidden md:block md:w-1/2 relative bg-surface">
<div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('/assets/stitch/stitch-43.jpg')"}}></div>
<div className="absolute inset-0 bg-gradient-to-r from-pitch-black/80 to-transparent"></div>
<div className="absolute top-margin-desktop left-margin-desktop z-10">
<a href="/"><h1 className="font-display-lg text-display-lg tracking-tighter text-pure-white">AETHER</h1></a>
</div>
</div>

<div className="w-full md:w-1/2 flex items-center justify-center p-margin-mobile md:p-margin-desktop bg-pitch-black relative">
<div className="absolute top-margin-mobile left-margin-mobile z-10 md:hidden">
<a href="/"><h1 className="font-display-lg-mobile text-display-lg-mobile tracking-tighter text-pure-white">AETHER</h1></a>
</div>
<div className="w-full max-w-[440px] mt-16 md:mt-0">

<div className="flex items-center mb-8 border-b border-surface-variant pb-2">
<button
  className={`font-headline-md text-headline-md mr-6 pb-1 transition-colors ${tab === "login" ? "text-pure-white border-b-2 border-primary" : "text-surface-variant hover:text-silver-mist"}`}
  onClick={() => { setTab("login"); setError(null); }}
>Login</button>
<button
  className={`font-headline-md text-headline-md pb-1 transition-colors ${tab === "signup" ? "text-pure-white border-b-2 border-primary" : "text-surface-variant hover:text-silver-mist"}`}
  onClick={() => { setTab("signup"); setError(null); }}
>Sign Up</button>
</div>
<p className="font-body-md text-body-md text-silver-mist mb-8">
  {tab === "login"
    ? "Access your personalized cinematic gallery and manage your collection."
    : "Create your AETHER account to start curating."}
</p>

{error && (
  <div className="mb-6 p-4 bg-primary-container/20 border border-primary-container rounded text-primary-container font-body-md text-body-md">
    {error}
  </div>
)}

<form className="space-y-6" onSubmit={handleSubmit}>

{tab === "signup" && (
  <div className="grid grid-cols-2 gap-4">
    <div>
      <label className="block font-label-caps text-label-caps text-silver-mist mb-2 uppercase" htmlFor="firstName">First Name</label>
      <input className="w-full bg-pitch-black text-silver-mist border border-surface-deep rounded p-4 font-body-md focus:border-secondary-container focus:ring-0 transition-colors" id="firstName" placeholder="First name" value={firstName} onChange={e => setFirstName(e.target.value)} required />
    </div>
    <div>
      <label className="block font-label-caps text-label-caps text-silver-mist mb-2 uppercase" htmlFor="lastName">Last Name</label>
      <input className="w-full bg-pitch-black text-silver-mist border border-surface-deep rounded p-4 font-body-md focus:border-secondary-container focus:ring-0 transition-colors" id="lastName" placeholder="Last name" value={lastName} onChange={e => setLastName(e.target.value)} required />
    </div>
  </div>
)}

<div>
<label className="block font-label-caps text-label-caps text-silver-mist mb-2 uppercase" htmlFor="email">Email Address</label>
<input className="w-full bg-pitch-black text-silver-mist border border-surface-deep rounded p-4 font-body-md focus:border-secondary-container focus:ring-0 transition-colors" id="email" placeholder="Enter your email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
</div>

<div>
<label className="block font-label-caps text-label-caps text-silver-mist mb-2 uppercase" htmlFor="password">Password</label>
<div className="relative">
<input className="w-full bg-pitch-black text-silver-mist border border-surface-deep rounded p-4 font-body-md focus:border-secondary-container focus:ring-0 transition-colors pr-12" id="password" placeholder="Enter your password" type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
<button className="absolute right-4 top-1/2 -translate-y-1/2 text-silver-mist hover:text-pure-white transition-colors" type="button" onClick={() => setShowPw(!showPw)}>
<span className="material-symbols-outlined text-xl">{showPw ? "visibility_off" : "visibility"}</span>
</button>
</div>
</div>

<button className="w-full bg-primary-container text-pure-white font-label-caps text-label-caps py-4 rounded-lg uppercase tracking-widest hover:bg-inverse-primary transition-colors duration-300 disabled:opacity-50" type="submit" disabled={loading}>
  {loading ? "Please wait..." : tab === "login" ? "Sign In" : "Create Account"}
</button>
</form>

<div className="my-8 flex items-center">
<div className="flex-grow border-t border-surface-deep"></div>
<span className="mx-4 font-label-caps text-label-caps text-surface-variant uppercase">Or continue with</span>
<div className="flex-grow border-t border-surface-deep"></div>
</div>

<div className="space-y-4">
<button className="w-full bg-surface text-pure-white border border-surface-deep p-4 flex items-center justify-center font-label-caps text-label-caps uppercase hover:border-silver-mist transition-colors shadow-[inset_0_0_0_1px_rgba(158,160,169,0.1)]" type="button">
<svg className="w-5 h-5 mr-3 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.62-1.48 3.608-2.935 1.15-1.68 1.623-3.308 1.652-3.392-.038-.016-3.176-1.222-3.21-4.877-.028-3.056 2.493-4.542 2.613-4.618-1.424-2.083-3.633-2.368-4.417-2.408-2.154-.183-4.225 1.168-4.53 1.168zm1.539-5.111c.842-1.026 1.411-2.448 1.255-3.87-1.22.05-2.704.814-3.568 1.826-.777.91-1.405 2.355-1.233 3.755 1.365.105 2.704-.682 3.546-1.711z"></path>
</svg>
Apple
</button>
<button className="w-full bg-surface text-pure-white border border-surface-deep p-4 flex items-center justify-center font-label-caps text-label-caps uppercase hover:border-silver-mist transition-colors shadow-[inset_0_0_0_1px_rgba(158,160,169,0.1)]" type="button" onClick={() => { window.location.href = "/api/auth/google"; }}>
<svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
</svg>
Google
</button>
</div>
</div>
</div>
</main>

<footer className="bg-pitch-black border-t border-surface-variant full-width flex flex-col md:flex-row justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto">
<div className="mb-8 md:mb-0">
<span className="font-display-lg text-display-lg-mobile text-on-surface tracking-tighter">AETHER</span>
</div>
<nav className="flex flex-wrap justify-center gap-6 mb-8 md:mb-0">
<a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors uppercase" href="/collections">Collections</a>
<a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors uppercase" href="/brand-story">Sustainability</a>
<a className="font-label-caps text-label-caps text-silver-mist hover:text-pure-white transition-colors uppercase" href="/contact">Contact</a>
</nav>
<div>
<p className="font-body-md text-body-md text-primary-container">© 2024 AETHER LUXURY RETAIL. ALL RIGHTS RESERVED.</p>
</div>
</footer>
    </>
  );
}
