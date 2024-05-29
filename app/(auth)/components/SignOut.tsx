"use client";

import { IoExitSharp } from "react-icons/io5";

import { signOut } from "next-auth/react";

const SignOut = () => {
  return (
    <button
      onClick={() => {
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/login`,
        });
      }}
      style={{ display: "flex" }}
    >
      <IoExitSharp size="1.4em" />
    </button>
  );
};

export default SignOut;
