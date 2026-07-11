"use client";

import { useCart } from "@/components/cart/CartProvider";
import styles from "./header.module.css";

const NAV_LINKS = [
  { href: "#new-in", label: "NEW IN" },
  { href: "#collections", label: "COLLECTIONS" },
  { href: "#editorial", label: "EDITORIAL" },
];

export function Header() {
  const { totalItems, openCart } = useCart();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="#" className={styles.logo}>
          MIDNIGHT
        </a>
        <nav className={styles.nav} aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className={styles.actions}>
          <button type="button" onClick={openCart} aria-label="장바구니 열기">
            CART <span className={styles.count}>{totalItems}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
