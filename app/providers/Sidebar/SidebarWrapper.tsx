"use client";

import { PropsWithChildren } from "react";
import { SidebarProvider } from "./SidebarContext";

const SidebarWrapper = ({ children }: PropsWithChildren) => {
  return <SidebarProvider>{children}</SidebarProvider>;
};

export default SidebarWrapper;
