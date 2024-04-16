"use client";

import { Billboard } from "@prisma/client";
import styles from "./BillboardClient.module.css";
import Heading from "../../components/Heading/Heading";
import AdminAssetButton from "../../components/AdminAssetButton";
import { formatDate } from "@/lib/formatDate";
import { useRouter } from "next/navigation";
import { CLOUDINARY_BILLBOARDS_REGEX } from "@/app/constants";
import { deleteCldImage, getCldOptions } from "@/lib/cloudinaryUtils";

interface BillboardClientProps {
  billboards: Billboard[];
}

const BillboardClient = ({ billboards }: BillboardClientProps) => {
  const router = useRouter();

  const tableHeaders = ["Label", "Date"];
  const headerLength = tableHeaders.length + 1;

  const handleDelete = async (billboard: Billboard) => {
    try {
      // delete billboard image from Cloudinary if exists
      if (billboard.imageUrl) {
        const cldOptions = getCldOptions(
          billboard?.imageUrl,
          CLOUDINARY_BILLBOARDS_REGEX
        );

        deleteCldImage(cldOptions);
      }

      const response = await fetch(`/api/billboards/${billboard.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          onClick={() => router.push("/admin/billboards/new")}
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
                >
                  <div>{billboard.label}</div>
                  <div>{formatDate(billboard.createdAt, "en-US")}</div>
                  <div className={styles.assetActionButtonContainer}>
                    <AdminAssetButton
                      type="update"
                      label="Update"
                      onClick={() =>
                        router.push(`/admin/billboards/${billboard.id}`)
                      }
                    />
                    <AdminAssetButton
                      type="delete"
                      label="Delete"
                      onClick={() => handleDelete(billboard)}
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
