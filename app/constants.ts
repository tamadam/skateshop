export const CATEGORY_ID_SEARCH_PARAM = "categoryId";
export const CATEGORY_PRODUCTS_SEARCH_PARAM = "p";

export const BRAND_ID_SEARCH_PARAM = "brandId";
export const BRAND_SEARCH_PARAM = "b";

export const SIZE_ID_SEARCH_PARAM = "sizeId";
export const SIZE_SEARCH_PARAM = "s";

export const COLOR_ID_SEARCH_PARAM = "colorId";
export const COLOR_SEARCH_PARAM = "c";

export const IS_FEATURED_SEARCH_PARAM = "isFeatured";

export const PRODUCTS_PAGE_PARAM = "page";
export const PRODUCTS_ITEMS_PER_PAGE = 12;

export enum ORDER_BY {
    PRICE_ASC = "1",
    PRICE_DESC = "2",
    NAME_ASC = "3",
    NAME_DESC = "4",
    RANDOM_ORDER = "5"
  }

export const PRODUCTS_ORDER_BY_OPTIONS: { type: ORDER_BY, label: string }[] = [
    { type: ORDER_BY.PRICE_ASC, label: "Price (ascending)" },
    { type: ORDER_BY.PRICE_DESC, label: "Price (descending)" },
    { type: ORDER_BY.NAME_ASC, label: "Name (ascending)" },
    { type: ORDER_BY.NAME_DESC, label: "Name (descending)" },
    { type: ORDER_BY.RANDOM_ORDER, label: "Random" },
];

export const PRODUCTS_ORDER_BY_PARAM = "mode"