import Link from "next/link";
import Image from "next/image";
import { setAsFavorite } from "@/app/cocktail/actions";

export default function Cocktail({
  id,
  imageUrl,
  name,
  alcoholic,
  category,
  favorite,
}: {
  id: string;
  imageUrl: string;
  name: string;
  alcoholic: boolean;
  category: string;
  favorite: boolean;
}) {
  return (
    <div className="group relative">
      <Link href={`/cocktail/${id}`}>
        <Image
          src={imageUrl}
          alt={name}
          width={300}
          height={300}
          className="group-hover:opacity-80 transition rounded-md w-full"
        />
      </Link>
      <div className="flex flex-col gap-1 mt-4">
        <div className="flex flex-row gap-4 text-2xl items-center font-semibold justify-between">
          <Link href={`/cocktail/${id}`}>{name}</Link>
          <button
            onClick={() => {
              setAsFavorite(id);
            }}
            className={`md:hidden md:group-hover:block ${favorite ? "text-pink-500 font-icons-filled" : "font-icons"}`}
          >
            favorite
          </button>
        </div>
        <div className="flex flex-row items-center gap-1">
          <p className="text-sm">
            {category}
            {!alcoholic && `,`}
          </p>
          {!alcoholic && (
            <p className="text-green-500 dark:text-green-300 text-sm">
              Non-alcoholic
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
