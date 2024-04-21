export type FormattedBillboard = {
    id: string;
    label: string;
    imageUrl?: string;
    createdAt: string;
};

export type ColumnDefinition<T> = {
    field: keyof T;
    header: string;
};

export const columns: ColumnDefinition<FormattedBillboard>[] = [
    { field: "label", header: "Label"},
    { field: "createdAt", header: "Date"},
];

