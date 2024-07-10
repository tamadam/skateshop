import { OrderType } from "../types";
import { headers } from "next/headers";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/orders`;

const getOrders = async (): Promise<OrderType[]> => {
  const res = await fetch(URL, {
    method: "GET",
    headers: new Headers(headers()),
  });

  return res.json();
};

export default getOrders;
