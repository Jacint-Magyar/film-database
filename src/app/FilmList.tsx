"use client";

import Link from "next/link";
import { Select } from "@components/Select";
import { Item } from "@components/Item";
import { Film, AGE_LIMIT } from "@types";
import { useState } from "react";

export function FilmList({ films }: { films: Film[] }) {
  const [selectedFilter, setSelectedFilter] = useState("");
  const options = Object.entries(AGE_LIMIT);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
  };

  const filteredFilms = films?.filter((film: Film) => {
    return selectedFilter ? film.age_limit === selectedFilter : film;
  });

  return (
    <main className="container">
      <h1 className="text-3xl text-center">Film Database</h1>
      <div className="flex flex-col gap-4 md:flex-row md:align-center justify-between py-8">
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <label htmlFor="age-limit" className="text-sm">
            Filter by age limit
          </label>
          <Select
            id="age-limit"
            options={options}
            onChange={handleFilterChange}
          >
            <option value="">All age limits</option>
          </Select>
        </div>
        <div className="">
          <Link
            href={"/new"}
            className="block text-lg bg-slate-200 text-slate-800 rounded px-2 py-1 hover:bg-slate-300 focus-within:border-slate-300 outline-none"
          >
            + Add new film
          </Link>
        </div>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
        {filteredFilms?.map((film: Film) => (
          <Item key={film._id} {...film} />
        ))}
      </ul>
    </main>
  );
}
