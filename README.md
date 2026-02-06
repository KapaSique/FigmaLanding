# Тапиола — лендинг + мини‑ecommerce

Премиальный DTC‑лендинг для карельского бренда чая с каталогом, корзиной и checkout. Демо‑магазин без реальных платежей.

## Стек
- Next.js App Router + TypeScript
- TailwindCSS
- shadcn/ui
- Framer Motion
- Zustand + localStorage
- React Hook Form + Zod
- lucide-react

## Запуск
1. `npm install`
2. `npm run dev`
3. Откройте `http://localhost:3000`

## Скрипты
- `npm run dev` — dev сервер
- `npm run build` — production build
- `npm run start` — запуск production
- `npm run lint` — линт

## Структура
- `app/` — маршруты и страницы
- `components/` — UI и секции
- `data/` — контент (SKU, отзывы, FAQ)
- `lib/` — утилиты, SEO, checkout логика
- `store/` — состояние корзины
- `public/` — локальные ассеты

## Контент и товары
Добавляйте или редактируйте позиции в `data/products.ts`. Каждая позиция включает:
- категорию
- теги
- описание и ингредиенты
- рекомендации по завариванию
- варианты веса и цены

## Корзина и checkout
- Корзина хранится в `localStorage`.
- Промокод по умолчанию: `TAP10` (‑10%).
- Конструктор набора: 3 позиции со скидкой 12%.
- Оплата — заглушка. Место для подключения Stripe отмечено в `components/checkout/checkout-page.tsx`.

## Демо‑заказ
После оформления генерируется `orderId`, корзина очищается, происходит редирект на `/order/success`.
