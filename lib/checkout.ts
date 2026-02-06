export type DeliveryMethod = "pickup" | "courier";
export type PaymentMethod = "card" | "cod";

export const deliveryOptions: Array<{
  value: DeliveryMethod;
  label: string;
  description: string;
}> = [
  {
    value: "pickup",
    label: "Пункт выдачи",
    description: "Удобный самовывоз в вашем городе.",
  },
  {
    value: "courier",
    label: "Курьер",
    description: "Доставка до двери в выбранный день.",
  },
];

export const paymentOptions: Array<{
  value: PaymentMethod;
  label: string;
  description: string;
}> = [
  {
    value: "card",
    label: "Картой онлайн",
    description: "Оплата после подтверждения заказа (заглушка).",
  },
  {
    value: "cod",
    label: "При получении",
    description: "Оплата курьеру или в пункте выдачи.",
  },
];

export const calculateDeliveryFee = (
  subtotal: number,
  method: DeliveryMethod
) => {
  const base = method === "pickup" ? 190 : 390;
  if (subtotal >= 3500) {
    return method === "pickup" ? 0 : 190;
  }
  return base;
};
