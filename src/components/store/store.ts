import { configureStore } from "@reduxjs/toolkit";
import repositoriesReducer from "../features/repositoriesSlice";
import notesReducer from "../features/notesSlice";

export const store = configureStore({
  reducer: {
    repositories: repositoriesReducer,
    notes: notesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
