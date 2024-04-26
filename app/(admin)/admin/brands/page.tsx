import { PAGINATION_ITEMS_PER_PAGE } from "@/app/constants";
import { getValidatedPageNumber } from "@/lib/paginationUtils";
import prisma from "@/prisma/client";
import { FormattedBrand } from "./columns";
import { formatDate } from "@/lib/formatDate";
import BrandClient from "./BrandClient";

interface BrandsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const BrandsPage = async ({ searchParams }: BrandsPageProps) => {
  const currentPage = getValidatedPageNumber(searchParams["page"]);
  const itemsPerPage = PAGINATION_ITEMS_PER_PAGE;

  const searchQuery = searchParams["search_query"]?.[0] ?? "";

  const [brands, totalBrands] = await prisma.$transaction([
    prisma.brand.findMany({
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
    prisma.brand.count({
      where: {
        name: {
          contains: searchQuery,
          mode: "insensitive",
        },
      },
    }),
  ]);

  const formattedBrands: FormattedBrand[] = brands.map((brand) => {
    return {
      id: brand.id,
      name: brand.name,
      imageUrl: brand.imageUrl || undefined,
      createdAt: formatDate(brand.createdAt, "en-US"),
    };
  });

  return <BrandClient brands={formattedBrands} totalBrands={totalBrands} />;
};

export default BrandsPage;
