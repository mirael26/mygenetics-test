export const AppUrl = {
  Main: "/",
  Discounts: "/discounts",
  Form: "/form",
  NotFound: "/404"
} as const;

export const DiscountType = {
  Percent: 'percent',
  Fixed: 'fixed'
} as const;

export const DiscountTypeRadio = [
  {
    name: 'discount-type',
    value: DiscountType.Percent,
    label: 'Процент',
  },
  {
    name: 'discount-type',
    value: DiscountType.Fixed,
    label: 'Фикс. сумма',
  }
];

export const DiscountTypeSign = {
  percent: "%",
  fixed: "руб.",
};

export const Products = {
  test1: 'Тест 1',
  test2: 'Тест 2',
  test3: 'Тест 3',
  test4: 'Тест 4',
  test5: 'Тест 5',
  test6: 'Тест 6',
};

export const ErrorMessage = {
  NoConditions: "Добавьте хотя бы одно условие",
  DiscountGreater100Percents: "Скидка не должна превышать 99%",
  DiscountZeroOrNegative: "Скидка не должна быть нулевой или отрицательной",
  SumConflictWithEqual:
    "Если требуется конкретная сумма, не допускаются условия > или <",
  SumMinMaxConflict: "Минимальная сумма больше или равна максимальной",
  ProductConflict:
    "Пересекаются продукты, которые должны быть и которых не должно быть в корзине",
  DateStartEndConflict: "Дата начала акции больше чем дата конца акции",
};

export const ConditionFields = {
  sum: [
    "sum-min",
    "sum-min-or-equal",
    "sum-max",
    "sum-max-or-equal",
    "equal",
  ],
  product: ["products-not-allowed", "products-required"],
  date: ["date-from", "date-from-or-equal", "date-to", "date-to-or-equal"],
};
