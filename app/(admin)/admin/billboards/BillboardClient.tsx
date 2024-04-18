"use client";

import { Billboard } from "@prisma/client";
import Heading from "../../components/Heading/Heading";
import BillboardTable from "./BillboardTable";
import ApiList from "../../components/ApiInfo/ApiList";

interface BillboardClientProps {
  billboards: Billboard[];
  totalBillboards: number;
}

const BillboardClient = ({
  billboards,
  totalBillboards,
}: BillboardClientProps) => {
  return (
    <div>
      <Heading
        title={`Billboards (${totalBillboards})`}
        description="Manage your billboards for your shop"
      />
      <BillboardTable
        billboards={billboards}
        totalBillboards={totalBillboards}
      />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </div>
  );
};

export default BillboardClient;
