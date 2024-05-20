import Billboard from "../components/Billboard/Billboard";
import Container from "../components/Container/Container";
import getProducts from "../../actions/getProducts";
import ProductsNav from "./components/ProductsNav/ProductsNav";
import ProductsContent from "./components/ProductsContent/ProductsContent";
import { CATEGORY_PRODUCTS_SEARCH_PARAM } from "@/app/constants";
import getCategory from "../../actions/getCategory";

interface ProductsPageProps {
  searchParams: { [CATEGORY_PRODUCTS_SEARCH_PARAM]: string };
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const category = await getCategory(
    searchParams[CATEGORY_PRODUCTS_SEARCH_PARAM]
  );
  const products = await getProducts({
    categoryId: searchParams[CATEGORY_PRODUCTS_SEARCH_PARAM],
  });

  return (
    <div>
      <Billboard billboard={category.billboard} />
      <Container includeSidebar>
        <ProductsNav />
        <ProductsContent products={products} />
      </Container>
    </div>
  );
};

export default ProductsPage;
