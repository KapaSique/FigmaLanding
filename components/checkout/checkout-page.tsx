"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/format";
import {
  calculateDeliveryFee,
  deliveryOptions,
  paymentOptions,
  type DeliveryMethod,
} from "@/lib/checkout";
import { generateOrderId, saveOrder } from "@/lib/order";

const checkoutSchema = z.object({
  name: z.string().min(2, "Укажите имя"),
  phone: z.string().min(6, "Укажите телефон"),
  email: z.string().email("Укажите корректный email"),
  city: z.string().min(2, "Укажите город"),
  address: z.string().min(5, "Укажите адрес"),
  zip: z.string().min(4, "Укажите индекс"),
  delivery: z.enum(["pickup", "courier"]),
  payment: z.enum(["card", "cod"]),
  comment: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const discount = useCartStore((state) => state.getDiscount());
  const promoCode = useCartStore((state) => state.promoCode);
  const clear = useCartStore((state) => state.clear);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      delivery: "pickup",
      payment: "card",
    },
  });

  const deliveryValue = watch("delivery") as DeliveryMethod;
  const deliveryFee = calculateDeliveryFee(subtotal - discount, deliveryValue);
  const total = subtotal - discount + deliveryFee;

  const onSubmit = handleSubmit((values) => {
    if (items.length === 0) {
      toast.error("Корзина пуста. Добавьте чай перед оформлением.");
      return;
    }

    const orderId = generateOrderId();

    // Здесь можно подключить Stripe или другой платежный шлюз.

    saveOrder({
      id: orderId,
      total,
      items: items.reduce((sum, item) => sum + item.qty, 0),
      email: values.email,
      createdAt: new Date().toISOString(),
    });

    clear();
    router.push(`/order/success?orderId=${orderId}`);
  });

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-6 py-16">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Оформление
        </p>
        <h1 className="mt-2 font-serif text-4xl text-ink sm:text-5xl">
          Оформление заказа
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground">
          Заполните данные, и мы соберём ваш заказ. Никаких реальных оплат —
          только демонстрация интерфейса.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <form onSubmit={onSubmit} className="space-y-8">
          <section className="rounded-3xl border border-stone/40 bg-white/70 p-6 shadow-soft">
            <h2 className="font-serif text-2xl text-ink">Контактные данные</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm text-muted-foreground" htmlFor="name">
                  Имя
                </label>
                <Input
                  id="name"
                  {...register("name")}
                  aria-invalid={!!errors.name}
                  placeholder="Анна"
                  autoComplete="name"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="text-sm text-muted-foreground" htmlFor="phone">
                  Телефон
                </label>
                <Input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  aria-invalid={!!errors.phone}
                  placeholder="+7 900 000-00-00"
                  autoComplete="tel"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm text-muted-foreground" htmlFor="email">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                  placeholder="you@email.com"
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-stone/40 bg-white/70 p-6 shadow-soft">
            <h2 className="font-serif text-2xl text-ink">Доставка</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm text-muted-foreground" htmlFor="city">
                  Город
                </label>
                <Input
                  id="city"
                  {...register("city")}
                  aria-invalid={!!errors.city}
                  placeholder="Петрозаводск"
                  autoComplete="address-level2"
                />
                {errors.city && (
                  <p className="mt-1 text-xs text-destructive">{errors.city.message}</p>
                )}
              </div>
              <div>
                <label className="text-sm text-muted-foreground" htmlFor="zip">
                  Индекс
                </label>
                <Input
                  id="zip"
                  {...register("zip")}
                  aria-invalid={!!errors.zip}
                  placeholder="185000"
                  autoComplete="postal-code"
                />
                {errors.zip && (
                  <p className="mt-1 text-xs text-destructive">{errors.zip.message}</p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm text-muted-foreground" htmlFor="address">
                  Адрес
                </label>
                <Input
                  id="address"
                  {...register("address")}
                  aria-invalid={!!errors.address}
                  placeholder="Улица, дом, квартира"
                  autoComplete="street-address"
                />
                {errors.address && (
                  <p className="mt-1 text-xs text-destructive">{errors.address.message}</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm text-muted-foreground">Способ доставки</p>
              <Controller
                control={control}
                name="delivery"
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="mt-3"
                  >
                    {deliveryOptions.map((option) => {
                      const checked = field.value === option.value;
                      return (
                        <label
                          key={option.value}
                          htmlFor={`delivery-${option.value}`}
                          className={`flex items-start gap-3 rounded-2xl border border-stone/40 bg-white/70 p-4 transition ${
                            checked ? "border-moss/50 bg-sand/70" : ""
                          }`}
                        >
                          <RadioGroupItem
                            id={`delivery-${option.value}`}
                            value={option.value}
                          />
                          <div>
                            <p className="text-sm font-medium text-ink">
                              {option.label}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {option.description}
                            </p>
                          </div>
                        </label>
                      );
                    })}
                  </RadioGroup>
                )}
              />
            </div>
          </section>

          <section className="rounded-3xl border border-stone/40 bg-white/70 p-6 shadow-soft">
            <h2 className="font-serif text-2xl text-ink">Оплата</h2>
            <Controller
              control={control}
              name="payment"
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="mt-4"
                >
                  {paymentOptions.map((option) => {
                    const checked = field.value === option.value;
                    return (
                      <label
                        key={option.value}
                        htmlFor={`payment-${option.value}`}
                        className={`flex items-start gap-3 rounded-2xl border border-stone/40 bg-white/70 p-4 transition ${
                          checked ? "border-moss/50 bg-sand/70" : ""
                        }`}
                      >
                        <RadioGroupItem
                          id={`payment-${option.value}`}
                          value={option.value}
                        />
                        <div>
                          <p className="text-sm font-medium text-ink">
                            {option.label}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {option.description}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </RadioGroup>
              )}
            />

            <div className="mt-6">
              <label className="text-sm text-muted-foreground" htmlFor="comment">
                Комментарий к заказу
              </label>
              <Textarea id="comment" {...register("comment")} />
            </div>
          </section>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting || items.length === 0}
            className="w-full"
          >
            Оформить заказ
          </Button>
        </form>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-stone/40 bg-white/70 p-6 shadow-soft">
            <h2 className="font-serif text-2xl text-ink">Ваш заказ</h2>
            {items.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">
                В корзине пока нет товаров. Вернитесь в каталог, чтобы выбрать
                чай.
              </p>
            ) : (
              <div className="mt-4 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-ink">{item.name}</span>
                      <span>{formatPrice(item.price * item.qty)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {item.variantLabel} · {item.qty} шт.
                    </p>
                    {item.meta?.items?.length ? (
                      <p className="text-xs text-muted-foreground">
                        {item.meta.items.join(" · ")}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            )}

            <Separator className="my-4" />

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Сумма</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Скидка {promoCode ? `(${promoCode})` : ""}</span>
                <span>-{formatPrice(discount)}</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Доставка</span>
                <span>{deliveryFee === 0 ? "Бесплатно" : formatPrice(deliveryFee)}</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex items-center justify-between text-base font-semibold">
              <span>Итого</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <div className="rounded-3xl border border-stone/40 bg-sand/60 p-6 text-sm text-muted-foreground">
            Мы свяжемся для подтверждения заказа и уточним удобный формат
            доставки.
          </div>
        </aside>
      </div>
    </div>
  );
}
