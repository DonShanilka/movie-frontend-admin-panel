// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../slices/movieSlice";
import tvSeriesReducer from "../slices/tvSeriesSlice";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    tvSeries: tvSeriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
