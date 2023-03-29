import { DiscountType, ErrorMessage } from "./consts";
import { IConditionInfo, IDiscountInfo } from './types';

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
    const sumMin = condition["sum-min"];
    const sumMax = condition["sum-max"];
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

    if (sumEqual && (sumMin || sumMax)) {
      errors.push(ErrorMessage.SumConflictWithEqual);
    }

    if (sumMin && sumMax && sumMin >= sumMax) {
      errors.push(ErrorMessage.SumMinMaxConflict);
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
        if (!condition["sum-min"] && condition["sum-min-or-equal"]) {
          delete condition["sum-min-or-equal"];
        }
        if (!condition["sum-max"] && condition["sum-max-or-equal"]) {
          delete condition["sum-max-or-equal"];
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

export const getConditionsStrings = (discountData: IDiscountInfo): Array<Array<string>> => {
  const conditions: Array<IConditionInfo> = [];
  Object.keys(discountData).forEach((key) => {
    if (key.includes('condition')) {
      conditions.push(discountData[key] as object);
    }
  });
  const result = conditions.map((condition) => {
    const conditionsStrings = [];
    if (condition['sum-min'] && condition['sum-min-or-equal']) {
      conditionsStrings.push(`сумма больше или равна ${condition['sum-min']} руб.`)
    }
    if (condition['sum-min'] && !condition['sum-min-or-equal']) {
      conditionsStrings.push(`сумма больше ${condition['sum-min']} руб.`)
    }
    if (condition['sum-max'] && condition['sum-max-or-equal']) {
      conditionsStrings.push(`сумма меньше или равна ${condition['sum-max']} руб.`)
    }
    if (condition['sum-max'] && !condition['sum-max-or-equal']) {
      conditionsStrings.push(`сумма меньше ${condition['sum-max']} руб.`)
    }
    if (condition['sum-equal']) {
      conditionsStrings.push(`сумма равна ${condition['sum-equal']} руб.`)
    }
    if (condition['products-required']) {
      condition['products-required'].forEach(product => conditionsStrings.push(product.label));
    }
    if (condition['products-not-allowed']) {
      condition['products-not-allowed'].forEach(product => conditionsStrings.push(`НЕ ${product.label}`));
    }
    if (condition['date-start'] && condition['date-start-or-equal']) {
      conditionsStrings.push(`дата больше или равно ${new Date(condition['date-start']).toLocaleString()}`)
    }
    if (condition['date-start'] && !condition['date-start-or-equal']) {
      conditionsStrings.push(`дата больше ${new Date(condition['date-start']).toLocaleString()}`)
    }
    if (condition['date-end'] && condition['date-end-or-equal']) {
      conditionsStrings.push(`дата меньше или равно ${new Date(condition['date-end']).toLocaleString()}`)
    }
    if (condition['date-end'] && !condition['date-end-or-equal']) {
      conditionsStrings.push(`дата меньше ${new Date(condition['date-end']).toLocaleString()}`)
    }
    return conditionsStrings;
  });

  return result;
};
