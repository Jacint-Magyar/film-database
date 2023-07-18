import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { DeleteFilm } from "./DeleteFilm";
import { Film, AGE_LIMITS, AGE_LIMIT } from "@types";

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const response = await fetch(
    `${process.env.API_ENDPOINT}/films/${params.id}`,
    {
      cache: "no-store",
    }
  );
  if (!response.ok) {
    return {
      title: "Something went wrong!",
    };
  }
  const film: Film = await response.json();

  return {
    title: film.title + " - " + (await parent)?.title?.absolute,
  };
}

export default async function FilmPage({ params }: { params: { id: string } }) {
  const response = await fetch(
    `${process.env.API_ENDPOINT}/films/${params.id}`,
    {
      cache: "no-store",
    }
  );
  const film: Film = await response.json();

  return (
    <div className="w-4/5 md:w-[40rem] mx-auto flex flex-col md:flex-row md:flex-wrap px-4">
      <div className="md:w-2/5 md:pe-4">
        <div className="relative aspect-[2/3] rounded bg-slate-600 overflow-hidden">
          <Image
            src={film.cover_image}
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            alt="film cover"
            className="h-full object-cover"
          />
        </div>
      </div>
      <div className="md:w-3/5 md:ps-4 flex flex-col">
        <div className="mt-6 md:mt-0 flex-none">
          <h1 className="text-3xl">{film.title}</h1>
        </div>
        <p className="text-lg mt-6">{film.description}</p>
        <div className="flex items-center gap-2 mt-6">
          <span className="relative inline-block w-8 h-8">
            <Image
              src={`/images/${AGE_LIMITS[film.age_limit]}.png`}
              fill={true}
              sizes="32px"
              alt={AGE_LIMIT[film.age_limit]}
            />
          </span>
          <p className="text-sm text-slate-300">{AGE_LIMIT[film.age_limit]}</p>
        </div>
      </div>
      <div className="w-full mt-8 flex justify-between items-center">
        <Link
          href={"/"}
          className="text-lg border border-slate-300 text-slate-300 rounded px-2 py-1 hover:bg-slate-700 focus-within:border-slate-700 outline-none"
        >
          Home
        </Link>
        <div className="flex items-center gap-4">
          <DeleteFilm id={params.id} />
          <Link
            href={`${params.id}/edit`}
            className="text-lg bg-slate-200 text-slate-800 rounded px-2 py-1 hover:bg-slate-300 focus-within:border-slate-300 outline-none"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}
