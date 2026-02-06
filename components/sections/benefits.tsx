"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Gift, Leaf, Package, Sparkles, Truck } from "lucide-react";

const benefits = [
  {
    title: "Натуральные ингредиенты",
    description: "Чистые травы и ягоды без ароматизаторов.",
    icon: Leaf,
  },
  {
    title: "Сборы из северных трав",
    description: "Карельские травы с ярким, но мягким вкусом.",
    icon: Sparkles,
  },
  {
    title: "Упаковка с сохранением аромата",
    description: "Герметичная банка и пакет с защитой от света.",
    icon: Package,
  },
  {
    title: "Прозрачный состав",
    description: "Каждый ингредиент на виду — никаких секретов.",
    icon: BadgeCheck,
  },
  {
    title: "Подарочные наборы",
    description: "Соберите персональный сет из трёх вкусов.",
    icon: Gift,
  },
  {
    title: "Быстрая доставка",
    description: "По России и СНГ — бережно и аккуратно.",
    icon: Truck,
  },
];

export function BenefitsSection() {
  return (
    <section id="benefits" className="py-24">
      <div className="mx-auto max-w-6xl space-y-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-4"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
            Почему выбирают нас
          </p>
          <h2 className="font-serif text-3xl text-ink sm:text-4xl">
            Забота о вкусе, прозрачность в каждой детали
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.05 }}
                className="rounded-3xl border border-stone/40 bg-white/70 p-6 shadow-soft"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sand/70 text-moss">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-serif text-xl text-ink">{benefit.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="rounded-3xl border border-stone/40 bg-sand/60 p-6 text-sm text-muted-foreground">
          Мы собираем сырьё бережно и работаем с локальными партнёрами, чтобы
          сохранить природный баланс и поддерживать устойчивые практики.
        </div>
      </div>
    </section>
  );
}
