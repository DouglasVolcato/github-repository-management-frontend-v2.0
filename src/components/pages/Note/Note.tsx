import { useState } from "react";
import { repositoryManagementApi } from "../../apis/repositoryManagementApi";
// import EditPage from "../EditPage/EditPage";
import "./Note.css";

export default function Note(props:any) {
  const [editModal, setEditModal] = useState(false);

  async function deleteNote(repoName:any) {
    if (window.confirm("Are you sure to delete this note?")) {
    //   props.getNotes();
      repositoryManagementApi.deleteRepo(repoName);
    }
    // props.getNotes();
    // props.getNotes();
  }

  function showEditModal() {
    // props.getNotes();
    editModal === false ? setEditModal(true) : setEditModal(false);
    // props.getNotes();
    // props.getNotes();
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
            deleteNote(props.data.name);
          }}
        >
          DELETE
        </button>

        <button className="Note__editButton" onClick={() => showEditModal()}>
          EDIT
        </button>
      </div>

      {/* {editModal === true ? (
        <EditPage data={props.data} showEditModal={showEditModal} />
      ) : (
        <></>
      )} */}
    </div>
  );
}
