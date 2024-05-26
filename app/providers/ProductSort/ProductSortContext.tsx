import { createContext, PropsWithChildren, useContext, useState } from "react";

export type SortType = "price" | "name" | "random";
export type SortState = "asc" | "desc";

interface ProductSortContextType {
  sortType: SortType;
  sortState: SortState;
  setSortType: (type: SortType) => void;
  setSortState: (state: SortState) => void;
}

const ProductSortContext = createContext<ProductSortContextType>({
  sortType: "price",
  sortState: "asc",
  setSortType: (type: SortType) => {},
  setSortState: (state: SortState) => {},
});

export function useProductSort() {
  return useContext(ProductSortContext);
}

export function ProductSortProvider({ children }: PropsWithChildren) {
  const [sortType, setType] = useState<SortType>("random");
  const [sortState, setState] = useState<SortState>("asc");

  const setSortType = (type: SortType) => {
    setType(type);
  };

  const setSortState = (state: SortState) => {
    setState(state);
  };

  return (
    <ProductSortContext.Provider
      value={{ sortType, sortState, setSortType, setSortState }}
    >
      {children}
    </ProductSortContext.Provider>
  );
}
