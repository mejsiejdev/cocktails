import Image from "next/image";

async function getCocktail(id: string) {
  const res = await fetch(`https://cocktails.solvro.pl/api/v1/cocktails/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch Cocktail data.");
  }

  return res.json();
}

export default async function CocktailPage({
  params,
}: {
  params: { id: string };
}) {
  const { data } = await getCocktail(params.id);
  console.log(data);
  return (
    <div className="p-4 flex flex-col items-center">
      <div className="flex flex-col gap-4">
        <Image
          src={data.imageUrl}
          alt={data.name}
          width={400}
          height={400}
          className="rounded-md"
        />
        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-4 text-3xl font-semibold justify-between">
            <p>{data.name}</p>
            <p className="text-green-500 dark:text-green-300">
              {!data.alcoholic && "0%"}
            </p>
          </div>
          <p>{data.category}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="flex flex-row gap-4 text-xl font-semibold">
            Ingredients
          </p>
          <ul className="list-disc list-inside">
            {data.ingredients.map((ingredient, key) => (
              <li key={key}>
                {ingredient.name} - {ingredient.measure}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-4 text-xl font-semibold">
            <p>Instructions</p>
          </div>
          <p>{data.instructions}</p>
        </div>
      </div>
    </div>
  );
}
