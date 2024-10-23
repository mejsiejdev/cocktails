"use client"

import {setAsFavorite} from "@/app/cocktail/actions";

export default function Button() {
    return <button
        onClick={() => setAsFavorite(cocktailId)}
        className="text-3xl font-icons"
    >
        favorite
    </button>
}