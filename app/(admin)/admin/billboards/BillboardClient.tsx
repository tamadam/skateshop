"use client";

import { useRouter } from "next/navigation";

const BillboardClient = () => {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.push("/admin/billboards/new")}>
        Add new
      </button>
      <div>Existing billboards</div>
    </div>
  );
};

export default BillboardClient;
