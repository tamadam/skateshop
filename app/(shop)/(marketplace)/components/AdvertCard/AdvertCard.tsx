import styles from "./AdvertCard.module.css";
import Link from "next/link";
import Image from "next/image";

interface AdvertCardProps {
  imageUrl: string;
  href: string;
}

const AdvertCard = ({ imageUrl, href }: AdvertCardProps) => {
  return (
    <Link href={href} className={styles.advertCardWrapper}>
      <Image
        src={imageUrl}
        alt="category name"
        fill
        className={styles.advertCardImage}
      />
    </Link>
  );
};

export default AdvertCard;
