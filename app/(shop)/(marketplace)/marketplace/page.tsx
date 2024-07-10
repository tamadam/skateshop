import Billboard from "../components/Billboard/Billboard";
import getBillboard from "../../actions/getBillboard";
import Container from "../components/Container/Container";
import getBrands from "../../actions/getBrands";
import MarketplaceGrid from "./components/MarketplaceGrid/MarketplaceGrid";
import getProducts from "../../actions/getProducts";
import ProductsSlider from "../components/ProductsSlider/ProductsSlider";
import { BILLBOARD_DEFAULT_ID } from "../../constants";
import { RawProductType } from "../../types";

export const revalidate = 3600;

const MarketplacePage = async () => {
  const billboard = await getBillboard(BILLBOARD_DEFAULT_ID);
  const brands = (await getBrands()).filter((brand) => Boolean(brand.imageUrl));
  const rawFeaturedProducts: RawProductType = await getProducts({
    isFeatured: true,
  });
  const featuredProducts = rawFeaturedProducts.data.products;

  return (
    <div>
      <Billboard billboard={billboard} />
      <Container>
        <MarketplaceGrid brands={brands} />
        <ProductsSlider products={featuredProducts} title="Best sellers" />
      </Container>
    </div>
  );
};

export default MarketplacePage;
