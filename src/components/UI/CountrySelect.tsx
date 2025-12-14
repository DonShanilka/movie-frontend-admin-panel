"use client";

import { useState } from "react";

const COUNTRIES = [
  "United States",
  "Sri Lanka",
  "India",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "China",
  "Brazil",
  "Italy",
  "Spain",
  "Netherlands",
  "Singapore",
  "South Korea",
  "New Zealand",
  "South Africa",
  "Pakistan",
  "Bangladesh",
  "Russia",
  "Mexico",
  "Indonesia",
  "Turkey",
  "Saudi Arabia",
  "United Arab Emirates",
  "Argentina",
  "Colombia",
  "Chile",
  "Peru",
  "Venezuela",
  "Egypt",
  "Nigeria",
  "Kenya",
  "Morocco",
  "Thailand",
  "Vietnam",
  "Philippines",
  "Malaysia",
  "Nepal",
  "Bhutan",
  "Maldives",
  "Afghanistan",
  "Iran",
  "Iraq",
  "Syria",
  "Lebanon",
  "Jordan",
  "Kuwait",
  "Qatar",
  "Oman",
  "Yemen",
  "Cuba",
  "Jamaica",
  "Haiti",
  "Dominican Republic",
  "Guatemala",
  "Honduras",
  "El Salvador",
  "Nicaragua",
  "Costa Rica",
  "Panama",
  "Ecuador",
  "Bolivia",
  "Paraguay",
  "Uruguay",
  "Greece",
  "Portugal",
  "Belgium",
  "Sweden",
  "Norway",
  "Denmark",
  "Finland",
  "Poland",
  "Czech Republic",
  "Hungary",
  "Austria",
  "Switzerland",
  "Ireland",
  "Croatia",
  "Slovenia",
  "Slovakia",
  "Romania",
  "Bulgaria",
  "Serbia",
  "Ukraine",
  "Belarus",
  "Lithuania",
  "Latvia",
  "Estonia",
  "Iceland",
  "Luxembourg",
  "Monaco",
  "Andorra",
  "Liechtenstein",
  "San Marino",
  "Vatican City",
  "Kosovo",
  "Montenegro",
  "North Macedonia",
  "Albania",
  "Moldova",
  "Armenia",
  "Azerbaijan",
  "Georgia",
  "Kazakhstan",
  "Uzbekistan",
  "Turkmenistan",
  "Kyrgyzstan",
  "Tajikistan",
  "Kyrgyzstan",
  "Tajikistan",
  "Turkmenistan",
  "Kyrgyzstan",
  "Tajikistan",
];

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export default function CountrySelect({ label, value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = COUNTRIES.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      <label className="text-xs text-gray-400">{label}</label>

      {/* Input */}
      <input
        type="text"
        value={value}
        placeholder="Select country"
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

          {filtered.map((country) => (
            <div
              key={country}
              onClick={() => {
                onChange(country);
                setSearch("");
                setOpen(false);
              }}
              className="px-3 py-2 text-sm cursor-pointer hover:bg-yellow-500 hover:text-white"
            >
              {country}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
