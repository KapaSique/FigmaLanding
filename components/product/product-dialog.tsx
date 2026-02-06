"use client";

import * as React from "react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { type Product } from "@/data/products";
import { useCartStore } from "@/store/cart-store";

export function ProductDialog({
  product,
  children,
}: {
  product: Product;
  children: React.ReactNode;
}) {
  const [variantId, setVariantId] = React.useState(product.variants[0]?.id);
  const addItem = useCartStore((state) => state.addItem);

  const variant = product.variants.find((item) => item.id === variantId) ?? product.variants[0];

  const handleAdd = () => {
    if (!variant) return;
    addItem({
      id: `${product.id}-${variant.id}`,
      productId: product.id,
      name: product.name,
      variantLabel: variant.label,
      price: variant.price,
      qty: 1,
      image: product.image,
      type: "product",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>{product.shortDescription}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
          <div className="relative h-52 overflow-hidden rounded-2xl border border-stone/40 bg-sand/60">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 768px) 320px, 90vw"
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="accent">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <span className="text-ink">Состав:</span> {product.ingredients}
              </p>
              <p>
                <span className="text-ink">Вкус:</span> {product.notes.join(", ")}
              </p>
              <p>
                <span className="text-ink">Когда пить:</span> {product.when}
              </p>
            </div>
            <Separator />
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Заваривание</p>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="rounded-xl border border-stone/40 bg-white/70 p-3">
                  <p className="text-xs text-muted-foreground">Температура</p>
                  <p className="font-medium text-ink">{product.brew.temperature}</p>
                </div>
                <div className="rounded-xl border border-stone/40 bg-white/70 p-3">
                  <p className="text-xs text-muted-foreground">Время</p>
                  <p className="font-medium text-ink">{product.brew.time}</p>
                </div>
                <div className="rounded-xl border border-stone/40 bg-white/70 p-3">
                  <p className="text-xs text-muted-foreground">Пропорции</p>
                  <p className="font-medium text-ink">{product.brew.ratio}</p>
                </div>
              </div>
              {product.brew.notes && (
                <p className="text-xs text-muted-foreground">{product.brew.notes}</p>
              )}
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {product.variants.map((item) => (
              <Button
                key={item.id}
                type="button"
                variant={item.id === variantId ? "secondary" : "outline"}
                onClick={() => setVariantId(item.id)}
                className={cn(item.id === variantId && "border-moss/40")}
              >
                {item.label} · {formatPrice(item.price)}
              </Button>
            ))}
          </div>
          <Button onClick={handleAdd}>В корзину</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
