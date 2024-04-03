import "./Hero.css";

import boardImg from "../../assets/desk.png";
import boardImg2 from "../../assets/desk2.png";
import Image from "next/image";
/* import Arrow from "../SVGs/Arrow"; */

const Hero = () => {
  return (
    <div className="hero">
      <div className="wrapper">
        <div className="desk-container">
          <div className="desk">
            <Image
              src="/static/images/home_hero_desk1_optimized.png"
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "100%",
                height: "100%",
              }}
            />

            {/* <img src="/static/images/home_hero_desk1_optimized.png" alt="" /> */}
          </div>
          <div className="desk">
            <Image
              fill
              src="/static/images/home_hero_desk2_optimized.png"
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
            {/* <img src="/static/images/home_hero_desk2_optimized.png" alt="" /> */}
          </div>
        </div>
        <div className="title-container">
          <div className="hero-title">
            <h1>New Models</h1>
            <div className="hero-discount">
              <span>Check out the website for special</span>
              <div>
                <span className="discount-symbol">%</span>{" "}
                <span className="discount-text">summer discounts</span>{" "}
                <span className="discount-symbol">%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="shop-container">
          <span>Go to Shop</span>
          <svg
            width="30"
            height="30"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M58.5277 26.4732L34.6709 2.8753C32.7229 0.948971 29.5816 0.964557 27.6553 2.91374C25.729 4.86057 25.7459 8.00178 27.6939 9.92811L42.97 25.0404H4.96043C2.22141 25.0405 0 27.2606 0 29.9996C0 32.7398 2.22141 34.96 4.96043 34.96H42.9698L27.6939 50.071C25.7459 51.9974 25.729 55.1399 27.6553 57.0867C29.5816 59.0346 32.7229 59.0515 34.6709 57.1251L58.5277 33.5273C59.4703 32.5942 60 31.3251 60 29.9998C60 28.674 59.4702 27.4062 58.5277 26.4732Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="text-container">
          <div className="board-advertise">
            {/*             <Arrow
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
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
