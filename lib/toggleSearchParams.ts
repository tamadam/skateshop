import { ReadonlyURLSearchParams } from "next/navigation";
import { updateSearchParams } from "./updateSearchParams";
import { PRODUCTS_PAGE_PARAM } from "@/app/constants";

export const toggleSearchParams = (searchParams: ReadonlyURLSearchParams, newParams: {key: string, value: string}[], extendUrl = false) => {
    const current = new URLSearchParams(searchParams);
    for (const param of newParams) {
        if (!param.value) {
            current.delete(param.key);
        } else {
            if (extendUrl) {
                const existingValues = current.getAll(param.key);
 
                if (existingValues.includes(param.value)) {
                  const updatedValues = existingValues.filter((value) => value !== param.value);

                  current.delete(param.key);
                  updatedValues.forEach((value) => current.append(param.key, value));
                } else {
                  current.append(param.key, param.value);
                }
            } else {
                current.set(param.key, param.value);
            }
        }
    }
    
    // navigate to page 1
    return updateSearchParams(current, [{key: PRODUCTS_PAGE_PARAM, value: "1"}])
};