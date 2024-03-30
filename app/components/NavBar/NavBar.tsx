import "./NavBar.css";
import { Libre_Franklin } from "next/font/google";

const libre = Libre_Franklin({ subsets: ["latin"] });

const NavBar = () => {
  return (
    <nav className="navbar-outer-wrapper">
      <div className="navbar-inner-wrapper">
        <div className="navbar-title-container">
          <h1 className={`${libre.className} navbar-title`}>Skate Shop</h1>
          <h3 className={`${libre.className} navbar-subtitle`}>
            Your skateboard supplier
          </h3>
        </div>
        <ul className={`${libre.className} navbar-items-container`}>
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
