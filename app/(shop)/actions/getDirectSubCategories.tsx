import { CATEGORY_ID_SEARCH_PARAM } from "@/app/constants";
import { CategoryType } from "../types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

/* This function returns only the direct child subcategories of a category */

const getDirectSubCategories = async (
  categoryId: string
): Promise<CategoryType[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      [CATEGORY_ID_SEARCH_PARAM]: categoryId,
    },
  });

  const category = await fetch(url, {
    next: {
      revalidate: 3600,
    },
  });

  return category.json();
};

export default getDirectSubCategories;
