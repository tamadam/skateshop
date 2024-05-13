import { Brand } from "@prisma/client";
import styles from "./BrandSlider.module.css";
import Image from "next/image";

interface BrandSliderProps {
  brands: Brand[];
}

const BrandSlider = ({ brands }: BrandSliderProps) => {
  const copybrands = [
    ...brands.map((brand) => ({ ...brand, ariaHidden: false })),
    ...brands.map((brand) => ({ ...brand, ariaHidden: true })),
  ];

  return (
    <div className={styles.logoSlider} data-animated="true">
      <div className={styles.logos}>
        {copybrands.map((brand, index) => {
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={index}
              src={brand.imageUrl || "/static/images/not_found.png"}
              alt={`logo-${brand.name}`}
              className={styles.logoImage}
              aria-hidden={brand.ariaHidden}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BrandSlider;
