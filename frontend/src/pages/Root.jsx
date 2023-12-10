import { useContext } from "react";
import { RouterContext } from "../lib/Router";
import Login from "./Login";
import Products from "./Products"

const Root = () => {
  const { currentPath } = useContext(RouterContext);

  if (currentPath === "/login") {
    return <Login />;
  }

  if (currentPath === '/products') {
    return <Products />
  }

  if (currentPath === '/') {
    return <div>Home</div>
  }

  return <div>Not found</div>;
};

export default Root;
