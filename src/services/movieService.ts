import  {Movie}  from "../models/Movie";
import { MovieTypes } from "@/types/movieTypes";

const API_URL = "http://localhost:8080/api/movies";

export const MovieService = {
  async uploadMovie(movieData: Movie): Promise<any> {
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


export const movieService = {
  async getAllMovies(): Promise<MovieTypes[]> {
    const res = await fetch(API_URL, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch movies");
    }

    return res.json();
  },
};
