"use client";

import * as React from "react";
import Image from "next/image";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data/products";
import { useCartStore, BUNDLE_DISCOUNT } from "@/store/cart-store";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

const MAX_ITEMS = 3;

export function BundleDialog({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = React.useState<string[]>([]);
  const addItem = useCartStore((state) => state.addItem);

  const toggle = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= MAX_ITEMS) {
        toast.error("Можно выбрать только 3 вкуса.");
        return prev;
      }
      return [...prev, id];
    });
  };

  const selectedProducts = selected
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean);

  const baseTotal = selectedProducts.reduce((sum, product) => {
    const variant = product?.variants[0];
    return variant ? sum + variant.price : sum;
  }, 0);
  const discountedTotal = Math.round(baseTotal * (1 - BUNDLE_DISCOUNT));

  const handleAdd = () => {
    if (selectedProducts.length !== MAX_ITEMS) return;
    const names = selectedProducts.map((product) => product?.name ?? "");
    addItem({
      id: `bundle-${selected.join("-")}-${Date.now()}`,
      productId: "bundle",
      name: "Набор «Тапиола»",
      variantLabel: "3 вкуса · 50 г",
      price: discountedTotal,
      qty: 1,
      type: "bundle",
      image: "/products/bundle.svg",
      meta: { items: names },
    });
    toast.success("Набор добавлен в корзину со скидкой 12%.");
    setSelected([]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Соберите набор из трёх вкусов</DialogTitle>
          <DialogDescription>
            Выберите 3 позиции из коллекции. Сет идёт со скидкой 12%.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 md:grid-cols-3">
          {products.map((product) => {
            const isActive = selected.includes(product.id);
            return (
              <button
                key={product.id}
                type="button"
                onClick={() => toggle(product.id)}
                className={cn(
                  "flex h-full flex-col rounded-2xl border border-stone/40 bg-white/70 p-4 text-left transition hover:-translate-y-1 hover:shadow-soft",
                  isActive && "border-moss/60 bg-sand/70"
                )}
                aria-pressed={isActive}
              >
                <div className="relative h-24 overflow-hidden rounded-xl border border-stone/30 bg-sand/60">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width: 768px) 180px, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-3 flex-1">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {product.category}
                  </p>
                  <p className="mt-2 font-serif text-lg text-ink">
                    {product.name}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {product.shortDescription}
                  </p>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-stone/40 bg-white/70 p-4">
          <div>
            <p className="text-sm text-muted-foreground">
              Выбрано: {selectedProducts.length} / {MAX_ITEMS}
            </p>
            <p className="text-lg font-semibold text-ink">
              {selectedProducts.length === MAX_ITEMS
                ? formatPrice(discountedTotal)
                : "Выберите 3 вкуса"}
            </p>
          </div>
          <Button onClick={handleAdd} disabled={selectedProducts.length !== MAX_ITEMS}>
            Добавить набор
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
