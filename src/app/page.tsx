"use client";

import Cocktails from "./Cocktails";
import Filters from "./Filters";
import Header from "./Header";
import { useEffect, useState } from "react";

export default function Home() {
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [query, setQuery] = useState<string>();
  const [debouncedQuery, setDebouncedQuery] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [glass, setGlass] = useState<string>();

  // Debounce query
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <>
      <div className="flex flex-row h-dvh">
        <div className="w-full h-dvh overflow-y-hidden">
          <Header onClick={() => setShowFilters(true)} onSearch={setQuery} />
          <Cocktails category={category} glass={glass} query={debouncedQuery} />
        </div>
      </div>
      {showFilters && (
        <div className="absolute left-0 top-0 h-dvh max-w-64 w-full">
          <Filters
            onGlassChange={setGlass}
            onCategoryChange={setCategory}
            onClose={() => setShowFilters(false)}
          />
        </div>
      )}
    </>
  );
}
