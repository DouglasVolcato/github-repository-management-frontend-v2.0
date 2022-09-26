import { useState } from "react";
import "./EditPage.css";
import { Api } from "../../../../../functions/api.functions";
import { useDispatch } from "react-redux";
import { editNote } from "../../../../../features/notesSlice";

export default function EditPage({props}: any) {
  const dispatch = useDispatch()
  const [newNote, setNewNote] = useState({});
  const [noteInfo, setNoteInfo] = useState({
    name: props.data.name,
    note: props.data.note,
  });

  async function updateNote(event: any) {
    event.preventDefault();
    setNewNote({ ...newNote });
    Api.updateNote(props.data.name, newNote);
    dispatch(editNote({index: props.key, body: newNote}))
    props.showEditModal();
  }

  return (
    <div className="EditPage">
      <form onSubmit={updateNote} className="EditPage__form">
        Name:{" "}
        <input
          className="EditPage__form--input"
          type="text"
          name="name"
          value={noteInfo.name}
          onChange={(event) => {
            setNewNote({ ...newNote, name: event.target.value });
            setNoteInfo({ ...noteInfo, name: event.target.value });
          }}
        />
        <br />
        Priority:
        <select
          className="EditPage__form--input"
          onChange={(event) => {
            setNewNote({ ...newNote, priority: event.target.value });
          }}
        >
          <option value=""></option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <br />
        Deadline:
        <input
          className="EditPage__form--input"
          type="date"
          onChange={(event) =>
            setNewNote({ ...newNote, deadline: event.target.value })
          }
        />
        <br />
        Note:
        <textarea
          className="EditPage__form--input"
          name="note"
          rows={5}
          value={noteInfo.note}
          onChange={(event) => {
            setNewNote({ ...newNote, note: event.target.value });
            setNoteInfo({ ...noteInfo, note: event.target.value });
          }}
        />{" "}
        <br />
        <div className="EditPage__form--buttons">
          <button
            className="EditPage__form--closeButton"
            onClick={() => props.showEditModal()}
          >
            CLOSE
          </button>
          <button className="EditPage__form--submitButton" type="submit">
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
}
