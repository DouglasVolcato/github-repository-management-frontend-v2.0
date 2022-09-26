import { useState } from "react";
import { Api } from "../../../../functions/api.functions";
import "./Register.css";

export default function Register() {
  const [registerUser, setRegisterUser] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
  });

  async function addNewUser(event: any) {
    event.preventDefault();
    setRegisterUser({ ...registerUser });
    const userCreation = await Api.createUser(registerUser);
    if (userCreation === true) {
      setRegisterUser({
        name: "",
        email: "",
        password: "",
        photo: "",
      });
    }
  }

  return (
    <div className="Register">
      <h1 className="Register__h1">Register</h1>
      <form className="Register__form" onSubmit={addNewUser}>
        <input
          className="Register__form--input"
          type="text"
          name="name"
          required={true}
          placeholder="Name"
          value={registerUser.name}
          onChange={(event) => {
            setRegisterUser({ ...registerUser, name: event.target.value });
          }}
        />
        <br />
        <input
          className="Register__form--input"
          type="email"
          name="email"
          required={true}
          placeholder="Email"
          value={registerUser.email}
          onChange={(event) => {
            setRegisterUser({ ...registerUser, email: event.target.value });
          }}
        />
        <br />
        <input
          className="Register__form--input"
          type="password"
          name="password"
          required={true}
          placeholder="Password"
          value={registerUser.password}
          onChange={(event) => {
            setRegisterUser({ ...registerUser, password: event.target.value });
          }}
        />
        <br />
        <input
          className="Register__form--input"
          type="link"
          name="password"
          placeholder="Photo"
          value={registerUser.photo}
          onChange={(event) => {
            setRegisterUser({ ...registerUser, photo: event.target.value });
          }}
        />
        <br />
        <button className="Register__form--button" type="submit">
          SUBMIT
        </button>
      </form>
      <div className="Register__image .Register">
        {registerUser.photo === "" || registerUser.photo === undefined ? (
          <span></span>
        ) : (
          <img
            className="Register__image--img"
            src={registerUser.photo}
            alt="User profile"
          />
        )}
      </div>
    </div>
  );
}
