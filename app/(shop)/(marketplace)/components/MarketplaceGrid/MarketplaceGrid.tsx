import { Brand } from "@prisma/client";
import AdvertCard from "../AdvertCard/AdvertCard";
import BrandSlider from "../LogoSlider/BrandSlider";
import styles from "./MarketplaceGrid.module.css";

interface MarketplaceGridProps {
  brands: Brand[];
}

const MarketplaceGrid = ({ brands }: MarketplaceGridProps) => {
  return (
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
  );
};

export default MarketplaceGrid;
