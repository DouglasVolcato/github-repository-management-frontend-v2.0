import { useState } from "react";
import { Api } from "../../../../functions/api.functions";
import EditPage from "./EditPage/EditPage";
import "./Note.css";
import { useDispatch } from "react-redux";
import { addNotes, deleteNote } from "../../../../features/notesSlice";
import { NoteProps } from "../../../../interfaces/NoteProps.interface";

export default function Note({ props }: NoteProps) {
  const dispatch = useDispatch();
  const [editModal, setEditModal] = useState(false);

  async function deleteNoteByName(repoName: any) {
    if (Api.offlineChecker()) {
      if (window.confirm("Are you sure to delete this note?")) {
        Api.deleteNote(repoName);
        dispatch(deleteNote(props.key));
      }
    }

    setTimeout(async () => {
      const userNotes = await Api.getNotes();
      dispatch(addNotes(userNotes));
    }, 3000);
  }

  function showEditModal() {
    editModal === false ? setEditModal(true) : setEditModal(false);
  }

  function borderColor() {
    return props.data.priority === "High"
      ? "highPriority Note"
      : props.data.priority === "Medium"
      ? "mediumPriority Note"
      : "lowPriority Note";
  }

  return (
    <div className={borderColor()}>
      <p className="Note__name"> Name: {props.data.name}</p>
      <p className="Note__priority">Priority: {props.data.priority}</p>
      <p className="Note__priority">Deadline: {props.data.deadline}</p>
      <p className="Note__note">Note: {props.data.note}</p>

      <div className="Note__buttons">
        <a
          className="Note__a"
          href={props.data.link}
          target="_blank"
          rel="noreferrer"
        >
          <button className="Note__accessButton">ACCESS</button>
        </a>
        <button
          className="Note__deleteButton"
          onClick={() => {
            deleteNoteByName(props.data.name);
          }}
        >
          DELETE
        </button>

        <button className="Note__editButton" onClick={() => showEditModal()}>
          EDIT
        </button>
      </div>

      {editModal === true ? (
        <EditPage
          props={{
            data: props.data,
            key: props.key,
            showEditModal: showEditModal,
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
