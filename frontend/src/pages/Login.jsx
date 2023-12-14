import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import styles from "./Login.module.css";

import googleIcon from "../icons/google.png";
import metaIcon from "../icons/meta.png";
import { UserContext } from "../contexts/UserContext";
import { RouterContext } from "../lib/Router";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useContext(UserContext);
  const { onNavigate } = useContext(RouterContext);

  useEffect(() => {
    if (isLoggedIn) {
      toast.warning("You are already logged in!");
      onNavigate("/");
    }
  });

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    // const response = await fetch("/api/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, password }),
    // });

    // setLoading(false);

    // if (response.ok) {
    //   const { token } = await response.json();
    //   localStorage.setItem("token", token);
    //   window.location.href = "/";
    // } else {
    //   const { message } = await response.json();
    //   alert(message);
    // }
  };

  const handleMetaLogin = () => {
    window.location.href = "http://localhost:3001/auth/meta";
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            name="email"
            className={styles.input}
            onChange={handleEmailChange}
            value={email}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            className={styles.input}
            onChange={handlePasswordChange}
            value={password}
          />
        </label>
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
      <div className={styles.oauthContainer}>
        <button className={styles.oauthButton}>
          <img src={googleIcon} alt="google icon" />
          <span>Login with Google</span>
        </button>
        <button className={styles.oauthButton} onClick={handleMetaLogin}>
          <img src={metaIcon} alt="meta icon" />
          <span>Login with Meta</span>
        </button>
      </div>
    </div>
  );
}

export default Login;
