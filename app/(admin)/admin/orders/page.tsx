import prisma from "@/prisma/client";
import OrderClient from "./OrderClient";
import { PAGINATION_ITEMS_PER_PAGE } from "@/app/(admin)/constants";
import { getValidatedPageNumber } from "@/lib/paginationUtils";
import { formatDate } from "@/lib/formatDate";
import { FormattedOrder } from "./columns";

interface OrdersPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const OrdersPage = async ({ searchParams }: OrdersPageProps) => {
  const currentPage = getValidatedPageNumber(searchParams["page"]);
  const itemsPerPage = PAGINATION_ITEMS_PER_PAGE;

  /* const searchQuery = searchParams["search_query"]?.[0] ?? ""; */

  const [orders, totalOrders] = await prisma.$transaction([
    prisma.order.findMany({
      /* where: {
        label: {
          contains: searchQuery,
          mode: "insensitive",
        },
      }, */
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
      skip: itemsPerPage * (currentPage - 1),
      take: itemsPerPage,
    }),
    prisma.order.count({
      /* where: {
        label: {
          contains: searchQuery,
          mode: "insensitive",
        },
      }, */
    }),
  ]);

  const formattedOrders: FormattedOrder[] = orders.map((order) => {
    return {
      id: order.id,
      isPaid: order.isPaid,
      phone: order.phone,
      address: order.address,
      products: order.orderItems
        .map((orderItem) => orderItem.product.name)
        .join(" "),
      createdAt: formatDate(order.createdAt, "en-US"),
    };
  });

  return <OrderClient orders={formattedOrders} totalOrders={totalOrders} />;
};

export default OrdersPage;
