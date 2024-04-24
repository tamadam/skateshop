import prisma from "@/prisma/client";
import CategoryClient from "./CategoryClient";
import { FormattedCategory } from "./columns";
import { formatDate } from "@/lib/formatDate";
import { getValidatedPageNumber } from "@/lib/paginationUtils";
import { PAGINATION_ITEMS_PER_PAGE } from "@/app/constants";

interface CategoriesPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const CategoriesPage = async ({ searchParams }: CategoriesPageProps) => {
  const currentPage = getValidatedPageNumber(searchParams["page"]);
  const itemsPerPage = PAGINATION_ITEMS_PER_PAGE;

  const searchQuery = searchParams["search_query"]?.[0] ?? "";

  const [categories, totalCategories] = await prisma.$transaction([
    prisma.category.findMany({
      where: {
        name: {
          contains: searchQuery,
          mode: "insensitive",
        },
      },
      include: {
        billboard: true,
        subCategory: true,
        parentCategory: true,
      },
      orderBy: {
        createdAt: "asc",
      },
      skip: itemsPerPage * (currentPage - 1),
      take: itemsPerPage,
    }),
    prisma.category.count({
      where: {
        name: {
          contains: searchQuery,
          mode: "insensitive",
        },
      },
    }),
  ]);

  const formattedCategories: FormattedCategory[] = categories.map(
    (category) => {
      return {
        id: category.id,
        name: category.name,
        parentCategory: category.parentCategory?.name || "",
        billboard: category.billboard.label,
        createdAt: formatDate(category.createdAt, "en-US"),
      };
    }
  );

  return (
    <CategoryClient
      categories={formattedCategories}
      totalCategories={totalCategories}
    />
  );
};

export default CategoriesPage;
