"use client";

import { FiltersContext, ShowFiltersContext } from "@/app/FiltersProvider";
import { useContext, useEffect, useState } from "react";
import GithubLogoBlack from "@/public/images/github-mark.svg";
import GithubLogoWhite from "@/public/images/github-mark-white.svg";
import Image from "next/image";

export default function Header() {
  const [input, setInput] = useState("");
  const { filters, setFilters } = useContext(FiltersContext);
  const { showFilters, setShowFilters } = useContext(ShowFiltersContext);
  // Debounce setting query
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilters({
        ...filters,
        query: input,
      });
    }, 500);
    return () => clearTimeout(timeout);
  }, [filters, input, setFilters]);
  return (
    <>
      <header className="w-full flex flex-row gap-4 justify-between items-center p-4">
        <div className="flex flex-row gap-2 items-center">
          <p className="font-icons text-3xl">liquor</p>
          <h1 className="hidden sm:block text-2xl font-semibold">Cocktails</h1>
        </div>
        <input
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search"
          className="bg-neutral-100 dark:bg-neutral-700 w-full rounded-full h-full px-4 py-1 focus:ring-2 focus:ring-neutral-300 border-0 focus:border-1 border-neutral-300"
          type="text"
        />
        <button
          title="Filter cocktails"
          onClick={() => setShowFilters(!showFilters)}
          className="font-icons text-3xl flex-none flex"
        >
          tune
        </button>
        <a
          title="Go to the project's repository"
          href={"https://github.com/mejsiejdev/cocktails"}
          target={"_blank"}
        >
          <Image
            className="min-w-7 max-w-7 flex-none block dark:hidden"
            src={GithubLogoBlack}
            alt={"Github Logo"}
          />
          <Image
            className="min-w-7 max-w-7 flex-none hidden dark:block"
            src={GithubLogoWhite}
            alt={"Github Logo"}
          />
        </a>
      </header>
    </>
  );
}
