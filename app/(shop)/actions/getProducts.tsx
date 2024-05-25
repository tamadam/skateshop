import { ProductType } from "../types";
import qs from "query-string";
import getAllSubCategories from "./getAllSubCategories";
import {
  BRAND_ID_SEARCH_PARAM,
  CATEGORY_ID_SEARCH_PARAM,
  COLOR_ID_SEARCH_PARAM,
  SIZE_ID_SEARCH_PARAM,
} from "@/app/constants";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getCategoryIds = async (categoryId?: string): Promise<string[]> => {
  return categoryId
    ? [
        categoryId,
        ...(await getAllSubCategories(categoryId)).map((cat) => cat.id),
      ]
    : [];
};

interface SearchAttributes {
  categoryId?: string;
  brandIds?: string[];
  sizeIds?: string[];
  colorIds?: string[];
  isFeatured?: boolean;
}

const getProducts = async (
  searchAttributes: SearchAttributes = {}
): Promise<ProductType[]> => {
  // get all subcategories
  const categoryIds = await getCategoryIds(searchAttributes.categoryId);

  const url = qs.stringifyUrl({
    url: URL,
    query: {
      [CATEGORY_ID_SEARCH_PARAM]: categoryIds,
      [BRAND_ID_SEARCH_PARAM]: searchAttributes.brandIds,
      [SIZE_ID_SEARCH_PARAM]: searchAttributes.sizeIds,
      [COLOR_ID_SEARCH_PARAM]: searchAttributes.colorIds,
      isFeatured: searchAttributes.isFeatured,
    },
  });

  const res = await fetch(url);

  return res.json();
};

export default getProducts;
