import Link from "next/link";
import styles from "./Footer.module.css";
import { Libre_Franklin } from "next/font/google";
import localFont from "next/font/local";

const libre = Libre_Franklin({ subsets: ["latin"] });
const segoePrint = localFont({
  src: "../../../public/static/fonts/Segoe-Print-Font.ttf",
});

const Footer = () => {
  return (
    <div className={`${styles.footerWrapper} ${libre.className}`}>
      <div className={styles.footerTitle}>
        <h2>Join our community</h2>
        <span className={segoePrint.className}>
          Don&apos;t miss the coolest opportunities
        </span>
      </div>
      <div className={styles.footerLinks}>
        <Link href="#">LoremTech</Link>
        <Link href="#">LoremTech</Link>
        <Link href="#">LoremTech</Link>
        <Link href="#">LoremTech</Link>
      </div>
      <div>Copyright &copy; 2024</div>
    </div>
  );
};

export default Footer;
