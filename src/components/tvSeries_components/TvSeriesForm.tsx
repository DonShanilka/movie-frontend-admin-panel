"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import {
  createTvSeries,
  updateTvSeries,
  resetTvSeriesState,
  getAllTvSeries,
} from "@/redux/slices/tvSeriesSlice";

import Input from "../UI/Input";
import Select from "../UI/Select";
import LanguageSelect from "../UI/LanguageSelect";
import CountrySelect from "../UI/CountrySelect";
import FileInput from "../UI/FileInput";
import SaveButton from "../UI/SaveButton";
import GenreSelect from "../UI/GenreSelect";

export default function TvSeriesForm({
  series,
  onClose,
}: {
  series?: any;
  onClose: () => void;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, success, error } = useSelector(
    (state: RootState) => state.tvSeries
  );

  const isEdit = Boolean(series?.Id);

  const [formData, setFormData] = useState({
    ID: "",
    Title: "",
    Description: "",
    ReleaseYear: 0,
    Language: "",
    SeasonCount: 0,
    Rating: 0,
    AgeRating: "",
    Country: "",
    Genre: "",
    Banner: undefined,
    Trailer: undefined,
  });

  //   const [movieFile, setMovieFile] = useState<File | null>(null);
  //   const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [banner, setBanner] = useState<File | null>(null);
  const [trailer, setTrailer] = useState<File | null>(null);

  // Populate data on edit
  useEffect(() => {
    if (series) {
      setFormData({
        ID: series.ID || "",
        Title: series.Title || "",
        Description: series.Description || "",
        ReleaseYear: series.ReleaseYear || 0,
        Language: series.Language || "",
        SeasonCount: series.SeasonCount || 0,
        Rating: series.Rating || 0,
        AgeRating: series.AgeRating || "",
        Country: series.Country || "",
        Genre: series.Genre || "",
        Banner: series.Banner || undefined,
        Trailer: series.Trailer || undefined,
      });
    }
  }, [series]);

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
      data.append("Id", String(series.Id)); // ✅ FIXED
    }

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, String(value));
    });

    // if (movieFile) data.append("Movie", movieFile);
    // if (thumbnail) data.append("Thumbnail", thumbnail);
    if (banner) data.append("Banner", banner);
    if (trailer) data.append("Trailer", trailer);

    isEdit ? dispatch(updateTvSeries(data)) : dispatch(createTvSeries(data));
  };

  useEffect(() => {
    if (success) {
      dispatch(resetTvSeriesState());
      dispatch(getAllTvSeries());
      onClose();
    }
    if (error) {
      alert(error);
      dispatch(resetTvSeriesState());
    }
  }, [success, error, dispatch, onClose]);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-6 rounded-xl space-y-6"
    >
      <h2 className="text-2xl font-bold text-white">
        {isEdit ? "Update TvSeries" : "Add New TvSeries"}
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="Title"
          name="Title"
          value={formData.Title}
          onChange={handleChange}
        />
        <Input
          label="Release Year"
          name="ReleaseYear"
          type="number"
          value={formData.ReleaseYear}
          onChange={handleChange}
        />
        <LanguageSelect
          label="Language"
          value={formData.Language}
          onChange={(v) => setFormData({ ...formData, Language: v })}
        />
        {/* <Input
          label="Duration"
          name="Duration"
          value={formData.Duration}
          onChange={handleChange}
        /> */}
        <Input
          label="Rating"
          name="Rating"
          type="number"
          value={formData.Rating}
          onChange={handleChange}
        />
        <Select
          label="Age Rating"
          name="AgeRating"
          value={formData.AgeRating}
          onChange={handleChange}
          options={[
            { label: "PG", value: "PG" },
            { label: "18+", value: "18+" },
          ]}
        />
        <CountrySelect
          label="Country"
          value={formData.Country}
          onChange={(v) => setFormData({ ...formData, Country: v })}
        />
        <GenreSelect
          label="Genre"
          value={formData.Genre}
          onChange={(v) => setFormData({ ...formData, Genre: v })}
        />
      </div>

      <textarea
        name="Description"
        rows={3}
        value={formData.Description}
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
