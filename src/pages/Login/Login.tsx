import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [usernameLoginInput, setUsernameLoginInput] = useState("");

  localStorage.setItem("username", JSON.stringify(usernameLoginInput));

  return (
    <div className="login-Container">
      <div className="login-content">
        <h3>Welcome to CodeLeap network!</h3>
        <p>Please enter your username</p>
        <input
          type="text"
          value={usernameLoginInput}
          placeholder="John Doe"
          onChange={(event) => setUsernameLoginInput(event.target.value)}
        />
        <div className="login-button">
          <button disabled={usernameLoginInput === ""}>
            <Link to="/Posts">Enter</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
