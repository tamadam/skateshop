import { Product } from "@prisma/client";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface SearchAttributes {
  categoryId?: string;
  brandId?: string;
  sizeId?: string;
  colorId?: string;
  isFeatured?: boolean;
}

const getProducts = async (
  searchAttributes: SearchAttributes = {}
): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      categoryId: searchAttributes.categoryId,
      brandId: searchAttributes.brandId,
      sizeId: searchAttributes.sizeId,
      colorId: searchAttributes.colorId,
      isFeatured: searchAttributes.isFeatured,
    },
  });

  const res = await fetch(url);

  return res.json();
};

export default getProducts;
