'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getRequestCartFromLocalStorage, saveRequestCartToLocalStorage } from '@/utils/storageUtils';

export interface RequestItem {
  id: string;
  title: string;
  image: string;
}

interface CartContextType {
  cartItems: RequestItem[];
  addToCart: (item: RequestItem) => void;
  removeFromCart: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a RequestCartProvider');
  }
  return context;
};

export const RequestCartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<RequestItem[]>([]);

  // Load items from local storage on component mount
  useEffect(() => {
    const storedItems = getRequestCartFromLocalStorage();
    setCartItems(storedItems);
  }, []);

  // Save items to local storage whenever cart changes
  useEffect(() => {
    saveRequestCartToLocalStorage(cartItems);
  }, [cartItems]);

  const addToCart = (item: RequestItem) => {
    setCartItems((prev) => [...prev, item]);
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
