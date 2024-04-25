import { useRouter, useSearchParams } from "next/navigation";
import { ColumnDefinition } from "../../components/AdminTable/columnDefinition";
import { FormattedColor } from "./columns";
import { getTotalPages, getValidatedPageNumber } from "@/lib/paginationUtils";
import { useState } from "react";
import toast from "react-hot-toast";
import AdminTable from "../../components/AdminTable/AdminTable";
import AdminTableHeading from "../../components/AdminTable/AdminTableHeading";
import AdminTableContent from "../../components/AdminTable/AdminTableContent";
import Modal from "@/app/components/Modal/Modal";
import PaginationController from "@/app/components/PaginationController/PaginationController";

interface ColorTableProps {
  colors: FormattedColor[];
  totalColors: number;
  columns: ColumnDefinition<FormattedColor>[];
}

const ColorTable = ({ colors, totalColors, columns }: ColorTableProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = getValidatedPageNumber(searchParams.get("page"));
  const totalPages = getTotalPages(totalColors);

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState<FormattedColor | null>(
    null
  );

  const handleDeleteModalOpen = (color: FormattedColor) => {
    setSelectedColor(color);
    setShowModal(true);
  };

  const handleDeleteModalClose = () => {
    setSelectedColor(null);
    setShowModal(false);
  };

  const handleDelete = async (color: FormattedColor | null) => {
    try {
      setIsLoading(true);

      if (!color) throw new Error("No color available");

      const response = await fetch(`/api/colors/${color.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const newTotalPages = getTotalPages(totalColors - 1);
        if (newTotalPages != totalPages && currentPage === totalPages) {
          if (currentPage > 1) {
            router.push(`?page=${currentPage - 1}`);
          }
        }
        router.refresh();
        toast.success("Color deleted successfully!");
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
    toast.success("Color ID copied to the clipboard!");
  };

  return (
    <AdminTable>
      <AdminTableHeading
        addNewLabel="Add New"
        onAddNew={() => router.push("/admin/colors/new")}
      />
      <AdminTableContent
        data={colors}
        columns={columns}
        noDataLabel="No colors available"
        onUpdate={(item) => router.push(`/admin/colors/${item.id}`)}
        onCopy={(item) => copyId(item.id)}
        onDelete={(item) => handleDeleteModalOpen(item)}
      />
      <Modal
        title="Are you sure you want to delete this color?"
        description="This action is permanent and cannot be undone."
        open={showModal}
        onCancel={handleDeleteModalClose}
        onAction={() => handleDelete(selectedColor)}
        actionLabel="Delete"
        actionVariant="delete"
        isActionLoading={isLoading}
      />
      <PaginationController totalPages={totalPages} currentPage={currentPage} />
    </AdminTable>
  );
};

export default ColorTable;
