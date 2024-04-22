import prisma from "@/prisma/client";
import CategoryForm from "./CategoryForm";

interface CategoryPageProps {
  params: { categoryId: string };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const categories = await prisma.category.findMany();
  const billboards = await prisma.billboard.findMany();

  const currentCategory = categories.filter(
    (category) => category.id === params.categoryId
  )[0];

  return (
    <CategoryForm
      categories={categories}
      currentCategory={currentCategory}
      billboards={billboards}
    />
  );
};

export default CategoryPage;
