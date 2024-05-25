import { ProductType } from "../types";
import qs from "query-string";
import getAllSubCategories from "./getAllSubCategories";
import {
  BRAND_ID_SEARCH_PARAM,
  CATEGORY_ID_SEARCH_PARAM,
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
  sizeId?: string;
  colorId?: string;
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
      sizeId: searchAttributes.sizeId,
      colorId: searchAttributes.colorId,
      isFeatured: searchAttributes.isFeatured,
    },
  });

  const res = await fetch(url);

  return res.json();
};

export default getProducts;
