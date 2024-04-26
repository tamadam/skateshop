import { ColumnDefinition } from "../../components/AdminTable/columnDefinition";

export type FormattedBrand = {
    id: string;
    name: string;
    imageUrl?: string;
    createdAt: string;
};

export const columns: ColumnDefinition<FormattedBrand>[] = [
    { field: "name", header: "Name" },
    { field: "createdAt", header: "Date" },
];

