"use client";

import ApiList from "../../components/ApiInfo/ApiList";
import Heading from "../../components/Heading/Heading";
import { columns, FormattedSize } from "./columns";
import SizeTable from "./SizeTable";

interface SizeClientProps {
  sizes: FormattedSize[];
  totalSizes: number;
}

const SizeClient = ({ sizes, totalSizes }: SizeClientProps) => {
  return (
    <div>
      <Heading
        title={`Sizes (${totalSizes})`}
        description="Manage your sizes for your shop"
      />

      <SizeTable sizes={sizes} totalSizes={totalSizes} columns={columns} />

      <ApiList entityName="sizes" entityIdName="sizeId" />
    </div>
  );
};

export default SizeClient;
