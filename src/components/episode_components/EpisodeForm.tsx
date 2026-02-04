"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import {
  createEpisode,
  updateEpisode,
  resetEpisodeState,
} from "@/redux/slices/episodeSlice";

import Input from "../UI/Input";
import FileInput from "../UI/FileInput";
import SaveButton from "../UI/SaveButton";

export default function EpisodeForm({
  episode,
  onClose,
}: {
  episode?: any;
  onClose: () => void;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, success, error } = useSelector(
    (state: RootState) => state.episode
  );

  const isEdit = Boolean(episode?.id);

  // use snake_case keys (match backend)
  const [formData, setFormData] = useState({
    id: 0,
    series_id: 0,
    season_number: 0,
    episode_number: 0,
    title: "",
    description: "",
    duration: 0,
    release_date: "",
  });

  const [episodeFile, setEpisodeFile] = useState<File | null>(null);

  // Populate data on edit
  useEffect(() => {
    if (episode) {
      setFormData({
        id: episode.id ?? 0,
        series_id: episode.series_id ?? episode.seriesID ?? 0,
        season_number: episode.season_number ?? episode.seasonNumber ?? 0,
        episode_number: episode.episode_number ?? episode.episodeNumber ?? 0,
        title: episode.title ?? "",
        description: episode.description ?? "",
        duration: episode.duration ?? 0,
        release_date: episode.release_date ?? episode.releaseDate ?? "",
      });
    }
  }, [episode]);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const data = new FormData();

    // append fields EXACTLY as backend expects
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, String(value));
    });

    if (episodeFile) {
      data.append("episode", episodeFile);
    }

    console.log("Submitting Episode FormData:");
    for (const pair of data.entries()) {
      console.log(pair[0], pair[1]);
    }

    isEdit ? dispatch(updateEpisode(data)) : dispatch(createEpisode(data));
  };

  // close modal & refresh
  useEffect(() => {
    if (success) {
      dispatch(resetEpisodeState());
      onClose();
    }
    if (error) {
      alert(error);
      dispatch(resetEpisodeState());
    }
  }, [success, error, dispatch, onClose]);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-6 rounded-xl space-y-6"
    >
      <h2 className="text-2xl font-bold text-white">
        {isEdit ? "Update Episode" : "Add New Episode"}
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <Input
          label="Series ID"
          name="series_id"
          type="number"
          value={formData.series_id}
          onChange={handleChange}
        />

        <Input
          label="Season Number"
          name="season_number"
          type="number"
          value={formData.season_number}
          onChange={handleChange}
        />

        <Input
          label="Episode Number"
          name="episode_number"
          type="number"
          value={formData.episode_number}
          onChange={handleChange}
        />

        <Input
          label="Duration (minutes)"
          name="duration"
          type="number"
          value={formData.duration}
          onChange={handleChange}
        />

        <Input
          label="Release Date"
          name="release_date"
          type="date"
          value={formData.release_date}
          onChange={handleChange}
        />

        <FileInput
          label="Episode File"
          onChange={(e: any) =>
            setEpisodeFile(e.target.files?.[0] || null)
          }
        />
      </div>

      <textarea
        placeholder="Description"
        name="description"
        rows={3}
        value={formData.description}
        onChange={handleChange}
        className="w-full bg-gray-800 p-2 rounded text-white"
      />

      <SaveButton type="submit" fullWidth>
        {loading
          ? "Processing..."
          : isEdit
          ? "Update Episode"
          : "Save Episode"}
      </SaveButton>
    </form>
  );
}
