import { BrandType } from "@/app/(shop)/types";
import AdvertCard from "../../../components/AdvertCard/AdvertCard";
import BrandSlider from "../../../components/LogoSlider/BrandSlider";
import styles from "./MarketplaceGrid.module.css";
import ImageSlider from "../../../components/ImageSlider/ImageSlider";
import {
  CATEGORY_BEARINGS_ACCESSORIES_ID,
  CATEGORY_CLOTHES_ID,
  CATEGORY_SKATEBOARDS_ID,
} from "@/app/(shop)/constants";
import { CATEGORY_PRODUCTS_SEARCH_PARAM } from "@/app/constants";

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

  const advertCardRoutes = [
    {
      id: styles.offer,
      href: `/products?${CATEGORY_PRODUCTS_SEARCH_PARAM}=${CATEGORY_SKATEBOARDS_ID}`,
      imageUrl: "/static/images/offer.jpg",
    },
    {
      id: styles.catTwo,
      href: `/products?${CATEGORY_PRODUCTS_SEARCH_PARAM}=${CATEGORY_SKATEBOARDS_ID}`,
      imageUrl: "/static/images/sale2.png",
    },
    {
      id: styles.subcatOne,
      href: `/products/?${CATEGORY_PRODUCTS_SEARCH_PARAM}=${CATEGORY_CLOTHES_ID}`,
      imageUrl: "/static/images/cat1.jpg",
    },
    {
      id: styles.subcatTwo,
      href: `/products/?${CATEGORY_PRODUCTS_SEARCH_PARAM}=${CATEGORY_CLOTHES_ID}`,
      imageUrl: "/static/images/cat2.jpg",
    },
    {
      id: styles.subcatThree,
      href: `/products?${CATEGORY_PRODUCTS_SEARCH_PARAM}=${CATEGORY_SKATEBOARDS_ID}`,
      imageUrl: "/static/images/cat3.jpg",
    },
    {
      id: styles.subcatFour,
      href: `/products?${CATEGORY_PRODUCTS_SEARCH_PARAM}=${CATEGORY_BEARINGS_ACCESSORIES_ID}`,
      imageUrl: "/static/images/cat4.jpg",
    },
    {
      id: styles.subcatFive,
      href: `/products/?${CATEGORY_PRODUCTS_SEARCH_PARAM}=${CATEGORY_CLOTHES_ID}`,
      imageUrl: "/static/images/cat5.jpg",
    },
    {
      id: styles.subcatSix,
      href: `/products/?${CATEGORY_PRODUCTS_SEARCH_PARAM}=${CATEGORY_CLOTHES_ID}`,
      imageUrl: "/static/images/cat6.jpg",
    },
  ];

  return (
    <div className={styles.marketplaceWrapper}>
      <div id={styles.catOne}>
        <ImageSlider imageUrls={imageSliderUrls} />
        {/* <AdvertCard href="#" imageUrl="/static/images/sale1.jpg" /> */}
      </div>

      {advertCardRoutes.map((card) => {
        return (
          <div key={card.id} id={card.id}>
            <AdvertCard href={card.href} imageUrl={card.imageUrl} />
          </div>
        );
      })}

      <div id={styles.brand}>
        <BrandSlider brands={brands} />
      </div>
    </div>
  );
};

export default MarketplaceGrid;
