"use client";

import Image from "next/image";
import { useCart } from "@/components/cart/CartProvider";
import { formatKrw } from "@/lib/format";
import type { Product } from "@/lib/products";
import styles from "./product-card.module.css";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={styles.image}
        />
        {product.badge && (
          <span
            className={`${styles.badge} ${
              product.badge.variant === "limited" ? styles.badgeGold : ""
            }`}
          >
            {product.badge.label}
          </span>
        )}
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{product.name}</h3>
        <div className={styles.meta}>
          <span className={styles.price}>{formatKrw(product.price)}</span>
          <button
            type="button"
            className={styles.addBtn}
            onClick={() =>
              addItem({
                id: product.id,
                name: product.name,
                price: product.price,
              })
            }
            aria-label={`${product.name} 장바구니 담기`}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </article>
  );
}
