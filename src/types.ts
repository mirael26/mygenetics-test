export type valueof<T> = T[keyof T];

import { DiscountType } from './consts';

export interface IDiscountInfo {
  'discount-amount': string,
  'discount-type': string,
  'id': string;
  name: string;
  description: string;
  [key: string]: string | IConditionInfo;
};

export interface IConditionInfo {
  'sum-min'?: string;
  'sum-min-or-equal'?: string;
  'sum-max'?: string;
  'sum-max-or-equal'?: string;
  'sum-equal'?: string;
  'products-required'?: Array<{value: string, label: string}>;
  'products-not-allowed'?: Array<{value: string, label: string}>;
  'date-start'?: string;
  'date-start-or-equal'?: string;
  'date-end'?: string;
  'date-end-or-equal'?: string;
};

export type TDiscountType = valueof<typeof DiscountType>;

export interface IDiscountTypeRadio {
  name: string,
  value: TDiscountType,
  label: string,
}

export interface IChangeFormDataParams {
  name: string;
  value: string;
  group?: string;
};
