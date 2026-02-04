// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../slices/movieSlice";
import tvSeriesReducer from "../slices/tvSeriesSlice";
import episodeReducer from "../slices/episodeSlice";
import authReducer from "../slices/authSlice";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    tvSeries: tvSeriesReducer,
    episode: episodeReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
