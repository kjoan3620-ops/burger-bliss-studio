import { createFileRoute } from "@tanstack/react-router";
import { Sections } from "@/components/burger/sections";
import { SiteLayout } from "@/components/bb/Layout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Best Burger Kigali — Home of the Akabumbe" },
      { name: "description", content: "Home of the Akabumbe burger. Juicy burgers, wraps, wings & sandwiches in Kigali. Free delivery 8 AM–12 PM." },
      { property: "og:title", content: "Best Burger Kigali" },
      { property: "og:description", content: "Home of the Akabumbe — Kigali's best burger." },
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
