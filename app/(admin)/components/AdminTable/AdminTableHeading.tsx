import Button from "@/app/components/Button/Button";
import styles from "./AdminTable.module.css";
import Search from "@/app/components/Search/Search";
import { HiOutlinePlus } from "react-icons/hi";

interface AdminTableHeadingProps {
  addNewLabel: string;
  onAddNew: () => void;
}

const AdminTableHeading = ({
  addNewLabel,
  onAddNew,
}: AdminTableHeadingProps) => {
  return (
    <div className={styles.assetsTableHeading}>
      <Button
        variant="primary"
        onClick={onAddNew}
        Icon={HiOutlinePlus}
        iconFirst
      >
        <span>{addNewLabel}</span>
      </Button>
      <Search />
    </div>
  );
};

export default AdminTableHeading;
