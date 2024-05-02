import prisma from "@/prisma/client";
import ProductForm from "./ProductForm";

interface ProductPageProps {
  params: { productId: string };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const [product, categories, brands, sizes, colors] =
    await prisma.$transaction([
      prisma.product.findUnique({
        where: {
          id: params.productId,
        },
        include: {
          images: true,
        },
      }),
      prisma.category.findMany(),
      prisma.brand.findMany(),
      prisma.size.findMany(),
      prisma.color.findMany(),
    ]);

  return (
    <ProductForm
      product={JSON.parse(JSON.stringify(product))}
      categories={categories}
      brands={brands}
      sizes={sizes}
      colors={colors}
    />
  );
};

export default ProductPage;
