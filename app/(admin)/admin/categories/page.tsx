import prisma from "@/prisma/client";

const CategoriesPage = async () => {
  const categories = await prisma.category.findMany({
    include: {
      billboard: true,
      subCategory: true,
      parentCategory: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  console.log(categories);

  return <div>CategoriesPage</div>;
};

export default CategoriesPage;
