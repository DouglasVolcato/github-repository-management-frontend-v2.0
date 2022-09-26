import { Api } from "../../../../functions/api.functions";
import { useDispatch } from "react-redux";
import { addNote } from "../../../../features/notesSlice";
import "./Repository.css";
import { RepositoryCreation } from "../../../../interfaces/RepositoryCreation.interface";

export default function Repository({ repo }: RepositoryCreation) {
  const dispatch = useDispatch();

  async function createNote() {
    const body = {
      name: repo.name,
      link: repo.svn_url,
      priority: "Low",
      deadline: new Date().toISOString().slice(0, 10),
      note: "Empty",
    };
    Api.createNote(body);
    dispatch(addNote(body));
  }

  return (
    <section className="Repository">
      <div className="Repository__id Repository__name">ID: {repo.id}</div>
      <div className="Repository__name">{repo.name}</div>
      <div className="Repository__buttons">
        <a
          className="Repository__accessButton"
          href={repo.svn_url}
          target="_blank"
          rel="noreferrer"
        >
          <button className="Repository__accessButton2">ACCESS</button>
        </a>
        <button className="Repository__addButton" onClick={() => createNote()}>
          ADD NOTE
        </button>
      </div>
    </section>
  );
}
