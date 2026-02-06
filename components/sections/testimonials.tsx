"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24">
      <div className="mx-auto max-w-6xl space-y-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-4"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
            Отзывы
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-serif text-3xl text-ink sm:text-4xl">
              Нас выбирают за честный вкус
            </h2>
            <div className="flex items-center gap-2 rounded-full border border-stone/40 bg-white/70 px-4 py-2 text-sm">
              <div className="flex items-center gap-1 text-wood">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-wood" />
                ))}
              </div>
              <span className="font-medium text-ink">4.8/5</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Отзывы собраны из заказов и дегустаций.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.05 }}
              className="rounded-3xl border border-stone/40 bg-white/70 p-6 shadow-soft"
            >
              <p className="text-sm text-muted-foreground">“{testimonial.text}”</p>
              <div className="mt-4 text-sm font-medium text-ink">
                {testimonial.name} · {testimonial.city}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
