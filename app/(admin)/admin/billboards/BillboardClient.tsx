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
import Modal from "@/app/components/Modal/Modal";
import Spinner from "@/app/components/Spinner/Spinner";

interface BillboardClientProps {
  billboards: Billboard[];
}

const BillboardClient = ({ billboards }: BillboardClientProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedBillboard, setSelectedBillboard] = useState<Billboard | null>(
    null
  );

  const tableHeaders = ["Label", "Date"];
  const headerLength = tableHeaders.length + 1;

  const handleDeleteModalOpen = (billboard: Billboard) => {
    setSelectedBillboard(billboard);
    setShowModal(true);
  };

  const handleDeleteModalClose = () => {
    setSelectedBillboard(null);
    setShowModal(false);
  };

  const handleDelete = async (billboard: Billboard | null) => {
    try {
      setIsLoading(true);

      if (!billboard) throw new Error("No billboard available");

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
      handleDeleteModalClose();
    }
  };

  return (
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
          <span>Add New</span>
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
                      <span>Update</span>
                    </Button>
                    <Button
                      variant="delete"
                      onClick={() => handleDeleteModalOpen(billboard)}
                    >
                      <span>Delete</span>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Modal
        title="Are you sure you want to delete this billboard?"
        description="This action is permanent and cannot be undone."
        open={showModal}
        onCancel={handleDeleteModalClose}
        onAction={() => handleDelete(selectedBillboard)}
        actionLabel="Delete"
        actionVariant="delete"
        isActionLoading={isLoading}
      />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </div>
  );
};

export default BillboardClient;
