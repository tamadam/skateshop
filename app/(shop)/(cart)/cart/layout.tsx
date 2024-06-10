import { PropsWithChildren } from "react";
import ShopContent from "../../(marketplace)/components/ShopContent/ShopContent";

export default function CartLayout({ children }: PropsWithChildren) {
  return <ShopContent>{children}</ShopContent>;
}
