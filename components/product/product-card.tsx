"use client";

import * as React from "react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { type Product } from "@/data/products";
import { useCartStore } from "@/store/cart-store";
import { ProductDialog } from "@/components/product/product-dialog";

export function ProductCard({ product }: { product: Product }) {
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
    <Card className="flex h-full flex-col overflow-hidden">
      <CardHeader className="space-y-4">
        <div className="relative h-40 overflow-hidden rounded-2xl border border-stone/30 bg-sand/60">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 768px) 45vw, 90vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {product.category}
          </p>
          <h3 className="mt-2 font-serif text-2xl text-ink">{product.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {product.shortDescription}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {product.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {product.variants.map((item) => (
            <Button
              key={item.id}
              type="button"
              size="sm"
              variant={item.id === variantId ? "secondary" : "outline"}
              className={cn("rounded-full text-xs", item.id === variantId && "border-moss/40")}
              onClick={() => setVariantId(item.id)}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-auto flex flex-col items-start gap-3">
        <div className="flex w-full items-center justify-between">
          <span className="text-lg font-semibold text-ink">
            {variant ? formatPrice(variant.price) : ""}
          </span>
          <ProductDialog product={product}>
            <Button variant="ghost" className="text-xs">
              Быстрый просмотр
            </Button>
          </ProductDialog>
        </div>
        <Button onClick={handleAdd} className="w-full">
          В корзину
        </Button>
      </CardFooter>
    </Card>
  );
}
