"use client";

import Link from "next/link";
import Image from "next/image";
import useSWRInfinite from "swr/infinite";
import { useState } from "react";

async function getCocktails(url: string): Promise<{
  data: {
    id: string;
    name: string;
    instructions: string;
    category: string;
    alcoholic: string;
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

const getKey = (pageIndex: number, previousPageData: any) => {
  if (previousPageData && !previousPageData.data.length) return null; // reached the end

  return `https://cocktails.solvro.pl/api/v1/cocktails?page=${
    pageIndex + 1
  }&perPage=32`;
};

export default function Home() {
  const { data, size, setSize, isLoading } = useSWRInfinite(
    getKey,
    getCocktails
  );
  const [showFilters, setShowFilters] = useState<boolean>(false);
  return (
    <main className="flex flex-col items-center gap-8">
      <div className="flex flex-row gap-4 justify-between items-center w-full">
        <div className="flex flex-row gap-2 items-center">
          <p className="font-icons text-4xl">liquor</p>
          <h1 className="text-4xl font-semibold">Cocktails</h1>
        </div>
        <div className="flex flex-row gap-4">
          <button className="font-icons text-4xl flex-none flex aspect-square">
            search
          </button>
          <button
            title="Filtruj cocktaile"
            onClick={() => setShowFilters(true)}
            className="font-icons text-4xl flex-none flex aspect-square"
          >
            tune
          </button>
          {showFilters && (
            <div className="absolute rounded-md bg-neutral-700 flex flex-col gap-4 p-6 mt-16 z-10">
              <p className="text-2xl font-semibold">Filtry</p>
              <p className="text-lg">Kategoria</p>
              <p className="text-lg">Szklanka</p>
            </div>
          )}
        </div>
      </div>
      <div className="w-full grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 gap-8">
        {data &&
          data.map((cocktails) =>
            cocktails.data.map(
              ({ id, name, category, alcoholic, imageUrl }, key) => (
                <Link
                  href={`/cocktail/${id}`}
                  key={key}
                  className="group relative"
                >
                  <Image
                    src={imageUrl}
                    alt={name}
                    width={300}
                    height={300}
                    className="group-hover:opacity-80 transition rounded-md w-full"
                  />
                  <div className="flex flex-col gap-1 mt-4">
                    <div className="flex flex-row gap-4 text-3xl font-semibold justify-between">
                      <p>{name}</p>
                      <p className="text-green-500 dark:text-green-300">
                        {!alcoholic && "0%"}
                      </p>
                    </div>
                    <p>{category}</p>
                  </div>
                </Link>
              )
            )
          )}
      </div>
      {!data && (
        /* UI informujące o wczytywaniu danych cocktaili */
        <div className="flex flex-col gap-8 items-center w-full">
          <p>Wczytywanie cocktaili...</p>
          <span className="font-icons animate-spin text-4xl">
            progress_activity
          </span>
        </div>
      )}
      {data && (
        <button
          onClick={() => setSize(size + 1)}
          className="w-min whitespace-nowrap text-lg mt-2 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 transition rounded-full"
        >
          Wczytaj więcej cocktaili!
        </button>
      )}
    </main>
  );
}
