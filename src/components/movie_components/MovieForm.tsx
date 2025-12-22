"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import {
  createMovie,
  updateMovie,
  resetMovieState,
  getAllMovies,
} from "@/redux/slices/movieSlice";

import Input from "../UI/Input";
import Select from "../UI/Select";
import LanguageSelect from "../UI/LanguageSelect";
import CountrySelect from "../UI/CountrySelect";
import FileInput from "../UI/FileInput";
import SaveButton from "../UI/SaveButton";
import GenreSelect from "../UI/GenreSelect";

export default function MovieForm({
  movie,
  onClose,
}: {
  movie?: any;
  onClose: () => void;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, success, error } = useSelector(
    (state: RootState) => state.movies
  );

  const isEdit = Boolean(movie?.Id);

  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
    ReleaseYear: "",
    Language: "",
    Duration: "",
    Rating: "",
    AgeRating: "",
    Country: "",
    Genre:"",
  });

  const [movieFile, setMovieFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [banner, setBanner] = useState<File | null>(null);
  const [trailer, setTrailer] = useState<File | null>(null);

  // Populate data on edit
  useEffect(() => {
    if (movie) {
      setFormData({
        Title: movie.Title || "",
        Description: movie.Description || "",
        ReleaseYear: movie.ReleaseYear || "",
        Language: movie.Language || "",
        Duration: movie.Duration || "",
        Rating: movie.Rating || "",
        AgeRating: movie.AgeRating || "",
        Country: movie.Country || "",
        Genre: movie.Genre || "",
      });
    }
  }, [movie]);

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
      data.append("Id", String(movie.Id)); // ✅ FIXED
    }

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (movieFile) data.append("Movie", movieFile);
    if (thumbnail) data.append("Thumbnail", thumbnail);
    if (banner) data.append("Banner", banner);
    if (trailer) data.append("Trailer", trailer);

    isEdit ? dispatch(updateMovie(data)) : dispatch(createMovie(data));
  };

  useEffect(() => {
    if (success) {
      dispatch(resetMovieState());
      dispatch(getAllMovies());
      onClose();
    }
    if (error) {
      alert(error);
      dispatch(resetMovieState());
    }
  }, [success, error, dispatch, onClose]);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-6 rounded-xl space-y-6"
    >
      <h2 className="text-2xl font-bold text-white">
        {isEdit ? "Update Movie" : "Add New Movie"}
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
          value={formData.ReleaseYear}
          onChange={handleChange}
        />
        <LanguageSelect
          label="Language"
          value={formData.Language}
          onChange={(v) => setFormData({ ...formData, Language: v })}
        />
        <Input
          label="Duration"
          name="Duration"
          value={formData.Duration}
          onChange={handleChange}
        />
        <Input
          label="Rating"
          name="Rating"
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
        onChange={(v) => setFormData({...formData, Genre: v})}/>
      </div>

      <textarea
        name="Description"
        rows={3}
        value={formData.Description}
        onChange={handleChange}
        className="w-full bg-gray-800 p-2 rounded text-white"
      />

      <div className="grid md:grid-cols-2 gap-4">
        <FileInput
          label="Thumbnail"
          onChange={(e: any) => setThumbnail(e.target.files?.[0] || null)}
        />
        <FileInput
          label="Banner"
          onChange={(e: any) => setBanner(e.target.files?.[0] || null)}
        />
        <FileInput
          label="Trailer"
          onChange={(e: any) => setTrailer(e.target.files?.[0] || null)}
        />
        <FileInput
          label="Movie File"
          onChange={(e: any) => setMovieFile(e.target.files?.[0] || null)}
        />
      </div>

      <SaveButton type="submit" fullWidth>
        {loading ? "Processing..." : isEdit ? "Update Movie" : "Save Movie"}
      </SaveButton>
    </form>
  );
}
