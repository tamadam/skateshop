import { PAGINATION_ITEMS_PER_PAGE } from "@/app/constants";
import { getValidatedPageNumber } from "@/lib/paginationUtils";
import prisma from "@/prisma/client";
import { FormattedSize } from "./columns";
import { formatDate } from "@/lib/formatDate";
import SizeClient from "./SizeClient";

interface SizesPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const SizesPage = async ({ searchParams }: SizesPageProps) => {
  const currentPage = getValidatedPageNumber(searchParams["page"]);
  const itemsPerPage = PAGINATION_ITEMS_PER_PAGE;

  const searchQuery = searchParams["search_query"]?.[0] ?? "";

  const [sizes, totalSizes] = await prisma.$transaction([
    prisma.size.findMany({
      where: {
        name: {
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
    prisma.size.count({
      where: {
        name: {
          contains: searchQuery,
          mode: "insensitive",
        },
      },
    }),
  ]);

  const formattedSizes: FormattedSize[] = sizes.map((size) => {
    return {
      id: size.id,
      name: size.name,
      value: size.value,
      createdAt: formatDate(size.createdAt, "en-US"),
    };
  });

  return <SizeClient sizes={formattedSizes} totalSizes={totalSizes} />;
};

export default SizesPage;
