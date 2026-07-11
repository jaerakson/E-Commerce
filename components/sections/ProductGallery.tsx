import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/lib/products";
import styles from "./gallery.module.css";

export function ProductGallery() {
  return (
    <section id="new-in" className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>THE NEW COLLECTION</h2>
        <p className={styles.subtitle}>한정된 수량, 엄선된 프리미엄 라인업</p>
      </div>

      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
