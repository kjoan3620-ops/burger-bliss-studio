import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/bb/Layout";
import { useCart } from "@/lib/cart";
import { BRANCHES, DELIVERY, formatRWF } from "@/data/menu";

export const Route = createFileRoute("/order")({
  head: () => ({
    meta: [
      { title: "Order — Burger Bros Kisimenti" },
      { name: "description", content: "Place an order at Burger Bros Kisimenti via phone, WhatsApp, Vuba Vuba or Isokko." },
      { property: "og:title", content: "Order — Burger Bros Kisimenti" },
      { property: "og:description", content: "Order via phone, WhatsApp, Vuba Vuba or Isokko." },
    ],
    links: [{ rel: "canonical", href: "/order" }],
  }),
  component: OrderPage,
});

function OrderPage() {
  const { resolved, subtotal, setQty, remove, clear, count } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [branchId, setBranchId] = useState<(typeof BRANCHES)[number]["id"]>("kisimenti");
  const branch = BRANCHES.find((b) => b.id === branchId)!;

  const message = useMemo(() => {
    const lines = resolved.map((r) => `• ${r.qty}× ${r.item.name} — ${formatRWF(r.lineTotal)}`).join("\n");
    return (
      `Hi Burger Bros ${branch.name}! I'd like to order:\n\n${lines}\n\n` +
      `Subtotal: ${formatRWF(subtotal)}\n` +
      (name ? `Name: ${name}\n` : "") +
      (phone ? `Phone: ${phone}\n` : "")
    );
  }, [resolved, subtotal, name, phone, branch.name]);

  const waUrl = `https://wa.me/${DELIVERY.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
  const callHref = `tel:${branch.phones[0].replace(/\s/g, "")}`;

  return (
    <SiteLayout>
      <section className="border-b border-white/10 bg-ink py-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs font-semibold tracking-[0.4em] text-flame uppercase">Checkout</p>
          <h1 className="mt-3 font-display text-5xl text-white md:text-6xl">Your order.</h1>
          <p className="mt-3 text-white/60">
            Review your cart, then send it to us by phone, WhatsApp, or your favourite delivery app.
          </p>
        </div>
      </section>

      <section className="bg-ink py-12">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Cart */}
          <div>
            <h2 className="font-display text-3xl text-white">Cart ({count})</h2>
            {resolved.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-white/20 p-12 text-center">
                <p className="text-white/60">Your cart is empty.</p>
                <Link to="/menu" className="mt-4 inline-block rounded-full bg-flame px-6 py-3 text-xs font-bold tracking-widest text-white hover:bg-orange-600">
                  BROWSE MENU
                </Link>
              </div>
            ) : (
              <ul className="mt-6 space-y-3">
                {resolved.map((r) => (
                  <li key={r.item.id} className="flex gap-4 rounded-2xl border border-white/10 bg-zinc-900/60 p-4">
                    {r.item.image && (
                      <img src={r.item.image} alt="" className="h-20 w-20 rounded-xl object-cover" />
                    )}
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex justify-between gap-3">
                        <div>
                          <p className="font-display text-xl text-white">{r.item.name}</p>
                          <p className="text-xs text-white/50">{formatRWF(r.item.price)} each</p>
                        </div>
                        <button onClick={() => remove(r.item.id)} className="text-xs text-white/40 hover:text-flame">
                          Remove
                        </button>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-full border border-white/20 text-white">
                          <button className="px-3 py-1" onClick={() => setQty(r.item.id, r.qty - 1)}>−</button>
                          <span className="min-w-8 text-center">{r.qty}</span>
                          <button className="px-3 py-1" onClick={() => setQty(r.item.id, r.qty + 1)}>+</button>
                        </div>
                        <span className="font-display text-2xl text-gold">{formatRWF(r.lineTotal)}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {resolved.length > 0 && (
              <div className="mt-6 flex justify-between border-t border-white/10 pt-4">
                <span className="text-white/60">Subtotal</span>
                <span className="font-display text-3xl text-flame">{formatRWF(subtotal)}</span>
              </div>
            )}
          </div>

          {/* Checkout */}
          <aside className="rounded-3xl border border-white/10 bg-zinc-950/60 p-6">
            <h2 className="font-display text-3xl text-white">How should we get it to you?</h2>

            <div className="mt-6 space-y-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-white/50">Your name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Eric K."
                  className="mt-1 w-full rounded-xl border border-white/15 bg-black/50 px-4 py-2 text-white placeholder:text-white/30 focus:border-flame focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-white/50">Phone</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+250 ..."
                  className="mt-1 w-full rounded-xl border border-white/15 bg-black/50 px-4 py-2 text-white placeholder:text-white/30 focus:border-flame focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-white/50">Branch</label>
                <div className="mt-1 grid grid-cols-2 gap-2">
                  {BRANCHES.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setBranchId(b.id)}
                      className={`rounded-xl border px-3 py-2 text-sm font-semibold ${
                        branchId === b.id ? "border-flame bg-flame/10 text-flame" : "border-white/15 text-white/70 hover:border-white/30"
                      }`}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <a
                href={resolved.length ? waUrl : undefined}
                target="_blank"
                rel="noreferrer"
                aria-disabled={resolved.length === 0}
                className={`block rounded-full bg-flame py-3 text-center font-bold tracking-widest text-white ${
                  resolved.length ? "hover:bg-orange-600" : "pointer-events-none opacity-40"
                }`}
              >
                ORDER VIA WHATSAPP
              </a>
              <a
                href={callHref}
                className="block rounded-full border border-flame/50 py-3 text-center font-bold tracking-widest text-flame hover:bg-flame hover:text-white"
              >
                CALL {branch.name.toUpperCase()} — {branch.phones[0]}
              </a>
              <div className="grid grid-cols-2 gap-3 pt-3">
                <a href={DELIVERY.vubaVuba} target="_blank" rel="noreferrer" className="rounded-full border border-white/20 py-2 text-center text-xs font-bold tracking-widest text-white hover:bg-white/10">
                  VUBA VUBA
                </a>
                <a href={DELIVERY.isokko} target="_blank" rel="noreferrer" className="rounded-full border border-white/20 py-2 text-center text-xs font-bold tracking-widest text-white hover:bg-white/10">
                  ISOKKO
                </a>
              </div>
              <a
                href={`tel:${DELIVERY.directPhone.replace(/\s/g, "")}`}
                className="block rounded-full border border-white/20 py-2 text-center text-xs font-bold tracking-widest text-white hover:bg-white/10"
              >
                DIRECT DELIVERY · {DELIVERY.directPhone}
              </a>
              {resolved.length > 0 && (
                <button onClick={clear} className="block w-full py-2 text-center text-xs uppercase tracking-widest text-white/40 hover:text-white">
                  Clear cart
                </button>
              )}
            </div>

            <p className="mt-6 text-[11px] leading-relaxed text-white/40">
              Orders are placed directly with the branch. Payment is handled at pickup, on delivery, or through your chosen delivery app.
            </p>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}