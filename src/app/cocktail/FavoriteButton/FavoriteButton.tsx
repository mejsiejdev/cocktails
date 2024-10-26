import Button from "@/app/cocktail/FavoriteButton/Button";
import {cookies} from "next/headers";

export default async function FavoriteButton({ cocktailId }: { cocktailId: string }) {
  // Check if the cocktail is marked as favorite
  const cookieStore = await cookies()
  const favorites = cookieStore.get("favorites")?.value
  let isFavorite = false;
  if (typeof favorites !== "undefined" && favorites.includes(cocktailId)) {
    isFavorite = true;
  }
  return (
    <Button cocktailId={cocktailId} isFavorite={isFavorite} />
  );
}
