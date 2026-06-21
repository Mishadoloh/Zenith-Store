'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '@/types';

interface CompareCtx {
  items:    Product[];
  add:      (p: Product) => void;
  remove:   (id: number) => void;
  has:      (id: number) => boolean;
  clear:    () => void;
  isOpen:   boolean;
  setOpen:  (v: boolean) => void;
}
const Ctx = createContext<CompareCtx | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [items,  setItems]  = useState<Product[]>([]);
  const [isOpen, setOpen]   = useState(false);

  const add    = (p: Product) => { if (items.length < 4 && !items.find(i => i.id === p.id)) setItems(prev => [...prev, p]); };
  const remove = (id: number) => setItems(prev => prev.filter(p => p.id !== id));
  const has    = (id: number) => items.some(p => p.id === id);
  const clear  = () => { setItems([]); setOpen(false); };

  // auto-open bar when items are added
  useEffect(() => { if (items.length > 0) setOpen(true); }, [items.length]);

  return (
    <Ctx.Provider value={{ items, add, remove, has, clear, isOpen, setOpen }}>
      {children}
    </Ctx.Provider>
  );
}

export const useCompare = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCompare must be inside CompareProvider');
  return ctx;
};
