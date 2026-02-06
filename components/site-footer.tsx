import Link from "next/link";

import { NewsletterSection } from "@/components/sections/newsletter";

const footerLinks = [
  { label: "Каталог", href: "/products" },
  { label: "Оформление заказа", href: "/checkout" },
  { label: "О бренде", href: "/#brand" },
  { label: "Преимущества", href: "/#benefits" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-stone/40 bg-white/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr_1fr]">
        <div className="space-y-4">
          <p className="font-serif text-2xl text-ink">Тапиола</p>
          <p className="text-sm text-muted-foreground">
            Карельский чай с характером северного леса. Собираем бережно,
            завариваем красиво.
          </p>
          <div className="text-sm text-muted-foreground">
            Петрозаводск · hello@tapiola.ru
          </div>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="https://instagram.com" className="hover:text-ink">
              Instagram
            </Link>
            <Link href="https://t.me" className="hover:text-ink">
              Telegram
            </Link>
          </div>
        </div>

        <div className="space-y-3 text-sm text-muted-foreground">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink">
            Навигация
          </p>
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="block hover:text-ink">
              {link.label}
            </Link>
          ))}
        </div>

        <NewsletterSection />
      </div>

      <div className="border-t border-stone/30 py-6 text-center text-xs text-muted-foreground">
        © 2026 Тапиола. Все права защищены.
      </div>
    </footer>
  );
}
