"use client";

import Link from "next/link";
import Image from "next/image";
import useSWRInfinite from "swr/infinite";

async function getCocktails(url: string): Promise<{
  data: {
    id: string;
    name: string;
    instructions: string;
    category: string;
    glass: string;
    imageUrl: string;
  }[];
}> {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Nie udało się pobrać listy cocktaili");
  }

  return res.json();
}

function getKey(pageIndex: number, previousPageData: any) {
  if (previousPageData && !previousPageData.length) return null; // reached the end
  return `https://cocktails.solvro.pl/api/v1/cocktails?page=${pageIndex + 1}`;
}

export default function Home() {
  const { data } = useSWRInfinite(getKey, getCocktails);
  if (!data) return "loading";
  console.log(data[0].data);
  return (
    <main className="flex flex-col gap-8">
      <p className="text-4xl font-semibold">Cocktails</p>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 gap-8">
        {data &&
          data[0].data.map(({ id, name, category, imageUrl }, key) => (
            <Link href={`/cocktail/${id}`} key={key} className="group relative">
              <Image
                src={imageUrl}
                alt={name}
                width={300}
                height={300}
                className="group-hover:opacity-80 transition rounded-md w-full"
              />
              <div className="flex flex-col gap-1 mt-4">
                <p className="text-3xl font-semibold">{name}</p>
                <p>{category}</p>
              </div>
            </Link>
          ))}
      </div>
    </main>
  );
}
