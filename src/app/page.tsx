import Cocktails from "./Cocktails";
import Filters from "./Filters";
import Header from "./Header";
import FiltersProvider from "@/app/FiltersProvider";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  let favorites = [];
  if (cookieStore.get("favorites")?.value !== undefined) {
    favorites = JSON.parse(cookieStore.get("favorites")!.value);
  }
  return (
    <FiltersProvider>
      <div className="flex flex-row h-dvh">
        <div className="w-full h-dvh overflow-y-hidden">
          <Header />
          <Cocktails favorites={favorites} />
        </div>
      </div>
      <Filters />
    </FiltersProvider>
  );
}
