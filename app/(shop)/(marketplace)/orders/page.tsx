import React from "react";
import Billboard from "../../(marketplace)/components/Billboard/Billboard";
import { ORDERS_BILLBOARD_ID } from "../../constants";
import getBillboard from "../../actions/getBillboard";
import Container from "../../(marketplace)/components/Container/Container";

const OrdersPage = async () => {
  const billboard = await getBillboard(ORDERS_BILLBOARD_ID);

  return (
    <div>
      <Billboard billboard={billboard} />
      <Container>Orders</Container>
    </div>
  );
};

export default OrdersPage;
