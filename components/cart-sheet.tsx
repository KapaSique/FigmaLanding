"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { formatPrice } from "@/lib/format";
import { PROMO_CODE, useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";

export function CartSheet({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const items = useCartStore((state) => state.items);
  const updateQty = useCartStore((state) => state.updateQty);
  const removeItem = useCartStore((state) => state.removeItem);
  const applyPromo = useCartStore((state) => state.applyPromo);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const discount = useCartStore((state) => state.getDiscount());

  const [promo, setPromo] = React.useState("");

  const total = subtotal - discount;

  const handlePromo = () => {
    const result = applyPromo(promo);
    if (result.valid) {
      toast.success(`Промокод ${PROMO_CODE} активирован. Скидка 10%.`);
    } else {
      toast.error("Промокод не найден. [TAP10]");
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className={cn("flex h-full flex-col", className)}>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" /> Корзина
          </SheetTitle>
          <SheetDescription>
            {items.length
              ? `В корзине ${items.length} позиций.`
              : "Корзина пока пуста."}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 flex-1 space-y-4 overflow-y-auto pr-2">
          {items.length === 0 && (
            <div className="rounded-2xl border border-dashed border-stone/50 p-6 text-sm text-muted-foreground">
              Добавьте чай в корзину, чтобы оформить заказ.
            </div>
          )}

          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 rounded-2xl border border-stone/30 bg-white/60 p-4"
            >
              <div className="relative h-14 w-14 rounded-xl bg-sand/70">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="56px"
                    className="rounded-xl object-cover"
                  />
                ) : null}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-ink">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.variantLabel}</p>
                    {item.meta?.items?.length ? (
                      <p className="mt-1 text-xs text-muted-foreground">
                        {item.meta.items.join(" • ")}
                      </p>
                    ) : null}
                  </div>
                  <button
                    className="rounded-full p-1 text-muted-foreground transition hover:text-ink"
                    aria-label={`Удалить ${item.name}`}
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 rounded-full border border-stone/40 bg-white px-2 py-1">
                    <button
                      className="rounded-full p-1 text-muted-foreground transition hover:text-ink"
                      aria-label="Уменьшить количество"
                      onClick={() => updateQty(item.id, item.qty - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-sm font-medium text-ink">{item.qty}</span>
                    <button
                      className="rounded-full p-1 text-muted-foreground transition hover:text-ink"
                      aria-label="Увеличить количество"
                      onClick={() => updateQty(item.id, item.qty + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <span className="text-sm font-semibold text-ink">
                    {formatPrice(item.price * item.qty)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-4">
          <div className="rounded-2xl border border-stone/40 bg-white/70 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Промокод
            </p>
            <div className="mt-2 flex gap-2">
              <Input
                placeholder="Введите код"
                value={promo}
                onChange={(event) => setPromo(event.target.value)}
              />
              <Button variant="outline" onClick={handlePromo}>
                Применить
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-stone/40 bg-white/70 p-4">
            <div className="flex items-center justify-between text-sm">
              <span>Сумма</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Скидка</span>
              <span>-{formatPrice(discount)}</span>
            </div>
            <Separator className="my-3" />
            <div className="flex items-center justify-between text-base font-semibold">
              <span>Итого</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <Button asChild size="lg" className="w-full">
            <Link href="/checkout">Перейти к оформлению</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
