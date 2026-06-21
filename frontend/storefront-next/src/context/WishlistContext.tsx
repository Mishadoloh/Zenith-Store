'use client';

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { Product } from '@/types';

interface WishlistState { items: Product[]; }

type Action =
  | { type: 'ADD'; product: Product }
  | { type: 'REMOVE'; id: number }
  | { type: 'CLEAR' }
  | { type: 'HYDRATE'; items: Product[] };

const reducer = (state: WishlistState, action: Action): WishlistState => {
  switch (action.type) {
    case 'ADD':
      if (state.items.some(p => p.id === action.product.id)) return state;
      return { items: [...state.items, action.product] };
    case 'REMOVE':
      return { items: state.items.filter(p => p.id !== action.id) };
    case 'CLEAR':
      return { items: [] };
    case 'HYDRATE':
      return { items: action.items };
    default:
      return state;
  }
};

interface WishlistCtx {
  state: WishlistState;
  addToWishlist:      (product: Product) => void;
  removeFromWishlist: (id: number) => void;
  isWishlisted:       (id: number) => boolean;
  toggleWishlist:     (product: Product) => void;
  clearWishlist:      () => void;
  count:              number;
}

const Ctx = createContext<WishlistCtx | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('zenith_wishlist');
      if (saved) dispatch({ type: 'HYDRATE', items: JSON.parse(saved) });
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('zenith_wishlist', JSON.stringify(state.items));
  }, [state.items]);

  const addToWishlist      = useCallback((product: Product) => dispatch({ type: 'ADD', product }), []);
  const removeFromWishlist = useCallback((id: number) => dispatch({ type: 'REMOVE', id }), []);
  const toggleWishlist     = useCallback((product: Product) => {
    if (state.items.some(p => p.id === product.id)) dispatch({ type: 'REMOVE', id: product.id });
    else dispatch({ type: 'ADD', product });
  }, [state.items]);
  const isWishlisted       = useCallback((id: number) => state.items.some(p => p.id === id), [state.items]);
  const clearWishlist      = useCallback(() => dispatch({ type: 'CLEAR' }), []);

  return (
    <Ctx.Provider value={{ state, addToWishlist, removeFromWishlist, isWishlisted, toggleWishlist, clearWishlist, count: state.items.length }}>
      {children}
    </Ctx.Provider>
  );
}

export const useWishlist = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useWishlist must be inside WishlistProvider');
  return ctx;
};
