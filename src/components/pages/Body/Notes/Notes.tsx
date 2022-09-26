import Note from "./Note/Note";
import "./Notes.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

export default function Notes() {
  const notes = useSelector((state: RootState) => state.notes.value);

  return (
    <div className="Notes">
      {notes.map((data: any, key: any) => (
        <Note props={{ data: data, key: key }} />
      ))}
    </div>
  );
}
