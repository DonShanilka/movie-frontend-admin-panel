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
    title: "",
    description: "",
    releaseYear: "",
    language: "",
    duration: "",
    rating: "",
    ageRating: "",
    country: "",
    genre: "",
  });

  const [movieFile, setMovieFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [banner, setBanner] = useState<File | null>(null);
  const [trailer, setTrailer] = useState<File | null>(null);

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.Title || "",
        description: movie.Description || "",
        releaseYear: movie.ReleaseYear || "",
        language: movie.Language || "",
        duration: movie.Duration || "",
        rating: movie.Rating || "",
        ageRating: movie.AgeRating || "",
        country: movie.Country || "",
        genre: movie.Genre || "",
      });
    }
  }, [movie]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();

    if (isEdit) {
      data.append("id", String(movie.Id));
    }

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (movieFile) data.append("movie", movieFile);
    if (thumbnail) data.append("thumbnail", thumbnail);
    if (banner) data.append("banner", banner);
    if (trailer) data.append("trailer", trailer);

    // 🔥 DEBUG PRINT
    console.log("==== FORM DATA ====");
    for (const pair of data.entries()) {
      console.log(pair[0], pair[1]);
    }

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
  }, [success, error]);

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-xl space-y-6">
      <h2 className="text-2xl font-bold text-white">
        {isEdit ? "Update Movie" : "Add Movie"}
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <Input label="Title" name="title" value={formData.title} onChange={handleChange} />
        <Input label="Release Year" name="releaseYear" value={formData.releaseYear} onChange={handleChange} />
        <LanguageSelect label="Language" value={formData.language} onChange={(v) => setFormData({ ...formData, language: v })} />
        <Input label="Duration" name="duration" value={formData.duration} onChange={handleChange} />
        <Input label="Rating" name="rating" value={formData.rating} onChange={handleChange} />
        <Select label="Age Rating" name="ageRating" value={formData.ageRating} onChange={handleChange} options={[
          { label: "PG", value: "PG" },
          { label: "18+", value: "18+" },
        ]} />
        <CountrySelect label="Country" value={formData.country} onChange={(v) => setFormData({ ...formData, country: v })} />
        <GenreSelect label="Genre" value={formData.genre} onChange={(v) => setFormData({ ...formData, genre: v })} />
      </div>

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="w-full bg-gray-800 p-2 rounded text-white"
      />

      <div className="grid md:grid-cols-2 gap-4">
        <FileInput label="Thumbnail" onChange={(e:any)=>setThumbnail(e.target.files?.[0])}/>
        <FileInput label="Banner" onChange={(e:any)=>setBanner(e.target.files?.[0])}/>
        <FileInput label="Trailer" onChange={(e:any)=>setTrailer(e.target.files?.[0])}/>
        <FileInput label="Movie File" onChange={(e:any)=>setMovieFile(e.target.files?.[0])}/>
      </div>

      <SaveButton type="submit" fullWidth>
        {loading ? "Saving..." : "Save Movie"}
      </SaveButton>
    </form>
  );
}
