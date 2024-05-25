import { Libre_Franklin } from "next/font/google";
import { BillboardType } from "../../../types";
import styles from "./Billboard.module.css";
import { BILLBOARD_DEFAULT_BACKGROUND } from "@/app/(shop)/constants";

const libre = Libre_Franklin({ subsets: ["latin"] });

interface BillboardProps {
  billboard: BillboardType;
}

const Billboard = ({ billboard }: BillboardProps) => {
  return (
    <div
      className={styles.billboardWrapper}
      style={{
        backgroundImage: `url(${
          billboard?.imageUrl || BILLBOARD_DEFAULT_BACKGROUND
        })`,
      }}
    >
      <div className={styles.billboardContentWrapper}>
        <div className={styles.billboardContent}>
          <h1 className={libre.className}>{billboard?.label}</h1>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
