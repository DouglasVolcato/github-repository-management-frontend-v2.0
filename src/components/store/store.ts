import { configureStore } from "@reduxjs/toolkit";
import repositoriesReducer from "../features/repositoriesSlice";
import notesReducer from "../features/notesSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    repositories: repositoriesReducer,
    notes: notesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
