import { NETWORKS } from '../(constants)/constants';

export const convertNumberToHexadecimal = (value: number) => {
  return `0x${BigInt(Math.ceil(value * 10 ** 18)).toString(16)}`;
};

export const convertNumberToDecimal = (value: number) => {
  return value.toString(10);
};

export const getCurrencySymbol = (id: string) => {
  return NETWORKS[(+id).toString(10)].currency.symbol;
};
