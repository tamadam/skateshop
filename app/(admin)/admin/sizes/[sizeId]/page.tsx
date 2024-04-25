import prisma from "@/prisma/client";
import SizeForm from "./SizeForm";

interface SizePageProps {
  params: { sizeId: string };
}

const SizePage = async ({ params }: SizePageProps) => {
  const size = await prisma.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return <SizeForm size={size} />;
};

export default SizePage;
