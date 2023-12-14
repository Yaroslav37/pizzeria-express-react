import { useContext } from "react";
import { RouterContext } from "../lib/Router";

import styles from "./Layout.module.css";
import { UserContext } from "../contexts/UserContext";

const Layout = ({ children }) => {
  const { onLinkClick } = useContext(RouterContext);
  const { name, isLoggedIn, logout } = useContext(UserContext);

  return (
    <div>
      <header className={styles.header}>
        <ul className={styles.navlinks}>
          <li className={styles.navlink} key="home">
            {/* TASK: 9.4 - event handler onLinkClick */}
            <a href="/" onClick={onLinkClick}>
              Home
            </a>
          </li>
          <li className={styles.navlink} key="products">
            {/* TASK: 9.4 - event handler onLinkClick */}
            <a href="/products" onClick={onLinkClick}>
              Products
            </a>
          </li>
          {isLoggedIn ? (
            <li className={styles.navlink} key="orders">
              {/* TASK: 9.4 - event handler onLinkClick */}
              <a href="/orders" onClick={onLinkClick}>
                Orders
              </a>
            </li>
          ) : null}
          {isLoggedIn ? (
            <li className={styles.navlink} key="users">
              {/* TASK: 9.4 - event handler onLinkClick */}
              <a href="/users" onClick={onLinkClick}>
                Users
              </a>
            </li>
          ) : null}
          {!isLoggedIn ? (
            /* TASK: 9.4 - event handler onLinkClick */
            <li className={styles.navlink} key="login">
              <a href="/login" onClick={onLinkClick}>
                Login
              </a>
            </li>
          ) : null}
          {isLoggedIn ? (
            <li className={styles.navlink} key="logout">
              {/* TASK: 9.4 - event handler logout */}
              <a href="#" onClick={logout}>
                Logout
              </a>
            </li>
          ) : null}
        </ul>
        {isLoggedIn && name ? (
          <span className={styles.userName}>Hi, {name}. </span>
        ) : null}
      </header>
      <section className={styles.pageContainer}>{children}</section>
    </div>
  );
};

export default Layout;
