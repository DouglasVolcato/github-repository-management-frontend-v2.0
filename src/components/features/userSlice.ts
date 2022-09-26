import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  value: any;
}

const initialState: UserState = {
  value: {},
};

const userSlice = createSlice({
  name: "repositories",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<{}>) => {
      state.value = Object.assign(state.value, action.payload);
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
