"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { updateMovie, resetMovieState } from "../../redux/slices/movieSlice";
import Input from "../UI/Input";
import Select from "../UI/Select";
import LanguageSelect from "../UI/LanguageSelect";
import CountrySelect from "../UI/CountrySelect";
import FileInput from "../UI/FileInput";
import SaveButton from "../UI/SaveButton";
import { Movie } from "../../models/Movie";

interface Props {
  movie: Movie;
  onClose: () => void;
}

export default function UpdateMovieForm({ movie, onClose }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, success } = useSelector(
    (state: RootState) => state.movies
  );

  const [formData, setFormData] = useState({
    title: movie.Title,
    description: movie.Description,
    release_year: movie.ReleaseYear.toString(),
    language: movie.Language,
    duration: movie.Duration.toString(),
    rating: movie.Rating,
    age_rating: movie.AgeRating,
    country: movie.Country,
  });

  const [movieFile, setMovieFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [banner, setBanner] = useState<File | null>(null);
  const [trailer, setTrailer] = useState<File | null>(null);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const data = new FormData();
    data.append("id", movie.id.toString());
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (movieFile) data.append("movie", movieFile);
    if (thumbnail) data.append("thumbnail", thumbnail);
    if (banner) data.append("banner", banner);
    if (trailer) data.append("trailer", trailer);

    console.log("Submitting update data:", data);

    dispatch(updateMovie(data));
  };

  useEffect(() => {
    if (success) {
      alert("Movie updated successfully!");
      dispatch(resetMovieState());
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
      className="bg-gray-900 text-white p-4 rounded-xl space-y-4 max-w-4xl"
    >
      <h2 className="text-2xl font-bold text-white">Update Movie</h2>

      {/* Text Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <Input
          label="Release Year"
          name="release_year"
          type="number"
          value={formData.release_year}
          onChange={handleChange}
        />
        <LanguageSelect
          label="Language"
          value={formData.language}
          onChange={(value) => setFormData({ ...formData, language: value })}
        />
        <Input
          label="Duration (min)"
          name="duration"
          type="number"
          value={formData.duration}
          onChange={handleChange}
        />
        <Input
          label="Rating"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        />
        <Select
          label="Age Rating"
          name="age_rating"
          value={formData.age_rating}
          onChange={handleChange}
          options={[
            { label: "PG", value: "PG" },
            { label: "PG-13", value: "PG-13" },
            { label: "16+", value: "16+" },
            { label: "18+", value: "18+" },
          ]}
        />
        <CountrySelect
          label="Country"
          value={formData.country}
          onChange={(value) => setFormData({ ...formData, country: value })}
        />
      </div>

      {/* Description */}
      <div>
        <label className="text-gray-400 text-sm">Description</label>
        <textarea
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 rounded bg-gray-800 text-sm text-white outline-none"
        />
      </div>

      {/* File Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FileInput
          label="Movie File"
          onChange={(e: any) => setMovieFile(e.target.files?.[0] || null)}
        />
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
      </div>

      {/* Submit Button */}
      <SaveButton type="submit" fullWidth disabled={loading}>
        {loading ? "Updating..." : "Update Movie"}
      </SaveButton>
    </form>
  );
}
