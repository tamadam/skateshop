import prisma from "@/prisma/client";
import BillboardClient from "./BillboardClient";

const BillboardsPage = async () => {
  // retrieve existing billboards and pass to BillboardClient
  const billboards = await prisma.billboard.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return <BillboardClient billboards={billboards} />;
};

export default BillboardsPage;
