"use client";

import { Search, Filter, Upload } from "lucide-react";

export default function MovieTopbar() {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2 bg-gray-950 p-1 rounded-lg shadow-md border border-gray-950">

      {/* Search Bar */}
      <div className="w-full md:w-1/2 flex items-center bg-gray-800 px-1 py-1 gap-1 rounded-2xl  border-gray-800 ml-auto">
        <Search className="text-gray-600 w-5 h-5 " />
        <input
          type="text"
          placeholder="Search movies..."
          className="w-full bg-transparent outline-none text-gray-500 ml-2"
        />
      </div>

      {/* Filter Button */}
      <div className="flex gap-3 items-center">
        {/* Filter Dropdown */}
        <select className="bg-gray-800 text-gray-200 px-1 py-1 rounded-lg border border-gray-700 outline-none cursor-pointer">
          <option value="all">All Genres</option>
          <option value="action">Action</option>
          <option value="drama">Drama</option>
          <option value="comedy">Comedy</option>
          <option value="horror">Horror</option>
        </select>

        {/* Upload Movie Button */}
        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1 rounded-lg shadow-md transition">
          <Upload className="w-4 h-4" />
          Upload Movie
        </button>
      </div>
    </div>
  );
}
