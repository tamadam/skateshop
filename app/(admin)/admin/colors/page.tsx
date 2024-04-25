import { PAGINATION_ITEMS_PER_PAGE } from "@/app/constants";
import { getValidatedPageNumber } from "@/lib/paginationUtils";
import prisma from "@/prisma/client";
import { FormattedColor } from "./columns";
import { formatDate } from "@/lib/formatDate";
import ColorClient from "./ColorClient";

interface ColorsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ColorsPage = async ({ searchParams }: ColorsPageProps) => {
  const currentPage = getValidatedPageNumber(searchParams["page"]);
  const itemsPerPage = PAGINATION_ITEMS_PER_PAGE;

  const searchQuery = searchParams["search_query"]?.[0] ?? "";

  const [colors, totalColors] = await prisma.$transaction([
    prisma.color.findMany({
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
    prisma.color.count({
      where: {
        name: {
          contains: searchQuery,
          mode: "insensitive",
        },
      },
    }),
  ]);

  const formattedColors: FormattedColor[] = colors.map((color) => {
    return {
      id: color.id,
      name: color.name,
      value: color.value,
      createdAt: formatDate(color.createdAt, "en-US"),
    };
  });

  return <ColorClient colors={formattedColors} totalColors={totalColors} />;
};

export default ColorsPage;
