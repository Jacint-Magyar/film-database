import Image from "next/image";
import Link from "next/link";
import { Film, AGE_LIMITS, AGE_LIMIT } from "@types";

export function Item({ _id, cover_image, title, age_limit }: Film) {
  return (
    <li className="relative group">
      <div className="rounded relative aspect-2/3 overflow-hidden">
        <Image
          src={cover_image}
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          alt={title}
          className="object-cover group-hover:scale-105 transition-transform"
        />
      </div>
      <div className="flex justify-between items-start gap-2 pt-4">
        <Link
          href={`/${_id}`}
          className="text-xl after:block after:absolute after:inset-0 truncate"
        >
          {title}
        </Link>
        <span
          className="relative inline-block w-8 h-8"
          style={{ minWidth: 32 }}
        >
          <Image
            src={`/images/${AGE_LIMITS[age_limit]}.png`}
            fill={true}
            sizes="32px"
            alt={AGE_LIMIT[age_limit]}
          />
        </span>
      </div>
    </li>
  );
}
