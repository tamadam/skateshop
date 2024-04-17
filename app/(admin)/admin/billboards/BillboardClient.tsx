"use client";

import { Billboard } from "@prisma/client";
import Heading from "../../components/Heading/Heading";
import BillboardTable from "./BillboardTable";
import ApiList from "../../components/ApiInfo/ApiList";

interface BillboardClientProps {
  billboards: Billboard[];
}

const BillboardClient = ({ billboards }: BillboardClientProps) => {
  return (
    <div>
      <Heading
        title={`Billboards (${billboards.length})`}
        description="Manage your billboards for your shop"
      />

      <BillboardTable billboards={billboards} />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </div>
  );
};

export default BillboardClient;
