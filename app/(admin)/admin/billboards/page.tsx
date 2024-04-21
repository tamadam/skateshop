import prisma from "@/prisma/client";
import BillboardClient from "./BillboardClient";
import { PAGINATION_ITEMS_PER_PAGE } from "@/app/constants";
import { getValidatedPageNumber } from "@/lib/paginationUtils";

interface BillboardsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const BillboardsPage = async ({ searchParams }: BillboardsPageProps) => {
  const currentPage = getValidatedPageNumber(searchParams["page"]);
  const itemsPerPage = PAGINATION_ITEMS_PER_PAGE;

  const searchQuery = searchParams["search_query"]?.[0] ?? "";

  const [billboards, totalBillboards] = await prisma.$transaction([
    prisma.billboard.findMany({
      where: {
        label: {
          contains: searchQuery,
          mode: "insensitive",
        },
      },
      orderBy: {
        createdAt: "asc",
      },
      skip: itemsPerPage * (currentPage - 1),
      take: itemsPerPage,
    }),
    prisma.billboard.count({
      where: {
        label: {
          contains: searchQuery,
          mode: "insensitive",
        },
      },
    }),
  ]);

  return (
    <BillboardClient
      billboards={billboards}
      totalBillboards={totalBillboards}
    />
  );
};

export default BillboardsPage;
