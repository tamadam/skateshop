"use client";

import Heading from "../../components/Heading/Heading";
import OrderTable from "./OrderTable";
import { columns, FormattedOrder } from "./columns";

interface OrderClientProps {
  orders: FormattedOrder[];
  totalOrders: number;
}

const OrderClient = ({ orders, totalOrders }: OrderClientProps) => {
  return (
    <div>
      <Heading
        title={`Orders (${totalOrders})`}
        description="Manage your orders for your shop"
      />

      <OrderTable orders={orders} totalOrders={totalOrders} columns={columns} />
    </div>
  );
};

export default OrderClient;
