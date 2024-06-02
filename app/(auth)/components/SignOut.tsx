"use client";

import { signOut } from "next-auth/react";

const SignOut = ({ className }: { className: string }) => {
  return (
    <button
      onClick={() => {
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/login`,
        });
      }}
      className={className}
    >
      Logout
    </button>
  );
};

export default SignOut;
