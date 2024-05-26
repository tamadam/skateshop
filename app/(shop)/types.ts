import { GENDERS } from "@prisma/client";

export type BillboardType = {
    id: string;
    label: string;
    imageUrl: string | null;
};

export type CategoryType = {
    id: string;
    name: string;
    billboard: BillboardType;
    parentCategoryId: string;
}

export type BrandType = {
    id: string;
    name: string;
    imageUrl: string | null;
}

export type SizeType = {
    id: string;
    name: string;
    value: string;
}

export type ColorType = {
    id: string;
    name: string;
    value: string;
}

export type ImageType = {
    id: string;
    url: string;
}

export type ProductType = {
    id: string;
    name: string;
    price: string;
    category: CategoryType;
    brand: BrandType;
    size: SizeType;
    color: ColorType | null;
    images: ImageType[];
    gender: GENDERS;
    isFeatured: boolean;
    isArchived: boolean;
}

export type ProductNavInfo = {
    subCategories: CategoryType[];
    brands: BrandType[];
    sizes: SizeType[];
    colors: ColorType[];
}

export type ProductBreadcrumbData = {
    id: string;
    name: string;
}