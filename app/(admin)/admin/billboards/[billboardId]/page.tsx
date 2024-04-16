import React from "react";
import BillboardForm from "./BillboardForm";
import prisma from "@/prisma/client";
import { getCldOptions } from "@/lib/cloudinaryUtils";
import { CLOUDINARY_BILLBOARDS_REGEX } from "@/app/constants";

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

  //const regex = /billboards\/\w+/; // 'billboards/public_id'
  const cldOptions = getCldOptions(
    billboard?.imageUrl,
    CLOUDINARY_BILLBOARDS_REGEX
  );

  return (
    <>
      <BillboardForm billboard={billboard} cldOptions={cldOptions} />
    </>
  );
};

export default BillboardPage;
