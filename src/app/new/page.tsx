import { FormOld } from "@components/FormOld";
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
      <FormOld handleSubmit={createFilm} />
    </>
  );
}

// "use client";

// import { Form } from "@components/Form";
// import { redirect, useRouter } from "next/navigation";
// import { useRef } from "react";

// export default function NewFilmPage() {
//   const router = useRouter();
//   const formRef = useRef<HTMLFormElement>(null);

//   async function createFilm(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();

//     if (formRef.current) {
//       const formData = new FormData(formRef.current);

//       try {
//         const response = await fetch("/api/films/new", {
//           method: "POST",
//           body: JSON.stringify({
//             cover_image: formData.get("cover-image"),
//             title: formData.get("title"),
//             description: formData.get("description"),
//             age_limit: formData.get("age-limit"),
//           }),
//         });
//         if (response.ok) {
//           router.push("/");
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   }

//   return (
//     <>
//       <h1 className="text-3xl text-center">Add new film</h1>
//       <Form handleSubmit={createFilm} ref={formRef} />
//     </>
//   );
// }
