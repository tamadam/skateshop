import { PAGINATION_ITEMS_PER_PAGE } from "@/app/constants";

export const getTotalPages = (data: number) => {
    return Math.max(1, Math.ceil(data / PAGINATION_ITEMS_PER_PAGE));
};