import React from "react";
import Billboard from "../../(marketplace)/components/Billboard/Billboard";
import { ORDERS_BILLBOARD_ID } from "../../constants";
import getBillboard from "../../actions/getBillboard";
import Container from "../../(marketplace)/components/Container/Container";
import getOrders from "../../actions/getOrders";
import { FinalOrderType, OrderType } from "../../types";
import OrderItem from "./components/OrderItem/OrderItem";
import getProduct from "../../actions/getProduct";
import OrdersWrapper from "./components/OrdersWrapper/OrdersWrapper";

const OrdersPage = async () => {
  const billboard = await getBillboard(ORDERS_BILLBOARD_ID);
  const orders: OrderType[] = await getOrders();

  const finalOrders: FinalOrderType[] = await Promise.all(
    orders.map(async (order) => {
      const orderItemsWithProductInfo = await Promise.all(
        order.orderItems.map(async (orderItem) => {
          const productId = orderItem.productId;
          const product = await getProduct(productId);

          return { product: product, quantity: orderItem.quantity };
        })
      );

      return { ...order, orderItems: orderItemsWithProductInfo };
    })
  );

  console.log(finalOrders);

  return (
    <div>
      <Billboard billboard={billboard} />
      <Container>
        <OrdersWrapper>
          {finalOrders.length !== 0 ? (
            finalOrders.map((order, index) => (
              <OrderItem key={order.id} order={order} index={index + 1} />
            ))
          ) : (
            <div>No orders</div>
          )}
        </OrdersWrapper>
      </Container>
    </div>
  );
};

export default OrdersPage;
