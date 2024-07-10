import { OrderType } from "../types";
import { headers } from "next/headers";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/orders`;

const getOrder = async (orderId: string): Promise<OrderType> => {
  const res = await fetch(`${URL}/${orderId}`, {
    method: "GET",
    headers: headers(),
  });

  return res.json();
};

export default getOrder;
