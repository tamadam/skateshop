import Billboard from "../components/Billboard/Billboard";
import Container from "../components/Container/Container";
import getProducts from "../../actions/getProducts";
import ProductsNav from "./components/ProductsNav/ProductsNav";
import ProductsContent from "./components/ProductsContent/ProductsContent";
import {
  BRAND_SEARCH_PARAM,
  CATEGORY_PRODUCTS_SEARCH_PARAM,
  COLOR_SEARCH_PARAM,
  PRODUCTS_ITEMS_PER_PAGE,
  PRODUCTS_ORDER_BY_PARAM,
  PRODUCTS_PAGE_PARAM,
  SIZE_SEARCH_PARAM,
} from "@/app/constants";
import getCategory from "../../actions/getCategory";
import {
  BrandType,
  CategoryType,
  ColorType,
  ProductBreadcrumbData,
  ProductNavInfo,
  ProductType,
  RawProductType,
  SizeType,
} from "../../types";
import getAllSubCategories from "../../actions/getAllSubCategories";
import getParentCategories from "../../actions/getParentCategories";
import { getTotalPages, getValidatedPageNumber } from "@/lib/paginationUtils";

interface ProductsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  // get currentPage from URL (page=)
  const currentPage: number = getValidatedPageNumber(
    searchParams[PRODUCTS_PAGE_PARAM]
  );

  // get orderBy from URL (mode=)
  const rawOrderByMode = searchParams[PRODUCTS_ORDER_BY_PARAM];
  const orderByMode = Array.isArray(rawOrderByMode)
    ? rawOrderByMode[0]
    : rawOrderByMode ?? "";

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

  // get sizeId from URL (s=)
  const sizeIdsParam = searchParams[SIZE_SEARCH_PARAM];
  const sizeIds = Array.isArray(sizeIdsParam)
    ? sizeIdsParam
    : sizeIdsParam
    ? [sizeIdsParam]
    : [];

  // get colorId from URL (c=)
  const colorIdsParam = searchParams[COLOR_SEARCH_PARAM];
  const colorIds = Array.isArray(colorIdsParam)
    ? colorIdsParam
    : colorIdsParam
    ? [colorIdsParam]
    : [];

  // retrieve current category for Billboard image and breadcrumb
  const category: CategoryType = await getCategory(categoryId);

  // retrieve all parent categories recursively for the current category
  const parentCategories = await getParentCategories(category.parentCategoryId);

  // create object for breadcrumb

  const breadcrumbData: ProductBreadcrumbData[] = [
    category,
    ...parentCategories,
  ]
    .map((category) => ({ id: category.id, name: category.name }))
    .reverse();

  // retrieve subcategories under current category
  const subCategories: CategoryType[] = (
    await getAllSubCategories(categoryId)
  ).sort((a, b) => a.name.localeCompare(b.name));

  // retrieve products under current category with pagination
  const rawProducts: RawProductType = await getProducts({
    categoryId,
    brandIds,
    sizeIds,
    colorIds,
    currentPage,
    orderByMode,
  });

  const products: ProductType[] = rawProducts.data.products;
  const totalProducts: number = rawProducts.pagination.total;
  const totalPages: number = getTotalPages(
    totalProducts,
    PRODUCTS_ITEMS_PER_PAGE
  );

  // get all brands, sizes and colors for the retrieved products
  const brands: BrandType[] = rawProducts.data.brands.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const sizes: SizeType[] = rawProducts.data.sizes.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const colors: ColorType[] = rawProducts.data.colors
    .filter((color) => Boolean(color?.id))
    .sort((a, b) => a.name.localeCompare(b.name));

  // filter products to display only relevant ones (selected brand/size/color)
  const filteredProducts: ProductType[] = products
    .filter((product) =>
      brandIds.length !== 0 ? brandIds.includes(product.brand.id) : product
    )
    .filter((product) =>
      sizeIds.length !== 0 ? sizeIds.includes(product.size.id) : product
    )
    .filter((product) => {
      return (
        colorIds.length === 0 ||
        (product.color && colorIds.includes(product.color.id))
      );
    });

  const brandsInFilter: BrandType[] = brands.filter((brand) =>
    brandIds.length !== 0 ? brandIds.includes(brand.id) : brand
  );

  // create object to pass data to sidebar
  const productsNavInfo: ProductNavInfo = {
    subCategories,
    brands,
    sizes,
    colors,
  };

  return (
    <div>
      <Billboard billboard={category?.billboard} />
      <Container includeSidebar>
        <ProductsNav data={productsNavInfo} />
        <ProductsContent
          products={filteredProducts}
          brandsInFilter={brandsInFilter}
          breadcrumb={breadcrumbData}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </Container>
    </div>
  );
};

export default ProductsPage;
