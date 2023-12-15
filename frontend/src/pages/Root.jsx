import { useContext } from "react";
import { RouterContext } from "../lib/Router";
import Login from "./Login";
import Products from "./Products";
import ProductsView from "./ProductsView";
import ProductsEdit from "./ProductsEdit";
import ProductsCreate from "./ProductsCreate";
import Auth from "./Auth";
import Home from "./Home";
import Orders from "./Orders";
import Users from "./Users";

const Root = () => {
  const { currentPath } = useContext(RouterContext);

  if (currentPath.match(/^\/auth/)) {
    return <Auth />;
  }

  if (currentPath === "/orders") {
    return <Orders />;
  }

  if (currentPath === "/login") {
    return <Login />;
  }

  if (currentPath.match(/^\/products\/edit\/\d+$/)) {
    const productId = currentPath.split("/")[3];
    return <ProductsEdit productId={productId} />;
  }

  if (currentPath.match(/^\/products\/\d+$/)) {
    const productId = currentPath.split("/")[2];
    return <ProductsView productId={productId} />;
  }

  if (currentPath === "/products/new") {
    return <ProductsCreate />;
  }

  if (currentPath === "/products") {
    return <Products />;
  }

  if (currentPath === "/users") {
    return <Users />;
  }

  if (currentPath === "/") {
    return <Home />;
  }

  return <div>Not found</div>;
};

export default Root;
