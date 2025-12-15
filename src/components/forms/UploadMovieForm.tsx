"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { uploadMovie, resetMovieState } from "../../redux/slices/movieSlice";
import Input from "../UI/Input";
import Select from "../UI/Select";
import LanguageSelect from "../UI/LanguageSelect";
import CountrySelect from "../UI/CountrySelect";
import FileInput from "../UI/FileInput";
import SaveButton from "../UI/SaveButton";
import { Movie } from "../../models/Movie";
// import DateInput from "../UI/DateInput";


export default function UploadMovieForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [fileKey, setFileKey] = useState(0);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [banner, setBanner] = useState<File | null>(null);
  const [trailer, setTrailer] = useState<File | null>(null);
  const [movieFile, setMovieFile] = useState<File | null>(null);
//   const [releaseYear, setReleaseYear] = useState<Date | null>(null);

  const { loading, error, success } = useSelector(
    (state: RootState) => state.movies
  );

  const initialFormData = {
    title: "",
    description: "",
    release_year: "",
    language: "",
    duration: "",
    rating: "",
    age_rating: "",
    country: "",
    movie: "",
    thumbnail: "",
    banner: "",
    trailer: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const movie = new Movie({
      ...formData,
      movie: movieFile,
      thumbnail: thumbnail,
      banner: banner,
      trailer: trailer,
    });

    dispatch(uploadMovie(movie));
  };

  useEffect(() => {
    if (success) {
      alert("Movie saved!");
      setFormData(initialFormData);
      setMovieFile(null);
      setThumbnail(null);
      setBanner(null);
      setTrailer(null);
    //   setFileKey((prev) => prev + 1);
      dispatch(resetMovieState());
    }

    if (error) {
      alert(error);
      dispatch(resetMovieState());
    }
  }, [success, error, dispatch]);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 text-white p-4 rounded-xl space-y-4 max-w-4xl"
      key={fileKey}
    >
      <h2 className="text-lg font-bold">Add New Movie</h2>

      {/* Basic Info */}
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
        <FileInput
          label="Movie File"
          onChange={(e: any) => setMovieFile(e.target.files?.[0] || null)}
        />
      </div>

      {/* Description */}
      <div>
        <label className="text-xs text-gray-400">Description</label>
        <textarea
          name="description"
          rows={2}
          value={formData.description}
          onChange={handleChange}
          className="w-full mt-1 px-2 py-1.5 rounded bg-gray-800 outline-none text-sm"
        />
      </div>

      {/* Media */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FileInput
          label="Thumbnail"
          onChange={(e: any) => setThumbnail(e.target.files?.[0] || null)}
        />
        <FileInput
          label="Banner"
          onChange={(e: any) => setBanner(e.target.files?.[0] || null)}
        />
        <div className="md:col-span-2">
          <FileInput
            label="Trailer (video)"
            onChange={(e: any) => setTrailer(e.target.files?.[0] || null)}
          />
        </div>
      </div>

      {/* Submit */}
      <SaveButton type="submit" fullWidth disabled={loading}>
        {loading ? "Saving..." : "Save Movie"}
      </SaveButton>
    </form>
  );
}
