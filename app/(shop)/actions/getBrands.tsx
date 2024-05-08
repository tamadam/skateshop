import { Brand } from "@prisma/client";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/brands`;

const getBrands = async (): Promise<Brand[]> => {
  const res = await fetch(URL);

  return res.json();
};

export default getBrands;
