"use client";

import AdminForm from "@/app/(admin)/components/AdminForm/AdminForm";
import AdminFormImagesInput from "@/app/(admin)/components/AdminForm/AdminFormInput/AdminFormImagesInput";
import AdminFormInput from "@/app/(admin)/components/AdminForm/AdminFormInput/AdminFormInput";
import AdminFormInputsWrapper from "@/app/(admin)/components/AdminForm/AdminFormInputsWrapper";
import AdminFormSubmit from "@/app/(admin)/components/AdminForm/AdminFormSubmit/AdminFormSubmit";
import Heading from "@/app/(admin)/components/Heading/Heading";
import {
  CLOUDINARY_PRODUCTS_REGEX,
  CLOUDINARY_PRODUCTS_UPLOAD_PRESET_NAME,
} from "@/app/(admin)/constants";
import { ProductFormFields, productsFormSchema } from "@/app/validationSchemas";
import { capitalize } from "@/lib/capitalize";
import { deleteCldImageUsingUrl, uploadCldImage } from "@/lib/cloudinaryUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Brand,
  Category,
  Color,
  GENDERS,
  Image,
  Product,
  Size,
} from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface ProductFormProps {
  product: (Product & { images: Image[] }) | null;
  categories: Category[];
  brands: Brand[];
  sizes: Size[];
  colors: Color[];
}

const ProductForm = ({
  product,
  categories,
  brands,
  sizes,
  colors,
}: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    resetField,
    getValues,
    clearErrors,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormFields>({
    resolver: zodResolver(productsFormSchema),
    defaultValues: product
      ? { ...product, price: parseFloat(String(product.price)) }
      : {
          name: "",
          price: 0,
          categoryId: "",
          brandId: "",
          sizeId: "",
          colorId: null,
          gender: "UNISEX",
          isFeatured: false,
          isArchived: false,
          images: [],
        },
  });

  const [originalImages, setOriginalImages] = useState<string[]>(
    product?.images.map((image) => image.url) || []
  );

  const handleOriginalImagesChange = (removedImage: string) => {
    setOriginalImages((pre) => {
      return [...pre.filter((item) => item !== removedImage)];
    });
  };

  const params = useParams();
  const router = useRouter();

  const headingTitle = product ? "Edit product" : "Create product";
  const headingDescription = product ? "Edit a product" : "Add a new product";
  const toastSuccessMessage = product ? "Product saved." : "Product created.";
  const submitFormLabel = product ? "Save" : "Create";

  const onSubmit: SubmitHandler<ProductFormFields> = async (data) => {
    try {
      const { images: imagesData, ...restData } = data;
      const copyData = { ...restData };

      const {
        id,
        images: imagesProduct,
        createdAt,
        updatedAt,
        ...restProduct
      } = {
        ...product,
        price: parseFloat(String(product?.price) ?? 0),
      };
      const copyProduct = {
        ...restProduct,
      };

      // console.log(copyData);
      // console.log(copyProduct);

      const otherPropertiesAreEqual =
        JSON.stringify(copyData) === JSON.stringify(copyProduct);

      const rawImagesInput = data.images;
      // console.log("rawimagesinput");
      // console.log(rawImagesInput);

      // DELETE IMAGE FROM CLOUDINARY - IF NEEDED
      const hasOriginalImage = product?.images && product.images.length !== 0;
      let removedImages: string[] = [];
      // delete original images if they exists and user wants to delete
      if (hasOriginalImage) {
        removedImages = product.images
          .map((image) => image.url)
          .filter((url) => !originalImages.includes(url));

        if (removedImages.length !== 0) {
          // console.log("delete images");
          for (const image of removedImages) {
            deleteCldImageUsingUrl(image, CLOUDINARY_PRODUCTS_REGEX);
          }
        }
      }

      // UPLOAD IMAGE TO CLOUDINARY - IF NEEDED
      // PREPARE PRODUCT DATA TO SAVE IN THE DATABASE

      let productData = {
        ...data,
        colorId: data.colorId || null,
      };

      let newImageUrls: string[] = [...originalImages];

      if (rawImagesInput) {
        for (let i = 0; i < rawImagesInput.length; i++) {
          const imageUrl = await uploadCldImage(
            rawImagesInput[i] as File,
            CLOUDINARY_PRODUCTS_UPLOAD_PRESET_NAME
          );

          newImageUrls.push(imageUrl);
        }
      }

      // update imageUrls
      if (newImageUrls.length !== 0) {
        productData = {
          ...productData,
          images: [
            ...newImageUrls.map((imageUrl) => ({ url: imageUrl })),
            //...originalImages.map((imageUrl) => ({ url: imageUrl })),
          ],
        };
      } else if (newImageUrls.length === 0) {
        productData = { ...productData, images: [] }; // empty image array
      } else if (otherPropertiesAreEqual) {
        router.push("/admin/products"); // nothing has changed redirect to products page
        return;
      }

      // console.log(productData);

      // SAVE DATA IN DATABASE
      const requestUrl = product
        ? `/api/products/${params.productId}`
        : "/api/products";

      const requestOptions = {
        method: product ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      };

      const response = await fetch(requestUrl, requestOptions);

      if (response.ok) {
        router.push("/admin/products");
        router.refresh();
        toast.success(toastSuccessMessage);
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Heading title={headingTitle} description={headingDescription} />
      <AdminForm onSubmit={handleSubmit(onSubmit)}>
        <AdminFormInputsWrapper multiplieColumn>
          <AdminFormInput
            type="text"
            id="name"
            label="Name"
            required
            register={register}
            disabled={isSubmitting}
            errorMessage={errors.name?.message}
          />
          <AdminFormInput
            type="text"
            id="price"
            label="Price"
            required
            register={register}
            disabled={isSubmitting}
            errorMessage={errors.price?.message}
          />
          <AdminFormInput
            type="select"
            id="categoryId"
            label="Category"
            options={[
              { value: "", label: "Select a category" },
              ...categories.map((category) => {
                return { value: category.id, label: category.name };
              }),
            ]}
            required
            register={register}
            disabled={isSubmitting}
            errorMessage={errors.categoryId?.message}
          />
          <AdminFormInput
            type="select"
            id="brandId"
            label="Brand"
            options={[
              { value: "", label: "Select a brand" },
              ...brands.map((brand) => {
                return { value: brand.id, label: brand.name };
              }),
            ]}
            required
            register={register}
            disabled={isSubmitting}
            errorMessage={errors.brandId?.message}
          />
          <AdminFormInput
            type="select"
            id="sizeId"
            label="Size"
            options={[
              { value: "", label: "Select a size" },
              ...sizes.map((size) => {
                return { value: size.id, label: size.name };
              }),
            ]}
            required
            register={register}
            disabled={isSubmitting}
            errorMessage={errors.sizeId?.message}
          />
          <AdminFormInput
            type="select"
            id="gender"
            label="Gender"
            options={[
              ...(Object.keys(GENDERS) as Array<keyof typeof GENDERS>).map(
                (gender) => ({ value: gender, label: capitalize(gender) })
              ),
            ]}
            required
            register={register}
            disabled={isSubmitting}
            errorMessage={errors.gender?.message}
          />
          <AdminFormInput
            type="select"
            id="colorId"
            label="Color"
            options={[
              { value: "", label: "None" },
              ...colors.map((color) => {
                return { value: color.id, label: color.name };
              }),
            ]}
            register={register}
            disabled={isSubmitting}
            errorMessage={errors.colorId?.message}
          />
          <AdminFormInput
            type="checkbox"
            id="isFeatured"
            label="Featured"
            register={register}
            disabled={isSubmitting}
            errorMessage={errors.isFeatured?.message}
          />
          <AdminFormInput
            type="checkbox"
            id="isArchived"
            label="Archive"
            register={register}
            disabled={isSubmitting}
            errorMessage={errors.isArchived?.message}
          />
        </AdminFormInputsWrapper>
        <AdminFormInputsWrapper singleColumn>
          <AdminFormImagesInput
            id="images"
            label="Product Images"
            imageUrls={product?.images.map((image) => image.url) || []}
            originalImages={originalImages}
            onOriginalImagesChange={handleOriginalImagesChange}
            disabled={isSubmitting}
            register={register}
            resetField={resetField}
            getValues={getValues}
            setValue={setValue}
            clearErrors={clearErrors}
            errorMessage={errors.images?.message}
          />
        </AdminFormInputsWrapper>
        <AdminFormSubmit
          submitLabel={submitFormLabel}
          cancelLabel="Cancel"
          isSubmitting={isSubmitting}
          onCancel={() => router.push("/admin/products")}
        />
      </AdminForm>
    </>
  );
};

export default ProductForm;
