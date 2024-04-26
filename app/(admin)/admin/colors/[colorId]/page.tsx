import prisma from "@/prisma/client";
import ColorForm from "./ColorForm";

interface ColorPageProps {
  params: { colorId: string };
}

const ColorPage = async ({ params }: ColorPageProps) => {
  const color = await prisma.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return <ColorForm color={color} />;
};

export default ColorPage;
