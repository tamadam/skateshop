import prisma from "@/prisma/client";
import BillboardClient from "./BillboardClient";
import { PAGINATION_ITEMS_PER_PAGE } from "@/app/constants";

interface BillboardsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const BillboardsPage = async ({ searchParams }: BillboardsPageProps) => {
  const currentPage = Number(searchParams["page"] ?? 1);
  const itemsPerPage = PAGINATION_ITEMS_PER_PAGE;

  const [billboards, totalBillboards] = await prisma.$transaction([
    prisma.billboard.findMany({
      orderBy: {
        createdAt: "asc",
      },
      skip: itemsPerPage * (currentPage - 1),
      take: itemsPerPage,
    }),
    prisma.billboard.count(),
  ]);

  return (
    <BillboardClient
      billboards={billboards}
      totalBillboards={totalBillboards}
    />
  );
};

export default BillboardsPage;
