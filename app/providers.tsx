"use client";

import { AuthProvider, useAuthValue } from "@/lib/hooks/useAuth";
import { CartProvider, useCartValue } from "@/lib/hooks/useCart";

export default function Providers({ children }: { children: React.ReactNode }) {
  const auth = useAuthValue();
  const cart = useCartValue();

  return (
    <AuthProvider value={auth}>
      <CartProvider value={cart}>
        {children}
      </CartProvider>
    </AuthProvider>
  );
}
