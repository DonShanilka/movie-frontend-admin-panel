"use client";

import { useState } from "react";

const GENRES = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film Noir",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Short",
  "Sport",
  "Superhero",
  "Thriller",
  "War",
  "Western",
];

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export default function GenreSelect({ label, value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = GENRES.filter((genre) =>
    genre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      <label className="text-xs text-gray-400">{label}</label>

      {/* Input */}
      <input
        type="text"
        value={value}
        placeholder="Select genre"
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setSearch(e.target.value);
          onChange(e.target.value);
        }}
        className="w-full mt-1 px-2 py-1.5 rounded bg-gray-800 outline-none text-sm text-white"
      />

      {/* Dropdown */}
      {open && (
        <div className="absolute z-20 mt-1 w-full max-h-48 overflow-y-auto bg-gray-900 border border-gray-700 rounded shadow-lg">
          {filtered.length === 0 && (
            <div className="px-3 py-2 text-xs text-gray-400">
              No results found
            </div>
          )}

          {filtered.map((genre, index) => (
            <div
              key={`${genre}-${index}`}
              onClick={() => {
                onChange(genre);
                setSearch("");
                setOpen(false);
              }}
              className="px-3 py-2 text-sm cursor-pointer hover:bg-yellow-500 hover:text-white"
            >
              {genre}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
