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
  // Burgers — the Best Burger lineup
  { id: "akabumbe", name: "Akabumbe Burger", category: "burger", price: 8500, description: "Our signature. Stacked beef, melted cheese, secret Akabumbe sauce, toasted bun — the one everyone comes back for.", image: bbDrunken, bestSeller: true },
  { id: "classic-beef", name: "Classic Beef Burger", category: "burger", price: 6500, description: "Juicy seasoned beef patty, lettuce, tomato, onions, house sauce.", image: bbGourmet, bestSeller: true },
  { id: "cheese-burger", name: "Cheese Burger", category: "burger", price: 7000, description: "Flame-grilled beef patty smothered in melted cheddar.", image: bbBlue, bestSeller: true },
  { id: "chicken-katsu", name: "Chicken Katsu Burger", category: "burger", price: 7500, description: "Crispy on the outside, juicy on the inside — panko chicken, slaw, spicy mayo.", image: bbTokyo, bestSeller: true },
  { id: "double-cheese", name: "Double Cheese Burger", category: "burger", price: 9000, description: "Two beef patties, double cheese, double pickles, double trouble.", image: bbChampions },
  { id: "veggie-falafel", name: "Veggie Falafel Burger", category: "burger", price: 6500, description: "Spiced falafel patty, tahini, fresh veg. Fully vegetarian.", image: bbFalafel },
  { id: "fish-burger", name: "Crispy Fish Burger", category: "burger", price: null, description: "Battered fish fillet, tartar sauce, lettuce. Ask for availability.", image: bbFish },

  // Wraps & Sandwiches
  { id: "chicken-wrap", name: "Chicken Wrap", category: "taco", price: 6000, description: "Grilled chicken, fresh veg, garlic sauce wrapped in a soft tortilla.", image: bbKatsuTacos },
  { id: "beef-sandwich", name: "Beef Sandwich", category: "taco", price: 6500, description: "Tender beef strips, caramelised onions, cheese in toasted bread.", image: bbBeefTacos },

  // Sides + Wings
  { id: "fries", name: "Crispy Fries (Large)", category: "side", price: 3000, description: "Golden, hand-cut, lightly salted.", image: bbFries },
  { id: "wings", name: "Chicken Wings", category: "wings", price: 6500, description: "Juicy, saucy, addictive. Choose mild or spicy.", image: bbWings, bestSeller: true },

  // Combos & Packs
  { id: "lunch-pack", name: "Best Burger Lunch Pack", category: "pack", price: 7000, description: "Burger + fries + drink. The midday move.", image: bbLunchPack },
  { id: "breakfast-pack", name: "Egg & Bacon Pack", category: "pack", price: 6500, description: "Fried egg, crispy bacon, hash — fueled up by 9 AM.", image: bbEggBacon },
  { id: "family-combo", name: "Family Combo Pack", category: "pack", price: 35000, description: "4 burgers, 2 wings buckets, 2 large fries, 4 drinks. Built to share.", image: bbCombo, bestSeller: true },

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
  taco: "Wraps & Sandwiches",
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
    id: "kgfl",
    name: "KGFL Kigali",
    address: "Kigali Gourmet Foods Lab (KGFL), Kigali, Rwanda",
    phones: ["+250 788 218 567", "+250 795 579 050"],
    hours: "Daily · Free delivery 8 AM – 12 PM",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Kigali+Gourmet+Foods+Lab",
  },
] as const;

export const DELIVERY = {
  directPhone: "+250 788 218 567",
  altPhone: "+250 795 579 050",
  whatsapp: "+250788218567", // primary WhatsApp line
  whatsappAlt: "+250795579050",
  instagram: "https://instagram.com/bestburger_kgl",
  tiktok: "https://www.tiktok.com/@bestburger_kgl",
  freeDeliveryWindow: "8 AM – 12 PM, daily",
};