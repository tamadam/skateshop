import { CategoryType } from "../types";
import getDirectSubCategories from "./getDirectSubCategories";

/* This function recursively returns all child subcategories of a category */

const getAllSubCategories = async (
  categoryId: string
): Promise<CategoryType[]> => {
  const subCategories = await getDirectSubCategories(categoryId);

  let allSubCategories = [...subCategories];

  for (const subcategory of subCategories) {
    const childSubCategories = await getAllSubCategories(subcategory.id);
    allSubCategories = [...allSubCategories, ...childSubCategories];
  }

  return allSubCategories;
};

export default getAllSubCategories;
