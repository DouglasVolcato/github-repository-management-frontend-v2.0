import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotesState {
  value: any;
}

const initialState: NotesState = {
  value: [],
};

const notesSlice = createSlice({
  name: "repositories",
  initialState,
  reducers: {
    addNotes: (state, action: PayloadAction<[]>) => {
      state.value = action.payload;
    },
  },
});

export const { addNotes } = notesSlice.actions;
export default notesSlice.reducer;
