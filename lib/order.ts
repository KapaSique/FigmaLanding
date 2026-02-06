export type OrderSummary = {
  id: string;
  total: number;
  items: number;
  email?: string;
  createdAt: string;
};

export const ORDER_STORAGE_KEY = "tapiola-last-order";

export const generateOrderId = () => {
  const stamp = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  const random = Math.floor(1000 + Math.random() * 9000);
  return `TAP-${stamp}-${random}`;
};

export const saveOrder = (order: OrderSummary) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
};

export const loadOrder = (): OrderSummary | null => {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(ORDER_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as OrderSummary;
  } catch {
    return null;
  }
};
