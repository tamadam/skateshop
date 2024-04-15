"use client";

import { useAdminNav } from "./AdminNav/AdminNavContext";
import { GiHamburgerMenu } from "react-icons/gi";

const AdminActionButton = () => {
  const { toggleOpen } = useAdminNav();

  return (
    <div>
      <button onClick={toggleOpen} className="desktop--hide">
        <GiHamburgerMenu size="1em" />
      </button>
    </div>
  );
};

export default AdminActionButton;
