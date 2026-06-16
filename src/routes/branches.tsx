import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/bb/Layout";
import { BRANCHES } from "@/data/menu";

export const Route = createFileRoute("/branches")({
  head: () => ({
    meta: [
      { title: "Branches — Burger Bros Kisimenti" },
      { name: "description", content: "Find Burger Bros: Kisimenti (KG 115 St) and Nyamirambo branches in Kigali. Open daily 12pm–11:30pm." },
      { property: "og:title", content: "Branches — Burger Bros Kisimenti" },
      { property: "og:description", content: "Kisimenti and Nyamirambo. Open daily 12pm–11:30pm." },
    ],
    links: [{ rel: "canonical", href: "/branches" }],
  }),
  component: BranchesPage,
});

function BranchesPage() {
  return (
    <SiteLayout>
      <section className="border-b border-white/10 bg-ink py-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs font-semibold tracking-[0.4em] text-flame uppercase">Our Branches</p>
          <h1 className="mt-3 font-display text-5xl text-white md:text-7xl">Two doors. Same fire.</h1>
        </div>
      </section>
      <section className="bg-ink py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-2">
          {BRANCHES.map((b) => (
            <div key={b.id} className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/60">
              <iframe
                title={`Map of Burger Bros ${b.name}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent("Burger Bros " + b.name + " Kigali")}&output=embed`}
                loading="lazy"
                className="h-64 w-full border-0"
              />
              <div className="p-7">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-flame">{b.id === "kisimenti" ? "Original" : "Branch"}</p>
                <h2 className="mt-2 font-display text-4xl text-white">{b.name}</h2>
                <p className="mt-2 text-white/60">{b.address}</p>
                <p className="mt-1 text-sm text-white/40">{b.hours}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {b.phones.map((p) => (
                    <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="rounded-full bg-flame px-5 py-2 text-xs font-bold tracking-widest text-white hover:bg-orange-600">
                      CALL {p}
                    </a>
                  ))}
                  <a href={b.mapsUrl} target="_blank" rel="noreferrer" className="rounded-full border border-white/30 px-5 py-2 text-xs font-bold tracking-widest text-white hover:bg-white/10">
                    GET DIRECTIONS
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}