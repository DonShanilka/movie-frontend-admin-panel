"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { getAllMovies, deleteMovie } from "@/redux/slices/movieSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Modal from "../UI/Modal";
import MovieForm from "./MovieForm";

export default function MovieList() {
  const dispatch = useAppDispatch();
  const { movies, loading, error } = useAppSelector((state) => state.movies);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);

  const openUpdateModal = (movie: any) => {
    setSelectedMovie(movie);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setIsOpen(false);
  };

  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-100 font-primary">
            Movie Collection
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Browse and manage {movies.length} movies on the platform
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {movies.map((movie, index) => (
          <div
            key={index}
            className="group relative bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1"
          >
            {/* Poster / Banner Container */}
            <div className="relative aspect-[2/3] overflow-hidden">
              <img
                src={
                  movie.Banner
                    ? `data:image/jpeg;base64,${movie.Banner}`
                    : "/placeholder.png"
                }
                alt={movie.Title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Top actions - visible on hover */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                <button
                  onClick={() => openUpdateModal(movie)}
                  className="p-2 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full text-blue-400 border border-white/10 transition-colors"
                  title="Edit Movie"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete "${movie.Title}"?`)) {
                      dispatch(deleteMovie(movie.Id || movie.id));
                    }
                  }}
                  className="p-2 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full text-rose-400 border border-white/10 transition-colors"
                  title="Delete Movie"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Rating badge */}
              <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg text-amber-400 text-[10px] font-bold border border-white/10 flex items-center gap-1">
                ⭐ {movie.Rating}
              </div>

              {/* Genre badge at bottom of image */}
              <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                {movie.Genre && movie.Genre.split(',').map((g: string, i: number) => (
                  <span key={i} className="px-2 py-0.5 bg-indigo-600/80 backdrop-blur-md rounded text-[9px] font-medium text-white border border-indigo-400/30">
                    {g.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Content Info */}
            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-bold text-gray-100 truncate flex-1" title={movie.Title}>
                  {movie.Title}
                </h3>
                <span className="text-[10px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-700">
                  {movie.ReleaseYear}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-y-2 text-[10px] text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <span className="text-zinc-500 uppercase font-semibold">Time:</span>
                  <span>{movie.Duration} min</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-zinc-500 uppercase font-semibold">Age:</span>
                  <span>{movie.AgeRating}+</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-zinc-500 uppercase font-semibold">Lang:</span>
                  <span className="truncate">{movie.Language || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-zinc-500 uppercase font-semibold">Origin:</span>
                  <span className="truncate">{movie.Country}</span>
                </div>
              </div>

              <p className="text-[11px] text-zinc-500 line-clamp-2 leading-relaxed h-8 border-t border-zinc-800 pt-2">
                {movie.Description}
              </p>
            </div>
          </div>
        ))}

        {movies.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-zinc-500 border-2 border-dashed border-zinc-800 rounded-3xl">
            <span className="text-4xl mb-4 text-zinc-700">🎬</span>
            <p className="font-medium">No movies found in your collection</p>
            <p className="text-sm opacity-60 mt-1">Start by adding your favorite titles</p>
          </div>
        )}
      </div>

      <Modal open={isOpen} onClose={closeModal}>
        <MovieForm
          movie={selectedMovie}
          onClose={() => {
            closeModal();
            dispatch(getAllMovies());
          }}
        />
      </Modal>
    </div>
  );
}
