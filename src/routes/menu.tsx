import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/bb/Layout";
import { MENU, CATEGORY_LABELS, formatRWF, type MenuCategory } from "@/data/menu";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Burger Bros Kisimenti" },
      { name: "description", content: "Browse Burger Bros Kisimenti's full menu: burgers, tacos, wings, packs and drinks. Order online." },
      { property: "og:title", content: "Menu — Burger Bros Kisimenti" },
      { property: "og:description", content: "Burgers, tacos, wings, lunch packs, drinks — all on the Burger Bros menu." },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
  }),
  component: MenuPage,
});

const TABS: { id: MenuCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "best", label: "Best Sellers" },
  { id: "burger", label: "Burgers" },
  { id: "taco", label: "Tacos" },
  { id: "wings", label: "Wings" },
  { id: "side", label: "Sides" },
  { id: "pack", label: "Packs" },
  { id: "beverage", label: "Beverages" },
];

function MenuPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("all");
  const { add, open } = useCart();

  const items =
    tab === "all"
      ? MENU
      : tab === "best"
        ? MENU.filter((m) => m.bestSeller)
        : MENU.filter((m) => m.category === tab);

  return (
    <SiteLayout>
      <section className="border-b border-white/10 bg-ink pb-10 pt-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs font-semibold tracking-[0.4em] text-flame uppercase">The Menu</p>
          <h1 className="mt-3 font-display text-5xl text-white md:text-7xl">Built bold. Priced fair.</h1>
          <p className="mt-4 max-w-2xl text-white/60">
            Everything on the Burger Bros board. Tap any item to add it to your order.
          </p>
        </div>
      </section>

      <section className="sticky top-[60px] z-30 border-b border-white/10 bg-black/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-3">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold tracking-widest uppercase transition-colors ${
                tab === t.id
                  ? "bg-flame text-white"
                  : "border border-white/15 text-white/60 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      <section className="bg-ink py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.03, 0.4) }}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 transition-colors hover:border-flame/50"
              >
                {m.image ? (
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={m.image}
                      alt={m.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {m.bestSeller && (
                      <span className="absolute left-3 top-3 rounded-full bg-flame px-3 py-1 text-[10px] font-bold tracking-widest text-white">
                        BEST SELLER
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="flex h-32 items-center justify-center bg-gradient-to-br from-zinc-900 to-black">
                    <span className="font-display text-3xl text-flame">{CATEGORY_LABELS[m.category]}</span>
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-2xl text-white">{m.name}</h3>
                    <span className="shrink-0 font-display text-xl text-flame">{formatRWF(m.price)}</span>
                  </div>
                  {m.description && <p className="mt-2 text-sm text-white/60">{m.description}</p>}
                  <button
                    onClick={() => {
                      add(m.id, 1);
                      open();
                    }}
                    disabled={m.price == null}
                    className="mt-4 w-full rounded-full bg-flame py-2 text-xs font-bold tracking-widest text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/40"
                  >
                    {m.price == null ? "ASK IN STORE" : "ADD TO ORDER"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}