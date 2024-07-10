import { BrandType } from "../types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/brands`;

const getBrand = async (brandId: string): Promise<BrandType> => {
  const res = await fetch(`${URL}/${brandId}`, {
    next: {
      revalidate: 3600,
    },
  });

  return res.json();
};

export default getBrand;
