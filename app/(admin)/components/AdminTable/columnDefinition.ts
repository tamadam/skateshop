export type ColumnDefinition<T> = {
    field: keyof T;
    header: string;
};