import { ColumnDefinition } from "../../components/AdminTable/columnDefinition";

export type FormattedBillboard = {
    id: string;
    label: string;
    imageUrl?: string;
    createdAt: string;
};

export const columns: ColumnDefinition<FormattedBillboard>[] = [
    { field: "label", header: "Label" },
    { field: "createdAt", header: "Date" },
];

