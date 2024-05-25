import Billboard from "../components/Billboard/Billboard";
import Container from "../components/Container/Container";
import getProducts from "../../actions/getProducts";
import ProductsNav from "./components/ProductsNav/ProductsNav";
import ProductsContent from "./components/ProductsContent/ProductsContent";
import { CATEGORY_PRODUCTS_SEARCH_PARAM } from "@/app/constants";
import getCategory from "../../actions/getCategory";
import {
  CategoryType,
  ProductInfo,
  ProductNavInfo,
  ProductType,
} from "../../types";
import getAllSubCategories from "../../actions/getAllSubCategories";

interface ProductsPageProps {
  searchParams: { [CATEGORY_PRODUCTS_SEARCH_PARAM]: string };
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const categoryId = searchParams[CATEGORY_PRODUCTS_SEARCH_PARAM];

  const category: CategoryType = await getCategory(categoryId);
  const subCategories: CategoryType[] = await getAllSubCategories(categoryId);
  const products: ProductType[] = await getProducts({ categoryId });

  const productInfo: ProductInfo[] = products.map((product) => ({
    brand: product.brand,
    price: product.price,
    size: product.size,
    color: product.color,
  }));

  const productsNavInfo: ProductNavInfo = { productInfo, subCategories };

  return (
    <div>
      <Billboard billboard={category.billboard} />
      <Container includeSidebar>
        <ProductsNav data={productsNavInfo} />
        <ProductsContent products={products} />
      </Container>
    </div>
  );
};

export default ProductsPage;
