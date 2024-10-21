"use client";

import useSWR from "swr";
import FilterList from "./FilterList";
import { Dispatch, SetStateAction } from "react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Filters({
  onGlassChange,
  onCategoryChange,
  onClose,
}: {
  onGlassChange: Dispatch<SetStateAction<string | undefined>>;
  onCategoryChange: Dispatch<SetStateAction<string | undefined>>;
  onClose: () => void;
}) {
  const glasses = useSWR(
    "https://cocktails.solvro.pl/api/v1/cocktails/glasses",
    fetcher
  );
  const categories = useSWR(
    "https://cocktails.solvro.pl/api/v1/cocktails/categories",
    fetcher
  );
  return (
    <div className="bg-white dark:bg-neutral-800 flex flex-col gap-4 p-4 h-dvh overflow-y-auto">
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-2 items-center">
          <p className="font-icons text-3xl">tune</p>
          <p className="text-2xl font-semibold">Filters</p>
        </div>
        <button
          title="Close the filters"
          className="font-icons text-3xl flex-none flex aspect-square"
          onClick={onClose}
        >
          close
        </button>
      </div>
      {categories.data && (
        <FilterList
          name="Categories"
          icon="liquor"
          options={categories.data.data}
          onSelect={onCategoryChange}
        />
      )}
      {glasses.data && (
        <FilterList
          name="Glasses"
          icon="local_bar"
          options={glasses.data.data}
          onSelect={onGlassChange}
        />
      )}
    </div>
  );
}
