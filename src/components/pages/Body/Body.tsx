import Repositories from "./Repositories/Repositories";
import Notes from "./Notes/Notes";
import Login from "./Login/Login";
import Register from "./Register/Register";
import "./Body.css";
import { Page } from "../../interfaces/Page.interface";

export default function Body({ page }: Page) {
  function showPage() {
    if (page === "login") {
      return <Login />;
    } else if (page === "register") {
      return <Register />;
    } else if (page === "notes") {
      return <Notes />;
    } else if (page === "repositories") {
      return <Repositories />;
    }
  }

  return <div className="Body">{showPage()}</div>;
}
