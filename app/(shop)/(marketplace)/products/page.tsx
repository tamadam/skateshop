import Billboard from "../components/Billboard/Billboard";
import Container from "../components/Container/Container";
import getProducts from "../../actions/getProducts";
import ProductsNav from "./components/ProductsNav/ProductsNav";
import ProductsContent from "./components/ProductsContent/ProductsContent";
import {
  BRAND_SEARCH_PARAM,
  CATEGORY_PRODUCTS_SEARCH_PARAM,
} from "@/app/constants";
import getCategory from "../../actions/getCategory";
import {
  BrandType,
  CategoryType,
  ProductInfo,
  ProductNavInfo,
  ProductType,
} from "../../types";
import getAllSubCategories from "../../actions/getAllSubCategories";

interface ProductsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  // get categoryId from URL (p=)
  const categoryIdParam = searchParams[CATEGORY_PRODUCTS_SEARCH_PARAM];
  const categoryId = Array.isArray(categoryIdParam)
    ? categoryIdParam[0]
    : categoryIdParam ?? "";

  // get brandId from URL (b=)
  const brandIdsParam = searchParams[BRAND_SEARCH_PARAM];
  const brandIds = Array.isArray(brandIdsParam)
    ? brandIdsParam
    : brandIdsParam
    ? [brandIdsParam]
    : [];

  // retrieve category for Billboard image
  const category: CategoryType = await getCategory(categoryId);

  // retrieve subcategories under current category
  const subCategories: CategoryType[] = await getAllSubCategories(categoryId);

  // retrieve all products under current category
  const products: ProductType[] = await getProducts({ categoryId });

  // get all brands for the retrieved products
  const brands: BrandType[] = products.map((product) => product.brand);

  // filter products to display only relevant ones (selected brand etc.)
  const filteredProducts: ProductType[] = products.filter((product) =>
    brandIds.length !== 0 ? brandIds.includes(product.brand.id) : product
  );

  // create object to pass data to sidebar
  const productInfo: ProductInfo[] = products.map((product) => ({
    brand: product.brand,
    price: product.price,
    size: product.size,
    color: product.color,
  }));

  const productsNavInfo: ProductNavInfo = {
    productInfo,
    subCategories,
    brands,
  };

  return (
    <div>
      <Billboard billboard={category?.billboard} />
      <Container includeSidebar>
        <ProductsNav data={productsNavInfo} />
        <ProductsContent products={filteredProducts} />
      </Container>
    </div>
  );
};

export default ProductsPage;
