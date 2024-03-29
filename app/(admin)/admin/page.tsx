import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ROLES } from "@prisma/client";
import { getServerSession } from "next-auth";
import React from "react";

const AdminPage = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user.role === ROLES.ADMIN) {
    return <p>You are an admin, welcome!</p>;
  }

  return <p>You are not authorized to view this page!</p>;
};

export default AdminPage;
