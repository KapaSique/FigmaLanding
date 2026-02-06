"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { BundleDialog } from "@/components/bundle/bundle-dialog";

const featuredCollection = [
  {
    name: "Лесная морошка",
    image: "/products/lesnaya-moroshka.webp",
  },
  {
    name: "Черника и хвоя",
    image: "/products/chernika-i-hvoya.webp",
  },
  {
    name: "Таёжные травы",
    image: "/products/taezhnye-travy.webp",
  },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-24 pt-20">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-moss/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-[30rem] w-[30rem] rounded-full bg-wood/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-sand/40 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <p className="text-xs uppercase tracking-[0.5em] text-muted-foreground">
            Чай из Карелии
          </p>
          <h1 className="font-serif text-4xl leading-tight text-ink sm:text-5xl lg:text-6xl">
            Чай из лесов Карелии. Тишина, собранная в чашке.
          </h1>
          <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
            Натуральные сборы с северными травами, ягодами и иван-чаем.
            Тёплые ароматы, деликатный вкус и премиальная эстетика в каждой
            партии.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/products">Каталог</Link>
            </Button>
            <BundleDialog>
              <Button variant="outline" size="lg">
                Собрать набор
              </Button>
            </BundleDialog>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[32px] border border-stone/40 bg-white/70 p-8 shadow-soft">
            <div className="absolute inset-0 bg-gradient-to-br from-sand/70 via-white/60 to-transparent" />
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
                <span>Коллекция</span>
                <span>2026</span>
              </div>
              <p className="font-serif text-3xl text-ink">Лесная коллекция</p>
              <p className="text-sm text-muted-foreground">
                Мягкая палитра северных трав и ягод. Сбалансированные купажи для
                спокойного ритма.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {featuredCollection.map((item) => (
                  <Link
                    key={item.name}
                    href="/products"
                    className="group relative h-24 overflow-hidden rounded-2xl border border-stone/30 bg-sand/60"
                    aria-label={`Открыть каталог: ${item.name}`}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(min-width: 640px) 200px, 100vw"
                      className="object-cover transition duration-500 ease-soft group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                    <span className="absolute bottom-2 left-3 text-xs font-medium text-white">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <Image
              src="/brand/botanical-1.svg"
              alt="Ботанический силуэт"
              width={320}
              height={320}
              className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 opacity-40"
            />
            <Image
              src="/brand/botanical-2.svg"
              alt="Ботанический силуэт"
              width={260}
              height={260}
              className="pointer-events-none absolute -bottom-12 left-6 h-48 w-48 opacity-30"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
