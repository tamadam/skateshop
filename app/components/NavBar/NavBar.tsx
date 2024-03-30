import { Libre_Franklin } from "next/font/google";
import styles from "./NavBar.module.css";

const libre = Libre_Franklin({ subsets: ["latin"] });

const NavBar = () => {
  return (
    <nav className={styles.navbarOuterWrapper}>
      <div className={styles.navbarInnerWrapper}>
        <div className={styles.navbarTitleContainer}>
          <h1 className={`${libre.className} ${styles.navbarTitle}`}>
            Skate Shop
          </h1>
          <h3 className={`${libre.className} ${styles.navbarSubtitle}`}>
            Your skateboard supplier
          </h3>
        </div>
        <ul className={`${libre.className} ${styles.navbarItemsContainer}`}>
          <li>Streetwear</li>
          <li>Shoes</li>
          <li>Skate</li>
          <li>Accessories</li>
          <li>CART</li>
          <li>ACC</li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
