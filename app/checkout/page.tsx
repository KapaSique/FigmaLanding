import type { Metadata } from "next";

import { CheckoutPage } from "@/components/checkout/checkout-page";

export const metadata: Metadata = {
  title: "Оформление заказа",
  description:
    "Оформите заказ на карельский чай Тапиола: контактные данные, доставка и способ оплаты.",
};

export default function Checkout() {
  return <CheckoutPage />;
}
