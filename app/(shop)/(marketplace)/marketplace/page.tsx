import Billboard from "../components/Billboard/Billboard";
import getBillboard from "../../actions/getBillboard";
import Container from "../components/Container/Container";
import getBrands from "../../actions/getBrands";
import MarketplaceGrid from "../components/MarketplaceGrid/MarketplaceGrid";

const MarketplacePage = async () => {
  const billboard = await getBillboard("9737f519-0681-4508-9af9-24d1a96732c9");
  const brands = (await getBrands()).filter((brand) => Boolean(brand.imageUrl));

  return (
    <div>
      <Billboard billboard={billboard} />
      <Container>
        <MarketplaceGrid brands={brands} />
      </Container>
    </div>
  );
};

export default MarketplacePage;
