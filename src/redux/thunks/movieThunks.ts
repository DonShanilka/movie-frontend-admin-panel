import { createAsyncThunk } from "@reduxjs/toolkit";
import { MovieService } from "@/services/movieService";
import { MovieTypes } from "../../types/movieTypes";

export const fetchMovies = createAsyncThunk<MovieTypes[]>(
  "movies/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await MovieService.getAllMovies();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
