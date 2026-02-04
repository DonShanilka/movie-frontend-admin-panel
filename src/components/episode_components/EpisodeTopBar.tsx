"use client";

import { Search, Upload } from "lucide-react";
import Modal from "../UI/Modal";
import { useState } from "react";
import EpisodeForm from "./EpisodeForm";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSearchTerm } from "@/redux/slices/episodeSlice";

export default function EpisodeTopbar() {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.episode.searchTerm);

  const [open, setOpen] = useState(false);

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 bg-zinc-950/50 backdrop-blur-xl p-3 rounded-2xl border border-zinc-800/50 shadow-xl">

      {/* Search Bar - Moved to Left */}
      <div className="w-full md:w-80 flex items-center bg-zinc-900/50 border border-zinc-800 px-4 py-2.5 gap-3 rounded-xl transition-all duration-300 focus-within:border-yellow-400/50 focus-within:ring-4 focus-within:ring-yellow-400/10">
        <Search className="text-zinc-500 w-4 h-4" />
        <input
          type="text"
          placeholder="Search episodes..."
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          className="w-full bg-transparent outline-none text-zinc-200 text-sm placeholder:text-zinc-600"
        />
      </div>

      {/* Actions & Filters */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        {/* Filter Dropdown */}
        <select className="bg-zinc-900 text-zinc-300 text-sm px-4 py-2.5 rounded-xl border border-zinc-800 outline-none cursor-pointer hover:border-zinc-700 transition-colors">
          <option value="all">All Genres</option>
          <option value="action">Action</option>
          <option value="drama">Drama</option>
          <option value="comedy">Comedy</option>
          <option value="horror">Horror</option>
        </select>

        {/* Upload Button */}
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg shadow-yellow-400/10 transition-all active:scale-95"
        >
          <Upload className="w-4 h-4" />
          <span>Upload</span>
        </button>

        {/* Popup Modal */}
        <Modal open={open} onClose={() => setOpen(false)}>
          <EpisodeForm onClose={() => setOpen(false)} />
        </Modal>
      </div>
    </div>
  );
}
