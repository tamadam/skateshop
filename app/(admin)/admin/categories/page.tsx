import prisma from "@/prisma/client";
import CategoryClient from "./CategoryClient";
import { FormattedCategory } from "./columns";
import { formatDate } from "@/lib/formatDate";

const CategoriesPage = async () => {
  const [categories, totalCategories] = await prisma.$transaction([
    prisma.category.findMany({
      include: {
        billboard: true,
        subCategory: true,
        parentCategory: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    }),
    prisma.category.count(),
  ]);

  const formattedCategories: FormattedCategory[] = categories.map(
    (category) => {
      return {
        id: category.id,
        name: category.name,
        parentCategory: category.parentCategory?.name || "",
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
