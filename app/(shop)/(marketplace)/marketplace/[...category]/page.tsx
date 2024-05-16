import getBillboard from "@/app/(shop)/actions/getBillboard";
import Container from "../../components/Container/Container";
import Billboard from "../../components/Billboard/Billboard";

const ProductsPage = async ({ params }: { params: { category: string } }) => {
  const billboard = await getBillboard("9737f519-0681-4508-9af9-24d1a96732c9");

  return (
    <div>
      <Billboard billboard={billboard} />
      <Container>hello slug: {params.category}</Container>
    </div>
  );
};

export default ProductsPage;
