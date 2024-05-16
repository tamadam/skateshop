import getBillboard from "../../actions/getBillboard";
import Billboard from "../components/Billboard/Billboard";
import Container from "../components/Container/Container";

const ProductsPage = async () => {
  const billboard = await getBillboard("9737f519-0681-4508-9af9-24d1a96732c9");

  return (
    <div>
      <Billboard billboard={billboard} />
      <Container>ProductsPage</Container>
    </div>
  );
};

export default ProductsPage;
