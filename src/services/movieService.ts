import { Movie } from "../Models/Movie";

export const MovieService = {
  async uploadMovie(movieData: Movie) {
    const formData = new FormData();

    Object.entries(movieData).forEach(([key, value]) => {
      if (value) formData.append(key, value as any);
    });

    const res = await fetch("http://localhost:8080/api/movies/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Failed to upload movie");
    return res.json();
  },
};
