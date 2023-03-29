export type valueof<T> = T[keyof T];

import { DiscountType } from './consts';

export interface IDiscountInfo {

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
