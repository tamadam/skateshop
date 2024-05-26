import { CategoryType } from "../types";
import getCategory from "./getCategory";

/* This function recursively returns all parent categories starting from the given parent */

const getParentCategories = async (
  parentCategoryId: string
): Promise<CategoryType[]> => {
  const parentCategory = await getCategory(parentCategoryId);

  if (!parentCategory) {
    return [];
  }

  let parentCategories = [parentCategory];
  const newParentCategoryId = parentCategory.parentCategoryId;

  if (newParentCategoryId) {
    const newParentCategories = await getParentCategories(newParentCategoryId);
    parentCategories = parentCategories.concat(newParentCategories);
  }

  return parentCategories;
};

export default getParentCategories;
