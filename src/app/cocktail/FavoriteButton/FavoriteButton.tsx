import Button from "@/app/cocktail/FavoriteButton/Button";
import {cookies} from "next/headers";

export default async function FavoriteButton({ cocktailId }: { cocktailId: string }) {
  // Check if the cocktail is marked as favorite
  const cookieStore = await cookies()
  const favorites = cookieStore.get("favorites")?.value
  let isFavorite = false;
  if (!favorites || !favorites.length) {}
  return (
    <Button/>
  );
}
