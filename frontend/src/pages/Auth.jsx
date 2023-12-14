import { useEffect, useContext } from "react";
import { ReactComponent as Spinner } from "../icons/spinner.svg";
import { UserContext } from "../contexts/UserContext";
import { RouterContext } from "../lib/Router";

const Auth = () => {
  const { isLoggedIn, updateJwtToken } = useContext(UserContext);
  const { onNavigate } = useContext(RouterContext);

  useEffect(() => {
    if (isLoggedIn) {
      onNavigate("/");
    } else {
      console.log({ isLoggedIn });
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const jwt = urlParams.get("jwt");
      updateJwtToken(jwt);
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