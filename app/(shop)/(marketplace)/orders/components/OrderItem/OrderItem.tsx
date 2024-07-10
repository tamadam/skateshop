import { FinalOrderType } from "@/app/(shop)/types";
import styles from "./OrderItem.module.css";

interface OrderItemProps {
  order: FinalOrderType;
  index: number;
}

const OrderItem = ({ order, index }: OrderItemProps) => {
  return (
    <div className={styles.orderItemCard}>
      <div>
        <h1 className={styles.orderTitle}>Order #{index}</h1>
      </div>
      <div className={styles.orderDetails}>
        <div className={styles.orderItems}>
          {order.orderItems?.map((orderItem) => (
            <div key={orderItem.product.id} className={styles.orderItem}>
              <span>
                {orderItem.product.name} x{orderItem.quantity}
              </span>
              <span>
                &euro;{Number(orderItem.product.price) * orderItem.quantity}
              </span>
            </div>
          ))}
        </div>
        <div className={styles.orderInfo}>{order.address}</div>
        <div className={styles.orderInfo}>{order.phone}</div>
      </div>
    </div>
  );
};

export default OrderItem;
