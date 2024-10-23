"use client";

import { setAsFavorite } from "./actions";

export default function FavoriteButton({ cocktailId }: { cocktailId: string }) {
  return (
    <button
      onClick={() => setAsFavorite(cocktailId)}
      className="text-3xl font-icons"
    >
      favorite
    </button>
  );
}
