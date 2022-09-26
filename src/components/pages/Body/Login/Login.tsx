import "./Login.css";
import { Api } from "../../../functions/api.functions";
import { useEffect, useState } from "react";
import PasswordRecovery from "./PasswordRecovery/PasswordRecovery";
import LoggedUser from "./LoggedUser/LoggedUser";
import { useDispatch } from "react-redux";
import { addUser } from "../../../features/userSlice";
import { addNotes } from "../../../features/notesSlice";
import UserProfile from "./UserProfile/UserProfile";

export default function Login() {
  const [showUserModal, setShowUserModal] = useState(false);
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const dispatch = useDispatch();

  async function login(event: any) {
    event.preventDefault();
    await Api.logUser(loginInfo);
    const userNotes = await Api.getNotes();
    const loggedUser = await Api.getLoggedUser();
    dispatch(addUser(loggedUser));
    dispatch(addNotes(userNotes));
  }

  async function firstLogin() {
    const loggedUser = await Api.getLoggedUser();
    const userNotes = await Api.getNotes();
    dispatch(addUser(loggedUser));
    dispatch(addNotes(userNotes));
  }

  useEffect(() => {
    firstLogin();
  }, []);

  return (
    <div className="Login">
      <h1 className="Login__h1">Login</h1>
      <form className="Login__form" onSubmit={login}>
        <input
          className="Login__form--input"
          type="email"
          name="email"
          required={true}
          placeholder="Email"
          value={loginInfo.email}
          onChange={(event) => {
            setLoginInfo({ ...loginInfo, email: event.target.value });
          }}
        />
        <br />
        <input
          className="Login__form--input"
          type="password"
          name="password"
          required={true}
          placeholder="Password"
          value={loginInfo.password}
          onChange={(event) => {
            setLoginInfo({ ...loginInfo, password: event.target.value });
          }}
        />
        <br />
        <button className="Login__form--button" type="submit">
          SUBMIT
        </button>
      </form>

      <PasswordRecovery />

      {showUserModal === false ? (
        <span></span>
      ) : (
        <UserProfile setShowUserModal={setShowUserModal} />
      )}
      <LoggedUser setShowUserModal={setShowUserModal} />
    </div>
  );
}
