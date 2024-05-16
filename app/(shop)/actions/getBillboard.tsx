import { BillboardType } from "../types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

const getBillboard = async (billboardId: string): Promise<BillboardType> => {
  const billboard = await fetch(`${URL}/${billboardId}`);

  return billboard.json();
};

export default getBillboard;
