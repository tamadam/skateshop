import React, { useState } from "react";
import { FormattedBillboard } from "./columns";
import { useRouter, useSearchParams } from "next/navigation";
import { getValidatedPageNumber, getTotalPages } from "@/lib/paginationUtils";
import PaginationController from "@/app/components/PaginationController/PaginationController";
import toast from "react-hot-toast";
import { deleteCldImage, getCldOptions } from "@/lib/cloudinaryUtils";
import { CLOUDINARY_BILLBOARDS_REGEX } from "@/app/constants";
import Modal from "@/app/components/Modal/Modal";
import AdminTableContent from "../../components/AdminTable/AdminTableContent";
import AdminTableHeading from "../../components/AdminTable/AdminTableHeading";
import AdminTable from "../../components/AdminTable/AdminTable";
import { ColumnDefinition } from "../../components/AdminTable/columnDefinition";

interface BillboardTableProps {
  billboards: FormattedBillboard[];
  totalBillboards: number;
  columns: ColumnDefinition<FormattedBillboard>[];
}

const BillboardTable = ({
  billboards,
  columns,
  totalBillboards,
}: BillboardTableProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = getValidatedPageNumber(searchParams.get("page"));
  const totalPages = getTotalPages(totalBillboards);

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

      const response = await fetch(`/api/billboards/${billboard.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // delete billboard image from Cloudinary if exists
        if (billboard.imageUrl) {
          const cldOptions = getCldOptions(
            billboard?.imageUrl,
            CLOUDINARY_BILLBOARDS_REGEX
          );

          deleteCldImage(cldOptions);
        }

        const newTotalPages = getTotalPages(totalBillboards - 1);
        if (newTotalPages != totalPages && currentPage === totalPages) {
          if (currentPage > 1) {
            router.push(`?page=${currentPage - 1}`);
          }
        }
        router.refresh();
        toast.success("Billboard deleted successfully!");
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error(
        "Delete failed. Make sure you removed all categories using this billboard first."
      );
    } finally {
      setIsLoading(false);
      handleDeleteModalClose();
    }
  };

  const copyId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Billboard ID copied to the clipboard!");
  };

  return (
    <AdminTable>
      <AdminTableHeading
        addNewLabel="Add New"
        onAddNew={() => router.push("/admin/billboards/new")}
      />
      <AdminTableContent
        data={billboards}
        columns={columns}
        noDataLabel="No billboards available"
        onUpdate={(item) => router.push(`/admin/billboards/${item.id}`)}
        onCopy={(item) => copyId(item.id)}
        onDelete={(item) => handleDeleteModalOpen(item)}
      />
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
    </AdminTable>
  );
};

export default BillboardTable;
