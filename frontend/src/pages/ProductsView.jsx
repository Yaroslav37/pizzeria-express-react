import { useState, useEffect, useContext } from "react";
import apiClient from "../lib/apiClient";
import styles from "./Products.module.css";
import { RouterContext } from "../lib/Router";
import { UserContext } from "../contexts/UserContext";
import { toast } from "react-toastify";
// TASK 3. View page with DELETE, UPDATE

const ProductsView = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { onLinkClick } = useContext(RouterContext);
  const { isLoggedIn, isInitialized } = useContext(UserContext);
  const { onNavigate } = useContext(RouterContext);

  const handleDelete = async () => {
    try {
      await apiClient.deleteProduct(productId);
      onNavigate("/products");
      toast.success("Product deleted successfully");
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await apiClient.product(productId);
        setLoading(false);
        setProduct(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [productId]);

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <>
      <div className={styles.productCard} key={product.id}>
        <img
          src={product.image_url}
          alt="Product Image"
          className={styles.productImage}
        />
        <div className={styles.productDetails}>
          <h3 className={styles.productName}>{product.product_name}</h3>
          <p className={styles.productDescription}>{product.description}</p>
          <div className={styles.productPrice}>{product.price} руб.</div>
        </div>
        {isLoggedIn ? (
          <button className={styles.deleteButton} onClick={handleDelete}>
            Delete
          </button>
        ) : null}
        {isLoggedIn ? (
          <a
            href={`/products/edit/${productId}`}
            className={styles.updateButton}
            onClick={onLinkClick}
          >
            Edit
          </a>
        ) : null}
      </div>
    </>
  );
};

export default ProductsView;
