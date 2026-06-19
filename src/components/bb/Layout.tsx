import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart";
import { formatRWF, DELIVERY, BRANCHES } from "@/data/menu";
import logo from "@/assets/bb-logo.png";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/order", label: "Order" },
  { to: "/branches", label: "Branches" },
  { to: "/contact", label: "Contact" },
] as const;

function Header() {
  const { count, toggle } = useCart();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Best Burger Kigali" className="h-9 w-9 object-contain" />
          <span className="hidden font-display text-xl tracking-widest text-white sm:inline">
            BEST BURGER <span className="text-flame">KIGALI</span>
          </span>
        </Link>
        <nav className="hidden gap-7 text-sm font-medium text-white/70 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeProps={{ className: "text-flame" }}
              activeOptions={{ exact: n.to === "/" }}
              className="hover:text-white transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="relative rounded-full bg-flame px-4 py-2 text-xs font-bold tracking-widest text-white hover:bg-orange-600 transition-colors"
            aria-label="Open cart"
          >
            CART
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-black">
                {count}
              </span>
            )}
          </button>
          <button
            className="text-white md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-white/10 bg-black/95 md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-5 py-3">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-2 text-white/80 hover:text-flame"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function CartDrawer() {
  const { isOpen, close, resolved, subtotal, setQty, remove, clear, count } = useCart();
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-zinc-950 text-white"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <h2 className="font-display text-2xl tracking-widest">YOUR ORDER</h2>
              <button onClick={close} aria-label="Close cart" className="text-white/60 hover:text-white">
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {resolved.length === 0 ? (
                <p className="mt-12 text-center text-white/50">Your cart is empty. Add something tasty from the menu.</p>
              ) : (
                <ul className="space-y-4">
                  {resolved.map((r) => (
                    <li key={r.item.id} className="flex gap-3 rounded-xl border border-white/10 bg-black/40 p-3">
                      {r.item.image && (
                        <img src={r.item.image} alt="" className="h-16 w-16 rounded-lg object-cover" />
                      )}
                      <div className="flex-1">
                        <div className="flex justify-between gap-2">
                          <p className="font-semibold">{r.item.name}</p>
                          <button onClick={() => remove(r.item.id)} className="text-xs text-white/40 hover:text-flame">
                            Remove
                          </button>
                        </div>
                        <p className="mt-1 text-xs text-white/50">{formatRWF(r.item.price)}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="inline-flex items-center rounded-full border border-white/20">
                            <button className="px-2 py-1 text-sm" onClick={() => setQty(r.item.id, r.qty - 1)}>−</button>
                            <span className="min-w-6 text-center text-sm">{r.qty}</span>
                            <button className="px-2 py-1 text-sm" onClick={() => setQty(r.item.id, r.qty + 1)}>+</button>
                          </div>
                          <span className="font-display text-lg text-gold">{formatRWF(r.lineTotal)}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {resolved.length > 0 && (
              <div className="border-t border-white/10 px-5 py-4">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Subtotal ({count} items)</span>
                  <span className="font-display text-2xl text-flame">{formatRWF(subtotal)}</span>
                </div>
                <Link
                  to="/order"
                  onClick={close}
                  className="mt-4 block rounded-full bg-flame py-3 text-center font-bold tracking-widest text-white hover:bg-orange-600"
                >
                  CHECKOUT →
                </Link>
                <button
                  onClick={clear}
                  className="mt-2 block w-full py-2 text-center text-xs uppercase tracking-widest text-white/40 hover:text-white"
                >
                  Clear cart
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-12 text-white/60">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <img src={logo} alt="" className="h-10 w-10 animate-spin-slow object-contain" />
            <span className="font-display text-lg tracking-widest text-white">BEST BURGER</span>
          </div>
          <p className="mt-3 text-sm">Home of the Akabumbe. Juicy, fast, unforgettable — delivered across Kigali.</p>
        </div>
        <div>
          <p className="mb-3 font-display tracking-widest text-white">EXPLORE</p>
          <ul className="space-y-1 text-sm">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-flame">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 font-display tracking-widest text-white">FIND US</p>
          <ul className="space-y-2 text-sm">
            {BRANCHES.map((b) => (
              <li key={b.id}>
                <p className="text-white">{b.name}</p>
                <a href={`tel:${b.phones[0].replace(/\s/g, "")}`} className="hover:text-flame">{b.phones[0]}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 font-display tracking-widest text-white">FOLLOW</p>
          <a href={DELIVERY.instagram} target="_blank" rel="noreferrer" className="block text-sm hover:text-flame">
            Instagram · @bestburger_kgl
          </a>
          <a href={DELIVERY.tiktok} target="_blank" rel="noreferrer" className="mt-1 block text-sm hover:text-flame">
            TikTok · @bestburger_kgl
          </a>
          <p className="mt-4 text-sm">Free delivery {DELIVERY.freeDeliveryWindow}</p>
        </div>
      </div>
      <p className="mt-10 text-center text-xs text-white/30">
        © {new Date().getFullYear()} Best Burger Kigali. All rights reserved.
      </p>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-ink text-white">
      <Header />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
    </div>
  );
}