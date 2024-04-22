import React, { useState } from "react";
import { ColumnDefinition, FormattedCategory } from "./columns";
import styles from "./CategoryTable.module.css";
import { HiOutlinePlus } from "react-icons/hi";
import Search from "@/app/components/Search/Search";
import Button from "@/app/components/Button/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { getValidatedPageNumber, getTotalPages } from "@/lib/paginationUtils";
import PaginationController from "@/app/components/PaginationController/PaginationController";
import { LiaTrashAlt } from "react-icons/lia";
import { MdModeEdit } from "react-icons/md";
import { RiFileCopyFill } from "react-icons/ri";

import toast from "react-hot-toast";

import Modal from "@/app/components/Modal/Modal";

type CategoryTableProps = {
  data: FormattedCategory[];
  columns: ColumnDefinition<FormattedCategory>[];
  totalCategories: number;
};

const CategoryTable = ({
  data,
  columns,
  totalCategories,
}: CategoryTableProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = getValidatedPageNumber(searchParams.get("page"));
  const totalPages = getTotalPages(totalCategories);

  const columnsCount = columns.length + 1;

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<FormattedCategory | null>(null);

  const handleDeleteModalOpen = (category: FormattedCategory) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleDeleteModalClose = () => {
    setSelectedCategory(null);
    setShowModal(false);
  };

  const handleDelete = async (category: FormattedCategory | null) => {
    try {
      setIsLoading(true);

      if (!category) throw new Error("No category available");

      const response = await fetch(`/api/categories/${category.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const newTotalPages = getTotalPages(totalCategories - 1);
        if (newTotalPages != totalPages && currentPage === totalPages) {
          if (currentPage > 1) {
            router.push(`?page=${currentPage - 1}`);
          }
        }
        router.refresh();
        toast.success("Category deleted successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
      handleDeleteModalClose();
    }
  };

  const copyId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Category ID copied to the clipboard!");
  };

  return (
    <div className={styles.assetsTable}>
      <div className={styles.assetsTableHeading}>
        <Button
          variant="primary"
          onClick={() => router.push("/admin/categories/new")}
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
              No categories available
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
                  className={styles.actionButton}
                  shape="original"
                  onClick={() => router.push(`/admin/categories/${item.id}`)}
                  Icon={MdModeEdit}
                  tooltip="Update"
                />
                <Button
                  variant="cancel"
                  className={styles.actionButton}
                  shape="original"
                  onClick={() => {
                    copyId(item.id);
                  }}
                  Icon={RiFileCopyFill}
                  tooltip="Copy ID"
                />
                <Button
                  variant="delete"
                  className={styles.actionButton}
                  Icon={LiaTrashAlt}
                  shape="original"
                  onClick={() => handleDeleteModalOpen(item)}
                  tooltip="Delete"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal
        title="Are you sure you want to delete this category?"
        description="This action is permanent and cannot be undone."
        open={showModal}
        onCancel={handleDeleteModalClose}
        onAction={() => handleDelete(selectedCategory)}
        actionLabel="Delete"
        actionVariant="delete"
        isActionLoading={isLoading}
      />
      <PaginationController totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
};

export default CategoryTable;
