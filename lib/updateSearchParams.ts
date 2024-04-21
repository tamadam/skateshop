import { ReadonlyURLSearchParams } from "next/navigation";

export const updateSearchParams = (searchParams: ReadonlyURLSearchParams, newParams: {key: string, value: string}[]) => {
    const current = new URLSearchParams(searchParams);
    for (const param of newParams) {
        if (!param.value) {
            current.delete(param.key);
        } else {
            current.set(param.key, param.value);
        }
    }

    const searchQuery = `?${current.toString()}`;

    return searchQuery;
  };