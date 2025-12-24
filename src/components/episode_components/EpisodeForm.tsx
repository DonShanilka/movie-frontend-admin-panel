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
import Select from "../UI/Select";
import LanguageSelect from "../UI/LanguageSelect";
import CountrySelect from "../UI/CountrySelect";
import FileInput from "../UI/FileInput";
import SaveButton from "../UI/SaveButton";
import GenreSelect from "../UI/GenreSelect";

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

  const [formData, setFormData] = useState({
    id            : 0,
	seriesID      : 0,
	seasonNumber  : 0,
	episodeNumber : 0,
	title         : "",
	description   : "",
	duration      : 0,
	thumbnailURL  : "",
	episode      : "",
	releaseDate   : "",
  });

  //   const [movieFile, setMovieFile] = useState<File | null>(null);
  //   const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [banner, setBanner] = useState<File | null>(null);
  const [trailer, setTrailer] = useState<File | null>(null);

  // Populate data on edit
  useEffect(() => {
    if (episode) {
      setFormData({
        id: episode.id || 0,
        seriesID: episode.seriesID || 0,
        seasonNumber: episode.seasonNumber || 0,
        episodeNumber: episode.episodeNumber || 0,
        title: episode.title || "",
        description: episode.description || "",
        duration: episode.duration || 0,
        thumbnailURL: episode.thumbnailURL || "",
        episode: episode.episode || "",
        releaseDate: episode.releaseDate || "",
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

    if (isEdit) {
      data.append("Id", String(episode.id)); // ✅ FIXED
    }

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, String(value));
    });

    // if (movieFile) data.append("Movie", movieFile);
    // if (thumbnail) data.append("Thumbnail", thumbnail);
    if (banner) data.append("banner", banner);
    if (trailer) data.append("trailer", trailer);

    console.log("Submitting Episode Form Data:", data);

    isEdit ? dispatch(updateEpisode(data)) : dispatch(createEpisode(data));
  };

//   useEffect(() => {
//     if (success) {
//       dispatch(resetEpisodeState());
//       dispatch(getAllEpisodes());
//       onClose();
//     }
//     if (error) {
//       alert(error);
//       dispatch(resetEpisodeState());
//     }
//   }, [success, error, dispatch, onClose]);

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
          label="Release Date"
          name="releaseDate"
          type="date"
          value={formData.releaseDate}
          onChange={handleChange}
        />
        {/* <LanguageSelect
          label="Language"
          value={formData.language}
          onChange={(v) => setFormData({ ...formData, language: v })}
        /> */}
        <Input
          label="Duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
        />
        <Input
          label="Series ID"
          name="seriesID"
          type="number"
          value={formData.seriesID}
          onChange={handleChange}
        />
        <Input
          label="Season Number"
          name="seasonNumber"
          type="number"
          value={formData.seasonNumber}
          onChange={handleChange}
        />
        {/* <CountrySelect
          label="Country"
          value={formData.country}
          onChange={(v) => setFormData({ ...formData, country: v })}
        /> */}
        {/* <GenreSelect
          label="Genre"
          value={formData.genre}
          onChange={(v) => setFormData({ ...formData, genre: v })}
        /> */}
      </div>

      <textarea
        name="description"
        rows={3}
        value={formData.description}
        onChange={handleChange}
        className="w-full bg-gray-800 p-2 rounded text-white"
      />

      <div className="grid md:grid-cols-2 gap-4">
        {/* <FileInput
          label="Thumbnail"
          onChange={(e: any) => setBanner(e.target.files?.[0] || null)}
        /> */}
        <FileInput
          label="Banner"
          onChange={(e: any) => setBanner(e.target.files?.[0] || null)}
        />
        <FileInput
          label="Trailer"
          onChange={(e: any) => setTrailer(e.target.files?.[0] || null)}
        />
        {/* <FileInput
          label="Movie File"
          onChange={(e: any) => setMovieFile(e.target.files?.[0] || null)}
        /> */}
      </div>

      <SaveButton type="submit" fullWidth>
        {loading
          ? "Processing..."
          : isEdit
          ? "Update TvSeries"
          : "Save TvSeries"}
      </SaveButton>
    </form>
  );
}
