"use server";

import { cookies } from "next/headers";

export async function setAsFavorite(id: string) {
  const cookieStore = await cookies();

  if (typeof cookieStore.get("favorites") === "undefined") {
    cookieStore.set("favorites", "[]");
  } else {
    // Get current favorites value
    const currentValue = JSON.parse(cookieStore.get("favorites")!.value);
    // Check if the cocktail's id is already there
    const index = currentValue.indexOf(`${id}`);
    // If it's there, remove it
    if (index > -1) {
      currentValue.splice(index, 1);
      cookieStore.set("favorites", JSON.stringify(currentValue));
    } else {
      // If it is not there, add it.
      cookieStore.set("favorites", JSON.stringify([...currentValue, `${id}`]));
    }
  }
  console.log(cookieStore.get("favorites")?.value);
}
