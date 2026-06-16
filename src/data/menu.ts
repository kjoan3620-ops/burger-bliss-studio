import bbHero from "@/assets/bb-hero.jpg";
import bbGourmet from "@/assets/bb-gourmet-cheeseburger.jpg";
import bbTokyo from "@/assets/bb-tokyo-katsu.jpg";
import bbDrunken from "@/assets/bb-drunken-granny.jpg";
import bbChampions from "@/assets/bb-champions-breakfast.jpg";
import bbBlue from "@/assets/bb-bluecheese.jpg";
import bbFalafel from "@/assets/bb-falafel.jpg";
import bbFish from "@/assets/bb-fish.jpg";
import bbKatsuTacos from "@/assets/bb-katsu-tacos.jpg";
import bbBeefTacos from "@/assets/bb-beef-tacos.jpg";
import bbFries from "@/assets/bb-fries.jpg";
import bbWings from "@/assets/bb-wings.jpg";
import bbLunchPack from "@/assets/bb-lunch-pack.jpg";
import bbEggBacon from "@/assets/bb-egg-bacon-pack.jpg";
import bbCombo from "@/assets/bb-combo.jpg";

export type MenuCategory =
  | "best"
  | "burger"
  | "taco"
  | "side"
  | "wings"
  | "pack"
  | "beverage";

export type MenuItem = {
  id: string;
  name: string;
  category: MenuCategory;
  price: number | null;
  description?: string;
  image?: string;
  bestSeller?: boolean;
};

export const HERO_IMAGE = bbHero;

export const MENU: MenuItem[] = [
  // Burgers
  { id: "gourmet-cheeseburger", name: "Gourmet Cheeseburger", category: "burger", price: 7500, description: "Double beef patty, tomato, cheddar, brioche bun, chips & sauce.", image: bbGourmet, bestSeller: true },
  { id: "tokyo-katsu", name: "Tokyo Chicken Katsu Burger", category: "burger", price: 8500, description: "Crispy panko chicken, slaw, tonkatsu glaze.", image: bbTokyo, bestSeller: true },
  { id: "drunken-granny", name: "Drunken Granny Burger", category: "burger", price: 9000, description: "Stacked double beef, caramelised onions, whiskey glaze.", image: bbDrunken, bestSeller: true },
  { id: "champions-breakfast", name: "Champions Breakfast Burger", category: "burger", price: 8000, description: "Beef patty, fried egg, bacon, melted cheddar.", image: bbChampions },
  { id: "bluecheese", name: "Bluecheese Burger", category: "burger", price: 9000, description: "Juicy beef, blue cheese crumble, caramelised onions.", image: bbBlue },
  { id: "moroccan-falafel", name: "Moroccan Falafel Burger", category: "burger", price: 8000, description: "Spiced falafel, tahini, pickled veg. Veggie.", image: bbFalafel },
  { id: "crispy-fish", name: "Crispy Fish Burger", category: "burger", price: null, description: "Battered fish fillet, tartar, lettuce. Ask in store.", image: bbFish },

  // Tacos
  { id: "katsu-tacos", name: "Chicken Katsu Tacos", category: "taco", price: 8500, description: "Crispy chicken, slaw, spicy mayo, soft tortillas.", image: bbKatsuTacos },
  { id: "beef-tacos", name: "Cheesy Beef Tacos", category: "taco", price: 7500, description: "Seasoned beef, melted cheese, fresh cilantro.", image: bbBeefTacos },

  // Sides + Wings
  { id: "fries", name: "Potato Chips (Large)", category: "side", price: 3500, description: "Golden, hand-cut, sea salt.", image: bbFries },
  { id: "wings", name: "Chicken Wings", category: "wings", price: 7500, description: "Juicy, saucy, addictive. (Dine-in 7,000)", image: bbWings, bestSeller: true },

  // Packs
  { id: "lunch-pack", name: "Burger Bros Lunch Pack", category: "pack", price: 7000, description: "Burger + fries + drink. One pack.", image: bbLunchPack },
  { id: "egg-bacon-pack", name: "Egg & Bacon Lunch Pack", category: "pack", price: 7000, description: "Fried egg, crispy bacon, hash. One pack.", image: bbEggBacon },
  { id: "ultimate-combo", name: "Ultimate BB Combo Pack", category: "pack", price: 46000, description: "The feast — burgers, wings, fries, tacos, drinks. Built for the crew.", image: bbCombo, bestSeller: true },

  // Beverages
  { id: "exo", name: "EXO", category: "beverage", price: 3000 },
  { id: "smirnoff-guarana", name: "Smirnoff Guarana", category: "beverage", price: 2500 },
  { id: "smirnoff-ice", name: "Smirnoff Ice", category: "beverage", price: 4000 },
  { id: "brok", name: "Brok", category: "beverage", price: 3000 },
  { id: "savanna", name: "Savanna Cider", category: "beverage", price: 3500 },
  { id: "carlsberg", name: "Carlsberg", category: "beverage", price: 3000 },
  { id: "guinness", name: "Guinness", category: "beverage", price: 2500 },
  { id: "skol-pulse", name: "Skol Pulse", category: "beverage", price: 1500 },
  { id: "virunga-mist", name: "Virunga Mist", category: "beverage", price: 1500 },
  { id: "virunga-gold", name: "Virunga Gold", category: "beverage", price: 1500 },
  { id: "heineken", name: "Heineken", category: "beverage", price: 2000 },
  { id: "mutzig", name: "Mützig", category: "beverage", price: 1500 },
  { id: "amstel", name: "Amstel", category: "beverage", price: 2000 },
  { id: "detox", name: "Detox Juice", category: "beverage", price: 3500 },
  { id: "mango-smoothie", name: "Mango Smoothie", category: "beverage", price: 3500 },
  { id: "banana-smoothie", name: "Banana Smoothie", category: "beverage", price: 3500 },
  { id: "watermelon-mojito", name: "Watermelon Mojito", category: "beverage", price: 3000 },
  { id: "mixed-juice", name: "Mixed Fruit Juice", category: "beverage", price: 3000 },
  { id: "passion-juice", name: "Passion Fruit Juice", category: "beverage", price: 3500 },
  { id: "mango-juice", name: "Mango Juice", category: "beverage", price: 3000 },
  { id: "orange-juice", name: "Orange Juice", category: "beverage", price: 3000 },
  { id: "pineapple-juice", name: "Pineapple Juice", category: "beverage", price: 3000 },
  { id: "coke", name: "Coca Cola", category: "beverage", price: 1500 },
];

export const CATEGORY_LABELS: Record<MenuCategory, string> = {
  best: "Best Sellers",
  burger: "Burgers",
  taco: "Tacos",
  side: "Sides",
  wings: "Wings",
  pack: "Packs",
  beverage: "Beverages",
};

export function formatRWF(n: number | null | undefined): string {
  if (n == null) return "Ask in store";
  return "RWF " + n.toLocaleString("en-US");
}

export const BRANCHES = [
  {
    id: "kisimenti",
    name: "Kisimenti",
    address: "House 1, KG 115 St, Kigali, Rwanda",
    phones: ["+250 795 288 854", "+250 795 301 311"],
    hours: "12:00 PM – 11:30 PM, daily",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Burger+Bros+Kisimenti+Kigali",
  },
  {
    id: "nyamirambo",
    name: "Nyamirambo",
    address: "Nyamirambo, Kigali, Rwanda",
    phones: ["+250 786 859 786"],
    hours: "12:00 PM – 11:30 PM, daily",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Burger+Bros+Nyamirambo+Kigali",
  },
] as const;

export const DELIVERY = {
  vubaVuba: "https://vubavuba.rw",
  isokko: "https://isokko.com",
  directPhone: "+250 789 286 766",
  whatsapp: "+250795288854", // primary line for WhatsApp orders
  instagram: "https://instagram.com/burger_bros_kigali",
};