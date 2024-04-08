import React from "react";
import BillboardForm from "./BillboardForm";
import prisma from "@/prisma/client";

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

  return (
    <div>
      <BillboardForm billboard={billboard} />
    </div>
  );
};

export default BillboardPage;
