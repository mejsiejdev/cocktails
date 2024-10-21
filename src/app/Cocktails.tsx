"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import useSWRInfinite from "swr/infinite";

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
    throw new Error("Failed to fetch Cocktail data.");
  }

  return res.json();
}

const getKey = (
  pageIndex: number,
  previousPageData: any,
  query: string | undefined,
  glass: string | undefined,
  category: string | undefined
) => {
  if (previousPageData && !previousPageData.data.length) return null; // reached the end
  return `https://cocktails.solvro.pl/api/v1/cocktails?${
    typeof query !== "undefined" ? `name=%${query}%&` : ""
  }${typeof glass !== "undefined" ? `glass=${glass}&` : ""}${
    typeof category !== "undefined" ? `category=${category}&` : ""
  }page=${pageIndex + 1}&perPage=32`;
};

export default function Cocktails({
  category,
  glass,
  query,
}: {
  category: string | undefined;
  glass: string | undefined;
  query: string | undefined;
}) {
  const { data, size, setSize } = useSWRInfinite(
    (...args) => getKey(...args, query, glass, category),
    getCocktails
  );
  return (
    <div>
      <div className="h-dvh overflow-y-auto w-full grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 px-4 pb-4 gap-8">
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
                    <div className="flex flex-row gap-4 text-2xl font-semibold justify-between">
                      <p>{name}</p>
                      <p className="text-green-500 dark:text-green-300">
                        {!alcoholic && "0%"}
                      </p>
                    </div>
                    <p className="text-sm">{category}</p>
                  </div>
                </Link>
              )
            )
          )}
        {data && (
          <div className="w-full flex justify-center col-span-full pb-20">
            <button
              onClick={() => setSize(size + 1)}
              className="whitespace-nowrap h-min text-sm -mt-4 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 transition rounded-md"
            >
              Wczytaj więcej cocktaili!
            </button>
          </div>
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
    </div>
  );
}
