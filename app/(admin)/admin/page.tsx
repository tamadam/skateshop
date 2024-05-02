import prisma from "@/prisma/client";
import Heading from "../components/Heading/Heading";
import AdminDashboard from "../components/AdminDashboard/AdminDashboard";

const AdminPage = async () => {
  const [
    billboardCount,
    categoryCount,
    sizeCount,
    colorCount,
    brandCount,
    productCount,
  ] = await prisma.$transaction([
    prisma.billboard.count(),
    prisma.category.count(),
    prisma.size.count(),
    prisma.color.count(),
    prisma.brand.count(),
    prisma.product.count(),
  ]);

  return (
    <div>
      <Heading
        title="Admin overview"
        description="Overview page for Admin dashboard"
      />
      <AdminDashboard
        billboardCount={billboardCount}
        categoryCount={categoryCount}
        sizeCount={sizeCount}
        colorCount={colorCount}
        brandCount={brandCount}
        productCount={productCount}
      />
    </div>
  );
};

export default AdminPage;
