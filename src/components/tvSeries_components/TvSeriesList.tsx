"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { getAllTvSeries, deleteTvSeries } from "@/redux/slices/tvSeriesSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Modal from "../UI/Modal";
import TvSeriesForm from "./TvSeriesForm";

export default function TvSeriesList() {
  const dispatch = useAppDispatch();
  const { tvSeries, loading, error, searchTerm } = useAppSelector((state) => state.tvSeries);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTvSeries, setSelectedTvSeries] = useState<any>(null);

  const filteredTvSeries = tvSeries.filter((series: any) =>
    series.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openUpdateModal = (tvSeries: any) => {
    setSelectedTvSeries(tvSeries);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedTvSeries(null);
    setIsOpen(false);
  };

  useEffect(() => {
    dispatch(getAllTvSeries());
    console.log("TV Series List Mounted");
  }, [dispatch]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl pt-4 font-bold text-gray-100 font-primary">
            TV Series Collection
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Displaying {filteredTvSeries.length} of {tvSeries.length} series
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {filteredTvSeries.map((tvShow, index) => (
          <div
            key={index}
            className="group relative bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1"
          >
            {/* Poster / Banner Container */}
            <div className="relative aspect-[2/3] overflow-hidden">
              <img
                src={
                  tvShow.Banner
                    ? `data:image/jpeg;base64,${tvShow.Banner}`
                    : "/placeholder.png"
                }
                alt={tvShow.Title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Top actions - visible on hover */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                <button
                  onClick={() => openUpdateModal(tvShow)}
                  className="p-2 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full text-blue-400 border border-white/10 transition-colors"
                  title="Edit Series"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete "${tvShow.Title}"?`)) {
                      dispatch(deleteTvSeries(tvShow.ID || tvShow.id));
                    }
                  }}
                  className="p-2 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full text-rose-400 border border-white/10 transition-colors"
                  title="Delete Series"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Rating badge */}
              <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg text-amber-400 text-[10px] font-bold border border-white/10 flex items-center gap-1">
                ⭐ {tvShow.Rating}
              </div>

              {/* Genre badge at bottom of image */}
              <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                {tvShow.Genre && tvShow.Genre.split(',').map((g: string, i: number) => (
                  <span key={i} className="px-2 py-0.5 bg-indigo-600/80 backdrop-blur-md rounded text-[9px] font-medium text-white border border-indigo-400/30">
                    {g.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Content Info */}
            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-bold text-gray-100 truncate flex-1" title={tvShow.Title}>
                  {tvShow.Title}
                </h3>
                <span className="text-[10px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-700">
                  {tvShow.ReleaseYear}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-y-2 text-[10px] text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <span className="text-zinc-500 uppercase font-semibold">Seasons:</span>
                  <span>{tvShow.SeasonCount || 0}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-zinc-500 uppercase font-semibold">Age:</span>
                  <span>{tvShow.AgeRating}+</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-zinc-500 uppercase font-semibold">Lang:</span>
                  <span className="truncate">{tvShow.Language || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-zinc-500 uppercase font-semibold">Origin:</span>
                  <span className="truncate">{tvShow.Country}</span>
                </div>
              </div>

              <p className="text-[11px] text-zinc-500 line-clamp-2 leading-relaxed h-8 border-t border-zinc-800 pt-2">
                {tvShow.Description}
              </p>
            </div>
          </div>
        ))}

        {filteredTvSeries.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-zinc-500 border-2 border-dashed border-zinc-800 rounded-3xl">
            <span className="text-4xl mb-4 text-zinc-700">🎬</span>
            <p className="font-medium">No TV series found matching "{searchTerm}"</p>
            <p className="text-sm opacity-60 mt-1">Try a different search term or add a new series</p>
          </div>
        )}
      </div>

      <Modal open={isOpen} onClose={closeModal}>
        <TvSeriesForm
          series={selectedTvSeries}
          onClose={() => {
            closeModal();
            dispatch(getAllTvSeries());
          }}
        />
      </Modal>
    </div>
  );
}
