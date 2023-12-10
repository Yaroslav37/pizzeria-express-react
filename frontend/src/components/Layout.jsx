import { useContext } from "react";
import { RouterContext } from "../lib/Router";

import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  const { onLinkClick } = useContext(RouterContext);

  return (
    <div>
      <header className={styles.header}>
        <ul className={styles.navlinks}>
          <li className={styles.navlink} key="home">
            <a href="/" onClick={() => onLinkClick("/")}>
              Home
            </a>
          </li>
          <li className={styles.navlink} key="products">
            <a href="/products" onClick={() => onLinkClick("/products")}>
              Products
            </a>
          </li>
          <li className={styles.navlink} key="login">
            <a href="/login" onClick={() => onLinkClick("/login")}>
              Login
            </a>
          </li>
        </ul>
      </header>
      <section className={styles.pageContainer}>{children}</section>
    </div>
  );
};

export default Layout;
