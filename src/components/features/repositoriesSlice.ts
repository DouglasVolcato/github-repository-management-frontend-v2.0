import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RepositoryInterface } from "../interfaces/Repository.interface";

const initialState: RepositoryInterface = {
  value: [],
};

const repositoriesSlice = createSlice({
  name: "repositories",
  initialState,
  reducers: {
    addRepositories: (
      state,
      action: PayloadAction<
        {
          id: string;
          name: string;
          svn_url: string;
        }[]
      >
    ) => {
      state.value = action.payload;
    },
  },
});

export const { addRepositories } = repositoriesSlice.actions;
export default repositoriesSlice.reducer;
