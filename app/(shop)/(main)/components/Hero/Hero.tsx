import styles from "./Hero.module.css";
import { Libre_Franklin } from "next/font/google";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const libre = Libre_Franklin({ subsets: ["latin"] });

const Hero = () => {
  return (
    <div className={[styles.heroOuterWrapper, libre.className].join(" ")}>
      <div className={styles.heroInnerWrapper}>
        <div className={styles.skateContainer}>
          <div className={styles.desk}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/static/images/home_hero_desk1_optimized.png" alt="" />
          </div>
          <div className={styles.desk}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/static/images/home_hero_desk2_optimized.png" alt="" />
          </div>
        </div>
        <div className={styles.titleContainer}>
          <h1 className={styles.heroTitle}>New Models</h1>
          <div className={styles.heroDiscount}>
            <div>Check out the website for special</div>
            <div className={styles.heroDiscountHighlight}>
              <span>% summer discounts %</span>
            </div>
          </div>
        </div>
        <div className={styles.shopWrapper}>
          <Link href="/marketplace" className={styles.shopLink}>
            <span>Go to Shop</span>
            <div className={styles.shopIcon}>
              <FaArrowRight size="1.2em" />
            </div>{" "}
          </Link>
        </div>
        {/* <div className={styles.textWrapper}>
          <div className="board-advertise">
                        <Arrow
              className="advertise-arrow-1"
              color="FFEE00"
              width={2}
              height={2}
            />
            <span>go old school</span>
            {!isMobile && (
              <Arrow
                className="advertise-arrow-2"
                color="FFEE00"
                width={2}
                height={2}
              />
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Hero;
