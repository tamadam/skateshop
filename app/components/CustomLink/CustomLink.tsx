import Link from "next/link";
import styles from "./CustomLink.module.css";

interface LinkProps {
  href: string;
  label: string;
}

const CustomLink = ({ href, label }: LinkProps) => {
  return (
    <Link href={href} className={styles.link}>
      {label}
    </Link>
  );
};

export default CustomLink;
