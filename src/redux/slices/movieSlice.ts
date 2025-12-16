// src/redux/slices/movieSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Movie } from "../../models/Movie";
import { MovieService } from "../../services/movieService";
import { MovieTypes } from "@/types/movieTypes";
import axios from "axios";

const API_URL = "http://localhost:8080/api/movies";

interface MovieState {
  movies: MovieTypes[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: MovieState = {
  movies: [],
  loading: false,
  error: null,
  success: false,
};

// Thunk to create movie
export const createMovie = createAsyncThunk(
  "movies/createMovie",
  async (movie: Movie, { rejectWithValue }) => {
    try {
      const data = await MovieService.uploadMovie(movie);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Update an existing movie
export const updateMovie = createAsyncThunk(
  "movies/updateMovie",
  async (movie: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/update`, movie, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Thunk to fetch all movies
export const getAllMovies = createAsyncThunk<
  MovieTypes[],
  void,
  { rejectValue: string }
>("movies/getAllMovies", async (_, { rejectWithValue }) => {
  try {
    const data = await MovieService.getAllMovies();
    console.log("Fetched movies:", data);
    return data;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    resetMovieState(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createMovie.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getAllMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(getAllMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetMovieState } = movieSlice.actions;
export default movieSlice.reducer;
