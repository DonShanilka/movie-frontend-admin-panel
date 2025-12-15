"use client";

import { useEffect } from "react";
import { getAllMovies } from "@/redux/slices/movieSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function MovieList() {
  const dispatch = useAppDispatch();
  const { movies, loading, error } = useAppSelector(
    (state) => state.movies
  );

  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-400 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-black rounded-2xl shadow-sm border border-gray-800 overflow-hidden">
      {/* Table Header with Yellow Accent */}
      <div className="bg-black border-b border-gray-800 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-200">Movie Collection</h2>
        <p className="text-sm text-gray-400 mt-1">Total: {movies.length} movies</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto overflow-x-auto max-h-[70vh] overflow-y-auto">
        <table className="w-full">
          <thead className="">
            <tr className="bg-black border-b border-gray-800">
              <th className="px-6 py-4 text-left">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-4 bg-yellow-400 rounded-full"></div>
                  <span className="text-xs font-bold text-gray-200 uppercase tracking-wider">
                    Poster
                  </span>
                </div>
              </th>
              <th className="px-6 py-4 text-left">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-4 bg-yellow-400 rounded-full"></div>
                  <span className="text-xs font-semibold text-gray-200 uppercase tracking-wider">
                    Title
                  </span>
                </div>
              </th>
              <th className="px-6 py-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-1 h-4 bg-yellow-400 rounded-full"></div>
                  <span className="text-xs font-semibold text-gray-200 uppercase tracking-wider">
                    Year
                  </span>
                </div>
              </th>
              <th className="px-6 py-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-1 h-4 bg-yellow-400 rounded-full"></div>
                  <span className="text-xs font-semibold text-gray-200 uppercase tracking-wider">
                    Language
                  </span>
                </div>
              </th>
              <th className="px-6 py-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-1 h-4 bg-yellow-400 rounded-full"></div>
                  <span className="text-xs font-semibold text-gray-200 uppercase tracking-wider">
                    Rating
                  </span>
                </div>
              </th>
              <th className="px-6 py-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-1 h-4 bg-yellow-400 rounded-full"></div>
                  <span className="text-xs font-semibold text-gray-200 uppercase tracking-wider">
                    Actions
                  </span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-900">
            {movies.map((movie: any, index: number) => (
              <tr
                key={movie.ID}
                className="hover:bg-gray-900 transition-all duration-200 group"
              >
                {/* Poster */}
                <td className="px-6 py-2">
                  <div className="relative">
                    <img
                      src={`data:image/jpeg;base64,${movie.Thumbnail}`}
                      alt={movie.Title}
                      className="w-10 h-10 object-cover rounded-4xl shadow-md group-hover:shadow-lg transition-shadow border-2 border-gray-500"
                    />
                    {/* <div className="absolute -top-2 -left-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-gray-800">
                      {index + 1}
                    </div> */}
                  </div>
                </td>

                {/* Title */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {/* <div className="w-1 h-8 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div> */}
                    <span className="font-sans text-gray-200 group-hover:text-yellow-300 transition-colors">
                      {movie.Title}
                    </span>
                  </div>
                </td>

                {/* Year */}
                <td className="px-6 py-4 text-center">
                  <span className="font-sans text-gray-200 group-hover:text-yellow-300 transition-colors">
                    {movie.ReleaseYear}
                  </span>
                </td>

                {/* Language */}
                <td className="px-6 py-4 text-center">
                  <span className="font-sans text-gray-200 group-hover:text-yellow-300 transition-colors">
                    {movie.Language || "—"}
                  </span>
                </td>

                {/* Rating */}
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="font-sans text-gray-200 group-hover:text-yellow-300 transition-colors">{movie.Rating}</span>
                    <span className="text-gray-400 text-sm">/10</span>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95">
                      Edit
                    </button>
                    <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {movies.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-3xl">🎬</span>
                    </div>
                    <p className="text-gray-500 font-medium">No movies found</p>
                    <p className="text-gray-400 text-sm">Start by adding your first movie</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}