"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, ShoppingBag } from "lucide-react";

import { CartSheet } from "@/components/cart-sheet";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";

const navItems = [
  { label: "О бренде", href: "/#brand" },
  { label: "Чаи", href: "/#catalog" },
  { label: "Преимущества", href: "/#benefits" },
  { label: "Отзывы", href: "/#testimonials" },
  { label: "Контакты", href: "/#contacts" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const items = useCartStore((state) => state.items);

  React.useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const count = mounted ? items.reduce((sum, item) => sum + item.qty, 0) : 0;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all",
        scrolled ? "glass shadow-soft" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-stone/40 bg-white/80">
            <span className="font-serif text-lg text-pine">Т</span>
          </div>
          <div>
            <p className="font-serif text-xl text-ink">Тапиола</p>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Карельский чай
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted-foreground lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Открыть меню"
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <SheetHeader>
                <SheetTitle className="font-serif text-xl text-ink">
                  Навигация
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-4 text-sm text-muted-foreground">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="transition hover:text-ink"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <Button asChild size="lg" className="mt-6 w-full">
                <Link href="/products">Каталог</Link>
              </Button>
            </SheetContent>
          </Sheet>
          <Button asChild variant="ghost" className="hidden lg:inline-flex">
            <Link href="/products">Каталог</Link>
          </Button>
          <CartSheet>
            <Button
              variant="outline"
              size="icon"
              aria-label="Открыть корзину"
              className="relative"
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-moss text-[10px] font-semibold text-white">
                  {count}
                </span>
              )}
            </Button>
          </CartSheet>
        </div>
      </div>
    </header>
  );
}
