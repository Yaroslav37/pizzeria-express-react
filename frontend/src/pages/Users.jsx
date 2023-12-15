import { useState, useEffect, useContext } from "react";

import apiClient from "../lib/apiClient";

import styles from "./Users.module.css";
import { UserContext } from "../contexts/UserContext";
import { RouterContext } from "../lib/Router";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useContext(UserContext);
  const { onNavigate } = useContext(RouterContext);

  // TASK 12 - Restricting access to pages
  useEffect(() => {
    if (!isLoggedIn) {
      onNavigate("/login");
    }
  }, [isLoggedIn, onNavigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await apiClient.users();
        setLoading(false);
        setUsers(data);
      } catch (e) {
        console.error(e);
      }
    };
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <>
      <h1>Users</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>User ID</th>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>Email</th>
            <th className={styles.th}>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className={styles.td}>{user.id}</td>
              <td className={styles.td}>{user.name}</td>
              <td className={styles.td}>{user.email}</td>
              <td className={styles.td}>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table> 
    </>
  );
};

export default Users;
