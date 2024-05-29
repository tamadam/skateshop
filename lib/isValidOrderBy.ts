import { ORDER_BY } from "@/app/constants";

export const isValidOrderBy = (value: any): value is ORDER_BY => {
    return Object.values(ORDER_BY).includes(value);
};
  