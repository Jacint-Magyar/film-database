"use client";

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
      <h2 className="text-lg mb-4">Something went wrong!</h2>
      <button
        className="text-lg border border-slate-300 text-slate-300 rounded px-2 py-1 hover:bg-slate-700 focus-within:border-slate-700 outline-none"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Reload page
      </button>
    </div>
  );
}
