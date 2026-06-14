import { createFileRoute } from "@tanstack/react-router";
import { Sections } from "@/components/burger/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flamecraft Burgers — Built Different. Eaten Better." },
      { name: "description", content: "Flame-fired premium burgers crafted by hand. Order online, ready in ten." },
      { property: "og:title", content: "Flamecraft Burgers" },
      { property: "og:description", content: "Flame-fired premium burgers crafted by hand." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return <Sections />;
}
