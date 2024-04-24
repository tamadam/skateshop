import React, { useState } from "react";
import { FormattedCategory } from "./columns";
import { useRouter, useSearchParams } from "next/navigation";
import { getValidatedPageNumber, getTotalPages } from "@/lib/paginationUtils";
import PaginationController from "@/app/components/PaginationController/PaginationController";
import toast from "react-hot-toast";
import Modal from "@/app/components/Modal/Modal";
import AdminTable from "../../components/AdminTable/AdminTable";
import AdminTableHeading from "../../components/AdminTable/AdminTableHeading";
import AdminTableContent from "../../components/AdminTable/AdminTableContent";
import { ColumnDefinition } from "../../components/AdminTable/columnDefinition";

type CategoryTableProps = {
  categories: FormattedCategory[];
  columns: ColumnDefinition<FormattedCategory>[];
  totalCategories: number;
};

const CategoryTable = ({
  categories,
  columns,
  totalCategories,
}: CategoryTableProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = getValidatedPageNumber(searchParams.get("page"));
  const totalPages = getTotalPages(totalCategories);

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
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error("Delete failed.");
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
    <AdminTable>
      <AdminTableHeading
        addNewLabel="Add New"
        onAddNew={() => router.push("/admin/categories/new")}
      />
      <AdminTableContent
        data={categories}
        columns={columns}
        noDataLabel="No categories available"
        onUpdate={(item) => router.push(`/admin/categories/${item.id}`)}
        onCopy={(item) => copyId(item.id)}
        onDelete={(item) => handleDeleteModalOpen(item)}
      />
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
    </AdminTable>
  );
};

export default CategoryTable;
