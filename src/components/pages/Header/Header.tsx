import { SetPage } from "../../interfaces/SetPageInterface";

import "./Header.css";
export default function Header({ setPage }: SetPage) {
  return (
    <div className="Header">
      <nav className="Header__navbar">
        <div onClick={() => setPage("login")}>Login</div>
        <div onClick={() => setPage("register")}>Register</div>
        <div onClick={() => setPage("notes")}>Notes</div>
        <div onClick={() => setPage("repositories")}>Repositories</div>
      </nav>
    </div>
  );
}
