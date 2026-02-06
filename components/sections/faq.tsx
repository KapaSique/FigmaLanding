"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqItems } from "@/data/faq";

export function FaqSection() {
  return (
    <div className="rounded-3xl border border-stone/40 bg-white/70 p-6 shadow-soft">
      <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">FAQ</p>
      <h3 className="mt-3 font-serif text-2xl text-ink">Частые вопросы</h3>
      <Accordion type="single" collapsible className="mt-4">
        {faqItems.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
