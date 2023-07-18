"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center">
      <h2 className="text-lg">Not Found</h2>
      <p className="mb-6">Could not find requested resource.</p>
      <Link
        href={"/"}
        className="text-lg border border-slate-300 text-slate-300 rounded px-2 py-1 hover:bg-slate-700 focus-within:border-slate-700 outline-none"
      >
        Go back to Home
      </Link>
    </div>
  );
}
