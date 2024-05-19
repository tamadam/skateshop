"use client";

import { CATEGORY_ID_SEARCH_PARAM } from "@/app/constants";
import ApiList from "../../components/ApiInfo/ApiList";
import Heading from "../../components/Heading/Heading";
import CategoryTable from "./CategoryTable";
import { columns, FormattedCategory } from "./columns";

interface CategoryClientProps {
  categories: FormattedCategory[];
  totalCategories: number;
}

const CategoryClient = ({
  categories,
  totalCategories,
}: CategoryClientProps) => {
  return (
    <div>
      <Heading
        title={`Categories (${totalCategories})`}
        description="Manage your categories for your shop"
      />

      <CategoryTable
        categories={categories}
        totalCategories={totalCategories}
        columns={columns}
      />

      <ApiList
        entityName="categories"
        entityIdName="categoryId"
        customPublicEntities={[
          {
            title: "GET DIRECT SUBCATEGORIES",
            searchParam: `?${CATEGORY_ID_SEARCH_PARAM}={categoryId}`,
          },
        ]}
      />
    </div>
  );
};

export default CategoryClient;
