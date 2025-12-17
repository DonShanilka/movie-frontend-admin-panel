import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

/* ================= THUNKS ================= */

export const getAllMovies = createAsyncThunk(
  "movies/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await apiClient.get("/api/movies/getAllMovies");
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue("Failed to fetch movies");
    }
  }
);

export const createMovie = createAsyncThunk(
  "movies/create",
  async (formData: FormData, thunkAPI) => {
    try {
      const res = await apiClient.post(
        "/api/movies/createMovie",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return res.data;
    } catch {
      return thunkAPI.rejectWithValue("Create failed");
    }
  }
);

export const updateMovie = createAsyncThunk(
  "movies/update",
  async (formData: FormData, thunkAPI) => {
    try {
      const res = await apiClient.put(
        "/api/movies/updateMovie", // ✅ EXACT backend route
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return res.data;
    } catch {
      return thunkAPI.rejectWithValue("Update failed");
    }
  }
);


/* ================= SLICE ================= */

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [] as any[],
    loading: false,
    success: false,
    error: null as string | null,
  },
  reducers: {
    resetMovieState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMovies.pending, (s) => { s.loading = true; })
      .addCase(getAllMovies.fulfilled, (s, a) => {
        s.loading = false;
        s.movies = a.payload;
      })
      .addCase(getAllMovies.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      })

      .addCase(createMovie.pending, (s) => { s.loading = true; })
      .addCase(createMovie.fulfilled, (s) => {
        s.loading = false;
        s.success = true;
      })
      .addCase(createMovie.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      })

      .addCase(updateMovie.pending, (s) => { s.loading = true; })
      .addCase(updateMovie.fulfilled, (s) => {
        s.loading = false;
        s.success = true;
      })
      .addCase(updateMovie.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      });
  },
});

export const { resetMovieState } = movieSlice.actions;
export default movieSlice.reducer;
