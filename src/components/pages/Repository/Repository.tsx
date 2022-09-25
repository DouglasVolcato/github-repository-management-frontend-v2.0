// import { repositoryManagementApi } from "../Api/repositoryManagementApi";
import "./Repository.css";

// export default function Repository({ repo, repoName, key }: any) {
export default function Repository({ repo }: any) {
  async function createNote() {
    // return await repositoryManagementApi.addRepo({
    //   name: props.repo.name,
    //   link: props.repo.svn_url,
    //   priority: "Low",
    //   deadline: new Date().toISOString().slice(0, 10),
    //   note: "Empty",
    // });
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
