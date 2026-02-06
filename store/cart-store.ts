import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  variantLabel: string;
  price: number;
  qty: number;
  type?: "product" | "bundle";
  image?: string;
  meta?: {
    items?: string[];
  };
};

export type BundleItem = CartItem & {
  type: "bundle";
};

type CartState = {
  items: CartItem[];
  promoCode: string | null;
  promoDiscount: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  applyPromo: (code: string) => { valid: boolean; discount: number };
  getSubtotal: () => number;
  getDiscount: () => number;
};

export const PROMO_CODE = "TAP10";
export const PROMO_DISCOUNT = 0.1;
export const BUNDLE_DISCOUNT = 0.12;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: null,
      promoDiscount: 0,
      addItem: (item) =>
        set((state) => {
          const existingIndex = state.items.findIndex(
            (existing) => existing.id === item.id
          );

          if (existingIndex >= 0) {
            const updated = [...state.items];
            updated[existingIndex] = {
              ...updated[existingIndex],
              qty: updated[existingIndex].qty + item.qty,
            };
            return { items: updated };
          }

          return { items: [...state.items, item] };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      updateQty: (id, qty) =>
        set((state) => ({
          items: state.items
            .map((item) => (item.id === id ? { ...item, qty } : item))
            .filter((item) => item.qty > 0),
        })),
      clear: () => set({ items: [], promoCode: null, promoDiscount: 0 }),
      applyPromo: (code) => {
        const normalized = code.trim().toUpperCase();
        if (normalized === PROMO_CODE) {
          set({ promoCode: normalized, promoDiscount: PROMO_DISCOUNT });
          return { valid: true, discount: PROMO_DISCOUNT };
        }
        set({ promoCode: null, promoDiscount: 0 });
        return { valid: false, discount: 0 };
      },
      getSubtotal: () =>
        get().items.reduce((sum, item) => sum + item.price * item.qty, 0),
      getDiscount: () => get().getSubtotal() * get().promoDiscount,
    }),
    {
      name: "tapiola-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
