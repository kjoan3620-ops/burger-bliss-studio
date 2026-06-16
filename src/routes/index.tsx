import { createFileRoute } from "@tanstack/react-router";
import { Sections } from "@/components/burger/sections";
import { SiteLayout } from "@/components/bb/Layout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Burger Bros Kisimenti — Kigali's Juiciest Burgers" },
      { name: "description", content: "Juicy, bold, unforgettable burgers in Kigali. Order online, pickup or get delivered. Kisimenti & Nyamirambo." },
      { property: "og:title", content: "Burger Bros Kisimenti" },
      { property: "og:description", content: "Kigali's juiciest burgers — fast, bold, unforgettable." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <Sections />
    </SiteLayout>
  );
}
