import { ColumnDefinition } from "../../components/AdminTable/columnDefinition";

export type FormattedOrder = {
    id: string;
    isPaid: boolean;
    phone: string;
    address: string;
    products: string;
    createdAt: string;
};

export const columns: ColumnDefinition<FormattedOrder>[] = [
    { field: "isPaid", header: "isPaid" },
    { field: "products", header: "Products" },
];

