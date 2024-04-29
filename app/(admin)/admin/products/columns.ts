import { ColumnDefinition } from "../../components/AdminTable/columnDefinition";

export type FormattedProduct = {
    id: string;
    name: string;
    price: number;
    images: { url: string }[];
    createdAt: string;
};

export const columns: ColumnDefinition<FormattedProduct>[] = [
    { field: "name", header: "Name" },
    { field: "price", header: "Price" },
    { field: "createdAt", header: "Date" },
];

