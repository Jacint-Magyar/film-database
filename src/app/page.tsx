import { Film } from "@types";
import { FilmList } from "@components/FilmList";

export default async function Home() {
  const response = await fetch(`${process.env.API_ENDPOINT}/films/`, {
    cache: "no-store",
  });
  const films: Film[] = await response.json();

  return <FilmList films={films} />;
}
