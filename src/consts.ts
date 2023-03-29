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

export const Products = {
  test1: 'Тест 1',
  test2: 'Тест 2',
  test3: 'Тест 3',
  test4: 'Тест 4',
  test5: 'Тест 5',
  test6: 'Тест 6',
};

