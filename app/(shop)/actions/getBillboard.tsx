import { Billboard } from "@prisma/client";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

const getBillboard = async (billboardId: string): Promise<Billboard> => {
  const billboard = await fetch(`${URL}/${billboardId}`);

  return billboard.json();
};

export default getBillboard;
