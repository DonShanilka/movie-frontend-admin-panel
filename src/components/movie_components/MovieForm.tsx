"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { createMovie, updateMovie, resetMovieState } from "../../redux/slices/movieSlice";
import Input from "../UI/Input";
import Select from "../UI/Select";
import LanguageSelect from "../UI/LanguageSelect";
import CountrySelect from "../UI/CountrySelect";
import FileInput from "../UI/FileInput";
import SaveButton from "../UI/SaveButton";
import { Movie } from "../../models/Movie";

interface Props {
  movie?: Movie; // Optional: if provided, we update
  onClose?: () => void; // Optional: for update modal
}

export default function MovieForm({ movie, onClose }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, success } = useSelector((state: RootState) => state.movies);

  // Initialize formData either with movie data (update) or empty (create)
  const initialFormData = {
    title: movie?.Title || "",
    description: movie?.Description || "",
    release_year: movie?.ReleaseYear?.toString() || "",
    language: movie?.Language || "",
    duration: movie?.Duration?.toString() || "",
    rating: movie?.Rating || "",
    age_rating: movie?.AgeRating || "",
    country: movie?.Country || "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [movieFile, setMovieFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [banner, setBanner] = useState<File | null>(null);
  const [trailer, setTrailer] = useState<File | null>(null);

  useEffect(() => {
    // Reset form when movie prop changes
    setFormData({
      title: movie?.Title || "",
      description: movie?.Description || "",
      release_year: movie?.ReleaseYear?.toString() || "",
      language: movie?.Language || "",
      duration: movie?.Duration?.toString() || "",
      rating: movie?.Rating || "",
      age_rating: movie?.AgeRating || "",
      country: movie?.Country || "",
    });
    setMovieFile(null);
    setThumbnail(null);
    setBanner(null);
    setTrailer(null);
  }, [movie]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Build FormData for files and text
    const data = new FormData();
    if (movie?.id) data.append("id", movie.id.toString()); // Only append id if updating
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (movieFile) data.append("movie", movieFile);
    if (thumbnail) data.append("thumbnail", thumbnail);
    if (banner) data.append("banner", banner);
    if (trailer) data.append("trailer", trailer);

    console.log("Submitting movie data:", data);

    if (movie?.id) {
      dispatch(updateMovie(data)); // Update existing movie
    } else {
      dispatch(createMovie(data)); // Create new movie
    }
  };

  useEffect(() => {
    if (success) {
      alert(movie?.id ? "Movie updated!" : "Movie added!");
      dispatch(resetMovieState());
      setFormData(initialFormData);
      setMovieFile(null);
      setThumbnail(null);
      setBanner(null);
      setTrailer(null);
      if (onClose) onClose(); // Close modal if updating
    }
    if (error) {
      alert(error);
      dispatch(resetMovieState());
    }
  }, [success, error, dispatch, onClose]);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 text-white p-6 rounded-xl max-w-4xl mx-auto space-y-6"
    >
      <h2 className="text-2xl font-bold">{movie?.id ? "Update Movie" : "Add New Movie"}</h2>

      {/* Text Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Title" name="title" value={formData.title} onChange={handleChange} />
        <Input label="Release Year" name="release_year" type="number" value={formData.release_year} onChange={handleChange} />
        <LanguageSelect label="Language" value={formData.language} onChange={(value) => setFormData({ ...formData, language: value })} />
        <Input label="Duration (min)" name="duration" type="number" value={formData.duration} onChange={handleChange} />
        <Input label="Rating" name="rating" value={formData.rating} onChange={handleChange} />
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
        <CountrySelect label="Country" value={formData.country} onChange={(value) => setFormData({ ...formData, country: value })} />
        <FileInput label="Movie File" onChange={(e: any) => setMovieFile(e.target.files?.[0] || null)} />
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

      {/* Media Files */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FileInput label="Thumbnail" onChange={(e: any) => setThumbnail(e.target.files?.[0] || null)} />
        <FileInput label="Banner" onChange={(e: any) => setBanner(e.target.files?.[0] || null)} />
        <FileInput label="Trailer" onChange={(e: any) => setTrailer(e.target.files?.[0] || null)} />
      </div>

      {/* Submit */}
      <SaveButton type="submit" fullWidth disabled={loading}>
        {loading ? (movie?.id ? "Updating..." : "Saving...") : movie?.id ? "Update Movie" : "Save Movie"}
      </SaveButton>
    </form>
  );
}
