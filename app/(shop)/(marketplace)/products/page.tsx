import Billboard from "../components/Billboard/Billboard";
import Container from "../components/Container/Container";
import getProducts from "../../actions/getProducts";
import ProductsNav from "./components/ProductsNav/ProductsNav";
import ProductsContent from "./components/ProductsContent/ProductsContent";
import {
  BRAND_SEARCH_PARAM,
  CATEGORY_PRODUCTS_SEARCH_PARAM,
} from "@/app/constants";
import getCategory from "../../actions/getCategory";
import {
  CategoryType,
  ProductInfo,
  ProductNavInfo,
  ProductType,
} from "../../types";
import getAllSubCategories from "../../actions/getAllSubCategories";

interface ProductsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const categoryIdParam = searchParams[CATEGORY_PRODUCTS_SEARCH_PARAM];
  const categoryId = Array.isArray(categoryIdParam)
    ? categoryIdParam[0]
    : categoryIdParam ?? "";

  const brandIdsParam = searchParams[BRAND_SEARCH_PARAM];
  const brandIds = Array.isArray(brandIdsParam)
    ? brandIdsParam
    : brandIdsParam
    ? [brandIdsParam]
    : [];

  const category: CategoryType = await getCategory(categoryId);
  const subCategories: CategoryType[] = await getAllSubCategories(categoryId);
  const products: ProductType[] = await getProducts({ categoryId, brandIds });

  const productInfo: ProductInfo[] = products.map((product) => ({
    brand: product.brand,
    price: product.price,
    size: product.size,
    color: product.color,
  }));

  const productsNavInfo: ProductNavInfo = { productInfo, subCategories };

  return (
    <div>
      <Billboard billboard={category?.billboard} />
      <Container includeSidebar>
        <ProductsNav data={productsNavInfo} />
        <ProductsContent products={products} />
      </Container>
    </div>
  );
};

export default ProductsPage;
