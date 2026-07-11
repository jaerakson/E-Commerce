"use client";

import { useEffect } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { formatKrw } from "@/lib/format";
import styles from "./cart-drawer.module.css";

export function CartDrawer() {
  const { items, totalPrice, isOpen, closeCart, removeItem, clear } = useCart();

  // Close on Escape while open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  const handleCheckout = () => {
    if (items.length === 0) {
      alert("장바구니가 비어 있습니다.");
      return;
    }
    alert("프리미엄 결제 화면으로 이동합니다. (시뮬레이션)");
    clear();
    closeCart();
  };

  return (
    <div className={`${styles.drawer} ${isOpen ? styles.active : ""}`}>
      <div
        className={styles.overlay}
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside
        className={styles.content}
        role="dialog"
        aria-modal="true"
        aria-label="장바구니"
        aria-hidden={!isOpen}
      >
        <div className={styles.header}>
          <h2>YOUR SELECTIONS</h2>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={closeCart}
            aria-label="장바구니 닫기"
          >
            &times;
          </button>
        </div>

        <div className={styles.body}>
          {items.length === 0 ? (
            <p className={styles.empty}>장바구니가 비어 있습니다.</p>
          ) : (
            <ul className={styles.list}>
              {items.map((item) => (
                <li key={item.id} className={styles.item}>
                  <div>
                    <h4 className={styles.itemName}>{item.name}</h4>
                    <span className={styles.itemMeta}>
                      {formatKrw(item.price)} &times; {item.quantity}
                    </span>
                  </div>
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => removeItem(item.id)}
                    aria-label={`${item.name} 삭제`}
                  >
                    REMOVE
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.total}>
            <span>TOTAL</span>
            <span>{formatKrw(totalPrice)}</span>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            style={{ width: "100%", textAlign: "center" }}
            onClick={handleCheckout}
          >
            CHECKOUT NOW
          </button>
        </div>
      </aside>
    </div>
  );
}
