"use client";

import { Dispatch, SetStateAction, useState } from "react";

export default function Header({
  onSearch,
  onClick,
}: {
  onSearch: Dispatch<SetStateAction<string | undefined>>;
  onClick: () => void;
}) {
  return (
    <>
      <header className="w-full flex flex-row gap-4 justify-between items-center p-4">
        <div className="flex flex-row gap-2 items-center">
          <p className="font-icons text-3xl">liquor</p>
          <h1 className="text-2xl font-semibold">Cocktails</h1>
        </div>
        <input
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search"
          className="bg-neutral-100 dark:bg-neutral-700 w-full rounded-full h-full px-4 py-1 text-sm focus:ring-2 focus:ring-neutral-300 border-0 focus:border-1 border-neutral-300"
          type="text"
        />
        <button
          title="Filtruj cocktaile"
          onClick={onClick}
          className="font-icons text-3xl flex-none flex"
        >
          tune
        </button>
      </header>
    </>
  );
}
