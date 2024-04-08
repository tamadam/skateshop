"use client";

import { Billboard } from "@prisma/client";
import { useRouter } from "next/navigation";

interface BillboardClientProps {
  billboards: Billboard[];
}

const BillboardClient = ({ billboards }: BillboardClientProps) => {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.push("/admin/billboards/new")}>
        Add new
      </button>
      <div>
        <h1>Existing billboards</h1>
        <ul>
          {billboards.length === 0 && <p>No billboards available</p>}
          {billboards.map((billboard) => {
            return (
              <li key={billboard.id} className="flex gap-2 py-1">
                <p className="font-bold">{billboard.label}</p>
                <p
                  className="text-green-500"
                  onClick={() =>
                    router.push(`/admin/billboards/${billboard.id}`)
                  }
                >
                  Update
                </p>
                <p className="text-rose-500">Delete</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default BillboardClient;
