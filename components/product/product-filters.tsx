"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { categories, tags, type ProductCategory, type ProductTag } from "@/data/products";

type ProductFiltersProps = {
  activeCategory: ProductCategory | "Все";
  onCategoryChange: (value: ProductCategory | "Все") => void;
  activeTags: ProductTag[];
  onToggleTag: (tag: ProductTag) => void;
};

export function ProductFilters({
  activeCategory,
  onCategoryChange,
  activeTags,
  onToggleTag,
}: ProductFiltersProps) {
  return (
    <div className="space-y-4">
      <Tabs value={activeCategory} onValueChange={(value) => onCategoryChange(value as ProductCategory | "Все")}>
        <div className="w-full overflow-x-auto pb-2">
          <TabsList className="min-w-max">
            <TabsTrigger value="Все">Все</TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const active = activeTags.includes(tag);
          return (
            <Button
              key={tag}
              type="button"
              variant={active ? "secondary" : "outline"}
              className={cn("h-9 rounded-full text-xs", active && "border-moss/40")}
              onClick={() => onToggleTag(tag)}
            >
              {tag}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
