import prisma from "@/prisma/client";
import BillboardClient from "./BillboardClient";

const BillboardsPage = async () => {
  // retrieve existing billboards and pass to BillboardClient
  const billboards = await prisma.billboard.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div>
      <BillboardClient billboards={billboards} />
    </div>
  );
};

export default BillboardsPage;
