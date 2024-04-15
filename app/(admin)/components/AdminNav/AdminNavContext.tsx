import { createContext, PropsWithChildren, useContext, useState } from "react";

const AdminNavContext = createContext({
  isOpen: false,
  toggleOpen: () => {},
  setOpen: (open: boolean) => {},
});

export function useAdminNav() {
  return useContext(AdminNavContext);
}

export function AdminNavProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prevState) => !prevState);
  };

  const setOpen = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <AdminNavContext.Provider value={{ isOpen, toggleOpen, setOpen }}>
      {children}
    </AdminNavContext.Provider>
  );
}
