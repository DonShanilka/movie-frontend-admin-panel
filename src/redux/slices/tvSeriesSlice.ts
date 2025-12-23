import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8080",
})

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

