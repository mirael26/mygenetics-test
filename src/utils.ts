import { DiscountType } from "./consts";

export const isEmptyCondition = (condition: {
  [key: string]: string;
}): boolean => {
  const hasAnyValue = Object.keys(condition).some(
    (key) => condition[key].length
  );
  return !hasAnyValue;
};

export const validateForm = (formData: {
  [key: string]: string | object;
}): Array<string> => {
  const errors: Array<string> = [];
  const discountType = formData["discount-type"];
  const discountAmount = formData["discount-amount"];

  const conditionsExist = Object.keys(formData).some((key) =>
    key.includes("condition")
  );

  if (!conditionsExist) {
    errors.push(ErrorMessage.NoConditions);
  }

  if (discountType === DiscountType.Percent && +discountAmount >= 100) {
    errors.push(ErrorMessage.DiscountGreater100Percents);
  }

  if (+discountAmount <= 0) {
    errors.push(ErrorMessage.DiscountZeroOrNegative);
  }

  if (+discountAmount <= 0) {
    errors.push(ErrorMessage.DiscountZeroOrNegative);
  }

  const checkCondition = (condition: { [key: string]: string | object }) => {
    const sumEqual = condition["sum-equal"];
    const sumGreater = condition["sum-greater"];
    const sumLess = condition["sum-less"];
    const dateStart = Date.parse(condition["sum-start"] as string);
    const dateEnd = Date.parse(condition["sum-end"] as string);
    const productsRequired = condition["products-required"] as Array<{
      value: string;
      label: string;
    }>;
    const productsNotAllowed = condition["products-not-allowed"] as Array<{
      value: string;
      label: string;
    }>;

    if (sumEqual && (sumGreater || sumLess)) {
      errors.push(ErrorMessage.SumConflictWithEqual);
    }

    if (sumGreater && sumLess && sumGreater <= sumLess) {
      errors.push(ErrorMessage.SumGreaterLessConflict);
    }

    if (dateStart <= dateEnd) {
      errors.push(ErrorMessage.DateStartEndConflict);
    }

    const isProductsConflict =
      productsRequired && productsNotAllowed
        ? productsRequired.some((product) =>
            productsNotAllowed.some((pr) => pr.value === product.value)
          )
        : false;

    if (isProductsConflict) {
      errors.push(ErrorMessage.ProductConflict);
    }
  };

  Object.keys(formData).forEach((key) => {
    if (key.includes("condition") && typeof formData[key] === "object") {
      checkCondition(formData[key] as { [key: string]: string | object });
    }
  });

  const uniqueErrors = Array.from(new Set(errors));
  return uniqueErrors;
};

export const ErrorMessage = {
  NoConditions: "Добавьте хотя бы одно условие",
  DiscountGreater100Percents: "Скидка не должна превышать 99%",
  DiscountZeroOrNegative: "Скидка не должна быть нулевой или отрицательной",

  SumConflictWithEqual:
    "Если требуется конкретная сумма, не допускаются условия > или <",
  SumGreaterLessConflict: "Минимальная сумма больше или равна максимальной",
  ProductConflict:
    "Пересекаются продукты, которые должны быть и которых не должно быть в корзине",
  DateStartEndConflict: "Дата начала акции больше чем дата конца акции",
};

export const clearEmptyFields = (formData: {
  [key: string]: string | object;
}): { [key: string]: string | object } => {
  const data = JSON.parse(JSON.stringify(formData));
  const clearField = (
    object: { [key: string]: string | object },
    key: string
  ) => {
    const value = object[key];
    if (!value || (Array.isArray(value) && !value.length)) {
      delete object[key];
    }
  };

  Object.keys(data).forEach((key) => {
    clearField(data, key);

    if (key.includes("condition") && typeof data[key] === "object") {
      const condition = data[key] as { [key: string]: string | object };
      Object.keys(condition).forEach((conditionKey) =>
        clearField(condition, conditionKey)
      );
      // убираем ненужные флаги "включительно"
      Object.keys(condition).forEach(() => {
        if (!condition["sum-greater"] && condition["sum-greater-or-equal"]) {
          delete condition["sum-greater-or-equal"];
        }
        if (!condition["sum-less"] && condition["sum-less-or-equal"]) {
          delete condition["sum-less-or-equal"];
        }
        if (!condition["date-start"] && condition["date-start-or-equal"]) {
          delete condition["date-start-or-equal"];
        }
        if (!condition["date-end"] && condition["date-end-or-equal"]) {
          delete condition["date-end-or-equal"];
        }
      });
    }
  });

  return data;
};
