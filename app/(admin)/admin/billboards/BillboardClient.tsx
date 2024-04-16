"use client";

import { Billboard } from "@prisma/client";
import styles from "./BillboardClient.module.css";
import Heading from "../../components/Heading/Heading";
import AdminAssetButton from "../../components/AdminAssetButton";
import { formatDate } from "@/lib/formatDate";
import { useRouter } from "next/navigation";

interface BillboardClientProps {
  billboards: Billboard[];
}

const BillboardClient = ({ billboards }: BillboardClientProps) => {
  const router = useRouter();

  const tableHeaders = ["Label", "Date"];
  const headerLength = tableHeaders.length + 1;

  return (
    <div className={styles.billboardWrapper}>
      <Heading
        title={`Billboards (${billboards.length})`}
        description="Manage your billboards for your shop"
      />
      <div className={styles.newAssetButtonContainer}>
        <AdminAssetButton
          type="new"
          label="Add New"
          route="/admin/billboards/new"
        />
      </div>

      <div className={styles.assetsTableOuterWrapper}>
        <div
          className={styles.assetsTableInnerWrapper}
          style={{
            gridTemplateColumns: `repeat(${headerLength}, 1fr)`,
          }}
        >
          <div
            className={styles.assetsTableHeader}
            style={{ gridColumn: `span ${headerLength}` }}
          >
            {tableHeaders.map((header) => (
              <div key={header}>{header}</div>
            ))}
          </div>
          <div
            className={styles.assetsTableContent}
            style={{ gridColumn: `span ${headerLength}` }}
          >
            {billboards.length === 0 && <div>No billboards available</div>}
            {billboards.map((billboard) => {
              return (
                <div
                  key={billboard.id}
                  className={styles.assetItem}
                  style={{ gridColumn: `span ${headerLength}` }}
                  onClick={() =>
                    router.push(`/admin/billboards/${billboard.id}`)
                  }
                >
                  <div>{billboard.label}</div>
                  <div>{formatDate(billboard.createdAt, "en-US")}</div>
                  <div className={styles.assetActionButtonContainer}>
                    <AdminAssetButton
                      type="update"
                      label="Update"
                      route={`/admin/billboards/${billboard.id}`}
                    />
                    <AdminAssetButton
                      type="delete"
                      label="Delete"
                      route={`#`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillboardClient;
