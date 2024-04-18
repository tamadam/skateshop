import { Billboard } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CLOUDINARY_BILLBOARDS_REGEX } from "@/app/constants";
import { deleteCldImage, getCldOptions } from "@/lib/cloudinaryUtils";
import Button from "@/app/components/Button/Button";
import Modal from "@/app/components/Modal/Modal";
import toast from "react-hot-toast";
import { formatDate } from "@/lib/formatDate";
import { HiOutlinePlus } from "react-icons/hi";
import styles from "./BillboardTable.module.css";
import PaginationController from "@/app/components/PaginationController/PaginationController";
import { getTotalPages } from "@/lib/getTotalPages";

interface BillboardTableProps {
  billboards: Billboard[];
  totalBillboards: number;
}

const BillboardTable = ({
  billboards,
  totalBillboards,
}: BillboardTableProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedBillboard, setSelectedBillboard] = useState<Billboard | null>(
    null
  );
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? 1);
  const totalPages = getTotalPages(totalBillboards);

  const columns = ["Label", "Date"];
  const columnsLength = columns.length + 1;

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
        const newTotalPages = getTotalPages(totalBillboards - 1);
        if (newTotalPages != totalPages && currentPage === totalPages) {
          if (currentPage > 1) {
            router.push(`?page=${currentPage - 1}`);
          }
        }
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
    <>
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
            gridTemplateColumns: `repeat(${columnsLength}, 1fr)`,
          }}
        >
          <div
            className={styles.assetsTableHeader}
            style={{ gridColumn: `span ${columnsLength}` }}
          >
            {columns.map((header) => (
              <div key={header}>{header}</div>
            ))}
          </div>
          <div
            className={styles.assetsTableContent}
            style={{ gridColumn: `span ${columnsLength}` }}
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
                  style={{ gridColumn: `span ${columnsLength}` }}
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
      <PaginationController totalPages={totalPages} currentPage={currentPage} />

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
    </>
  );
};

export default BillboardTable;
