import { useState } from "react";
import Repository from "./Repository/Repository";
import { Api } from "../../../functions/api.functions";

import "./Repositories.css";
import { useSelector, useDispatch } from "react-redux";
import { addRepositories } from "../../../features/repositoriesSlice";
import { RootState } from "../../../store/store";

export default function Repositories() {
  const [repoName, setRepoName] = useState("");

  const dispatch = useDispatch();

  const repositories = useSelector(
    (state: RootState) => state.repositories.value
  );

  async function selectName(event: any) {
    event.preventDefault();
    const repos = await Api.getAllRepositories(event.target.name.value);
    dispatch(addRepositories([...repos]));
  }

  function selectRepo(event: any) {
    event.preventDefault();
    setRepoName(event.target.name.value);
  }

  return (
    <div className="Repositories">
      <form className="Repositories__form" onSubmit={selectName}>
        <input
          className="Repositories__form--input"
          type="text"
          name="name"
          placeholder="Github username"
        ></input>
        <button className="Repositories__form--button" type="submit">
          SEARCH
        </button>
      </form>

      <form className="Repositories__form" onSubmit={selectRepo}>
        <input
          className="Repositories__form--input"
          type="text"
          name="name"
          placeholder="Repository name / ID"
        ></input>
        <button className="Repositories__form--button" type="submit">
          SEARCH
        </button>
      </form>

      <div className="Repositories__repositoryList">
        {repositories.map((repo: any, key) => {
          if (
            repo.name.toLowerCase().includes(repoName.toLowerCase()) ||
            repo.id.toString().toLowerCase().includes(repoName.toLowerCase())
          ) {
            return <Repository repo={repo} key={key} />;
          }
        })}
      </div>
    </div>
  );
}
