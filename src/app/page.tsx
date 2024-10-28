import Cocktails from "./Cocktails";
import Filters from "./Filters";
import Header from "./Header";
import FiltersProvider from "@/app/FiltersProvider";

export default function Home() {
  /*
                              const [showFilters, setShowFilters] = useState<boolean>(false);
                              const [query, setQuery] = useState<string>();
                              const [debouncedQuery, setDebouncedQuery] = useState<string>();
                              const [category, setCategory] = useState<string>();
                              const [glass, setGlass] = useState<string>();
    */
  return (
    <FiltersProvider>
      <div className="flex flex-row h-dvh">
        <div className="w-full h-dvh overflow-y-hidden">
          <Header />
          <Cocktails />
        </div>
      </div>
      <Filters />
    </FiltersProvider>
  );
}
