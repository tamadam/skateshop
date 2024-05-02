import { useRouter, useSearchParams } from "next/navigation";
import { ColumnDefinition } from "../../components/AdminTable/columnDefinition";
import { FormattedProduct } from "./columns";
import { getTotalPages, getValidatedPageNumber } from "@/lib/paginationUtils";
import { useState } from "react";
import toast from "react-hot-toast";
import AdminTable from "../../components/AdminTable/AdminTable";
import AdminTableHeading from "../../components/AdminTable/AdminTableHeading";
import AdminTableContent from "../../components/AdminTable/AdminTableContent";
import Modal from "@/app/components/Modal/Modal";
import PaginationController from "@/app/components/PaginationController/PaginationController";
import { deleteCldImageUsingUrl } from "@/lib/cloudinaryUtils";
import { CLOUDINARY_PRODUCTS_REGEX } from "@/app/constants";

interface ProductTableProps {
  products: FormattedProduct[];
  totalProducts: number;
  columns: ColumnDefinition<FormattedProduct>[];
}

const ProductTable = ({
  products,
  totalProducts,
  columns,
}: ProductTableProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = getValidatedPageNumber(searchParams.get("page"));
  const totalPages = getTotalPages(totalProducts);

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<FormattedProduct | null>(null);

  const handleDeleteModalOpen = (product: FormattedProduct) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleDeleteModalClose = () => {
    setSelectedProduct(null);
    setShowModal(false);
  };

  const handleDelete = async (product: FormattedProduct | null) => {
    try {
      setIsLoading(true);

      if (!product) throw new Error("No product available");

      const response = await fetch(`/api/products/${product.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // delete product image from Cloudinary if exists
        const toBeRemovedImageUrls = product.images.map((image) => image.url);

        if (toBeRemovedImageUrls.length !== 0) {
          // console.log("delete images");
          for (const image of toBeRemovedImageUrls) {
            deleteCldImageUsingUrl(image, CLOUDINARY_PRODUCTS_REGEX);
          }
        }

        const newTotalPages = getTotalPages(totalProducts - 1);
        if (newTotalPages != totalPages && currentPage === totalPages) {
          if (currentPage > 1) {
            router.push(`?page=${currentPage - 1}`);
          }
        }
        router.refresh();
        toast.success("Product deleted successfully!");
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
    toast.success("Product ID copied to the clipboard!");
  };

  return (
    <AdminTable>
      <AdminTableHeading
        addNewLabel="Add New"
        onAddNew={() => router.push("/admin/products/new")}
      />
      <AdminTableContent
        data={products}
        columns={columns}
        noDataLabel="No products available"
        onUpdate={(item) => router.push(`/admin/products/${item.id}`)}
        onCopy={(item) => copyId(item.id)}
        onDelete={(item) => handleDeleteModalOpen(item)}
      />
      <Modal
        title="Are you sure you want to delete this product?"
        description="This action is permanent and cannot be undone."
        open={showModal}
        onCancel={handleDeleteModalClose}
        onAction={() => handleDelete(selectedProduct)}
        actionLabel="Delete"
        actionVariant="delete"
        isActionLoading={isLoading}
      />
      <PaginationController totalPages={totalPages} currentPage={currentPage} />
    </AdminTable>
  );
};

export default ProductTable;
