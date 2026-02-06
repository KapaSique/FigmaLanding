import type { Metadata } from "next";
import { Suspense } from "react";

import { OrderSuccess } from "@/components/checkout/order-success";

export const metadata: Metadata = {
  title: "Заказ оформлен",
  description: "Спасибо за заказ чая Тапиола. Мы свяжемся для подтверждения.",
};

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={<div className="mx-auto max-w-4xl px-6 py-20 text-muted-foreground">Загрузка заказа...</div>}
    >
      <OrderSuccess />
    </Suspense>
  );
}
