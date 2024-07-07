import { useState } from "react";
import loginService from "../../services/login";
import noteService from "../../services/notes";
import PropTypes from 'prop-types'

export default function Form({
  setErrorMessage,
  setUser,
}: {
  setErrorMessage: (value: string | null) => void;
  setUser: (value: object | null) => void;
}) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));

      noteService.setToken(user.token);
      setUser(user);
      setUserName("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  return (
    <form onSubmit={handleLogin}>
      <div>
        username{" "}
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUserName(target.value)}
        />
      </div>
      <div>
        password{" "}
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
}

Form.propTypes = {
setUser:PropTypes.func.isRequired,
 setErrorMessage:PropTypes.func.isRequired
}