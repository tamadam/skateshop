"use client";

import ApiList from "../../components/ApiInfo/ApiList";
import Heading from "../../components/Heading/Heading";
import BrandTable from "./BrandTable";
import { columns, FormattedBrand } from "./columns";

interface BrandClientProps {
  brands: FormattedBrand[];
  totalBrands: number;
}

const BrandClient = ({ brands, totalBrands }: BrandClientProps) => {
  return (
    <div>
      <Heading
        title={`Brands (${totalBrands})`}
        description="Manage your brands for your shop"
      />

      <BrandTable brands={brands} totalBrands={totalBrands} columns={columns} />

      <ApiList entityName="brands" entityIdName="brandId" />
    </div>
  );
};

export default BrandClient;
