import { useContext } from "react";
import { RouterContext } from "../lib/Router";
import Login from "./Login";
import Products from "./Products";
import Auth from "./Auth";
import Home from "./Home";

const Root = () => {
  const { currentPath } = useContext(RouterContext);

  if (currentPath.match(/^\/auth/)) {
    return <Auth />;
  }

  if (currentPath === "/login") {
    return <Login />;
  }

  if (currentPath === "/products") {
    return <Products />;
  }

  if (currentPath === "/") {
    return <Home />;
  }

  return <div>Not found</div>;
};

export default Root;
