"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { products, type ProductCategory, type ProductTag } from "@/data/products";
import { ProductFilters } from "@/components/product/product-filters";
import { ProductGrid } from "@/components/product/product-grid";

export function CatalogSection() {
  const [activeCategory, setActiveCategory] = React.useState<
    ProductCategory | "Все"
  >("Все");
  const [activeTags, setActiveTags] = React.useState<ProductTag[]>([]);

  const toggleTag = (tag: ProductTag) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]
    );
  };

  return (
    <section id="catalog" className="py-24">
      <div className="mx-auto max-w-6xl space-y-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-4"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
            Каталог
          </p>
          <h2 className="font-serif text-3xl text-ink sm:text-4xl">
            Подберите свой сбор
          </h2>
          <p className="max-w-2xl text-base text-muted-foreground">
            Коллекция карельских чаёв: травяные, ягодные и иван-чай в премиальном
            исполнении. Каждый купаж — отдельная история.
          </p>
        </motion.div>

        <ProductFilters
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          activeTags={activeTags}
          onToggleTag={toggleTag}
        />

        <ProductGrid
          products={products}
          activeCategory={activeCategory}
          activeTags={activeTags}
        />
      </div>
    </section>
  );
}
