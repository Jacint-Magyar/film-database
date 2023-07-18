"use client";

import { useRef } from "react";
import { Select } from "./Select";
import { Film, AGE_LIMIT } from "@types";
import { useRouter } from "next/navigation";

type FormProps = {
  data?: Film;
  handleSubmit(data: FormData): Promise<void>;
};

export const Form = ({ data, handleSubmit }: FormProps) => {
  const router = useRouter();
  const coverImgRef = useRef<HTMLImageElement>(null);
  const options = Object.entries(AGE_LIMIT);
  const inputClasses = `w-full rounded px-4 py-2 bg-slate-600 border border-slate-600 hover:border-slate-400 focus-within:bg-slate-500 outline-none`;
  const placeholderImgPath = "/images/film-placeholder.png";

  const displayImgFromUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (coverImgRef.current) {
      coverImgRef.current.src = e.target.value
        ? e.target.value
        : placeholderImgPath;
    }
  };

  return (
    <form
      action={handleSubmit}
      className="w-full md:w-[40rem] mx-auto flex flex-wrap py-8"
    >
      <div className="md:w-2/5 md:pe-4 flex flex-col">
        <label htmlFor="cover-image" className="text-sm">
          Film cover
        </label>
        <input
          type="text"
          id="cover-image"
          name="cover-image"
          required
          className={inputClasses}
          defaultValue={data?.cover_image}
          onChange={displayImgFromUrl}
        />
        <div className="relative mt-2 aspect-[2/3] rounded bg-slate-600 overflow-hidden">
          <img
            ref={coverImgRef}
            src={data?.cover_image ?? placeholderImgPath}
            alt="film cover"
            className="h-full object-cover"
          />
        </div>
      </div>
      <div className="md:w-3/5 md:ps-4 flex flex-col">
        <div className="mt-6 md:mt-0 flex flex-col">
          <label htmlFor="title" className="text-sm">
            Film title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className={inputClasses}
            defaultValue={data?.title}
          />
        </div>
        <div className="mt-6 flex flex-col">
          <label htmlFor="description" className="text-sm">
            Film description
          </label>
          <textarea
            id="description"
            name="description"
            rows={6}
            required
            className={inputClasses}
            defaultValue={data?.description}
          ></textarea>
        </div>
        <div className="mt-6 flex flex-col">
          <label htmlFor="age-limit" className="text-sm">
            Age limit
          </label>
          <Select
            id="age-limit"
            name="age-limit"
            required
            options={options}
            defaultValue={data?.age_limit}
          >
            <option value="">Select an age limit</option>
          </Select>
        </div>
      </div>
      <div className="w-full mt-8 flex justify-between items-center">
        <button
          type="button"
          className="text-lg border border-slate-300 text-slate-300 rounded px-2 py-1 hover:bg-slate-700 focus-within:border-slate-700 outline-none"
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="text-lg bg-slate-200 text-slate-800 rounded px-2 py-1 hover:bg-slate-300 focus-within:border-slate-300 outline-none"
        >
          Save
        </button>
      </div>
    </form>
  );
};
