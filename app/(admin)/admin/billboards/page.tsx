import prisma from "@/prisma/client";
import BillboardClient from "./BillboardClient";
import Heading from "../../components/Heading/Heading";

const BillboardsPage = async () => {
  // retrieve existing billboards and pass to BillboardClient
  const billboards = await prisma.billboard.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div>
      <Heading title="Billboards" description="Billboards description" />
      <BillboardClient billboards={billboards} />
    </div>
  );
};

export default BillboardsPage;
