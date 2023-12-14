import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiClient from "../lib/apiClient";

import styles from "./Login.module.css";

import googleIcon from "../icons/google.png";
import metaIcon from "../icons/meta.png";
import { UserContext } from "../contexts/UserContext";
import { RouterContext } from "../lib/Router";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, updateJwtToken } = useContext(UserContext);
  const { onNavigate } = useContext(RouterContext);

  useEffect(() => {
    if (isLoggedIn) {
      toast.warning("You are already logged in!");
      onNavigate("/");
    }
  });

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError(null);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError(null);
  };

  const validateForm = useCallback((email, password) => {
    if (!email) {
      setError("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Email is invalid");
      return false;
    }
    if (!password) {
      setError("Password is required");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    if (validateForm(email, password) === false) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await apiClient.login({ email, password });
      updateJwtToken(data.jwt);
      toast.success("You are now logged in!");
      onNavigate("/");
    } catch (e) {
      const response = e.response;
      const { error } = response.data;
      setError(error);
    }
    setLoading(false);
    // if (response)

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

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3001/auth/google";
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
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
        {error ? <div className={styles.error}>{error}</div> : null}
      </form>
      <div className={styles.oauthContainer}>
        <button className={styles.oauthButton} onClick={handleGoogleLogin}>
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
