"use client";

import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

export function DeleteFilm({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete(id: string) {
    const hasConfirmed = confirm("Are you sure you want to delete this film?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/films/${id}`, {
          method: "DELETE",
        });
        revalidatePath("/");
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <button
      className="text-lg bg-red-500 rounded px-2 py-1 hover:bg-red-600 focus-within:bg-red-600 outline-none"
      onClick={() => handleDelete(id)}
    >
      Delete
    </button>
  );
}
