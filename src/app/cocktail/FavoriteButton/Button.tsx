"use client";

import { setAsFavorite } from "@/app/cocktail/actions";
import { useState } from "react";

export default function Button({
  cocktailId,
  isFavorite,
}: {
  cocktailId: string;
  isFavorite: boolean;
}) {
  const [favorite, setFavorite] = useState<boolean>(isFavorite);
  return (
    <button
      onClick={() => {
        setFavorite(!favorite);
        setAsFavorite(cocktailId);
      }}
      className={`text-3xl ${favorite ? "text-pink-500 font-icons-filled" : "font-icons"}`}
    >
      favorite
    </button>
  );
}
