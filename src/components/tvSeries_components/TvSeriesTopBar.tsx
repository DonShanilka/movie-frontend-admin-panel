'use client';

import { Search, Filter, Upload } from "lucide-react";
import Modal from "../UI/Modal";
import TvSeriesForm from "./TvSeriesForm";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSearchTerm } from "@/redux/slices/tvSeriesSlice";

export default function TvSeriesTopbar() {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.tvSeries.searchTerm);

  const [open, setOpen] = useState(false);

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2 bg-gray-950 p-1 rounded-lg shadow-md border border-gray-950">

      <div className="w-full md:w-1/2 flex items-center bg-gray-800 px-1 py-2 gap-1 rounded-4xl  border-gray-800 ml-auto">
        <Search className="text-gray-600 w-5 h-5 " />
        <input
          type="text"
          placeholder="Search series..."
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          className="w-full bg-transparent outline-none text-gray-200 ml-2"
        />
      </div>

      {/* Filter Button */}
      <div className="flex gap-3 items-center">
        {/* Filter Dropdown */}
        <select className="bg-gray-800 text-gray-200 px-1 py-2 rounded-4xl border border-gray-700 outline-none cursor-pointer">
          <option value="all">All Genres</option>
          <option value="action">Action</option>
          <option value="drama">Drama</option>
          <option value="comedy">Comedy</option>
          <option value="horror">Horror</option>
        </select>

        {/* Upload Movie Button */}
        <div className="pl-[280px] p-6">

          {/* Upload Button */}
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 bg-yellow-300 hover:bg-yellow-400 text-black px-2 py-2 rounded-4xl shadow-md transition"
          >
            <Upload className="w-4 h-4 ml-1" />
            <span className="text-sm font-medium pr-2">Upload</span>
          </button>

          {/* Popup Modal */}
          <Modal open={open} onClose={() => setOpen(false)}>
            <TvSeriesForm onClose={() => setOpen(false)} />
          </Modal>

        </div>
      </div>
    </div>
  );
}
