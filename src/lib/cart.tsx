import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { MENU, type MenuItem } from "@/data/menu";

export type CartLine = { id: string; qty: number };

type CartCtx = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  resolved: { item: MenuItem; qty: number; lineTotal: number }[];
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "bb_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {}
  }, [lines]);

  const value = useMemo<CartCtx>(() => {
    const resolved = lines
      .map((l) => {
        const item = MENU.find((m) => m.id === l.id);
        if (!item) return null;
        return { item, qty: l.qty, lineTotal: (item.price ?? 0) * l.qty };
      })
      .filter(Boolean) as { item: MenuItem; qty: number; lineTotal: number }[];
    const subtotal = resolved.reduce((s, r) => s + r.lineTotal, 0);
    const count = lines.reduce((s, l) => s + l.qty, 0);
    return {
      lines,
      count,
      subtotal,
      resolved,
      add: (id, qty = 1) =>
        setLines((prev) => {
          const idx = prev.findIndex((p) => p.id === id);
          if (idx >= 0) {
            const copy = [...prev];
            copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
            return copy;
          }
          return [...prev, { id, qty }];
        }),
      remove: (id) => setLines((prev) => prev.filter((p) => p.id !== id)),
      setQty: (id, qty) =>
        setLines((prev) =>
          qty <= 0
            ? prev.filter((p) => p.id !== id)
            : prev.map((p) => (p.id === id ? { ...p, qty } : p)),
        ),
      clear: () => setLines([]),
      isOpen,
      open: () => setOpen(true),
      close: () => setOpen(false),
      toggle: () => setOpen((o) => !o),
    };
  }, [lines, isOpen]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}