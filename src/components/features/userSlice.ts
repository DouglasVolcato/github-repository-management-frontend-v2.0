import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInterface } from "../interfaces/User.interface";

const initialState: UserInterface = {
  value: {
    id: "",
    name: "",
    email: "",
    photo: "",
    repositories: [],
    securityKeys: [],
  },
};

const userSlice = createSlice({
  name: "repositories",
  initialState,
  reducers: {
    addUser: (
      state,
      action: PayloadAction<{
        name: string;
        email: string;
        photo: string;
        password: string;
      }>
    ) => {
      state.value = Object.assign(state.value, action.payload);
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
