<p align="center">
  <img src="public/products/lesnaya-moroshka-preview.png" width="120" alt="Тапиола" />
</p>

<h1 align="center">Тапиола</h1>

<p align="center">
  <strong>Премиальный лендинг + мини-ecommerce для карельского бренда чая</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Radix_UI-latest-161618?logo=radixui&logoColor=white" alt="Radix UI" />
  <img src="https://img.shields.io/badge/Node.js-%3E%3D18-339933?logo=node.js&logoColor=white" alt="Node.js" />
</p>

---

## О проекте

**Тапиола** — DTC-лендинг для карельского бренда чая с полноценным каталогом, корзиной и оформлением заказа. Северные травы, ягоды и иван-чай — лесная магия в каждой чашке.

> Демо-магазин без реальных платежей. Оплата реализована как заглушка с возможностью подключения Stripe.

### Ключевые возможности

- **Лендинг** — Hero, история бренда, преимущества, отзывы, контакты
- **Каталог** — фильтрация по категориям, карточки товаров с вариантами веса
- **Корзина** — slide-over панель, подсчёт итогов, промокоды
- **Конструктор набора** — выбери 3 позиции и получи скидку 12%
- **Checkout** — форма с валидацией (React Hook Form + Zod)
- **Анимации** — плавные переходы и появления через Framer Motion

---

## Стек

| Слой | Технологии |
|------|------------|
| Фреймворк | Next.js 16 (App Router) |
| Язык | TypeScript 5 |
| Стили | Tailwind CSS 4, `tailwindcss-animate` |
| UI-компоненты | shadcn/ui (Radix UI + CVA) |
| Анимации | Framer Motion |
| Формы | React Hook Form + Zod |
| Стейт | Zustand + localStorage |
| Иконки | Lucide React |
| Уведомления | Sonner |
| Шрифты | Inter + Playfair Display |

---

## Быстрый старт

```bash
# Клонировать репозиторий
git clone <repo-url>
cd FigmaLanding

# Установить зависимости
npm install

# Запустить dev-сервер
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

---

## Запуск через Docker

```bash
# Собрать и запустить контейнер
docker compose up --build
```

Приложение будет доступно на [http://localhost:3000](http://localhost:3000).

Для остановки:

```bash
docker compose down
```

---

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск dev-сервера |
| `npm run build` | Production-сборка |
| `npm run start` | Запуск production-сервера |
| `npm run lint` | Линтинг (ESLint) |

---

## Структура проекта

```
FigmaLanding/
├── app/
│   ├── page.tsx              # Главная (лендинг)
│   ├── layout.tsx            # Root layout + шрифты + SEO
│   ├── globals.css           # Глобальные стили
│   ├── products/             # Страница каталога
│   ├── checkout/             # Оформление заказа
│   └── order/success/        # Успешный заказ
├── components/
│   ├── sections/             # Секции лендинга
│   │   ├── hero.tsx
│   │   ├── brand-story.tsx
│   │   ├── catalog.tsx
│   │   ├── benefits.tsx
│   │   ├── testimonials.tsx
│   │   └── contacts.tsx
│   ├── product/              # Компоненты товара
│   ├── checkout/             # Компоненты checkout
│   ├── bundle/               # Конструктор набора
│   ├── ui/                   # shadcn/ui компоненты
│   ├── cart-sheet.tsx         # Корзина (slide-over)
│   ├── site-header.tsx       # Шапка
│   └── site-footer.tsx       # Подвал
├── data/
│   ├── products.ts           # Каталог товаров (SKU)
│   ├── testimonials.ts       # Отзывы
│   ├── faq.ts                # FAQ
│   └── steps.ts              # Шаги заказа
├── store/
│   └── cart-store.ts         # Zustand-хранилище корзины
├── lib/
│   ├── checkout.ts           # Логика оформления заказа
│   ├── order.ts              # Генерация заказа
│   ├── format.ts             # Форматирование (цены и т.д.)
│   ├── seo.ts                # SEO-конфигурация
│   └── utils.ts              # Утилиты (cn и др.)
└── public/
    ├── products/             # Изображения товаров (SVG + WebP)
    └── brand/                # Брендовые иллюстрации
```

---

## Товары и контент

Все товары описаны в `data/products.ts`. Каждая позиция включает:

```typescript
{
  id: string;
  name: string;
  category: "Травяной чай" | "Ягодный чай" | "Иван-чай" | "Карельские сборы";
  tags: ProductTag[];
  description: string;
  ingredients: string;
  brew: { temperature, time, ratio, notes };
  variants: { id, label, weight, price }[];
  image: string;
}
```

Для добавления нового товара достаточно дополнить массив в `data/products.ts` и положить изображения в `public/products/`.

---

## Корзина и промокоды

- Состояние корзины хранится в **localStorage** через Zustand persist
- Промокод по умолчанию: **`TAP10`** (-10%)
- Конструктор набора: выбери **3 позиции** и получи скидку **12%**

---

## Оформление заказа

1. Пользователь заполняет форму (имя, телефон, адрес)
2. Валидация через **Zod**-схему
3. Генерируется уникальный `orderId`
4. Корзина очищается
5. Редирект на `/order/success`

> Оплата реализована как заглушка. Место для подключения Юкассы отмечено в `components/checkout/checkout-page.tsx`.

---

## Лицензия

Учебный проект. Все права на бренд и контент принадлежат владельцу репозитория.

_эщкере_
