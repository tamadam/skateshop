import { BrandType } from "@/app/(shop)/types";
import AdvertCard from "../AdvertCard/AdvertCard";
import BrandSlider from "../LogoSlider/BrandSlider";
import styles from "./MarketplaceGrid.module.css";
import ImageSlider from "../ImageSlider/ImageSlider";

interface MarketplaceGridProps {
  brands: BrandType[];
}

const MarketplaceGrid = ({ brands }: MarketplaceGridProps) => {
  const imageSliderUrls = [
    "/static/images/sale1.jpg",
    "/static/images/sale1-2.png",
    "/static/images/sale1-3.png",
    "/static/images/sale1-4.png",
  ];

  return (
    <div className={styles.marketplaceWrapper}>
      <div id={styles.offer}>
        <AdvertCard href="#" imageUrl="/static/images/offer.jpg" />
      </div>
      <div id={styles.catOne}>
        <ImageSlider imageUrls={imageSliderUrls} />
        {/* <AdvertCard href="#" imageUrl="/static/images/sale1.jpg" /> */}
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
