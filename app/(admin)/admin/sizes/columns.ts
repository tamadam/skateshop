import { ColumnDefinition } from "../../components/AdminTable/columnDefinition";

export type FormattedSize = {
    id: string;
    name: string;
    value: string;
    createdAt: string;
};

export const columns: ColumnDefinition<FormattedSize>[] = [
    { field: "name", header: "Name" },
    { field: "value", header: "Value" },
    { field: "createdAt", header: "Date" },
];

