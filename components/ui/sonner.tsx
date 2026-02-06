"use client";

import * as React from "react";
import { Toaster as Sonner } from "sonner";

import { cn } from "@/lib/utils";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ className, ...props }: ToasterProps) => (
  <Sonner
    className={cn("toaster group", className)}
    toastOptions={{
      classNames: {
        toast:
          "group toast group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border group-[.toaster]:border-stone/40 group-[.toaster]:shadow-soft",
        description: "group-[.toast]:text-muted-foreground",
        actionButton: "group-[.toast]:bg-pine group-[.toast]:text-white",
        cancelButton: "group-[.toast]:bg-sand group-[.toast]:text-ink",
      },
    }}
    {...props}
  />
);

export { Toaster };
