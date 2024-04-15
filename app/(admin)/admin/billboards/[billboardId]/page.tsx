import React from "react";
import BillboardForm from "./BillboardForm";
import prisma from "@/prisma/client";
import { getCldOptions } from "@/lib/cloudinaryUtils";

interface BillboardPageProps {
  params: { billboardId: string };
}

const BillboardPage = async ({ params }: BillboardPageProps) => {
  // retrieve billboard using parameters if exists
  // and pass to BillboardForm to autopopulate the form

  const billboard = await prisma.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  const regex = /billboards\/\w+/; // 'billboards/public_id'
  const cldOptions = getCldOptions(billboard?.imageUrl, regex);

  return (
    <div className="my-6">
      <BillboardForm billboard={billboard} cldOptions={cldOptions} />
    </div>
  );
};

export default BillboardPage;
