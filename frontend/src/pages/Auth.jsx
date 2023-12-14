import { useEffect, useContext } from "react";
import { ReactComponent as Spinner } from "../icons/spinner.svg";
import { UserContext } from "../contexts/UserContext";
import { RouterContext } from "../lib/Router";
import { toast } from "react-toastify";

// TASK: 9.1 - Arrow function component
const Auth = () => {
  const { isLoggedIn, updateJwtToken } = useContext(UserContext);
  const { onNavigate } = useContext(RouterContext);

  useEffect(() => {
    if (isLoggedIn) {
      onNavigate("/");
    } else {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const jwt = urlParams.get("jwt");
      if (jwt) {
        updateJwtToken(jwt);
        toast.success("You are now logged in!");
        onNavigate("/");
      }
    }
  }, [isLoggedIn, onNavigate, updateJwtToken]);

  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <h1>Singing you in!</h1>
      <Spinner />
    </div>
  );
};

export default Auth;
