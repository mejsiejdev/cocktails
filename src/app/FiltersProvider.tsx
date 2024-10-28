"use client";
import { createContext, Dispatch, SetStateAction, useState } from "react";

type FiltersContextType = {
  filters: {
    query: string;
    glass: string;
    category: string;
    favorites: boolean;
    nonalcoholic: boolean;
  };
  setFilters: Dispatch<
    SetStateAction<{
      query: string;
      glass: string;
      category: string;
      favorites: boolean;
      nonalcoholic: boolean;
    }>
  >;
};

type ShowFiltersContextType = {
  showFilters: boolean;
  setShowFilters: Dispatch<SetStateAction<boolean>>;
};

export const FiltersContext = createContext<FiltersContextType>(
  null as unknown as FiltersContextType,
);
export const ShowFiltersContext = createContext<ShowFiltersContextType>(
  null as unknown as ShowFiltersContextType,
);

export default function FiltersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [filters, setFilters] = useState<{
    query: string;
    glass: string;
    category: string;
    favorites: boolean;
    nonalcoholic: boolean;
  }>({
    query: "",
    glass: "",
    category: "",
    favorites: false,
    nonalcoholic: false,
  });
  const [showFilters, setShowFilters] = useState<boolean>(false);
  return (
    <ShowFiltersContext.Provider value={{ showFilters, setShowFilters }}>
      <FiltersContext.Provider value={{ filters, setFilters }}>
        {children}
      </FiltersContext.Provider>
    </ShowFiltersContext.Provider>
  );
}
