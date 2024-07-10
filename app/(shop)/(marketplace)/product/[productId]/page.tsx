import getParentCategories from "@/app/(shop)/actions/getParentCategories";
import getProduct from "@/app/(shop)/actions/getProduct";
import {
  BrandType,
  CategoryType,
  ProductBreadcrumbData,
  SingleProductType,
} from "@/app/(shop)/types";
import Billboard from "../../components/Billboard/Billboard";
import Container from "../../components/Container/Container";
import getBrand from "@/app/(shop)/actions/getBrand";
import ProductBreadcrumb from "../../components/ProductBreadcrumb/ProductBreadcrumb";
import ProductDetails from "../components/ProductDetails/ProductDetails";

export const revalidate = 3600;

interface ProductPageProps {
  params: { productId: string };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  // retrieve product
  const product: SingleProductType = await getProduct(params.productId);

  // retrieve brand
  const brand: BrandType = await getBrand(product.brandId);

  // retrieve category list
  const categoryListOfProduct: CategoryType[] = await getParentCategories(
    product.categoryId
  );

  // direct category of product
  const categoryOfProduct: CategoryType = categoryListOfProduct[0];

  // create object for the breadcrumb
  const breadcrumbData: ProductBreadcrumbData[] = categoryListOfProduct
    .map((category) => ({ id: category.id, name: category.name }))
    .reverse();

  return (
    <div>
      <Billboard billboard={categoryOfProduct.billboard} />
      <Container>
        <ProductBreadcrumb breadcrumb={breadcrumbData} />
        <ProductDetails product={product} brand={brand} />
      </Container>
    </div>
  );
};

export default ProductPage;
