"use client";

import { Billboard } from "@prisma/client";
import styles from "./BillboardClient.module.css";
import Heading from "../../components/Heading/Heading";
import { formatDate } from "@/lib/formatDate";
import { useRouter } from "next/navigation";
import { CLOUDINARY_BILLBOARDS_REGEX } from "@/app/constants";
import { deleteCldImage, getCldOptions } from "@/lib/cloudinaryUtils";
import Button from "@/app/components/Button/Button";
import { HiOutlinePlus } from "react-icons/hi";
import ApiList from "../../components/ApiInfo/ApiList";
import toast from "react-hot-toast";
import { useState } from "react";
import Overlay from "@/app/components/Overlay/Overlay";

interface BillboardClientProps {
  billboards: Billboard[];
}

const BillboardClient = ({ billboards }: BillboardClientProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const tableHeaders = ["Label", "Date"];
  const headerLength = tableHeaders.length + 1;

  const handleDelete = async (billboard: Billboard) => {
    try {
      setIsLoading(true);

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
        toast.success("Billboard deleted successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Overlay open={isLoading} />
      <div className={styles.billboardWrapper}>
        <Heading
          title={`Billboards (${billboards.length})`}
          description="Manage your billboards for your shop"
        />
        <div className={styles.newAssetButtonContainer}>
          <Button
            variant="primary"
            onClick={() => router.push("/admin/billboards/new")}
            Icon={HiOutlinePlus}
            iconFirst
          >
            Add New
          </Button>
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
              {billboards.length === 0 && (
                <div className={styles.assetsNoTableContent}>
                  No billboards available
                </div>
              )}
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
                      <Button
                        variant="update"
                        onClick={() =>
                          router.push(`/admin/billboards/${billboard.id}`)
                        }
                      >
                        Update
                      </Button>
                      <Button
                        variant="delete"
                        onClick={() => handleDelete(billboard)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <ApiList entityName="billboards" entityIdName="billboardId" />
      </div>
    </>
  );
};

export default BillboardClient;
