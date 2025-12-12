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
      className="bg-gray-900 text-white p-6 rounded-xl space-y-6 max-w-4xl"
    >
      <h2 className="text-xl font-bold mb-2">Add New Movie</h2>

      {/* 2 Column Form Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Title */}
        <div>
          <label className="text-sm text-gray-300">Title</label>
          <input
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded bg-gray-800 outline-none"
            required
          />
        </div>

        {/* Release Year */}
        <div>
          <label className="text-sm text-gray-300">Release Year</label>
          <input
            name="releaseYear"
            type="number"
            value={formData.releaseYear}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded bg-gray-800 outline-none"
            required
          />
        </div>

        {/* Language */}
        <div>
          <label className="text-sm text-gray-300">Language</label>
          <input
            name="language"
            type="text"
            value={formData.language}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded bg-gray-800 outline-none"
            required
          />
        </div>

        {/* Duration */}
        <div>
          <label className="text-sm text-gray-300">Duration (min)</label>
          <input
            name="duration"
            type="number"
            value={formData.duration}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded bg-gray-800 outline-none"
            required
          />
        </div>

        {/* Rating */}
        <div>
          <label className="text-sm text-gray-300">Rating</label>
          <input
            name="rating"
            type="text"
            value={formData.rating}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded bg-gray-800 outline-none"
            required
          />
        </div>

        {/* Age Rating */}
        <div>
          <label className="text-sm text-gray-300">Age Rating</label>
          <select
            name="ageRating"
            value={formData.ageRating}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded bg-gray-800 outline-none"
            required
          >
            <option value="">Select</option>
            <option value="PG">PG</option>
            <option value="PG-13">PG-13</option>
            <option value="16+">16+</option>
            <option value="18+">18+</option>
          </select>
        </div>

        {/* Country */}
        <div>
          <label className="text-sm text-gray-300">Country</label>
          <input
            name="country"
            type="text"
            value={formData.country}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded bg-gray-800 outline-none"
            required
          />
        </div>

        {/* Movie URL */}
        <div>
          <label className="text-sm text-gray-300">Movie URL</label>
          <input
            name="movieURL"
            type="text"
            value={formData.movieURL}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded bg-gray-800 outline-none"
          />
        </div>
      </div>

      {/* Description (full width) */}
      <div>
        <label className="text-sm text-gray-300">Description</label>
        <textarea
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          className="w-full mt-1 p-2 rounded bg-gray-800 outline-none"
          required
        ></textarea>
      </div>

      {/* File Uploads (2 columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Thumbnail */}
        <div>
          <label className="text-sm text-gray-300">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
            className="w-full mt-2"
          />
        </div>

        {/* Banner */}
        <div>
          <label className="text-sm text-gray-300">Banner</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setBanner(e.target.files?.[0] || null)}
            className="w-full mt-2"
          />
        </div>

        {/* Trailer */}
        <div className="md:col-span-2">
          <label className="text-sm text-gray-300">Trailer (video)</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setTrailer(e.target.files?.[0] || null)}
            className="w-full mt-2"
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="bg-yellow-300 hover:bg-yellow-400 px-5 py-2 rounded-lg font-semibold w-full"
      >
        <text className="text-black font-bold">Save Movie</text>
      </button>
    </form>
  );
}
