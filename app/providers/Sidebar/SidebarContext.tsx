import { createContext, PropsWithChildren, useContext, useState } from "react";

const SidebarContext = createContext({
  isOpen: false,
  toggleOpen: () => {},
  setOpen: (open: boolean) => {},
});

export function useSidebar() {
  return useContext(SidebarContext);
}

export function SidebarProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prevState) => !prevState);
  };

  const setOpen = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggleOpen, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}
