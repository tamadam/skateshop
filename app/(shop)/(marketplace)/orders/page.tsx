import React from "react";
import Billboard from "../../(marketplace)/components/Billboard/Billboard";
import { ORDERS_BILLBOARD_ID } from "../../constants";
import getBillboard from "../../actions/getBillboard";
import Container from "../../(marketplace)/components/Container/Container";
import getOrders from "../../actions/getOrders";
import { OrderType } from "../../types";

const OrdersPage = async () => {
  const billboard = await getBillboard(ORDERS_BILLBOARD_ID);

  const orders: OrderType[] = await getOrders();
  console.log(orders);

  return (
    <div>
      <Billboard billboard={billboard} />
      <Container>
        {orders.map((order) => (
          <div key={order.id}>{order.id}</div>
        ))}
      </Container>
    </div>
  );
};

export default OrdersPage;
