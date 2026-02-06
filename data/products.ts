export type ProductCategory =
  | "Травяной чай"
  | "Ягодный чай"
  | "Иван-чай"
  | "Карельские сборы";

export type ProductTag =
  | "без кофеина"
  | "вечерний"
  | "лесные ягоды"
  | "мёд и травы"
  | "бодрит"
  | "расслабляет";

export type BrewGuide = {
  temperature: string;
  time: string;
  ratio: string;
  notes?: string;
};

export type ProductVariant = {
  id: string;
  label: string;
  weight: number;
  price: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  tags: ProductTag[];
  shortDescription: string;
  ingredients: string;
  notes: string[];
  when: string;
  brew: BrewGuide;
  variants: ProductVariant[];
  image: string;
};

const variant = (id: string, weight: number, price: number): ProductVariant => ({
  id,
  label: `${weight} г`,
  weight,
  price,
});

export const products: Product[] = [
  {
    id: "tapiola-ivan-north",
    slug: "ivan-chai-severny",
    name: "Иван-чай Северный",
    category: "Иван-чай",
    tags: ["без кофеина", "бодрит"],
    shortDescription: "Чистый лист иван-чая с мягкой карамельной сладостью.",
    ingredients: "Лист иван-чая ферментированный.",
    notes: ["сухофрукты", "мёд", "ржаная корочка"],
    when: "Утро и дневные паузы.",
    brew: {
      temperature: "90°C",
      time: "6–8 минут",
      ratio: "2 ч. л. на 250 мл",
      notes: "Можно заваривать повторно до 2 раз.",
    },
    variants: [variant("ivan-north-50", 50, 590), variant("ivan-north-100", 100, 990)],
    image: "/products/ivan-chai-severny.webp",
  },
  {
    id: "tapiola-cloudberry",
    slug: "lesnaya-moroshka",
    name: "Лесная морошка",
    category: "Ягодный чай",
    tags: ["лесные ягоды", "вечерний", "без кофеина"],
    shortDescription: "Тёплый ягодный профиль с северной кислинкой и ванилью.",
    ingredients: "Морошка, яблоко, шиповник, лепестки календулы.",
    notes: ["морошка", "печёное яблоко", "ваниль"],
    when: "Вечер и уютные чаепития.",
    brew: {
      temperature: "95°C",
      time: "7–9 минут",
      ratio: "2–3 ч. л. на 300 мл",
    },
    variants: [variant("cloudberry-50", 50, 640), variant("cloudberry-100", 100, 1090)],
    image: "/products/lesnaya-moroshka.webp",
  },
  {
    id: "tapiola-bilberry-pine",
    slug: "chernika-i-hvoya",
    name: "Черника и хвоя",
    category: "Карельские сборы",
    tags: ["лесные ягоды", "бодрит"],
    shortDescription: "Смолистые ноты хвои и сочная черника для свежего старта.",
    ingredients: "Черника, сосновая хвоя, таволга, лист брусники.",
    notes: ["черника", "смола", "северные травы"],
    when: "Утро и дневная концентрация.",
    brew: {
      temperature: "92°C",
      time: "6–7 минут",
      ratio: "2 ч. л. на 250 мл",
    },
    variants: [variant("bilberry-pine-50", 50, 670), variant("bilberry-pine-100", 100, 1160)],
    image: "/products/chernika-i-hvoya.webp",
  },
  {
    id: "tapiola-taiga-herbs",
    slug: "taezhnye-travy",
    name: "Таёжные травы",
    category: "Травяной чай",
    tags: ["расслабляет", "вечерний"],
    shortDescription: "Лёгкий травяной купаж с мягкими цветочными оттенками.",
    ingredients: "Кипрей, душица, зверобой, ромашка.",
    notes: ["луговые травы", "цветочный мёд", "сухие травы"],
    when: "Вечер и отдых.",
    brew: {
      temperature: "90°C",
      time: "5–6 минут",
      ratio: "2 ч. л. на 250 мл",
    },
    variants: [variant("taiga-50", 50, 520), variant("taiga-100", 100, 890)],
    image: "/products/taezhnye-travy.webp",
  },
  {
    id: "tapiola-rowan-dawn",
    slug: "ryabinovy-rassvet",
    name: "Рябиновый рассвет",
    category: "Ягодный чай",
    tags: ["бодрит", "лесные ягоды"],
    shortDescription: "Яркий вкус рябины, яблока и лёгких пряностей.",
    ingredients: "Рябина, яблоко, корица, лепестки василька.",
    notes: ["рябина", "специи", "яблочный компот"],
    when: "Дневные паузы и встречи.",
    brew: {
      temperature: "95°C",
      time: "6–8 минут",
      ratio: "2–3 ч. л. на 300 мл",
    },
    variants: [variant("rowan-50", 50, 610), variant("rowan-100", 100, 1050)],
    image: "/products/ryabinovy-rassvet.webp",
  },
  {
    id: "tapiola-rosehip-honey",
    slug: "medovy-shipovnik",
    name: "Медовый шиповник",
    category: "Ягодный чай",
    tags: ["без кофеина", "мёд и травы"],
    shortDescription: "Согревающий настой с шиповником и легкой медовой сладостью.",
    ingredients: "Шиповник, липовый цвет, ройбуш, яблоко.",
    notes: ["шиповник", "липовый мёд", "карамель"],
    when: "Поздний вечер и расслабление.",
    brew: {
      temperature: "96°C",
      time: "8–10 минут",
      ratio: "2–3 ч. л. на 300 мл",
    },
    variants: [variant("rosehip-50", 50, 630), variant("rosehip-100", 100, 1090)],
    image: "/products/medovy-shipovnik.webp",
  },
  {
    id: "tapiola-mint-melissa",
    slug: "myata-i-severnaya-melissa",
    name: "Мята и северная мелисса",
    category: "Травяной чай",
    tags: ["расслабляет", "вечерний", "без кофеина"],
    shortDescription: "Чистый травяной профиль с холодной свежестью мяты.",
    ingredients: "Мята перечная, мелисса, лист малины.",
    notes: ["мята", "лайм", "лесная прохлада"],
    when: "Вечер и спокойные разговоры.",
    brew: {
      temperature: "88°C",
      time: "4–5 минут",
      ratio: "1–2 ч. л. на 200 мл",
    },
    variants: [variant("mint-50", 50, 490), variant("mint-100", 100, 840)],
    image: "/products/myata-i-severnaya-melissa.webp",
  },
  {
    id: "tapiola-cranberry-heather",
    slug: "klyukva-i-veresk",
    name: "Клюква и вереск",
    category: "Карельские сборы",
    tags: ["лесные ягоды", "бодрит"],
    shortDescription: "Яркая клюква в балансе с сухими травяными нотами.",
    ingredients: "Клюква, вереск, лист смородины, яблоко.",
    notes: ["клюква", "вереск", "северный воздух"],
    when: "Утро и дневные перерывы.",
    brew: {
      temperature: "94°C",
      time: "6–7 минут",
      ratio: "2 ч. л. на 250 мл",
    },
    variants: [variant("cranberry-50", 50, 660), variant("cranberry-100", 100, 1130)],
    image: "/products/klyukva-i-veresk.webp",
  },
  {
    id: "tapiola-pine-fresh",
    slug: "sosnovaya-svezhest",
    name: "Сосновая свежесть",
    category: "Карельские сборы",
    tags: ["бодрит", "мёд и травы"],
    shortDescription: "Травяно-смолистый аромат с лёгкой сладостью.",
    ingredients: "Сосновая хвоя, кипрей, чабрец, лепестки подсолнечника.",
    notes: ["хвоя", "чабрец", "лесной мёд"],
    when: "Утро и прогулки.",
    brew: {
      temperature: "90°C",
      time: "5–6 минут",
      ratio: "2 ч. л. на 250 мл",
    },
    variants: [variant("pine-50", 50, 620), variant("pine-100", 100, 1080)],
    image: "/products/sosnovaya-svezhest.webp",
  },
  {
    id: "tapiola-northern-chaga",
    slug: "severny-sbor-s-chagoi",
    name: "Северный сбор с чагой",
    category: "Карельские сборы",
    tags: ["без кофеина", "вечерний"],
    shortDescription: "Глубокий вкус с древесными и грибными нюансами.",
    ingredients: "Чага, лист смородины, шиповник, кипрей.",
    notes: ["деревесные ноты", "сухие ягоды", "дымка"],
    when: "Вечер и неспешные чтения.",
    brew: {
      temperature: "96°C",
      time: "8–10 минут",
      ratio: "2 ч. л. на 300 мл",
    },
    variants: [variant("chaga-50", 50, 690), variant("chaga-100", 100, 1190)],
    image: "/products/severny-sbor-s-chagoi.webp",
  },
  {
    id: "tapiola-ivan-lingon",
    slug: "ivan-chai-s-brusnikoi",
    name: "Иван-чай с брусникой",
    category: "Иван-чай",
    tags: ["лесные ягоды", "бодрит"],
    shortDescription: "Ферментированный кипрей с сочной брусничной кислинкой.",
    ingredients: "Иван-чай, брусника, лепестки розы.",
    notes: ["брусника", "карамель", "лёгкая кислинка"],
    when: "Днём и на вкусные паузы.",
    brew: {
      temperature: "90°C",
      time: "6–7 минут",
      ratio: "2 ч. л. на 250 мл",
    },
    variants: [variant("ivan-lingon-50", 50, 640), variant("ivan-lingon-100", 100, 1090)],
    image: "/products/ivan-chai-s-brusnikoi.webp",
  },
  {
    id: "tapiola-white-night",
    slug: "belaya-noch",
    name: "Белая ночь",
    category: "Травяной чай",
    tags: ["расслабляет", "вечерний", "мёд и травы"],
    shortDescription: "Нежный цветочный купаж с мягкой сливочной ноткой.",
    ingredients: "Липовый цвет, ромашка, таволга, лепестки жасмина.",
    notes: ["белые цветы", "сливочность", "ваниль"],
    when: "Поздний вечер.",
    brew: {
      temperature: "88°C",
      time: "4–5 минут",
      ratio: "1–2 ч. л. на 200 мл",
    },
    variants: [variant("white-night-50", 50, 540), variant("white-night-100", 100, 920)],
    image: "/products/belaya-noch.webp",
  },
];

export const categories: ProductCategory[] = [
  "Травяной чай",
  "Ягодный чай",
  "Иван-чай",
  "Карельские сборы",
];

export const tags: ProductTag[] = [
  "без кофеина",
  "бодрит",
  "расслабляет",
  "вечерний",
  "лесные ягоды",
  "мёд и травы",
];
