export type FormattedCategory = {
    id: string;
    name: string;
    parentCategory: string;
    createdAt: string;
};

export type ColumnDefinition<T> = {
    field: keyof T;
    header: string;
};

export const columns: ColumnDefinition<FormattedCategory>[] = [
    { field: "name", header: "Name" },
    { field: "parentCategory", header: "Parent Category" },
    { field: "createdAt", header: "Date" },
];

