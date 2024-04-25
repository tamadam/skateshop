import { ColumnDefinition } from "../../components/AdminTable/columnDefinition";

export type FormattedColor = {
    id: string;
    name: string;
    value: string;
    createdAt: string;
};

export const columns: ColumnDefinition<FormattedColor>[] = [
    { field: "name", header: "Name" },
    { field: "value", header: "Value" },
    { field: "createdAt", header: "Date" },
];

