import { Form } from "@components/Form";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";

export const metadata: Metadata = {
  title: "New Film",
};

export default async function NewFilmPage() {
  async function createFilm(data: FormData) {
    "use server";

    const requestBody = {
      cover_image: data.get("cover-image"),
      title: data.get("title"),
      description: data.get("description"),
      age_limit: data.get("age-limit"),
    };

    const response = await fetch(`${process.env.API_ENDPOINT}/films`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    revalidatePath("/");
    redirect("/");
  }

  return (
    <>
      <h1 className="text-3xl text-center">Add new film</h1>
      <Form handleSubmit={createFilm} />
    </>
  );
}
