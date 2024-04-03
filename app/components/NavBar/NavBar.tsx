import { Libre_Franklin } from "next/font/google";
import styles from "./NavBar.module.css";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import SignOut from "@/app/(auth)/components/SignOut";

const libre = Libre_Franklin({ subsets: ["latin"] });

const NavBar = async () => {
  const session = await getServerSession(authOptions);

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
          <li>Skateboards</li>
          <li>Clothes</li>
          <li>Accessories</li>
          {/* tmp */}
          <li>
            <Link href="/admin">ADMIN</Link>
          </li>
          <li>{session ? <SignOut /> : <Link href="/login">Login</Link>}</li>

          {/* <li>CART</li> */}
          <li>ACC</li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
