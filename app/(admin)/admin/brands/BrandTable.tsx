import { useRouter, useSearchParams } from "next/navigation";
import { ColumnDefinition } from "../../components/AdminTable/columnDefinition";
import { FormattedBrand } from "./columns";
import { getTotalPages, getValidatedPageNumber } from "@/lib/paginationUtils";
import { useState } from "react";
import { deleteCldImage, getCldOptions } from "@/lib/cloudinaryUtils";
import { CLOUDINARY_BRANDS_REGEX } from "@/app/constants";
import toast from "react-hot-toast";
import AdminTable from "../../components/AdminTable/AdminTable";
import AdminTableHeading from "../../components/AdminTable/AdminTableHeading";
import AdminTableContent from "../../components/AdminTable/AdminTableContent";
import Modal from "@/app/components/Modal/Modal";
import PaginationController from "@/app/components/PaginationController/PaginationController";

interface BrandTableProps {
  brands: FormattedBrand[];
  totalBrands: number;
  columns: ColumnDefinition<FormattedBrand>[];
}

const BrandTable = ({ brands, totalBrands, columns }: BrandTableProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = getValidatedPageNumber(searchParams.get("page"));
  const totalPages = getTotalPages(totalBrands);

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<FormattedBrand | null>(
    null
  );

  const handleDeleteModalOpen = (brand: FormattedBrand) => {
    setSelectedBrand(brand);
    setShowModal(true);
  };

  const handleDeleteModalClose = () => {
    setSelectedBrand(null);
    setShowModal(false);
  };

  const handleDelete = async (brand: FormattedBrand | null) => {
    try {
      setIsLoading(true);

      if (!brand) throw new Error("No brand available");

      const response = await fetch(`/api/brands/${brand.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // delete brand image from Cloudinary if exists
        if (brand.imageUrl) {
          const cldOptions = getCldOptions(
            brand?.imageUrl,
            CLOUDINARY_BRANDS_REGEX
          );

          deleteCldImage(cldOptions);
        }

        const newTotalPages = getTotalPages(totalBrands - 1);
        if (newTotalPages != totalPages && currentPage === totalPages) {
          if (currentPage > 1) {
            router.push(`?page=${currentPage - 1}`);
          }
        }
        router.refresh();
        toast.success("Brand deleted successfully!");
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
    toast.success("Brand ID copied to the clipboard!");
  };

  return (
    <AdminTable>
      <AdminTableHeading
        addNewLabel="Add New"
        onAddNew={() => router.push("/admin/brands/new")}
      />
      <AdminTableContent
        data={brands}
        columns={columns}
        noDataLabel="No brands available"
        onUpdate={(item) => router.push(`/admin/brands/${item.id}`)}
        onCopy={(item) => copyId(item.id)}
        onDelete={(item) => handleDeleteModalOpen(item)}
      />
      <Modal
        title="Are you sure you want to delete this brand?"
        description="This action is permanent and cannot be undone."
        open={showModal}
        onCancel={handleDeleteModalClose}
        onAction={() => handleDelete(selectedBrand)}
        actionLabel="Delete"
        actionVariant="delete"
        isActionLoading={isLoading}
      />
      <PaginationController totalPages={totalPages} currentPage={currentPage} />
    </AdminTable>
  );
};

export default BrandTable;
