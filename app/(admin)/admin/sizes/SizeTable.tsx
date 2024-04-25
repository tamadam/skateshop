"use client";

import React, { useState } from "react";
import { FormattedSize } from "./columns";
import { ColumnDefinition } from "../../components/AdminTable/columnDefinition";
import { useRouter, useSearchParams } from "next/navigation";
import { getTotalPages, getValidatedPageNumber } from "@/lib/paginationUtils";
import toast from "react-hot-toast";
import AdminTable from "../../components/AdminTable/AdminTable";
import AdminTableHeading from "../../components/AdminTable/AdminTableHeading";
import AdminTableContent from "../../components/AdminTable/AdminTableContent";
import Modal from "@/app/components/Modal/Modal";
import PaginationController from "@/app/components/PaginationController/PaginationController";

interface SizeTableProps {
  sizes: FormattedSize[];
  totalSizes: number;
  columns: ColumnDefinition<FormattedSize>[];
}

const SizeTable = ({ sizes, totalSizes, columns }: SizeTableProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = getValidatedPageNumber(searchParams.get("page"));
  const totalPages = getTotalPages(totalSizes);

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState<FormattedSize | null>(null);

  const handleDeleteModalOpen = (size: FormattedSize) => {
    setSelectedSize(size);
    setShowModal(true);
  };

  const handleDeleteModalClose = () => {
    setSelectedSize(null);
    setShowModal(false);
  };

  const handleDelete = async (size: FormattedSize | null) => {
    try {
      setIsLoading(true);

      if (!size) throw new Error("No size available");

      const response = await fetch(`/api/sizes/${size.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const newTotalPages = getTotalPages(totalSizes - 1);
        if (newTotalPages != totalPages && currentPage === totalPages) {
          if (currentPage > 1) {
            router.push(`?page=${currentPage - 1}`);
          }
        }
        router.refresh();
        toast.success("Size deleted successfully!");
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
    toast.success("Size ID copied to the clipboard!");
  };

  return (
    <AdminTable>
      <AdminTableHeading
        addNewLabel="Add New"
        onAddNew={() => router.push("/admin/sizes/new")}
      />
      <AdminTableContent
        data={sizes}
        columns={columns}
        noDataLabel="No sizes available"
        onUpdate={(item) => router.push(`/admin/sizes/${item.id}`)}
        onCopy={(item) => copyId(item.id)}
        onDelete={(item) => handleDeleteModalOpen(item)}
      />
      <Modal
        title="Are you sure you want to delete this size?"
        description="This action is permanent and cannot be undone."
        open={showModal}
        onCancel={handleDeleteModalClose}
        onAction={() => handleDelete(selectedSize)}
        actionLabel="Delete"
        actionVariant="delete"
        isActionLoading={isLoading}
      />
      <PaginationController totalPages={totalPages} currentPage={currentPage} />
    </AdminTable>
  );
};

export default SizeTable;
