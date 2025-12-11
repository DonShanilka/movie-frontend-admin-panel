"use client";

import { Search, Filter, Upload } from "lucide-react";

export default function MovieTopbar() {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 bg-gray-900 p-4 rounded-lg shadow-md border border-gray-800">

      {/* Search Bar */}
      <div className="w-full md:w-1/2 flex items-center bg-gray-800 px-3 py-2 rounded-lg border border-gray-700">
        <Search className="text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search movies..."
          className="w-full bg-transparent outline-none text-gray-200 ml-2"
        />
      </div>

      {/* Filter Button */}
      <div className="flex gap-3 items-center">

        {/* Filter Dropdown */}
        <select className="bg-gray-800 text-gray-200 px-4 py-2 rounded-lg border border-gray-700 outline-none cursor-pointer">
          <option value="all">All Genres</option>
          <option value="action">Action</option>
          <option value="drama">Drama</option>
          <option value="comedy">Comedy</option>
          <option value="horror">Horror</option>
        </select>

        {/* Upload Movie Button */}
        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg shadow-md transition">
          <Upload className="w-4 h-4" />
          Upload Movie
        </button>
      </div>

    </div>
  );
}
