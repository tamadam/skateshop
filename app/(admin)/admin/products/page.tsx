import { PAGINATION_ITEMS_PER_PAGE } from "@/app/(admin)/constants";
import { getValidatedPageNumber } from "@/lib/paginationUtils";
import prisma from "@/prisma/client";
import { FormattedProduct } from "./columns";
import { formatDate } from "@/lib/formatDate";
import ProductClient from "./ProductClient";

interface ProductsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const currentPage = getValidatedPageNumber(searchParams["page"]);
  const itemsPerPage = PAGINATION_ITEMS_PER_PAGE;

  const searchQuery = searchParams["search_query"]?.[0] ?? "";

  const [products, totalProducts] = await prisma.$transaction([
    prisma.product.findMany({
      where: {
        name: {
          contains: searchQuery,
          mode: "insensitive",
        },
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        images: true,
      },
      skip: itemsPerPage * (currentPage - 1),
      take: itemsPerPage,
    }),
    prisma.product.count({
      where: {
        name: {
          contains: searchQuery,
          mode: "insensitive",
        },
      },
    }),
  ]);

  const formattedProducts: FormattedProduct[] = products.map((product) => {
    return {
      id: product.id,
      name: product.name,
      price: product.price.toNumber(),
      images: product.images,
      createdAt: formatDate(product.createdAt, "en-US"),
    };
  });

  return (
    <ProductClient products={formattedProducts} totalProducts={totalProducts} />
  );
};

export default ProductsPage;
