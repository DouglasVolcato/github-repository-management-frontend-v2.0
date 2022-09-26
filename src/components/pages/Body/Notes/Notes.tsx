import Note from "./Note/Note";
import "./Notes.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { SingleNote } from "../../../interfaces/SingleNote.interface";

export default function Notes() {
  const notes = useSelector((state: RootState) => state.notes.value);

  return (
    <div className="Notes">
      {notes.map((data: SingleNote, key: number) => (
        <Note props={{ data: data, key: key }} />
      ))}
    </div>
  );
}
