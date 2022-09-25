import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RepositoriesState {
  value: any;
}

const initialState: RepositoriesState = {
  value: [],
};

const repositoriesSlice = createSlice({
  name: "repositories",
  initialState,
  reducers: {
    addRepositories: (state, action: PayloadAction<[]>) => {
      state.value = action.payload;
    },
  },
});

export const { addRepositories } = repositoriesSlice.actions;
export default repositoriesSlice.reducer;
