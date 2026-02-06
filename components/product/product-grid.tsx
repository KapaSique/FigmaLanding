"use client";

import * as React from "react";

import { ProductCard } from "@/components/product/product-card";
import { type Product, type ProductCategory, type ProductTag } from "@/data/products";

export function ProductGrid({
  products,
  activeCategory,
  activeTags,
}: {
  products: Product[];
  activeCategory: ProductCategory | "Все";
  activeTags: ProductTag[];
}) {
  const filtered = React.useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "Все" || product.category === activeCategory;
      const matchesTags =
        activeTags.length === 0 || activeTags.every((tag) => product.tags.includes(tag));
      return matchesCategory && matchesTags;
    });
  }, [products, activeCategory, activeTags]);

  if (filtered.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-stone/50 bg-white/60 p-10 text-center text-sm text-muted-foreground">
        Нет чаёв по выбранным фильтрам. Попробуйте другую комбинацию.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filtered.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
