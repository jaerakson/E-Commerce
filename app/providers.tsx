"use client";

import { useEffect, useRef } from "react";
import { AuthProvider, useAuthValue } from "@/lib/hooks/useAuth";
import { CartProvider, useCartValue } from "@/lib/hooks/useCart";

export default function Providers({ children }: { children: React.ReactNode }) {
  const auth = useAuthValue();
  const cart = useCartValue();

  // 로그인/로그아웃 시 장바구니 재조회 (초기 마운트는 useCartValue 내부 effect가 처리)
  const prevUserId = useRef<string | undefined>(undefined);
  useEffect(() => {
    const currentId = auth.user?.id;
    if (!auth.loading && currentId !== prevUserId.current) {
      prevUserId.current = currentId;
      cart.refresh();
    }
  }, [auth.user?.id, auth.loading, cart.refresh]);

  return (
    <AuthProvider value={auth}>
      <CartProvider value={cart}>
        {children}
      </CartProvider>
    </AuthProvider>
  );
}
