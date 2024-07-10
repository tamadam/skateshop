import { CategoryType } from "../types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategory = async (categoryId: string): Promise<CategoryType> => {
  const category = await fetch(`${URL}/${categoryId}`, {
    next: {
      revalidate: 3600,
    },
  });

  return category.json();
};

export default getCategory;
