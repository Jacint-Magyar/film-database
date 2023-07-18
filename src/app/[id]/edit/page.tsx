import { Form } from "@components/Form";
import { redirect } from "next/navigation";
import { Film } from "@types";
import { revalidatePath } from "next/cache";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Film",
};

export default async function EditFilmPage({
  params,
}: {
  params: { id: string };
}) {
  const response = await fetch(
    `${process.env.API_ENDPOINT}/films/${params.id}`,
    {
      cache: "no-store",
    }
  );
  const film: Film = await response.json();

  async function editFilm(data: FormData) {
    "use server";

    const requestBody = {
      cover_image: data.get("cover-image"),
      title: data.get("title"),
      description: data.get("description"),
      age_limit: data.get("age-limit"),
    };

    await fetch(`${process.env.API_ENDPOINT}/films/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    revalidatePath(`/${params.id}`);
    redirect(`/${params.id}`);
  }

  return (
    <>
      <h1 className="text-3xl text-center">Edit film</h1>
      <Form data={film} handleSubmit={editFilm} />
    </>
  );
}
