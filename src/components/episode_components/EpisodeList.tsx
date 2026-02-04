"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { getAllEpisode, deleteEpisode } from "@/redux/slices/episodeSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Modal from "../UI/Modal";
import EpisodeForm from "./EpisodeForm";

export default function EpisodeList() {
  const dispatch = useAppDispatch();
  const { episodes, loading, error, searchTerm } = useAppSelector((state) => state.episode);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState<any>(null);

  const filteredEpisodes = episodes.filter((episode: any) =>
    episode.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openUpdateModal = (episode: any) => {
    setSelectedEpisode(episode);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedEpisode(null);
    setIsOpen(false);
  };

  useEffect(() => {
    dispatch(getAllEpisode());
    console.log("Episode List Mounted");
  }, [dispatch]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;

  return (
    <div className="bg-black rounded-2xl mt-4 border border-gray-800 overflow-hidden">
      <div className="border-b border-gray-800 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-200">
          Episode Collection
        </h2>
        <p className="text-sm text-gray-400">
          Showing {filteredEpisodes.length} of {episodes.length} episodes
        </p>
      </div>

      <div className="overflow-x-auto max-h-[70vh] overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-black z-10">
            <tr className="border-b border-gray-800 text-gray-400 uppercase text-xs">
              <th className="px-3 py-3 text-left">Title</th>
              <th className="px-3 py-3">Season Number</th>
              <th className="px-3 py-3">Episode Number</th>
              <th className="px-3 py-3">Description</th>
              <th className="px-3 py-3">Duration</th>
              <th className="px-3 py-3">Video URL</th>
              <th className="px-3 py-3">Release Date</th>
              <th className="px-3 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-900">
            {filteredEpisodes.map((episode, index) => (
              <tr key={index} className="hover:bg-gray-900 transition">
                <td className="px-3 py-2 text-gray-200 font-medium">
                  {episode.Title}
                </td>
                <td className="px-3 py-2 text-center">{episode.SeasonNumber}</td>
                <td className="px-3 py-2 text-center">
                  {episode.EpisodeNumber || "—"}
                </td>
                <td className="px-3 py-2 text-center">{episode.Description}</td>
                <td className="px-3 py-2 text-center">{episode.Duration} min</td>
                <td className="px-3 py-2 text-center">
                  <a
                    href={episode.episode}
                    target="_blank"
                    className="text-blue-400 hover:underline"
                  >
                    Play
                  </a>
                </td>
                <td className="px-3 py-2 max-w-[200px] truncate text-gray-300">
                  {episode.ReleaseDate.split("T")[0]}
                </td>
                <td className="px-3 py-2">
                  <div className="flex justify-center gap-3">
                    <button
                      title="Edit"
                      onClick={() => openUpdateModal(episode)}
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
                            `Are you sure you want to delete "${episode.Title}"?`
                          )
                        ) {
                          dispatch(deleteEpisode(episode.ID));
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
            {filteredEpisodes.length === 0 && (
              <tr>
                <td colSpan={13} className="py-12 text-center text-gray-500">
                  🎬 No episodes found matching "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal open={isOpen} onClose={closeModal}>
        {/* Pass dispatch to EpisodeForm */}
        <EpisodeForm
          episode={selectedEpisode}
          onClose={() => {
            closeModal();
            dispatch(getAllEpisode()); // refresh list after create/update
          }}
        />
      </Modal>
    </div>
  );
}
