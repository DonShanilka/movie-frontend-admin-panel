"use client";

import { useState } from "react";

export default function UploadMovieForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    releaseYear: "",
    language: "",
    duration: "",
    rating: "",
    ageRating: "",
    country: "",
    movieURL: "",
  });

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [banner, setBanner] = useState<File | null>(null);
  const [trailer, setTrailer] = useState<File | null>(null);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([k, v]) => data.append(k, v));

    if (thumbnail) data.append("thumbnail", thumbnail);
    if (banner) data.append("banner", banner);
    if (trailer) data.append("trailer", trailer);

    const res = await fetch("http://localhost:8080/api/movies", {
      method: "POST",
      body: data,
    });

    res.ok ? alert("Movie saved!") : alert("Failed to save");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 text-white p-4 rounded-xl space-y-4 max-w-4xl"
    >
      <h2 className="text-lg font-bold">Add New Movie</h2>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Title" name="title" value={formData.title} onChange={handleChange} />
        <Input label="Release Year" name="releaseYear" type="number" value={formData.releaseYear} onChange={handleChange} />
        <Input label="Language" name="language" value={formData.language} onChange={handleChange} />

        <Input label="Duration (min)" name="duration" type="number" value={formData.duration} onChange={handleChange} />
        <Input label="Rating" name="rating" value={formData.rating} onChange={handleChange} />

        <div>
          <label className="text-xs text-gray-400">Age Rating</label>
          <select
            name="ageRating"
            value={formData.ageRating}
            onChange={handleChange}
            className="w-full mt-1 px-2 py-1.5 rounded bg-gray-800 outline-none text-sm"
          >
            <option value="">Select</option>
            <option value="PG">PG</option>
            <option value="PG-13">PG-13</option>
            <option value="16+">16+</option>
            <option value="18+">18+</option>
          </select>
        </div>

        <Input label="Country" name="country" value={formData.country} onChange={handleChange} />
        <Input label="Movie URL" name="movieURL" value={formData.movieURL} onChange={handleChange} />
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
        <FileInput label="Thumbnail" onChange={(e:any) => setThumbnail(e.target.files?.[0] || null)} />
        <FileInput label="Banner" onChange={(e:any) => setBanner(e.target.files?.[0] || null)} />
        <div className="md:col-span-2">
          <FileInput label="Trailer (video)" onChange={(e:any) => setTrailer(e.target.files?.[0] || null)} />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="bg-yellow-300 hover:bg-yellow-400 py-2 rounded-lg font-semibold text-black w-full text-sm"
      >
        Save Movie
      </button>
    </form>
  );
}

/* ---------- Reusable Inputs ---------- */

function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="text-xs text-gray-400">{label}</label>
      <input
        {...props}
        className="w-full mt-1 px-2 py-1.5 rounded bg-gray-800 outline-none text-sm"
      />
    </div>
  );
}

function FileInput({ label, onChange }: any) {
  return (
    <div>
      <label className="text-xs text-gray-400">{label}</label>
      <input
        type="file"
        onChange={onChange}
        className="w-full mt-1 text-sm"
      />
    </div>
  );
}
