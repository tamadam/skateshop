import { BrandType } from "../types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/brands`;

const getBrands = async (): Promise<BrandType[]> => {
  const res = await fetch(URL, {
    next: {
      revalidate: 3600,
    },
  });

  return res.json();
};

export default getBrands;
