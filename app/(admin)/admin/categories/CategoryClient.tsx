"use client";

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
        data={categories}
        totalCategories={totalCategories}
        columns={columns}
      />

      <ApiList entityName="categories" entityIdName="categoryId" />
    </div>
  );
};

export default CategoryClient;
