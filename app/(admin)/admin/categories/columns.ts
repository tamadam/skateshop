import { ColumnDefinition } from "../../components/AdminTable/columnDefinition";

export type FormattedCategory = {
    id: string;
    name: string;
    parentCategory: string;
    billboard: string;
    createdAt: string;
};

export const columns: ColumnDefinition<FormattedCategory>[] = [
    { field: "name", header: "Name" },
    { field: "parentCategory", header: "Parent Category" },
    { field: "billboard", header: "Billboard" },
    { field: "createdAt", header: "Date" },
];

