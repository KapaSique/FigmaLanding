import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { CatalogSection } from "@/components/sections/catalog";
import { BundleDialog } from "@/components/bundle/bundle-dialog";

export const metadata: Metadata = {
  title: "Каталог",
  description:
    "Витрина премиального карельского чая: травяные, ягодные и иван-чай. Подберите сбор по настроению.",
};

export default function ProductsPage() {
  return (
    <div>
      <section className="relative overflow-hidden pb-12 pt-16">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-moss/10 blur-3xl" />
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-wood/10 blur-3xl" />
        </div>
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
            Каталог
          </p>
          <h1 className="font-serif text-4xl text-ink sm:text-5xl">
            Коллекция карельских чаёв Тапиола
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground">
            Травяные, ягодные и иван-чай — каждый купаж создан вручную в малых
            партиях, чтобы сохранить аромат и свежесть.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/checkout">Оформить заказ</Link>
            </Button>
            <BundleDialog>
              <Button variant="outline" size="lg">
                Собрать набор
              </Button>
            </BundleDialog>
          </div>
        </div>
      </section>

      <CatalogSection />
    </div>
  );
}
