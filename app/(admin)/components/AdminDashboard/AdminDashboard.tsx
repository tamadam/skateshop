import styles from "./AdminDashboard.module.css";

interface AdminDashboardProps {
  billboardCount: number;
  categoryCount: number;
  sizeCount: number;
  colorCount: number;
  brandCount: number;
  productCount: number;
}

const AdminDashboard = ({
  billboardCount,
  categoryCount,
  sizeCount,
  colorCount,
  brandCount,
  productCount,
}: AdminDashboardProps) => {
  return (
    <div className={styles.adminDashboardWrapper}>
      <div>Billboards: {billboardCount}</div>
      <div>Categories: {categoryCount}</div>
      <div>Sizes: {sizeCount}</div>
      <div>Colors: {colorCount}</div>
      <div>Brands: {brandCount}</div>
      <div>Products: {productCount}</div>
    </div>
  );
};

export default AdminDashboard;
