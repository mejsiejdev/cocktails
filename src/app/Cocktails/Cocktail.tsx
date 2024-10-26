import Link from "next/link";
import Image from "next/image";

export default function Cocktail({
  id,
  imageUrl,
  name,
  alcoholic,
  category,
}: {
  id: string;
  imageUrl: string;
  name: string;
  alcoholic: boolean;
  category: string;
}) {
  return (
    <Link href={`/cocktail/${id}`} className="group relative">
      <Image
        src={imageUrl}
        alt={name}
        width={300}
        height={300}
        className="group-hover:opacity-80 transition rounded-md w-full"
      />
      <div className="flex flex-col gap-1 mt-4">
        <div className="flex flex-row gap-4 text-2xl font-semibold justify-between">
          <p>{name}</p>
          <p className="text-green-500 dark:text-green-300">
            {!alcoholic && "0%"}
          </p>
        </div>
        <p className="text-sm">{category}</p>
      </div>
    </Link>
  );
}
