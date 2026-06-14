import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Burger3D } from "./Burger3D";
import { Grill3D } from "./Grill3D";
import { Orbit3D, INGREDIENTS } from "./Orbit3D";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  { name: "The Inferno", price: "$14", ing: "Ghost pepper jack, jalapeño, chipotle aioli", kcal: 820, protein: 42, fat: 48, carbs: 38, color: "#ff4500" },
  { name: "Smoke Stack", price: "$13", ing: "Aged cheddar, bacon, BBQ, fried onion", kcal: 880, protein: 45, fat: 52, carbs: 40, color: "#a3471a" },
  { name: "The Classic", price: "$11", ing: "Lettuce, tomato, pickle, house sauce", kcal: 680, protein: 36, fat: 36, carbs: 42, color: "#d98b3a" },
  { name: "Truffle Royale", price: "$18", ing: "Truffle aioli, brie, caramelized onion", kcal: 920, protein: 44, fat: 58, carbs: 38, color: "#ffd700" },
  { name: "Green Beast", price: "$13", ing: "Plant patty, avocado, sprouts, vegan gouda", kcal: 590, protein: 28, fat: 28, carbs: 50, color: "#3aa84a" },
];

const TESTIMONIALS = [
  { name: "Marcus T.", stars: 5, text: "Best burger I've had in a decade. The Inferno actually slaps." },
  { name: "Priya R.", stars: 5, text: "Truffle Royale is borderline criminal. I think about it weekly." },
  { name: "Jake D.", stars: 5, text: "Smoke Stack changed my brain chemistry. 10/10." },
  { name: "Lena O.", stars: 4, text: "Green Beast is the rare vegan burger I'd order over meat." },
];

function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-ink">
      <div className="absolute inset-0 z-0">
        <Burger3D className="h-full w-full" />
      </div>
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-end px-6 pb-24 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mb-4 text-xs font-semibold tracking-[0.4em] text-flame uppercase"
        >
          Flame-fired since day one
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="font-display text-6xl leading-[0.9] md:text-[9rem]"
        >
          <span className="block text-white">Built Different.</span>
          <span className="block text-gradient-flame">Eaten Better.</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.8 }}
          className="mt-10"
        >
          <a
            href="#order"
            className="inline-block rounded-full bg-flame px-10 py-4 font-display text-xl tracking-widest text-white transition-transform hover:scale-105 animate-flame-pulse"
          >
            Order Now
          </a>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2.6, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-xs tracking-[0.3em] text-white/60"
      >
        SCROLL ↓
      </motion.div>
    </section>
  );
}

function ProductCard({ p, i }: { p: (typeof PRODUCTS)[number]; i: number }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.div
      whileHover={{ rotateY: flipped ? 180 : 8, rotateX: -4, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      style={{ transformStyle: "preserve-3d", perspective: 1200 }}
      className="relative h-[480px] w-[320px] shrink-0 cursor-pointer"
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        {/* front */}
        <div
          style={{ backfaceVisibility: "hidden", borderColor: p.color }}
          className="absolute inset-0 flex flex-col justify-between rounded-3xl border-2 bg-zinc-900/80 p-6 backdrop-blur"
        >
          <div
            className="relative h-56 w-full overflow-hidden rounded-2xl"
            style={{ background: `radial-gradient(circle at 50% 40%, ${p.color}aa, #0a0a0a 70%)` }}
          >
            <div
              className="absolute inset-x-6 top-10 bottom-10 rounded-full opacity-90"
              style={{ background: `radial-gradient(ellipse at center, ${p.color}, #2a0e00 80%)` }}
            />
            <span className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 font-display text-sm text-gold">#{i + 1}</span>
          </div>
          <div>
            <h3 className="font-display text-3xl text-white">{p.name}</h3>
            <p className="mt-1 text-sm text-white/60">{p.ing}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-display text-2xl text-flame">{p.price}</span>
              <button className="rounded-full bg-flame px-5 py-2 text-xs font-bold tracking-widest text-white hover:bg-orange-600">
                ADD TO ORDER
              </button>
            </div>
            <p className="mt-3 text-[10px] uppercase tracking-widest text-white/40">Tap card for nutrition</p>
          </div>
        </div>
        {/* back */}
        <div
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", borderColor: p.color }}
          className="absolute inset-0 flex flex-col justify-between rounded-3xl border-2 bg-zinc-900/95 p-8"
        >
          <h3 className="font-display text-3xl text-gold">{p.name}</h3>
          <div className="space-y-4">
            <Stat label="Calories" value={`${p.kcal} kcal`} />
            <Stat label="Protein" value={`${p.protein} g`} />
            <Stat label="Fat" value={`${p.fat} g`} />
            <Stat label="Carbs" value={`${p.carbs} g`} />
          </div>
          <p className="text-[10px] uppercase tracking-widest text-white/40">Tap to flip back</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 pb-2">
      <span className="text-xs uppercase tracking-widest text-white/50">{label}</span>
      <span className="font-display text-xl text-white">{value}</span>
    </div>
  );
}

function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <section className="relative bg-ink py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs font-semibold tracking-[0.4em] text-flame uppercase">The Lineup</p>
          <h2 className="mt-3 font-display text-5xl text-white md:text-7xl">Pick your weapon.</h2>
        </motion.div>
      </div>
      <div ref={ref} className="mt-16 overflow-x-auto pb-8">
        <div className="flex gap-6 px-6 md:px-[calc((100vw-80rem)/2+1.5rem)]">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.name} p={p} i={i} />
          ))}
          <div className="w-8 shrink-0" />
        </div>
      </div>
    </section>
  );
}

function Story() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const words = ref.current.querySelectorAll<HTMLSpanElement>("[data-word]");
    const ctx = gsap.context(() => {
      gsap.from(words, {
        opacity: 0,
        y: 20,
        stagger: 0.04,
        duration: 0.6,
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  const text =
    "We started in a back-alley garage with one cast-iron grill, a sack of brioche buns, and a stubborn idea: that a burger could be art. Twelve years later we still flame-sear every patty by hand.";
  return (
    <section className="relative bg-ink py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
        <div ref={ref}>
          <p className="text-xs font-semibold tracking-[0.4em] text-flame uppercase">Our Story</p>
          <h2 className="mt-3 font-display text-5xl text-white md:text-6xl">From the back alley to the headlines.</h2>
          <p className="mt-8 text-lg leading-relaxed text-white/70">
            {text.split(" ").map((w, i) => (
              <span key={i} data-word className="inline-block">
                {w}&nbsp;
              </span>
            ))}
          </p>
        </div>
        <div className="relative h-[500px] overflow-hidden rounded-3xl border border-flame/30 glow-flame">
          <Grill3D />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}

function Ingredients() {
  const [active, setActive] = useState<{ name: string; info: string } | null>(INGREDIENTS[0]);
  return (
    <section className="relative bg-ink py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <p className="text-xs font-semibold tracking-[0.4em] text-flame uppercase">Sourced Right</p>
          <h2 className="mt-3 font-display text-5xl text-white md:text-7xl">Every ingredient earns its spot.</h2>
        </motion.div>
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[2fr_1fr]">
          <div className="relative h-[520px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900 to-black">
            <Orbit3D onSelect={setActive} />
            <span className="pointer-events-none absolute bottom-4 left-4 text-[10px] uppercase tracking-widest text-white/40">
              Click an ingredient
            </span>
          </div>
          <div className="flex items-center">
            {active && (
              <motion.div
                key={active.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-full rounded-2xl border border-flame/30 bg-zinc-900/60 p-8"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-flame">Ingredient</p>
                <h3 className="mt-2 font-display text-5xl text-white">{active.name}</h3>
                <p className="mt-4 text-white/70">{active.info}</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="relative bg-ink py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <p className="text-xs font-semibold tracking-[0.4em] text-flame uppercase">Word of Mouth</p>
          <h2 className="mt-3 font-display text-5xl text-white md:text-7xl">They came back. Often.</h2>
        </motion.div>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              whileHover={{ y: -8, rotateX: 4, rotateY: 4 }}
              style={{ transformStyle: "preserve-3d", perspective: 800 }}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 to-black p-6 shadow-2xl"
            >
              <div className="text-gold">{"★".repeat(t.stars)}{"☆".repeat(5 - t.stars)}</div>
              <p className="mt-4 text-white/80">"{t.text}"</p>
              <p className="mt-6 font-display text-lg text-white">{t.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Particles() {
  const [pts, setPts] = useState<{ x: number; y: number; d: number; s: number }[]>([]);
  useEffect(() => {
    setPts(
      Array.from({ length: 60 }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        d: Math.random() * 6,
        s: 2 + Math.random() * 6,
      })),
    );
  }, []);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pts.map((p, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "-20%", opacity: [0, 1, 0] }}
          transition={{ duration: 4 + p.s, repeat: Infinity, delay: p.d, ease: "easeOut" }}
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s }}
          className="absolute rounded-full bg-flame blur-[1px]"
        />
      ))}
    </div>
  );
}

function OrderCTA() {
  return (
    <section id="order" className="relative overflow-hidden bg-ink py-40">
      <div className="absolute inset-0 bg-gradient-radial from-flame/40 via-transparent to-transparent" style={{ background: "radial-gradient(ellipse at center, rgba(255,69,0,0.35), transparent 60%)" }} />
      <Particles />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-display text-6xl text-white md:text-9xl">
          <span className="text-gradient-flame">Hungry yet?</span>
        </h2>
        <p className="mt-6 text-lg text-white/70">Order online in under 60 seconds. Fired up in ten.</p>
        <a
          href="#"
          className="mt-12 inline-block rounded-full bg-flame px-14 py-6 font-display text-2xl tracking-widest text-white animate-flame-pulse hover:scale-105 transition-transform"
        >
          Start an Order
        </a>
      </div>
    </section>
  );
}

function MiniBurger() {
  return (
    <div className="animate-spin-slow inline-block">
      <svg width="32" height="32" viewBox="0 0 32 32">
        <ellipse cx="16" cy="9" rx="12" ry="6" fill="#d98b3a" />
        <rect x="4" y="13" width="24" height="3" fill="#3aa84a" />
        <rect x="4" y="15" width="24" height="3" fill="#c0392b" />
        <rect x="4" y="17" width="24" height="4" fill="#5a2d18" />
        <ellipse cx="16" cy="23" rx="12" ry="5" fill="#c97a2f" />
      </svg>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex items-center gap-3">
          <MiniBurger />
          <span className="font-display text-2xl tracking-widest text-white">FLAMECRAFT</span>
        </div>
        <nav className="flex gap-6 text-sm text-white/60">
          <a href="#" className="hover:text-flame">Menu</a>
          <a href="#" className="hover:text-flame">Locations</a>
          <a href="#" className="hover:text-flame">Careers</a>
          <a href="#" className="hover:text-flame">Press</a>
        </nav>
        <div className="flex gap-4 text-white/60">
          <a href="#" aria-label="Instagram" className="hover:text-flame">IG</a>
          <a href="#" aria-label="TikTok" className="hover:text-flame">TT</a>
          <a href="#" aria-label="X" className="hover:text-flame">X</a>
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-white/30">© {new Date().getFullYear()} Flamecraft Burgers. Built different.</p>
    </footer>
  );
}

export function Sections() {
  return (
    <main className="bg-ink">
      <Hero />
      <Showcase />
      <Story />
      <Ingredients />
      <Testimonials />
      <OrderCTA />
      <Footer />
    </main>
  );
}