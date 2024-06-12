import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import { ROLES } from "@prisma/client";
import { productsFormSchema } from "@/app/validationSchemas";
import { BRAND_ID_SEARCH_PARAM, CATEGORY_ID_SEARCH_PARAM, COLOR_ID_SEARCH_PARAM, IS_FEATURED_SEARCH_PARAM, ORDER_BY, PRODUCTS_ITEMS_PER_PAGE, PRODUCTS_ORDER_BY_PARAM, PRODUCTS_PAGE_PARAM, SIZE_ID_SEARCH_PARAM } from "@/app/constants";
import { getValidatedPageNumber } from "@/lib/paginationUtils";
import { isValidOrderBy } from "@/lib/isValidOrderBy";

export async function POST(request: NextRequest) {
    try {
        // check user's role
        const session = await getServerSession(authOptions);
        if (session?.user.role !== ROLES.ADMIN) {
            return NextResponse.json({}, { status: 401 });
        }

        // validate request
        const body = await request.json();
        const validation = productsFormSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(validation.error.format(), { status: 400 });
        }

        // create new product
        const newProduct = await prisma.product.create({
            data: {
                name: body.name,
                price: body.price,
                quantity: body.quantity,
                description: body.description,
                categoryId: body.categoryId,
                brandId: body.brandId,
                sizeId: body.sizeId,
                colorId: body.colorId,
                images: {
                    createMany: {
                        data: [
                            ...body.images.map((image: {url: string}) => image)
                        ],
                    },
                },
                gender: body.gender,
                isFeatured: body.isFeatured,
                isArchived: body.isArchived,
            },
            include: {
                images: true,
            },
        });

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        console.log("PRODUCTS_POST: ", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
} 

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const rawCategoryIds = searchParams.getAll(CATEGORY_ID_SEARCH_PARAM);
        const categoryIds = rawCategoryIds.length ? rawCategoryIds : undefined;
        const rawBrandIds = searchParams.getAll(BRAND_ID_SEARCH_PARAM);
        const brandIds = rawBrandIds.length ? rawBrandIds : undefined;
        const rawSizeIds = searchParams.getAll(SIZE_ID_SEARCH_PARAM);
        const sizeIds = rawSizeIds.length ? rawSizeIds : undefined;
        const rawColorIds = searchParams.getAll(COLOR_ID_SEARCH_PARAM);
        const colorIds = rawColorIds.length ? rawColorIds : undefined;
        const isFeatured = searchParams.get(IS_FEATURED_SEARCH_PARAM);
        const currentPage = getValidatedPageNumber(searchParams.get(PRODUCTS_PAGE_PARAM));
        const rawOrderMode = searchParams.get(PRODUCTS_ORDER_BY_PARAM);
        const orderMode = isValidOrderBy(rawOrderMode) ? rawOrderMode : ORDER_BY.RANDOM_ORDER;

        let orderByMode = {};

        switch (orderMode) {
            case ORDER_BY.PRICE_ASC:
                orderByMode =  { price: "asc" };
                break;
            case ORDER_BY.PRICE_DESC:
                orderByMode = { price: "desc" };
                break;
            case ORDER_BY.NAME_ASC:
                orderByMode = { name: "asc" };
                break;
            case ORDER_BY.NAME_DESC:
                orderByMode = { name: "desc" };
                break;
            case ORDER_BY.RANDOM_ORDER:
                orderByMode = { createdAt: "desc" };
                break;
            default:
                orderByMode = { createdAt: "desc" };
        };

        const whereFilterForProducts = {
            categoryId: { in : categoryIds },
            brandId: { in : brandIds },
            sizeId: { in : sizeIds },
            colorId: { in : colorIds },
            isFeatured: isFeatured ? true : undefined,
            isArchived: false,
        };

        const whereFilterForSidebar = {
            categoryId: { in : categoryIds },
            isArchived: false,
        };

        const [products, totalProducts, rawBrands, rawSizes, rawColors] = await prisma.$transaction([
            prisma.product.findMany({
                where: whereFilterForProducts,
                orderBy: orderByMode,
                include: {
                    images: true,
                    category: true,
                    brand: true,
                    size: true,
                    color: true,
                },
                skip: PRODUCTS_ITEMS_PER_PAGE * (currentPage - 1),
                take: PRODUCTS_ITEMS_PER_PAGE,
            }),
            prisma.product.count({
                where: whereFilterForProducts,
            }),
            prisma.product.findMany({
                where: {
                    categoryId: { in : categoryIds },
                    sizeId: { in : sizeIds },
                    colorId: { in : colorIds },
                    isArchived: false,
                },
                select: { brand: true },
                distinct: ["brandId"],
            }),
            prisma.product.findMany({
                where: whereFilterForSidebar,
                select: { size: true },
                distinct: ["sizeId"],
            }),
            prisma.product.findMany({
                where: whereFilterForSidebar,
                select: { color: true},
                distinct: ["colorId"],
            }),
        ]);
    
        const brands = rawBrands.map(b => b.brand);
        const sizes = rawSizes.map(s => s.size);
        const colors = rawColors.map(c => c.color);

        return NextResponse.json({ data: { products, brands, sizes, colors }, pagination: { total: totalProducts } }, { status: 200 });
    } catch (error) {
        console.log("PRODUCTS_GET: ", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}