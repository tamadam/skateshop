import Billboard from "../components/Billboard/Billboard";
import Container from "../components/Container/Container";
import getBillboard from "../../actions/getBillboard";
import { BILLBOARD_DEFAULT_ID } from "../../constants";
import getProducts from "../../actions/getProducts";
import ProductsNav from "./components/ProductsNav/ProductsNav";
import ProductsContent from "./components/ProductsContent/ProductsContent";
import { CATEGORY_PRODUCTS_SEARCH_PARAM } from "@/app/constants";

interface ProductsPageProps {
  searchParams: { [CATEGORY_PRODUCTS_SEARCH_PARAM]: string };
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const billboard = await getBillboard(BILLBOARD_DEFAULT_ID);
  const products = await getProducts({
    categoryId: searchParams[CATEGORY_PRODUCTS_SEARCH_PARAM],
  });

  return (
    <div>
      <Billboard billboard={billboard} />
      <Container includeSidebar>
        <ProductsNav />
        <ProductsContent products={products} />
      </Container>
    </div>
  );
};

export default ProductsPage;
