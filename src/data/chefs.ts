export type Chef = {
  tag: string;
  title: string;
  subtitle: string;
  image: string;
  loc: string;
};

export const CHEFS: Chef[] = [
  {
    tag: "HERITAGE RECIPE",
    title: "Master Tukaram",
    subtitle: "Slow-simmered homestyle Dal & warm rotis",
    image: "/images/chefs-corner/dish-marathi.jpg",
    loc: "Mumbai · 1890",
  },
  {
    tag: "TIFFIN SPECIAL",
    title: "Maharashtrian Misal",
    subtitle: "Sprouted bean curry & crispy farsan",
    image: "/images/chefs-corner/dish-1.jpg",
    loc: "Girgaon Hub",
  },
  {
    tag: "NORTH CLASSIC",
    title: "Dal Makhani Handi",
    subtitle: "Rich black lentils with churned butter",
    image: "/images/chefs-corner/dish-punjabi.jpg",
    loc: "Signature Dabba",
  },
  {
    tag: "HEAD CHEF",
    title: "Chef Sawant",
    subtitle: "Daily curated seasonal culinary thali",
    image: "/images/chefs-corner/dish-2.jpg",
    loc: "Dadar Kitchen",
  },
  {
    tag: "SOUTH INDIAN",
    title: "Steamed & Simple",
    subtitle: "Soft idli with sambar & coconut chutney",
    image: "/images/chefs-corner/dish-3.jpg",
    loc: "Matunga Kitchen",
  },
  {
    tag: "TANDOOR FIRED",
    title: "Chef Rekha",
    subtitle: "Smoky paneer tikka, char-grilled to order",
    image: "/images/chefs-corner/dish-4.jpg",
    loc: "Byculla Hub",
  },
  {
    tag: "PUNJABI COMFORT",
    title: "Chana Da Ghar",
    subtitle: "Spiced chickpea curry with tandoori naan",
    image: "/images/chefs-corner/dish-5.jpg",
    loc: "Colaba Kitchen",
  },
  {
    tag: "SWEET FINISH",
    title: "Chef Anand",
    subtitle: "Syrup-soaked gulab jamun, made fresh daily",
    image: "/images/chefs-corner/dish-6.jpg",
    loc: "Dadar Sweets",
  },
];
