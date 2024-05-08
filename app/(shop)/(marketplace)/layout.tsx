import { PropsWithChildren } from "react";
import ShopContent from "./components/ShopContent/ShopContent";

export default function ShopLayout({ children }: PropsWithChildren) {
  return <ShopContent>{children}</ShopContent>;
}
