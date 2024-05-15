import styles from "./ProductCard.module.css";
import { ProductType } from "../../types";
import { Libre_Franklin, Open_Sans } from "next/font/google";
import ImageSlider from "../../(marketplace)/components/ImageSlider/ImageSlider";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "800"],
});

const libre = Libre_Franklin({ subsets: ["latin"], weight: ["600"] });

interface ProductCardProps {
  product: ProductType;
  onClick: () => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const images = product.images.map((image) => image.url);

  return (
    <div className={styles.cardContainer} onClick={onClick}>
      <div className={styles.cardImageWrapper}>
        <ImageSlider
          imageUrls={
            images.length !== 0 ? images : ["/static/images/not_found.png"]
          }
          productCard
        />
        {/* <Image
          fill
          src={product.images[0]?.url || "/static/images/not_found.png"}
          alt="product image"
          className={styles.cardImage}
        /> */}
      </div>
      <div className={`${styles.cardDetails} ${openSans.className}`}>
        <div className={styles.cardHeading}>
          <h2 className={styles.cardBrand}>{product.brand.name}</h2>
          <h2 className={styles.cardName}>{product.name}</h2>
        </div>
        <div className={styles.cardPrice}>&euro;{product.price}</div>
      </div>
      {product.isFeatured && (
        <div className={`${styles.cardNewFlag} ${libre.className}`}>
          <span>New</span>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
