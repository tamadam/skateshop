import { Libre_Franklin } from "next/font/google";
import styles from "./NavBar.module.css";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { ROLES } from "@prisma/client";
import { CATEGORY_PRODUCTS_SEARCH_PARAM } from "@/app/constants";
import {
  CATEGORY_ACCESSORIES_ID,
  CATEGORY_CLOTHES_ID,
  CATEGORY_SKATEBOARDS_ID,
} from "@/app/(shop)/constants";
import MyAccount from "./MyAccount/MyAccount";
import NavBarMobile from "../NavBarMobile/NavBarMobile";
import CartPreview from "./CartPreview/CartPreview";

const libre = Libre_Franklin({ subsets: ["latin"] });

const NavBar = async () => {
  const session = await getServerSession(authOptions);
  const isAuthenticated = Boolean(session);
  const isAdmin = Boolean(session?.user.role === ROLES.ADMIN);

  const routes = [
    {
      href: "/marketplace",
      label: "Marketplace",
    },
    {
      href: `/products/?${CATEGORY_PRODUCTS_SEARCH_PARAM}=${CATEGORY_SKATEBOARDS_ID}`,
      label: "Skateboards",
    },
    {
      href: `/products/?${CATEGORY_PRODUCTS_SEARCH_PARAM}=${CATEGORY_CLOTHES_ID}`,
      label: "Clothes",
    },
    {
      href: `/products/?${CATEGORY_PRODUCTS_SEARCH_PARAM}=${CATEGORY_ACCESSORIES_ID}`,
      label: "Accessories",
    },
  ];

  return (
    <nav className={styles.navbarOuterWrapper}>
      <div className={styles.navbarInnerWrapper}>
        <Link href="/" className={styles.navbarTitleContainer}>
          <h1 className={`${libre.className} ${styles.navbarTitle}`}>
            Skate Shop
          </h1>
          <h3 className={`${libre.className} ${styles.navbarSubtitle}`}>
            Your skateboard supplier
          </h3>
        </Link>
        <ul className={`${libre.className} ${styles.navbarItemsContainer}`}>
          {routes.map((route) => (
            <li key={route.href}>
              <Link href={route.href}>{route.label}</Link>
            </li>
          ))}
          <li>
            <CartPreview />
          </li>
          <li>
            <MyAccount isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
          </li>
        </ul>
      </div>
      <NavBarMobile
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
        routes={routes}
      />
    </nav>
  );
};

export default NavBar;
