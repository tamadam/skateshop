import Billboard from "../components/Billboard/Billboard";
import Container from "../components/Container/Container";
import getBillboard from "../../actions/getBillboard";
import { BILLBOARD_DEFAULT_ID } from "../../constants";
import getProducts from "../../actions/getProducts";

interface ProductsPageProps {
  searchParams: { p: string };
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const billboard = await getBillboard(BILLBOARD_DEFAULT_ID);
  const products = await getProducts({ categoryId: searchParams.p });

  return (
    <div>
      <Billboard billboard={billboard} />
      <Container>
        ProductsPage
        <div>
          {products.map((product) => {
            return (
              <div key={product.id}>
                {product.category.name} - {product.name}
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default ProductsPage;
