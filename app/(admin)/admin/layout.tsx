import { PropsWithChildren } from "react";
import AdminNav from "./AdminNav";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-svh bg-white pt-[calc(var(--navbar-height)_+_1em)] px-2 text-black">
      <div className="m-auto max-w-[--screen-max-width]">
        <AdminNav />
        {children}
      </div>
    </div>
  );
}
