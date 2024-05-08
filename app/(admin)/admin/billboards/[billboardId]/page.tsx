import React from "react";
import BillboardForm from "./BillboardForm";
import prisma from "@/prisma/client";
import { getCldOptions } from "@/lib/cloudinaryUtils";
import { CLOUDINARY_BILLBOARDS_REGEX } from "@/app/(admin)/constants";

interface BillboardPageProps {
  params: { billboardId: string };
}

const BillboardPage = async ({ params }: BillboardPageProps) => {
  const billboard = await prisma.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  const cldOptions = getCldOptions(
    billboard?.imageUrl,
    CLOUDINARY_BILLBOARDS_REGEX
  );

  return <BillboardForm billboard={billboard} cldOptions={cldOptions} />;
};

export default BillboardPage;
