'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { CartItem, CartState } from '../types/cart.types';

interface CartContextType extends CartState {
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage after mount to avoid hydration mismatch
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedCart = localStorage.getItem('meli_cart');
    if (storedCart) {
      try {
        // Defer setState to avoid synchronous setState in effect
        setTimeout(() => setItems(JSON.parse(storedCart)), 0);
      } catch (e) {
        console.error('Failed to parse cart from local storage', e);
      }
    }
    // Defer setMounted to avoid synchronous setState in effect
    setTimeout(() => setMounted(true), 0);
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('meli_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('meli_cart');
  };

  const value = useMemo(() => {
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
    const totalAmount = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    return {
      items,
      totalItems,
      totalAmount,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    };
  }, [items]);

  // Don't render children until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
