"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { getAllMovies } from "@/redux/slices/movieSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Modal from "../UI/Modal";
import MovieForm from "./MovieForm";

export default function MovieList() {
  const dispatch = useAppDispatch();
  const { movies, loading, error } = useAppSelector((state) => state.movies);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);

  const openUpdateModal = (movie: any) => {
    console.log(movie)
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
    <div className="bg-black rounded-2xl border border-gray-800 overflow-hidden">
      <div className="border-b border-gray-800 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-200">Movie Collection</h2>
        <p className="text-sm text-gray-400">Total: {movies.length} movies</p>
      </div>

      <div className="overflow-x-auto max-h-[70vh] overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-black z-10">
            <tr className="border-b border-gray-800 text-gray-400 uppercase text-xs">
              <th className="px-3 py-3">Poster</th>
              <th className="px-3 py-3 text-left">Title</th>
              <th className="px-3 py-3">Year</th>
              <th className="px-3 py-3">Lang</th>
              <th className="px-3 py-3">Duration</th>
              <th className="px-3 py-3">Rating</th>
              <th className="px-3 py-3">Age</th>
              <th className="px-3 py-3">Country</th>
              <th className="px-3 py-3">Description</th>
              <th className="px-3 py-3">Banner</th>
              <th className="px-3 py-3">Trailer</th>
              <th className="px-3 py-3">Movie URL</th>
              <th className="px-3 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-900">
            {movies.map((movie, index) => (
              <tr key={index} className="hover:bg-gray-900 transition">
                <td className="px-3 py-2">
                  <img src={movie.Banner ? `data:image/jpeg;base64,${movie.Banner}` : "/placeholder.png"} alt={movie.Title} className="w-10 h-10 object-cover rounded-4xl border border-gray-700" />
                </td>
                <td className="px-3 py-2 text-gray-200 font-medium">{movie.Title}</td>
                <td className="px-3 py-2 text-center">{movie.ReleaseYear}</td>
                <td className="px-3 py-2 text-center">{movie.Language || "—"}</td>
                <td className="px-3 py-2 text-center">{movie.Duration} min</td>
                <td className="px-3 py-2 text-center">⭐ {movie.Rating}</td>
                <td className="px-3 py-2 text-center">{movie.AgeRating}+</td>
                <td className="px-3 py-2 text-center">{movie.Country}</td>
                <td className="px-3 py-2 max-w-[200px] truncate text-gray-300">{movie.Description}</td>
                <td className="px-3 py-2 text-center">{movie.Banner ? "✔️" : "—"}</td>
                <td className="px-3 py-2 text-center">{movie.Trailer ? "✔️" : "—"}</td>
                <td className="px-3 py-2 text-center">
                  <a href={movie.MovieURL} target="_blank" className="text-blue-400 hover:underline">Play</a>
                </td>
                <td className="px-3 py-2">
                  <div className="flex justify-center gap-3">
                    <button title="Edit" onClick={() => openUpdateModal(movie)} className="hover:scale-110 transition">
                      <Pencil className="text-blue-500 hover:text-blue-700" size={18} />
                    </button>
                    <button title="Delete" onClick={() => console.log("Delete:", movie.Id || movie.id)} className="hover:scale-110 transition">
                      <Trash2 className="text-red-500 hover:text-red-700" size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {movies.length === 0 && <tr><td colSpan={13} className="py-12 text-center text-gray-500">🎬 No movies found</td></tr>}
          </tbody>
        </table>
      </div>

      <Modal open={isOpen} onClose={closeModal}>
        <MovieForm movie={selectedMovie} onClose={closeModal} />
      </Modal>
    </div>
  );
}
