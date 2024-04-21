import React, { useState } from "react";
import { ColumnDefinition, FormattedBillboard } from "./columns";
import styles from "./BillboardTable.module.css";
import { HiOutlinePlus } from "react-icons/hi";
import Search from "@/app/components/Search/Search";
import Button from "@/app/components/Button/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { getValidatedPageNumber, getTotalPages } from "@/lib/paginationUtils";
import PaginationController from "@/app/components/PaginationController/PaginationController";
import { LiaTrashAlt } from "react-icons/lia";
import toast from "react-hot-toast";
import { deleteCldImage, getCldOptions } from "@/lib/cloudinaryUtils";
import { CLOUDINARY_BILLBOARDS_REGEX } from "@/app/constants";
import Modal from "@/app/components/Modal/Modal";

type BillboardTableProps = {
  data: FormattedBillboard[];
  columns: ColumnDefinition<FormattedBillboard>[];
  totalBillboards: number;
};

const BillboardTable = ({
  data,
  columns,
  totalBillboards,
}: BillboardTableProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = getValidatedPageNumber(searchParams.get("page"));
  const totalPages = getTotalPages(totalBillboards);

  const columnsCount = columns.length + 1;

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedBillboard, setSelectedBillboard] =
    useState<FormattedBillboard | null>(null);

  const handleDeleteModalOpen = (billboard: FormattedBillboard) => {
    setSelectedBillboard(billboard);
    setShowModal(true);
  };

  const handleDeleteModalClose = () => {
    setSelectedBillboard(null);
    setShowModal(false);
  };

  const handleDelete = async (billboard: FormattedBillboard | null) => {
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
    <div className={styles.assetsTable}>
      <div className={styles.assetsTableHeading}>
        <Button
          variant="primary"
          onClick={() => router.push("/admin/billboards/new")}
          Icon={HiOutlinePlus}
          iconFirst
        >
          <span>Add New</span>
        </Button>
        <Search />
      </div>
      <div
        className={styles.assetsTableWrapper}
        style={{
          gridTemplateColumns: `repeat(${columnsCount}, 1fr)`,
        }}
      >
        <div
          className={styles.assetsTableHeader}
          style={{ gridColumn: `span ${columnsCount}` }}
        >
          {columns.map((column) => {
            return <div key={column.header}>{column.header}</div>;
          })}
        </div>
        <div
          className={styles.assetsTableContent}
          style={{ gridColumn: `span ${columnsCount}` }}
        >
          {data.length === 0 && (
            <div className={styles.assetsNoTableContent}>
              No billboards available
            </div>
          )}
          {data.map((item, index) => (
            <div
              key={index}
              className={styles.assetsTableItem}
              style={{ gridColumn: `span ${columnsCount}` }}
            >
              {columns.map((column, index2) => {
                const asset = item[column.field as keyof typeof item];
                return (
                  <div
                    className={styles.assetItem}
                    data-label={column.header}
                    key={index2}
                  >
                    {asset}
                  </div>
                );
              })}
              <div className={styles.assetsTableActions}>
                <Button
                  variant="update"
                  onClick={() => router.push(`/admin/billboards/${item.id}`)}
                >
                  <span>Update</span>
                </Button>
                <Button
                  variant="delete"
                  className={styles.deleteAction}
                  onClick={() => handleDeleteModalOpen(item)}
                >
                  <span>Delete</span>
                </Button>
                <Button
                  variant="delete"
                  className={styles.deleteActionMobile}
                  Icon={LiaTrashAlt}
                  shape="square"
                  onClick={() => handleDeleteModalOpen(item)}
                />
              </div>
            </div>
          ))}
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
      <PaginationController totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
};

export default BillboardTable;
