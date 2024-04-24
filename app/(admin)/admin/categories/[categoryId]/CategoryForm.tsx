"use client";

import { Billboard, Category } from "@prisma/client";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  categoriesFormSchema,
  CategoryFormFields,
} from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import Heading from "@/app/(admin)/components/Heading/Heading";
import AdminFormInput from "@/app/(admin)/components/AdminForm/AdminFormInput/AdminFormInput";
import AdminFormSubmit from "@/app/(admin)/components/AdminForm/AdminFormSubmit/AdminFormSubmit";
import AdminForm from "@/app/(admin)/components/AdminForm/AdminForm";
import AdminFormInputsWrapper from "@/app/(admin)/components/AdminForm/AdminFormInputsWrapper";

interface CategoryFormProps {
  categories: Category[];
  currentCategory: Category | null;
  billboards: Billboard[];
}

const CategoryForm = ({
  categories,
  currentCategory,
  billboards,
}: CategoryFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormFields>({
    resolver: zodResolver(categoriesFormSchema),
    defaultValues: currentCategory || {
      name: "",
      billboardId: "",
      parentCategoryId: null,
    },
  });

  const params = useParams();
  const router = useRouter();

  const onSubmit: SubmitHandler<CategoryFormFields> = async (data) => {
    let categoryData = {
      ...data,
      parentCategoryId: data.parentCategoryId || null,
    };

    if (currentCategory) {
      const initialData = {
        name: currentCategory.name,
        billboardId: currentCategory.billboardId,
        parentCategoryId: currentCategory.parentCategoryId,
      };

      // check if something has changed or not
      if (JSON.stringify(categoryData) === JSON.stringify(initialData)) {
        router.push("/admin/categories");
        return;
      }
    }

    // SAVE DATA IN DATABASE
    const requestUrl = currentCategory
      ? `/api/categories/${params.categoryId}`
      : "/api/categories";

    const requestOptions = {
      method: currentCategory ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    };

    try {
      const response = await fetch(requestUrl, requestOptions);

      if (response.ok) {
        router.push("/admin/categories");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const headingTitle = currentCategory ? "Edit category" : "Create category";
  const headingDescription = currentCategory
    ? "Edit a category"
    : "Add a new category";

  return (
    <>
      <Heading title={headingTitle} description={headingDescription} />
      <AdminForm onSubmit={handleSubmit(onSubmit)}>
        <AdminFormInputsWrapper multiplieColumn>
          <AdminFormInput
            id="name"
            label="Name"
            type="text"
            required
            register={register}
            disabled={isSubmitting}
            errorMessage={errors.name?.message}
          />

          <AdminFormInput
            id="billboardId"
            label="Billboard"
            type="select"
            required
            options={[
              { value: "", label: "Select a billboard" },
              ...billboards.map((billboard) => {
                return { value: billboard.id, label: billboard.label };
              }),
            ]}
            register={register}
            disabled={isSubmitting}
            errorMessage={errors.billboardId?.message}
          />

          <AdminFormInput
            id="parentCategoryId"
            label="Parent Category"
            type="select"
            options={[
              { value: "", label: "None" },
              ...categories.map((category) => {
                return { value: category.id, label: category.name };
              }),
            ]}
            register={register}
            disabled={isSubmitting}
            errorMessage={errors.parentCategoryId?.message}
          />
        </AdminFormInputsWrapper>
        <AdminFormSubmit
          submitLabel="Submit"
          cancelLabel="Cancel"
          isSubmitting={isSubmitting}
          onCancel={() => router.push("/admin/categories")}
        />
      </AdminForm>
    </>
  );
};

export default CategoryForm;
