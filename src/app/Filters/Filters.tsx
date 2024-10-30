"use client";

import { useContext } from "react";
import { FiltersContext, ShowFiltersContext } from "@/app/FiltersProvider";
import FilterList from "@/app/Filters/FilterList";

export default function Filters({
  categories,
  glasses,
}: {
  categories: string[];
  glasses: string[];
}) {
  const { showFilters, setShowFilters } = useContext(ShowFiltersContext);
  const { filters, setFilters } = useContext(FiltersContext);
  return (
    showFilters && (
      <div className="absolute left-0 top-0 max-w-64 w-full bg-neutral-50 dark:bg-neutral-800 flex flex-col gap-4 p-4 h-dvh overflow-y-auto">
        <div className="flex flex-row gap-4 justify-between">
          <div className="flex flex-row gap-2 items-center">
            <p className="font-icons text-3xl">tune</p>
            <p className="text-2xl font-semibold">Filters</p>
          </div>
          <button
            title="Close the filters"
            className="font-icons text-3xl flex-none"
            onClick={() => setShowFilters(false)}
          >
            close
          </button>
        </div>
        {(filters.query !== "" ||
          filters.glass !== "" ||
          filters.category !== "" ||
          filters.nonalcoholic ||
          filters.favorites) && (
          <button
            onClick={() =>
              setFilters({
                query: "",
                glass: "",
                category: "",
                favorites: false,
                nonalcoholic: false,
              })
            }
            className="text-sm text-center w-full px-4 py-2 rounded-md bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600"
          >
            Clear filters
          </button>
        )}
        <button
          className="flex flex-row gap-4 justify-between items-center"
          onClick={() =>
            setFilters({ ...filters, nonalcoholic: !filters.nonalcoholic })
          }
        >
          <div className="flex flex-row gap-2 items-center">
            <span className="text-lg text-green-500 dark:text-green-300">
              0%
            </span>
            <p className="text-lg">Non-alcoholic</p>
          </div>
          {!filters.nonalcoholic ? (
            <span className="font-icons text-2xl">check_box_outline_blank</span>
          ) : (
            <span className="font-icons-filled text-2xl text-sky-500">
              check_box
            </span>
          )}
        </button>
        <button
          className="flex flex-row gap-4 justify-between items-center"
          onClick={() =>
            setFilters({ ...filters, favorites: !filters.favorites })
          }
        >
          <div className="flex flex-row gap-2 items-center">
            <span className="font-icons-filled text-2xl text-pink-500">
              favorite
            </span>
            <p className="text-lg">Favorites</p>
          </div>
          {!filters.favorites ? (
            <span className="font-icons text-2xl">check_box_outline_blank</span>
          ) : (
            <span className="font-icons-filled text-2xl text-sky-500">
              check_box
            </span>
          )}
        </button>
        {categories && (
          <FilterList
            name="Categories"
            icon="liquor"
            options={categories}
            selected={filters.category}
            onSelect={function (value: string) {
              if (filters.category === value) {
                setFilters({ ...filters, category: "" });
              } else {
                setFilters({ ...filters, category: value });
              }
            }}
          />
        )}
        {glasses && (
          <FilterList
            name="Glasses"
            icon="local_bar"
            options={glasses}
            selected={filters.glass}
            onSelect={function (value) {
              if (filters.glass === value) {
                setFilters({ ...filters, glass: "" });
              } else {
                setFilters({ ...filters, glass: value });
              }
            }}
          />
        )}
      </div>
    )
  );
}
