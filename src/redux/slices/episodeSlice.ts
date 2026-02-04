import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8081",
});

export const getAllEpisode = createAsyncThunk(
  "episode/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await apiClient.get("/api/episode/getAllEpisode");
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue("Failed to fetch episodes");
    }
  }
);

export const createEpisode = createAsyncThunk(
  "episode/create",
  async (formData: FormData, thunkAPI) => {
    try {
      const response = await apiClient.post(
        "/api/episode/createEpisode",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("Failed to create episode");
    }
  }
);

export const updateEpisode = createAsyncThunk(
  "episode/update",
  async (formData: FormData, thunkAPI) => {
    try {
      const response = await apiClient.put(
        "/api/episode/updateEpisode",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("Update failed");
    }
  }
);

export const deleteEpisode = createAsyncThunk(
  "episode/delete",
  async (id: number, thunkAPI) => {
    try {
      const response = await apiClient.delete(`/api/episode/deleteEpisode?id=${id}`);
      return id; // return deleted episode id
    } catch {
      return thunkAPI.rejectWithValue("Delete failed");
    }
  }
);


const episodeSlice = createSlice({
  name: "episode",
  initialState: {
    episodes: [] as any[],
    loading: false,
    success: false,
    error: null as string | null,
    searchTerm: "",
  },
  reducers: {
    resetEpisodeState: (state) => {
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
      .addCase(getAllEpisode.pending, (s) => { s.loading = true; })
      .addCase(getAllEpisode.fulfilled, (s, a) => {
        s.loading = false;
        s.episodes = a.payload;
      })
      .addCase(getAllEpisode.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      })

      // create
      .addCase(createEpisode.pending, (s) => { s.loading = true; })
      .addCase(createEpisode.fulfilled, (s) => {
        s.loading = false;
        s.success = true;
      })
      .addCase(createEpisode.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      })

      // update
      .addCase(updateEpisode.pending, (s) => { s.loading = true; })
      .addCase(updateEpisode.fulfilled, (s) => {
        s.loading = false;
        s.success = true;
      })
      .addCase(updateEpisode.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      })

      // delete
      .addCase(deleteEpisode.pending, (s) => { s.loading = true; })
      .addCase(deleteEpisode.fulfilled, (s, a) => {
        s.loading = false;
        s.success = true;
        s.episodes = s.episodes.filter((m) => m.Id !== a.payload && m.id !== a.payload);
      })
      .addCase(deleteEpisode.rejected, (s, a) => { s.loading = false; s.error = a.payload as string; });
  },
});

export const { resetEpisodeState, setSearchTerm } = episodeSlice.actions;
export default episodeSlice.reducer;