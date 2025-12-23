import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

export const getAllTvSeries = createAsyncThunk(
  "tvSeries/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await apiClient.get("/api/series/createSeries");
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
  async (id: number, thunkAPI) => {
    try {
      const response = await apiClient.delete(`/api/series/deleteSeries?id=${id}`);
      return id; // return deleted tv series id
    } catch {
      return thunkAPI.rejectWithValue("Delete failed");
    }
  }
);