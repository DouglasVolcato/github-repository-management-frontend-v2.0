import "./UserProfile.css";
import { useState } from "react";
import { Api } from "../../../../functions/api.functions";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store/store";
import { addUser } from "../../../../features/userSlice";
import { SetUserModal } from "../../../../interfaces/SetUserModal.interface";

export default function UserProfile({ setShowUserModal }: SetUserModal) {
  const user = useSelector((state: RootState) => state.user.value);

  const dispatch = useDispatch();

  const [editionPage, setEditionPage] = useState(false);
  const [editedUser, setEditedUser] = useState({
    email: user.email,
    name: user.name,
    photo: user.photo,
    password: "",
  });

  async function deleteUser() {
    if (Api.offlineChecker()) {
      Api.deleteUser();
    }
  }

  async function editUser(event: any) {
    event.preventDefault();
    if (Api.offlineChecker()) {
      const userEdition = await Api.editUser(editedUser);
      if (userEdition === true) {
        dispatch(addUser(editedUser));
        setEditionPage(false);
      }
    }
  }

  if (editionPage === false) {
    return (
      <div className="UserProfile">
        <div className="UserProfile__div">
          {user.photo === "" || user.photo === undefined ? (
            <span></span>
          ) : (
            <div className="UserProfile__image">
              <img
                className="UserProfile__image--img"
                src={user.photo}
                alt="User profile"
              />
            </div>
          )}
          <p className="UserProfile__info">Name: {user.name}</p>
          <p className="UserProfile__info">Email: {user.email}</p>
          <p className="UserProfile__info">
            Photo:{" "}
            {user.photo === "" || user.photo === undefined ? "Unset" : "Set"}
          </p>
          <p className="UserProfile__info">Password: Secret</p>

          <div className="UserProfile__buttons">
            <button
              className="UserProfile__buttons--edit"
              onClick={() => setEditionPage(true)}
            >
              EDIT
            </button>
            <button
              className="UserProfile__buttons--delete"
              onClick={() => {
                deleteUser();
              }}
            >
              DELETE
            </button>
            <button
              className="UserProfile__buttons--close"
              onClick={() => setShowUserModal(false)}
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="UserProfile">
        <form className="UserProfile__div" onSubmit={editUser}>
          {editedUser.photo === "" || editedUser.photo === undefined ? (
            <span></span>
          ) : (
            <div className="UserProfile__image">
              <img
                className="UserProfile__image--imgEdit"
                src={editedUser.photo}
                alt="User profile"
              />
            </div>
          )}
          <label className="UserProfile__info">Name:</label>
          <input
            type="text"
            className="UserProfile__info"
            value={editedUser.name}
            onChange={(event) => {
              setEditedUser({ ...editedUser, name: event.target.value });
            }}
          ></input>
          <label className="UserProfile__info">Email:</label>
          <input
            type="text"
            className="UserProfile__info"
            value={editedUser.email}
            onChange={(event) => {
              setEditedUser({ ...editedUser, email: event.target.value });
            }}
          ></input>
          <label className="UserProfile__info">Photo:</label>
          <input
            type="text"
            className="UserProfile__info"
            value={editedUser.photo}
            onChange={(event) => {
              setEditedUser({ ...editedUser, photo: event.target.value });
            }}
          ></input>
          <label className="UserProfile__info">Password:</label>
          <input
            type="password"
            className="UserProfile__info"
            value={editedUser.password}
            onChange={(event) => {
              setEditedUser({ ...editedUser, password: event.target.value });
            }}
          ></input>

          <div className="UserProfile__buttons">
            <button className="UserProfile__buttons--edit" type="submit">
              SUBMIT
            </button>

            <button
              className="UserProfile__buttons--close"
              type="button"
              onClick={() => setEditionPage(false)}
            >
              CLOSE
            </button>
          </div>
        </form>
      </div>
    );
  }
}
