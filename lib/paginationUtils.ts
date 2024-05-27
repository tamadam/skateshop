import { PAGINATION_ITEMS_PER_PAGE } from "@/app/(admin)/constants";

export const getTotalPages = (data: number, itemsPerPage = PAGINATION_ITEMS_PER_PAGE) => {
    return Math.max(1, Math.ceil(data / itemsPerPage));
};

export const getValidatedPageNumber = (pageNumber: string | string[] | undefined | null) => {
    let validatedPageNumber;
    const convertedPageNumber = Number(pageNumber ?? 1);

    if (Number.isNaN(convertedPageNumber)){
        validatedPageNumber = 1;
    } else if (convertedPageNumber < 1) {
        validatedPageNumber = 1;
    } else {
        validatedPageNumber = convertedPageNumber;
    }

    return validatedPageNumber;
}