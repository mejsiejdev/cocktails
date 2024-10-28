import Filters from "@/app/Filters/Filters";

async function getGlasses(): Promise<{ data: string[] }> {
  const res = await fetch(
    "https://cocktails.solvro.pl/api/v1/cocktails/glasses",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch cocktail glasses.");
  }

  return res.json();
}

async function getCategories(): Promise<{ data: string[] }> {
  const res = await fetch(
    "https://cocktails.solvro.pl/api/v1/cocktails/categories",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch cocktail categories.");
  }

  return res.json();
}

export default async function Loader() {
  const glasses = await getGlasses();
  const categories = await getCategories();
  return <Filters glasses={glasses.data} categories={categories.data} />;
}
