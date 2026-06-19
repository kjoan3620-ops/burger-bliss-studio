import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/bb/Layout";
import { BRANCHES, DELIVERY } from "@/data/menu";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Best Burger Kigali" },
      { name: "description", content: "Get in touch with Best Burger Kigali. Phone, WhatsApp, Instagram and TikTok." },
      { property: "og:title", content: "Contact — Best Burger Kigali" },
      { property: "og:description", content: "Phones, WhatsApp, Instagram @bestburger_kgl, TikTok." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <section className="border-b border-white/10 bg-ink py-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs font-semibold tracking-[0.4em] text-flame uppercase">Talk to Us</p>
          <h1 className="mt-3 font-display text-5xl text-white md:text-7xl">Hit us up.</h1>
          <p className="mt-4 max-w-2xl text-white/60">
            Catering, big orders, feedback, or just craving a burger — pick the channel that suits you.
          </p>
        </div>
      </section>

      <section className="bg-ink py-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2 lg:grid-cols-3">
          {BRANCHES.map((b) => (
            <div key={b.id} className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6">
              <p className="font-display text-2xl text-white">{b.name}</p>
              <p className="mt-1 text-sm text-white/50">{b.address}</p>
              <p className="mt-1 text-sm text-white/40">{b.hours}</p>
              <ul className="mt-4 space-y-2">
                {b.phones.map((p) => (
                  <li key={p}>
                    <a href={`tel:${p.replace(/\s/g, "")}`} className="font-display text-xl text-flame hover:text-orange-400">
                      {p}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="rounded-2xl border border-flame/30 bg-zinc-900/60 p-6">
            <p className="font-display text-2xl text-white">Delivery</p>
            <p className="mt-1 text-sm text-white/50">Free delivery {DELIVERY.freeDeliveryWindow}.</p>
            <ul className="mt-4 space-y-3">
              <li>
                <a href={`tel:${DELIVERY.directPhone.replace(/\s/g, "")}`} className="font-display text-xl text-flame hover:text-orange-400">
                  {DELIVERY.directPhone}
                </a>
              </li>
              <li>
                <a href={`tel:${DELIVERY.altPhone.replace(/\s/g, "")}`} className="font-display text-xl text-flame hover:text-orange-400">
                  {DELIVERY.altPhone}
                </a>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6">
            <p className="font-display text-2xl text-white">Social</p>
            <p className="mt-1 text-sm text-white/50">Tag us. We repost.</p>
            <a href={DELIVERY.instagram} target="_blank" rel="noreferrer" className="mt-4 block font-display text-2xl text-flame hover:text-orange-400">
              Instagram · @bestburger_kgl
            </a>
            <a href={DELIVERY.tiktok} target="_blank" rel="noreferrer" className="mt-2 block font-display text-2xl text-flame hover:text-orange-400">
              TikTok · @bestburger_kgl
            </a>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6">
            <p className="font-display text-2xl text-white">WhatsApp</p>
            <p className="mt-1 text-sm text-white/50">Fastest way to order.</p>
            <a
              href={`https://wa.me/${DELIVERY.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block rounded-full bg-flame px-5 py-2 text-xs font-bold tracking-widest text-white hover:bg-orange-600"
            >
              MESSAGE US
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}