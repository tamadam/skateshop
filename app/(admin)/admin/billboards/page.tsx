import prisma from "@/prisma/client";
import BillboardClient from "./BillboardClient";
import { PAGINATION_ITEMS_PER_PAGE } from "@/app/constants";
import { getValidatedPageNumber } from "@/lib/paginationUtils";
import { formatDate } from "@/lib/formatDate";
import { FormattedBillboard } from "./columns";

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

  const formattedBillboards: FormattedBillboard[] = billboards.map(
    (billboard) => {
      return {
        id: billboard.id,
        label: billboard.label,
        imageUrl: billboard.imageUrl || undefined,
        createdAt: formatDate(billboard.createdAt, "en-US"),
      };
    }
  );

  return (
    <BillboardClient
      billboards={formattedBillboards}
      totalBillboards={totalBillboards}
    />
  );
};

export default BillboardsPage;
