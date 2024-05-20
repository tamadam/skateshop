import Billboard from "../components/Billboard/Billboard";
import getBillboard from "../../actions/getBillboard";
import Container from "../components/Container/Container";
import getBrands from "../../actions/getBrands";
import MarketplaceGrid from "./components/MarketplaceGrid/MarketplaceGrid";
import getProducts from "../../actions/getProducts";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import { BILLBOARD_DEFAULT_ID } from "../../constants";

const MarketplacePage = async () => {
  const billboard = await getBillboard(BILLBOARD_DEFAULT_ID);
  const brands = (await getBrands()).filter((brand) => Boolean(brand.imageUrl));
  const featuredProducts = await getProducts({ isFeatured: true });

  return (
    <div>
      <Billboard billboard={billboard} />
      <Container>
        <MarketplaceGrid brands={brands} />
        <FeaturedProducts products={featuredProducts} />
      </Container>
    </div>
  );
};

export default MarketplacePage;
