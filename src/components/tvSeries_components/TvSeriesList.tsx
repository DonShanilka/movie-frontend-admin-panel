"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { getAllTvSeries, deleteTvSeries } from "@/redux/slices/tvSeriesSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Modal from "../UI/Modal";
import TvSeriesForm from "./TvSeriesForm";

export default function TvSeriesList() {
  const dispatch = useAppDispatch();
  const { tvSeries, loading, error } = useAppSelector((state) => state.tvSeries);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTvSeries, setSelectedTvSeries] = useState<any>(null);

  tvSeries.map((tvShow) => console.log(tvShow));

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
    <div className="bg-black rounded-2xl border border-gray-800 overflow-hidden">
      <div className="border-b border-gray-800 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-200">
          TV Series Collection
        </h2>
        <p className="text-sm text-gray-400">Total: {tvSeries.length} series</p>
      </div>

      <div className="overflow-x-auto max-h-[70vh] overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-black z-10">
            <tr className="border-b border-gray-800 text-gray-400 uppercase text-xs">
              <th className="px-3 py-3">Poster</th>
              <th className="px-3 py-3 text-left">Title</th>
              <th className="px-3 py-3">Year</th>
              <th className="px-3 py-3">Language</th>
              <th className="px-3 py-3">Rating</th>
              <th className="px-3 py-3">Age</th>
              <th className="px-3 py-3">Country</th>
              <th className="px-3 py-3">Description</th>
              <th className="px-3 py-3">Banner</th>
              <th className="px-3 py-3">Trailer</th>
              {/* <th className="px-3 py-3">Movie URL</th> */}
              <th className="px-3 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-900">
            {tvSeries.map((tvShow, index) => (
              <tr key={index} className="hover:bg-gray-900 transition">
                <td className="px-3 py-2">
                  <img
                    src={
                      tvShow.Banner
                        ? `data:image/jpeg;base64,${tvShow.Banner}`
                        : "/placeholder.png"
                    }
                    alt={tvShow.Title}
                    className="w-10 h-10 object-cover rounded-4xl border border-gray-700"
                  />
                </td>
                <td className="px-3 py-2 text-gray-200 font-medium">
                  {tvShow.Title}
                </td>
                <td className="px-3 py-2 text-center">{tvShow.ReleaseYear}</td>
                <td className="px-3 py-2 text-center">
                  {tvShow.Language || "—"}
                </td>
                <td className="px-3 py-2 text-center">⭐ {tvShow.Rating}</td>
                <td className="px-3 py-2 text-center">{tvShow.AgeRating}+</td>
                <td className="px-3 py-2 text-center">{tvShow.Country}</td>
                <td className="px-3 py-2 max-w-[200px] truncate text-gray-300">
                  {tvShow.Description}
                </td>
                <td className="px-3 py-2 text-center">
                  {tvShow.Banner ? "✔️" : "—"}
                </td>
                <td className="px-3 py-2 text-center">
                  {tvShow.Trailer ? "✔️" : "—"}
                </td>
                {/* <td className="px-3 py-2 text-center">
                  <a
                    href={tvShow.MovieURL}
                    target="_blank"
                    className="text-blue-400 hover:underline"
                  >
                    Play
                  </a>
                </td> */}
                <td className="px-3 py-2">
                  <div className="flex justify-center gap-3">
                    <button
                      title="Edit"
                      onClick={() => openUpdateModal(tvShow)}
                      className="hover:scale-110 transition"
                    >
                      <Pencil
                        className="text-blue-500 hover:text-blue-700"
                        size={18}
                      />
                    </button>
                    <button
                      title="Delete"
                      onClick={() => {
                        if (
                          confirm(
                            `Are you sure you want to delete "${tvShow.Title}"?`
                          )
                        ) {
                          dispatch(deleteTvSeries(tvShow.ID));
                        }
                      }}
                      className="hover:scale-110 transition"
                    >
                      <Trash2
                        className="text-red-500 hover:text-red-700"
                        size={18}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {tvSeries.length === 0 && (
              <tr>
                <td colSpan={13} className="py-12 text-center text-gray-500">
                  🎬 No TV series found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal open={isOpen} onClose={closeModal}>
        {/* ✅ Pass dispatch to TvSeriesForm */}
        <TvSeriesForm
          series={selectedTvSeries}
          onClose={() => {
            closeModal();
            dispatch(getAllTvSeries()); // refresh list after create/update
          }}
        />
      </Modal>
    </div>
  );
}
