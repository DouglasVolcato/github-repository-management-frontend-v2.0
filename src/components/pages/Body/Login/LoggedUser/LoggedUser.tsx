import "./LoggedUser.css";
import ExtraSecurity from "./ExtraSecurity/ExtraSecurity";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { SetUserModal } from "../../../../interfaces/SetUserModal.interface";

export default function LoggedUser({ setShowUserModal }: SetUserModal) {
  const user = useSelector((state: RootState) => state.user.value);

  return (
    <div className="LoggedUser">
      {user.name ? (
        <div>
          <button
            type="button"
            className="LoggedUser__logged"
            onClick={() => setShowUserModal(true)}
          >
            ✓ Logged as {user.name}
          </button>

          <ExtraSecurity />
        </div>
      ) : (
        <div>
          <h2 className="LoggedUser__notLogged">
            Make login to access the notes.
          </h2>
        </div>
      )}
    </div>
  );
}
