import { useState, useEffect, useContext } from "react";

import apiClient from "../lib/apiClient";

import styles from "./Orders.module.css";
import { UserContext } from "../contexts/UserContext";
import { RouterContext } from "../lib/Router";

const Orders = () => {
  const [orders, setOrders] = useState([]);
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
        const { data } = await apiClient.orders();
        setLoading(false);
        setOrders(data);
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
      <h1>Orders</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Order ID</th>
            <th className={styles.th}>Product</th>
            <th className={styles.th}>Price</th>
            <th className={styles.th}>Order Date User Timezone</th>
            <th className={styles.th}>Order Date UTC</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className={styles.td}>{order.id}</td>
              <td className={styles.td}>{order.products[0].product_name}</td>
              <td className={styles.td}>{order.price}</td>
              {/* TASK 7: Display timezone UTC*/}
              <td className={styles.td}>
                {new Date(order.created_at).toLocaleString()}
              </td>
              <td className={styles.td}>
                {new Date(order.created_at).toISOString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Orders;
