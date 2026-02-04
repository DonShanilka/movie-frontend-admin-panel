import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8081",
});

export const getAllTvSeries = createAsyncThunk(
  "tvSeries/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await apiClient.get("/api/series/getAllSeries");
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue("Failed to fetch tv series");
    }
  }
);

export const createTvSeries = createAsyncThunk(
  "tvSeries/create",
  async (formData: FormData, thunkAPI) => {
    try {
      const response = await apiClient.post(
        "/api/series/createSeries",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("Failed to create tv series");
    }
  }
);

export const updateTvSeries = createAsyncThunk(
  "tvSeries/update",
  async (formData: FormData, thunkAPI) => {
    try {
      const response = await apiClient.put(
        "/api/series/updateSeries", // ✅ EXACT backend route
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("Update failed");
    }
  }
);

export const deleteTvSeries = createAsyncThunk(
  "tvSeries/delete",
  async (ID: number, thunkAPI) => {
    try {
      const response = await apiClient.delete(`/api/series/deleteSeries?id=${ID}`);
      return ID; // return deleted tv series id
    } catch {
      return thunkAPI.rejectWithValue("Delete failed");
    }
  }
);


const tvSeriesSlice = createSlice({
  name: "tvSeries",
  initialState: {
    tvSeries: [] as any[],
    loading: false,
    success: false,
    error: null as string | null,
    searchTerm: "",
  },
  reducers: {
    resetTvSeriesState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
        // getAll
      .addCase(getAllTvSeries.pending, (s) => { s.loading = true; })
      .addCase(getAllTvSeries.fulfilled, (s, a) => {
        s.loading = false;
        s.tvSeries = a.payload;
      })
      .addCase(getAllTvSeries.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      })

      // create 
      .addCase(createTvSeries.pending, (s) => { s.loading = true; })
      .addCase(createTvSeries.fulfilled, (s) => {
        s.loading = false;
        s.success = true;
      })
      .addCase(createTvSeries.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      })

      // update
      .addCase(updateTvSeries.pending, (s) => { s.loading = true; })
      .addCase(updateTvSeries.fulfilled, (s) => {
        s.loading = false;
        s.success = true;
      })
      .addCase(updateTvSeries.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      })

      // delete 
      .addCase(deleteTvSeries.pending, (s) => { s.loading = true; })
      .addCase(deleteTvSeries.fulfilled, (s, a) => {
        s.loading = false;
        s.success = true;
        s.tvSeries = s.tvSeries.filter((m) => m.Id !== a.payload && m.id !== a.payload);
      })
      .addCase(deleteTvSeries.rejected, (s, a) => { s.loading = false; s.error = a.payload as string; });
  },
});

export const { resetTvSeriesState, setSearchTerm } = tvSeriesSlice.actions;
export default tvSeriesSlice.reducer;