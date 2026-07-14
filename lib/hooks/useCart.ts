"use client";

import { useState, useEffect, useCallback, createContext, useContext } from "react";
import { get, post, patch, del } from "@/lib/api/client";
import type { CartItemWithProduct } from "@/lib/repositories/interfaces";

interface CartData {
  items: CartItemWithProduct[];
  subtotal: number;
  itemCount: number;
}

interface CartContextValue {
  items: CartItemWithProduct[];
  subtotal: number;
  itemCount: number;
  loading: boolean;
  addItem: (productId: string, opts?: { size?: string; color?: string; quantity?: number }) => Promise<string | null>;
  updateQty: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refresh: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = CartContext.Provider;

export function useCartValue(): CartContextValue {
  const [items, setItems] = useState<CartItemWithProduct[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const res = await get<CartData>("/api/cart");
    if (res.ok) {
      setItems(res.data.items);
      setSubtotal(res.data.subtotal);
      setItemCount(res.data.itemCount);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addItem = useCallback(async (productId: string, opts?: { size?: string; color?: string; quantity?: number }) => {
    const res = await post("/api/cart", { product_id: productId, ...opts });
    if (!res.ok) return res.error;
    await refresh();
    return null;
  }, [refresh]);

  const updateQty = useCallback(async (itemId: string, quantity: number) => {
    await patch(`/api/cart/${itemId}`, { quantity });
    await refresh();
  }, [refresh]);

  const removeItem = useCallback(async (itemId: string) => {
    await del(`/api/cart/${itemId}`);
    await refresh();
  }, [refresh]);

  const clearCart = useCallback(async () => {
    await del("/api/cart");
    setItems([]);
    setSubtotal(0);
    setItemCount(0);
  }, []);

  return { items, subtotal, itemCount, loading, addItem, updateQty, removeItem, clearCart, refresh };
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
