import { SingleProductType } from "../types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProduct = async (productId: string): Promise<SingleProductType> => {
  const product = await fetch(`${URL}/${productId}`);

  return product.json();
};

export default getProduct;
