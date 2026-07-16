"use client";

import Link from "next/link";
import { useAuth } from "@/lib/hooks/useAuth";

export default function HeaderUserIcon() {
  const { user, loading } = useAuth();

  if (!loading && user) {
    const initial =
      (user as { first_name?: string }).first_name?.[0]?.toUpperCase() ??
      user.email[0].toUpperCase();

    return (
      <Link
        href="/account"
        aria-label="My account"
        className="w-8 h-8 rounded-full border border-primary-container p-0.5 block flex-shrink-0"
      >
        <div className="w-full h-full bg-surface-container-high rounded-full flex items-center justify-center">
          <span className="font-label-caps text-[11px] text-pure-white leading-none">
            {initial}
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href="/login"
      aria-label="Sign in"
      className="hover:text-primary transition-colors opacity-100 hover:opacity-80"
    >
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
        person
      </span>
    </Link>
  );
}
