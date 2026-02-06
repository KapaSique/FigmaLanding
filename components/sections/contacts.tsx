"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { FaqSection } from "@/components/sections/faq";

export function ContactsSection() {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("Спасибо! Мы ответим в течение 1–2 дней.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contacts" className="py-24">
      <div className="mx-auto max-w-6xl space-y-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-4"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
            Контакты
          </p>
          <h2 className="font-serif text-3xl text-ink sm:text-4xl">
            Напишите нам — подберём чай и формат подарка
          </h2>
          <p className="max-w-2xl text-base text-muted-foreground">
            Мы отвечаем лично и внимательно. Напишите, если хотите подборку,
            подарочный набор или оптовую партию.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onSubmit={handleSubmit}
            className="rounded-3xl border border-stone/40 bg-white/70 p-8 shadow-soft"
          >
            <div className="grid gap-4">
              <div>
                <label htmlFor="name" className="text-sm text-muted-foreground">
                  Имя
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Ваше имя"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm text-muted-foreground">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@email.com"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="text-sm text-muted-foreground"
                >
                  Сообщение
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Расскажите, какой чай вы ищете"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" size="lg">
                Отправить сообщение
              </Button>
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            className="space-y-6"
          >
            <div className="rounded-3xl border border-stone/40 bg-white/70 p-6 shadow-soft">
              <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
                Связаться
              </p>
              <p className="mt-3 font-serif text-2xl text-ink">
                Тапиола · Петрозаводск
              </p>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <p>hello@tapiola.ru</p>
                <p>Instagram: @tapiola.tea</p>
                <p>Telegram: @tapiola_tea</p>
              </div>
              <Separator className="my-4" />
              <p className="text-sm text-muted-foreground">
                Работаем с локальными поставщиками и бережно упаковываем каждый
                заказ.
              </p>
            </div>

            <FaqSection />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
