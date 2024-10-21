"use client";

import { Dispatch, SetStateAction, useState } from "react";

export default function FilterList({
  name,
  icon,
  options,
  onSelect,
}: {
  name: string;
  icon: string;
  options: string[];
  onSelect: Dispatch<SetStateAction<string | undefined>>;
}) {
  const [selected, setSelected] = useState<string>();
  const [showOptions, setShowOptions] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-2 w-48">
      <button
        onClick={() => setShowOptions((showOptions) => !showOptions)}
        className="flex flex-row gap-4 justify-between items-center"
      >
        <div className="flex flex-row gap-2 items-center">
          <span className="font-icons text-2xl">{icon}</span>
          <p className="text-lg">{name}</p>
        </div>
        <span className="font-icons text-2xl">
          {showOptions ? "arrow_drop_up" : "arrow_drop_down"}
        </span>
      </button>
      {showOptions && (
        <div className="grid grid-cols-1 gap-4 overflow-y-auto">
          {options.map((option, key) => (
            <button
              key={key}
              className={`text-sm text-center w-full px-4 py-2 rounded-md ${
                option === selected
                  ? "bg-sky-100 text-sky-500 dark:bg-sky-900 dark:text-sky-300"
                  : "bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600"
              } transition`}
              onClick={() => {
                if (option !== selected) {
                  onSelect(option);
                  setSelected(option);
                } else {
                  onSelect("");
                  setSelected("");
                }
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
