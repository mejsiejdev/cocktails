"use client";

import useSWRInfinite from "swr/infinite";
import Cocktail from "@/app/Cocktails/Cocktail";
import { useContext } from "react";
import { FiltersContext } from "@/app/FiltersProvider";

type Cocktail = {
  id: string;
  name: string;
  instructions: string;
  category: string;
  alcoholic: boolean;
  glass: string;
  imageUrl: string;
};

async function getCocktails(url: string): Promise<{
  data: Cocktail[];
}> {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch Cocktail data.");
  }

  return res.json();
}

const getKey = (
  pageIndex: number,
  previousPageData: {
    data: Cocktail[];
  },
  query: string | undefined,
  glass: string | undefined,
  category: string | undefined,
  nonalcoholic: boolean,
) => {
  if (previousPageData && !previousPageData.data.length) return null; // reached the end
  return `https://cocktails.solvro.pl/api/v1/cocktails?${
    typeof query !== "undefined" ? `name=%${query}%&` : ""
  }${typeof glass !== "undefined" ? `glass=${glass}&` : ""}${
    typeof category !== "undefined" ? `category=${category}&` : ""
  }${nonalcoholic ? "alcoholic=false&" : ""}page=${pageIndex + 1}&perPage=32`;
};

export default function Cocktails() {
  const { filters } = useContext(FiltersContext);
  const { data, size, setSize, isLoading } = useSWRInfinite(
    (...args) =>
      getKey(
        ...args,
        filters.query,
        filters.glass,
        filters.category,
        filters.nonalcoholic,
      ),
    getCocktails,
  );
  return (
    <div
      className={`h-dvh ${isLoading ? "overflow-y-hidden" : "overflow-y-auto"} w-full grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 px-4 pb-4 gap-8`}
    >
      {/* Loading state UI */}
      {isLoading &&
        [...Array(8)].map((key) => (
          <div key={key} className="w-full animate-pulse">
            <span className="block w-full bg-neutral-100 dark:bg-neutral-700 aspect-square rounded-md" />
            <div className="flex flex-col gap-3 mt-4">
              <span className="block w-48 h-7 bg-neutral-100 dark:bg-neutral-700 rounded-md" />
              <span className="block w-24 h-5 bg-neutral-100 dark:bg-neutral-700 rounded-md" />
            </div>
          </div>
        ))}
      {/* Normal (loaded) state */}
      {data &&
        data.map((cocktails) =>
          cocktails.data.map(
            ({ id, name, category, alcoholic, imageUrl }, key) => (
              <Cocktail
                id={id}
                imageUrl={imageUrl}
                name={name}
                category={category}
                alcoholic={alcoholic}
                key={key}
              />
            ),
          ),
        )}
      {data && (
        <div className="w-full flex justify-center col-span-full pb-20">
          <button
            onClick={() => setSize(size + 1)}
            className="whitespace-nowrap h-min text-sm -mt-4 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 transition rounded-md"
          >
            Load more cocktails
          </button>
        </div>
      )}
    </div>
  );
}
