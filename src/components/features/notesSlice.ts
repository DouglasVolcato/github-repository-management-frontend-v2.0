import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Api } from "../functions/api.functions";

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
      state.value = Api.sortFunction(action.payload);
    },
    addNote: (state, action: PayloadAction<{}>) => {
      const newState = state.value;
      newState.push(action.payload);
      state.value = Api.sortFunction(newState);
    },
    deleteNote: (state, action: PayloadAction<number>) => {
      const newState = state.value;
      newState.splice(action.payload, 1);
      state.value = newState;
    },
    editNote: (state, action: PayloadAction<{ index: number; body: {} }>) => {
      const newState = state.value;
      const newNote = Object.assign(
        state.value[action.payload.index],
        action.payload.body
      );
      newState.splice(action.payload.index, 1, newNote);
      state.value = Api.sortFunction(newState);
    },
  },
});

export const { addNotes, addNote, deleteNote, editNote } = notesSlice.actions;
export default notesSlice.reducer;
