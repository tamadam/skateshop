import { CLOUDINARY_BRANDS_REGEX } from "@/app/constants";
import { getCldOptions } from "@/lib/cloudinaryUtils";
import prisma from "@/prisma/client";
import BrandForm from "./BrandForm";

interface BrandPageProps {
  params: { brandId: string };
}

const BrandPage = async ({ params }: BrandPageProps) => {
  const brand = await prisma.brand.findUnique({
    where: {
      id: params.brandId,
    },
  });

  const cldOptions = getCldOptions(brand?.imageUrl, CLOUDINARY_BRANDS_REGEX);

  return <BrandForm brand={brand} cldOptions={cldOptions} />;
};

export default BrandPage;
