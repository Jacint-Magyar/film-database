"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams();

  useEffect(() => {
    console.error(params);
    console.error(error);
  }, [error]);

  return (
    <div className="text-center">
      <h2 className="text-lg mb-4">No film was found with id: {params.id}</h2>
      <Link
        href={"/"}
        className="text-lg border border-slate-300 text-slate-300 rounded px-2 py-1 hover:bg-slate-700 focus-within:border-slate-700 outline-none"
      >
        Go back to Home
      </Link>
    </div>
  );
}
