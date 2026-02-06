"use client";

import { motion } from "framer-motion";

import { processSteps } from "@/data/steps";

export function BrandStorySection() {
  return (
    <section id="brand" className="py-24">
      <div className="mx-auto max-w-6xl space-y-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
              О бренде
            </p>
            <h2 className="font-serif text-3xl text-ink sm:text-4xl">
              Сборы из северных трав — уважение к лесу и ритму природы.
            </h2>
            <p className="text-base text-muted-foreground">
              Мы работаем с локальными поставщиками и собираем сырьё вручную в
              карельских лесах. Каждая партия создаётся малыми тиражами, чтобы
              сохранить свежесть и характер ингредиентов.
            </p>
          </div>
          <div className="rounded-3xl border border-stone/40 bg-white/70 p-6 text-base text-muted-foreground shadow-soft">
            <p>
              “Мы верим, что чай — это не только вкус, но и тишина. Каждая чашка
              должна возвращать к природе, а не отвлекать от неё.”
            </p>
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.05 }}
              className="rounded-3xl border border-stone/40 bg-white/70 p-6 shadow-soft"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {step.id.replace("step-", "0")}
              </p>
              <h3 className="mt-3 font-serif text-xl text-ink">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
