"use client";

import { useState } from "react";

const LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Russian",
  "Chinese (Mandarin)",
  "Japanese",
  "Korean",
  "Hindi",
  "Tamil",
  "Sinhala",
  "Bengali",
  "Arabic",
  "Urdu",
  "Persian",
  "Turkish",
  "Thai",
  "Vietnamese",
  "Indonesian",
  "Malay",
  "Filipino",
  "Dutch",
  "Polish",
  "Czech",
  "Romanian",
  "Hungarian",
  "Greek",
  "Hebrew",
  "Swedish",
  "Norwegian",
  "Danish",
  "Finnish",
  "Ukrainian",
  "Bulgarian",
  "Serbian",
  "Croatian",
  "Slovak",
  "Slovenian",
  "Estonian",
  "Latvian",
  "Lithuanian",
  "Icelandic",
  "Afrikaans",
  "Swahili",
  "Zulu",
  "Xhosa",
];

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export default function LanguageSelect({ label, value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = LANGUAGES.filter((lang) =>
    lang.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      <label className="text-xs text-gray-400">{label}</label>

      {/* Input */}
      <input
        type="text"
        value={value}
        placeholder="Select language"
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

          {filtered.map((language) => (
            <div
              key={language}
              onClick={() => {
                onChange(language);
                setSearch("");
                setOpen(false);
              }}
              className="px-3 py-2 text-sm cursor-pointer hover:bg-yellow-500 hover:text-balck"
            >
              {language}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
