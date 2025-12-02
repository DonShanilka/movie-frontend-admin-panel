"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Movie {
  id: number;
  title: string;
  description: string;
  genre: string;
  release_year: number;
  duration: number;
  video_url: string;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    genre: "",
    release_year: "",
    duration: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/movies")
      .then((res) => setMovies(res.data))
      .catch((err) => console.log(err));
  }, []);

  const uploadMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Select a file!");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("genre", form.genre);
    formData.append("release_year", form.release_year);
    formData.append("duration", form.duration);

    try {
      await axios.post("http://localhost:8080/api/movies/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Uploaded!");
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Upload failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: 28 }}>🎬 Movie Upload</h1>

      {/* Upload Form */}
      <form onSubmit={uploadMovie} style={{ marginBottom: 30 }}>
        <input
          type="text"
          placeholder="Title"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        /><br /><br />

        <input
          type="text"
          placeholder="Description"
          required
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        /><br /><br />

        <input
          type="text"
          placeholder="Genre"
          required
          value={form.genre}
          onChange={(e) => setForm({ ...form, genre: e.target.value })}
        /><br /><br />

        <input
          type="number"
          placeholder="Release year"
          required
          value={form.release_year}
          onChange={(e) => setForm({ ...form, release_year: e.target.value })}
        /><br /><br />

        <input
          type="number"
          placeholder="Duration (min)"
          required
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
        /><br /><br />

        <input
          type="file"
          accept="video/mp4"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        /><br /><br />

        <button type="submit" style={{ padding: "10px 20px" }}>
          Upload Movie
        </button>
      </form>

      <h2>🎥 Movie List</h2>

      {movies.map((m) => (
        <div key={m.id} style={{ marginBottom: 30, borderBottom: "1px solid #ccc", paddingBottom: 20 }}>
          <h3>{m.title}</h3>
          <p>{m.description}</p>
          <p><b>Genre:</b> {m.genre}</p>

          <video width="500" controls>
            <source src={`http://localhost:8080${m.video_url}`} type="video/mp4" />
          </video>
        </div>
      ))}
    </div>
  );
}
