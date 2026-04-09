"use client";

import { createContext, useContext, useState, useMemo, ReactNode } from "react";
import toast from "react-hot-toast";
import type { CartItem, Product, Size } from "@/lib/types";

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product, size: Size) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  cartCount: number;
  totalPrice: number;
  totalPriceFormatted: string;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, size: Size) => {
    const itemId = `${product.id}-${size}`;
    const existingItem = cart.find((item) => item.id === itemId);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      const newItem: CartItem = {
        id: itemId,
        productId: product.id,
        name: product.name,
        imageSrc: product.images[0],
        priceCents: product.priceCents,
        priceFormatted: product.priceFormatted,
        size,
        quantity: 1,
      };
      setCart([...cart, newItem]);
    }
    toast.success(`${product.shortName} (Tam: ${size}) adicionado ao carrinho!`);
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter((item) => item.id !== itemId));
    toast.error("Item removido do carrinho.");
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(
        cart.map((item) => (item.id === itemId ? { ...item, quantity } : item))
      );
    }
  };

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);
  }, [cart]);

  const totalPriceFormatted = useMemo(() => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(totalPrice / 100);
  }, [totalPrice]);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartCount,
    totalPrice,
    totalPriceFormatted,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}