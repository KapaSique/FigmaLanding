"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { loadOrder, type OrderSummary } from "@/lib/order";

export function OrderSuccess() {
  const searchParams = useSearchParams();
  const [order, setOrder] = React.useState<OrderSummary | null>(null);

  React.useEffect(() => {
    setOrder(loadOrder());
  }, []);

  const orderId = searchParams.get("orderId") || order?.id || "TAP-XXXX";
  const total = order?.total;
  const items = order?.items;

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <div className="rounded-3xl border border-stone/40 bg-white/70 p-10 shadow-soft">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Заказ оформлен
        </p>
        <h1 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">
          Спасибо за заказ!
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          Мы получили заявку и скоро свяжемся для подтверждения деталей.
        </p>

        <div className="mt-8 grid gap-4 rounded-2xl border border-stone/40 bg-sand/60 p-6 text-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-muted-foreground">Номер заказа</span>
            <span className="font-semibold text-ink">{orderId}</span>
          </div>
          {typeof total === "number" && (
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-muted-foreground">Сумма</span>
              <span className="font-semibold text-ink">{formatPrice(total)}</span>
            </div>
          )}
          {typeof items === "number" && (
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-muted-foreground">Позиций</span>
              <span className="font-semibold text-ink">{items}</span>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/products">Вернуться в каталог</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">На главную</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
