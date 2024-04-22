"use client";

import { Billboard, Category } from "@prisma/client";
import styles from "./CategoryForm.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  categoriesFormSchema,
  CategoryFormFields,
} from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import Heading from "@/app/(admin)/components/Heading/Heading";
import Button from "@/app/components/Button/Button";

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
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
        <div className={styles.inputField}>
          <label htmlFor="name" className={styles.inputFieldLabel}>
            Name
          </label>
          <input
            autoComplete="off"
            type="text"
            id="name"
            disabled={isSubmitting}
            className={styles.inputFieldInput}
            {...register("name")}
          />
          <p>{errors.name?.message}</p>
        </div>

        <div className={styles.inputField}>
          <label htmlFor="billboardId" className={styles.inputFieldLabel}>
            Billboard
          </label>
          <select
            id="billboardId"
            disabled={isSubmitting}
            className={styles.inputFieldInput}
            {...register("billboardId")}
          >
            <option value="">Select a billboard</option>
            {billboards.map((billboard) => (
              <option key={billboard.id} value={billboard.id}>
                {billboard.label}
              </option>
            ))}
          </select>
          <p>{errors.billboardId?.message}</p>
        </div>

        <div className={styles.inputField}>
          <label htmlFor="parentCategoryId" className={styles.inputFieldLabel}>
            Parent Category
          </label>
          <select
            id="parentCategoryId"
            disabled={isSubmitting}
            className={styles.inputFieldInput}
            {...register("parentCategoryId")}
          >
            <option value="">Select a parent category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <p>{errors.parentCategoryId?.message}</p>
        </div>

        <div className={styles.formActionButtons}>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            <span>{isSubmitting ? "Please wait..." : "Submit"}</span>
          </Button>
          <Button
            type="button"
            variant="cancel"
            disabled={isSubmitting}
            onClick={() => {
              router.push("/admin/categories");
            }}
          >
            <span>Cancel</span>
          </Button>
        </div>
      </form>
    </>
  );
};

export default CategoryForm;
