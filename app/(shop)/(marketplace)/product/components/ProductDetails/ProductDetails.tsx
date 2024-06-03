import { BrandType, SingleProductType } from "@/app/(shop)/types";
import styles from "./ProductDetails.module.css";
import { Libre_Franklin } from "next/font/google";
import ProductCounter from "../ProductCounter/ProductCounter";
import ProductAddToCart from "../ProductAddToCart/ProductAddToCart";
import ProductGallery from "../ProductGallery/ProductGallery";

const libre = Libre_Franklin({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

interface ProductDetailsProps {
  product: SingleProductType;
  brand: BrandType;
}

const ProductDetails = ({ product, brand }: ProductDetailsProps) => {
  return (
    <div className={`${styles.productDetailsWrapper} ${libre.className}`}>
      <ProductGallery images={product.images} />
      <div className={styles.productDetailsInformation}>
        <div className={styles.productTitleContainer}>
          <div className={styles.productBrand}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {brand.imageUrl && <img src={brand.imageUrl} alt={brand.name} />}
          </div>
          <h1>{product.name}</h1>
        </div>
        <div className={styles.productPriceContainer}>
          <h2>&euro;{product.price}</h2>
        </div>
        <div className={styles.productCounter}>
          <ProductCounter />
        </div>
        <div className={styles.productAddToCart}>
          <ProductAddToCart />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
