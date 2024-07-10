import { CategoryType } from "../types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategories = async (): Promise<CategoryType[]> => {
  const categories = await fetch(URL, {
    next: {
      revalidate: 3600,
    },
  });

  return categories.json();
};

export default getCategories;
