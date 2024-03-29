"use client";

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
    >
      Sign out
    </button>
  );
};

export default SignOut;
