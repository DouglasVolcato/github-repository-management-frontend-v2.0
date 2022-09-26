import { Api } from "../../../../../functions/api.functions";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import "./ExtraSecurity.css";

export default function ExtraSecurity(props: any) {
  const [showFormModal, setShowFormModal] = useState(false);
  const [keys, setKeys] = useState({
    key1: "",
    key2: "",
    key3: "",
    reference1: "",
    reference2: "",
    reference3: "",
  });

  const user = useSelector((state: RootState) => state.user.value);

  async function createSecuritKeys(event: any) {
    event.preventDefault();
    const keysCreation = await Api.createSecuritKeys(user.email, keys);
    if (keysCreation === true) {
      setShowFormModal(false);
    }
  }

  return (
    <div className="ExtraSecurity">
      {user.securityKeys.length === 3 ? (
        <button
          className="ExtraSecurity__openButton"
          id="ExtraSecurityEnabled"
          type="button"
        >
          Extra security enabled!
        </button>
      ) : user.securityKeys.length === 0 ? (
        <button
          className="ExtraSecurity__openButton"
          type="button"
          onClick={() => setShowFormModal(true)}
        >
          Enable extra security
        </button>
      ) : (
        <span></span>
      )}

      {showFormModal === false ? (
        <span></span>
      ) : (
        <section className="ExtraSecurity__modal">
          <form
            className="ExtraSecurity__modal--form"
            onSubmit={createSecuritKeys}
          >
            <p className="ExtraSecurity__intro">
              This extra security is used in case you forget your password.
              Submit 3 keys with references for you to remember them.
            </p>
            <br />
            <label>First key</label>
            <input
              type="text"
              placeholder="Key #1"
              onChange={(event) =>
                setKeys({ ...keys, key1: event.target.value })
              }
            />
            <input
              type="text"
              placeholder="Reference #1"
              onChange={(event) =>
                setKeys({ ...keys, reference1: event.target.value })
              }
            />
            <label>Second key</label>
            <input
              type="text"
              placeholder="Key #2"
              onChange={(event) =>
                setKeys({ ...keys, key2: event.target.value })
              }
            />
            <input
              type="text"
              placeholder="Reference #2"
              onChange={(event) =>
                setKeys({ ...keys, reference2: event.target.value })
              }
            />
            <label>Third key</label>
            <input
              type="text"
              placeholder="Key #3"
              onChange={(event) =>
                setKeys({ ...keys, key3: event.target.value })
              }
            />
            <input
              type="text"
              placeholder="Reference #3"
              onChange={(event) =>
                setKeys({ ...keys, reference3: event.target.value })
              }
            />

            <div className="ExtraSecurity__modal--buttons">
              <button type="submit">SUBMIT</button>
              <button type="button" onClick={() => setShowFormModal(false)}>
                CLOSE
              </button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
}
