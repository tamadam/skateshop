import { createContext, PropsWithChildren, useContext, useState } from "react";

type SortType = "price" | "name" | "random";
type SortState = "asc" | "desc" | "random";

const ProductSortContext = createContext({
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
