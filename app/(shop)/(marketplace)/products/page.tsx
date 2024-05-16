import Billboard from "../components/Billboard/Billboard";
import Container from "../components/Container/Container";
import getBillboard from "../../actions/getBillboard";
import { BILLBOARD_DEFAULT_ID } from "../../constants";

const ProductsPage = async () => {
  const billboard = await getBillboard(BILLBOARD_DEFAULT_ID);

  return (
    <div>
      <Billboard billboard={billboard} />
      <Container>ProductsPage</Container>
    </div>
  );
};

export default ProductsPage;
