"use client";

import Link from "next/link";
import { useCart } from "@/lib/hooks/useCart";

export default function HeaderCartIcon() {
  const { itemCount } = useCart();

  return (
    <Link
      href="/bag"
      aria-label="Shopping bag"
      className="relative hover:text-primary-container transition-all duration-200 active:scale-95"
    >
      <span className="material-symbols-outlined">shopping_bag</span>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-primary-container text-pure-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold leading-none px-1">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Link>
  );
}
