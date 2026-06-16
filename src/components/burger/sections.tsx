import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO_IMAGE, MENU, formatRWF, BRANCHES, DELIVERY, type MenuItem } from "@/data/menu";
import { useCart } from "@/lib/cart";
import storyGrill from "@/assets/story-grill.jpg";
import atmInterior from "@/assets/atmosphere-interior.jpg";
import atmTakeaway from "@/assets/atmosphere-takeaway.jpg";
import atmSpread from "@/assets/atmosphere-spread.jpg";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const FEATURED: MenuItem[] = MENU.filter((m) => m.bestSeller);
const ACCENTS = ["#ff4500", "#ffd700", "#ff6b1a", "#e94e1b", "#ffae00"];

const TESTIMONIALS = [
  { name: "Aline M.", stars: 5, text: "The Drunken Granny is unreal. Every visit, same order." },
  { name: "Eric K.", stars: 5, text: "Best burger in Kigali, hands down. Wings are addictive too." },
  { name: "Joyce U.", stars: 5, text: "Katsu burger and a watermelon mojito = Friday sorted." },
  { name: "David N.", stars: 4, text: "Lunch pack is a steal. Quick, hot, juicy." },
];

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 200]);
  const scale = useTransform(scrollY, [0, 800], [1.05, 1.2]);
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-ink">
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Burger Bros Kisimenti signature double cheeseburger with melted cheddar and char-marked beef patty"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-black/20 to-black/95" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_30%_50%,rgba(255,69,0,0.25),transparent_60%)]" />
      <Particles />
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-end px-6 pb-24 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-4 text-xs font-semibold tracking-[0.4em] text-flame uppercase"
        >
          Kisimenti · Nyamirambo · Kigali
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="font-display text-6xl leading-[0.9] md:text-[9rem]"
        >
          <span className="block text-white">Juicy. Fast.</span>
          <span className="block text-gradient-flame">Unforgettable.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-6 max-w-xl text-base text-white/70 md:text-lg"
        >
          Kigali's juiciest burgers, tacos and wings — built bold at Burger Bros Kisimenti.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Link
            to="/order"
            className="inline-block rounded-full bg-flame px-10 py-4 font-display text-xl tracking-widest text-white transition-transform hover:scale-105 animate-flame-pulse"
          >
            ORDER NOW
          </Link>
          <Link
            to="/menu"
            className="inline-block rounded-full border border-white/30 px-10 py-4 font-display text-xl tracking-widest text-white hover:bg-white/10"
          >
            VIEW MENU
          </Link>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-xs tracking-[0.3em] text-white/60"
      >
        SCROLL ↓
      </motion.div>
    </section>
  );
}

function ProductCard({ p, i }: { p: MenuItem; i: number }) {
  const { add, open } = useCart();
  const color = ACCENTS[i % ACCENTS.length];
  return (
    <motion.div
      whileHover={{ rotateY: 8, rotateX: -4, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      style={{ transformStyle: "preserve-3d", perspective: 1200 }}
      className="relative h-[480px] w-[320px] shrink-0"
    >
      <div
        style={{ borderColor: color }}
        className="flex h-full w-full flex-col justify-between rounded-3xl border-2 bg-zinc-900/80 p-6 backdrop-blur"
      >
        <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-black">
          {p.image && (
            <img
              src={p.image}
              alt={`${p.name}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
            />
          )}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(ellipse at 50% 100%, ${color}30, transparent 60%)` }}
          />
          <span className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 font-display text-sm text-gold backdrop-blur">
            #{i + 1}
          </span>
        </div>
        <div>
          <h3 className="font-display text-3xl text-white">{p.name}</h3>
          <p className="mt-1 text-sm text-white/60 line-clamp-2">{p.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="font-display text-2xl text-flame">{formatRWF(p.price)}</span>
            <button
              onClick={() => {
                add(p.id, 1);
                open();
              }}
              className="rounded-full bg-flame px-5 py-2 text-xs font-bold tracking-widest text-white hover:bg-orange-600"
            >
              ADD TO ORDER
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Showcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const track = trackRef.current!;
      const section = sectionRef.current!;
      const distance = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + distance(),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-ink">
      <div className="flex min-h-screen flex-col justify-center py-24 md:py-0">
        <div className="mx-auto w-full max-w-7xl px-6 md:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs font-semibold tracking-[0.4em] text-flame uppercase">The Best Sellers</p>
            <h2 className="mt-3 font-display text-5xl text-white md:text-7xl">Pick your weapon.</h2>
            <p className="mt-4 hidden text-sm uppercase tracking-[0.3em] text-white/40 md:block">Scroll to reveal the lineup →</p>
          </motion.div>
        </div>
        <div className="mt-10 overflow-x-auto pb-8 md:overflow-hidden md:pb-0">
          <div
            ref={trackRef}
            className="flex gap-6 px-6 will-change-transform md:px-[10vw]"
          >
            {FEATURED.map((p, i) => (
              <ProductCard key={p.id} p={p} i={i} />
            ))}
            <div className="w-[10vw] shrink-0" />
          </div>
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
    "Born in Kisimenti, raised on flames. Burger Bros has grown into Kigali's go-to spot for stacked, juicy burgers — now serving Kisimenti and Nyamirambo, with delivery citywide.";
  return (
    <section className="relative bg-ink py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
        <div ref={ref}>
          <p className="text-xs font-semibold tracking-[0.4em] text-flame uppercase">Our Story</p>
          <h2 className="mt-3 font-display text-5xl text-white md:text-6xl">From Kisimenti, with fire.</h2>
          <p className="mt-8 text-lg leading-relaxed text-white/70">
            {text.split(" ").map((w, i) => (
              <span key={i} data-word className="inline-block">
                {w}&nbsp;
              </span>
            ))}
          </p>
          <Link
            to="/branches"
            className="mt-8 inline-block rounded-full border border-flame/60 px-6 py-3 text-sm font-bold tracking-widest text-flame hover:bg-flame hover:text-white transition-colors"
          >
            FIND A BRANCH →
          </Link>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative h-[500px] overflow-hidden rounded-3xl border border-flame/30 glow-flame"
        >
          <img
            src={storyGrill}
            alt="Chef flame-grilling burger patties on a cast-iron grill at night, sparks flying"
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,transparent_30%,rgba(0,0,0,0.6))]" />
          <div className="absolute bottom-6 left-6 right-6">
            <p className="font-display text-xs uppercase tracking-[0.4em] text-flame">Kisimenti · Kigali</p>
            <p className="mt-2 font-display text-3xl text-white">Hand-fired. Every patty. Every shift.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DeliveryStrip() {
  const items = [
    { label: "Vuba Vuba", href: DELIVERY.vubaVuba },
    { label: "Isokko", href: DELIVERY.isokko },
    { label: "Direct Delivery", href: `tel:${DELIVERY.directPhone.replace(/\s/g, "")}` },
    { label: "@burger_bros_kigali", href: DELIVERY.instagram },
  ];
  return (
    <section className="border-y border-white/10 bg-black py-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-3 px-6">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-flame">Get it your way</span>
        {items.map((i) => (
          <a key={i.label} href={i.href} target="_blank" rel="noreferrer" className="font-display text-lg tracking-wider text-white/80 hover:text-flame">
            {i.label}
          </a>
        ))}
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
    <section className="relative overflow-hidden bg-ink py-40">
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, rgba(255,69,0,0.35), transparent 60%)" }}
      />
      <Particles />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-display text-6xl text-white md:text-9xl">
          <span className="text-gradient-flame">Hungry yet?</span>
        </h2>
        <p className="mt-6 text-lg text-white/70">Order online in under 60 seconds. Pickup, dine-in, or delivered hot to your door.</p>
        <Link
          to="/order"
          className="mt-12 inline-block rounded-full bg-flame px-14 py-6 font-display text-2xl tracking-widest text-white animate-flame-pulse hover:scale-105 transition-transform"
        >
          START AN ORDER
        </Link>
      </div>
    </section>
  );
}

function BranchTeaser() {
  return (
    <section className="bg-ink py-32">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-xs font-semibold tracking-[0.4em] text-flame uppercase">Two Locations</p>
        <h2 className="mt-3 font-display text-5xl text-white md:text-6xl">Come find us.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {BRANCHES.map((b) => (
            <div key={b.id} className="rounded-3xl border border-white/10 bg-zinc-900/60 p-8">
              <p className="font-display text-3xl text-white">{b.name}</p>
              <p className="mt-2 text-white/60">{b.address}</p>
              <p className="mt-1 text-sm text-white/40">{b.hours}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {b.phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="rounded-full bg-flame px-5 py-2 text-xs font-bold tracking-widest text-white hover:bg-orange-600">
                    {p}
                  </a>
                ))}
                <a href={b.mapsUrl} target="_blank" rel="noreferrer" className="rounded-full border border-white/30 px-5 py-2 text-xs font-bold tracking-widest text-white hover:bg-white/10">
                  DIRECTIONS
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const ATMOSPHERE = [
  { src: atmInterior, alt: "Warm neon-lit interior of Burger Bros Kisimenti", label: "The Room" },
  { src: atmTakeaway, alt: "Hands holding a freshly wrapped Burger Bros burger", label: "To Go" },
  { src: atmSpread, alt: "Overhead table spread of burgers, fries and drinks", label: "The Spread" },
];

function Atmosphere() {
  return (
    <section className="relative bg-ink py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <p className="text-xs font-semibold tracking-[0.4em] text-flame uppercase">The Room</p>
          <h2 className="mt-3 font-display text-5xl text-white md:text-7xl">A place worth showing up for.</h2>
        </motion.div>
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {ATMOSPHERE.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl"
            >
              <img
                src={a.src}
                alt={a.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-flame">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-1 font-display text-3xl text-white">{a.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Sections() {
  return (
    <div className="bg-ink">
      <Hero />
      <DeliveryStrip />
      <Showcase />
      <Story />
      <BranchTeaser />
      <Atmosphere />
      <Testimonials />
      <OrderCTA />
    </div>
  );
}