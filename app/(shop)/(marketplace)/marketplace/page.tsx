import Billboard from "../components/Billboard/Billboard";
import getBillboard from "../../actions/getBillboard";
import Container from "../components/Container/Container";
import styles from "./page.module.css";
import AdvertCard from "../components/AdvertCard/AdvertCard";
import getBrands from "../../actions/getBrands";
import BrandSlider from "../components/LogoSlider/BrandSlider";

const MarketplacePage = async () => {
  const billboard = await getBillboard("9737f519-0681-4508-9af9-24d1a96732c9");
  const brands = (await getBrands()).filter((brand) => Boolean(brand.imageUrl));

  return (
    <div>
      <Billboard billboard={billboard} />
      <Container>
        <div className={styles.marketplaceWrapper}>
          <div id={styles.offer}>
            <AdvertCard href="#" imageUrl="/static/images/offer.jpg" />
          </div>
          <div id={styles.catOne}>
            <AdvertCard href="#" imageUrl="/static/images/sale1.jpg" />
          </div>
          <div id={styles.catTwo}>
            <AdvertCard href="#" imageUrl="/static/images/sale2.png" />
          </div>
          <div id={styles.subcatOne}>
            <AdvertCard href="#" imageUrl="/static/images/cat1.jpg" />
          </div>
          <div id={styles.subcatTwo}>
            <AdvertCard href="#" imageUrl="/static/images/cat2.jpg" />
          </div>
          <div id={styles.subcatThree}>
            <AdvertCard href="#" imageUrl="/static/images/cat3.jpg" />
          </div>
          <div id={styles.subcatFour}>
            <AdvertCard href="#" imageUrl="/static/images/cat4.jpg" />
          </div>
          <div id={styles.subcatFive}>
            <AdvertCard href="#" imageUrl="/static/images/cat5.jpg" />
          </div>
          <div id={styles.subcatSix}>
            <AdvertCard href="#" imageUrl="/static/images/cat6.jpg" />
          </div>
          <div id={styles.brand}>
            <BrandSlider brands={brands} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MarketplacePage;
