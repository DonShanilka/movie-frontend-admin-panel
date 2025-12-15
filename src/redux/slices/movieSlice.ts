// src/redux/slices/movieSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Movie } from "../../models/Movie";
import { MovieService } from "../../services/movieService";

interface MovieState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: MovieState = {
  loading: false,
  error: null,
  success: false,
};

// Thunk to upload movie
export const uploadMovie = createAsyncThunk(
  "movies/uploadMovie",
  async (movie: Movie, { rejectWithValue }) => {
    try {
      const data = await MovieService.uploadMovie(movie);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

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
      .addCase(uploadMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(uploadMovie.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(uploadMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetMovieState } = movieSlice.actions;
export default movieSlice.reducer;
