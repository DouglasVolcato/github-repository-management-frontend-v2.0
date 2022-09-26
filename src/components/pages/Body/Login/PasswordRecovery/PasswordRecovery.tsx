import { useState } from "react";
import "./PasswordRecovery.css";
import { Api } from "../../../../functions/api.functions";

export default function PasswordRecovery(props:any) {
  const [keyReferences, setKeyReferences] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [keys, setKeys] = useState({ key1: "", key2: "", key3: "" });
  const [recoveryModal, setRecoveryModal] = useState(false);

  async function getKeyReferences(event:any) {
    event.preventDefault();
    const data:[] = await Api.getKeyReferences(userEmail)
    setKeyReferences([...data]);
  }

  async function sendKeys(event:any) {
    event.preventDefault();
    const sentKeys = await Api.sendKeys(userEmail, newPassword, keys)
    setRecoveryModal(sentKeys);
  }

  return (
    <div className="PasswordRecovery">
      {recoveryModal === false ? (
        <button
          className="PasswordRecovery__mainButton"
          onClick={() => setRecoveryModal(true)}
        >
          Forgot your password?
        </button>
      ) : (
        <summary className="PasswordRecovery__modal">
          <div className="PasswordRecovery__modal--divform">
            <form
              className="PasswordRecovery__modal--form"
              onSubmit={getKeyReferences}
            >
              <input
                type="email"
                placeholder="Search your email and submit the keys."
                onChange={(event) => setUserEmail(event.target.value)}
              />
              <div className="PasswordRecovery__modal--form-buttons">
                <button type="submit">SEARCH</button>
                <button type="button" onClick={() => setRecoveryModal(false)}>
                  CLOSE
                </button>
              </div>
            </form>

            {keyReferences.length < 3 ? (
              <span></span>
            ) : (
              <form
                onSubmit={sendKeys}
                className="PasswordRecovery__modal--form"
              >
                <label>{keyReferences[0]}</label>
                <input
                  type="text"
                  placeholder="key #1"
                  onChange={(event) =>
                    setKeys({ ...keys, key1: event.target.value })
                  }
                />
                <br />
                <label>{keyReferences[1]}</label>
                <input
                  type="text"
                  placeholder="key #2"
                  onChange={(event) =>
                    setKeys({ ...keys, key2: event.target.value })
                  }
                />
                <br />
                <label>{keyReferences[2]}</label>
                <input
                  type="text"
                  placeholder="key #3"
                  onChange={(event) =>
                    setKeys({ ...keys, key3: event.target.value })
                  }
                />
                <br />
                <label>New Password</label>
                <input
                  type="password"
                  onChange={(event) => setNewPassword(event.target.value)}
                />
                <button type="submit">SUBMIT</button>
              </form>
            )}
          </div>
        </summary>
      )}
    </div>
  );
}
