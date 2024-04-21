"use client";

import Heading from "../../components/Heading/Heading";
import BillboardTable from "./BillboardTable";
import ApiList from "../../components/ApiInfo/ApiList";
import { columns, FormattedBillboard } from "./columns";

interface BillboardClientProps {
  billboards: FormattedBillboard[];
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
        data={billboards}
        totalBillboards={totalBillboards}
        columns={columns}
      />

      <ApiList entityName="billboards" entityIdName="billboardId" />
    </div>
  );
};

export default BillboardClient;
