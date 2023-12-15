import { useState, useEffect, useContext } from "react";
import apiClient from "../lib/apiClient";
import styles from "./Products.module.css";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/UserContext";
import { RouterContext } from "../lib/Router";

// TASK 3. Update
const ProductsEdit = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatedProduct, setUpdatedProduct] = useState(null);
  const [error, setError] = useState(null);
  const { isLoggedIn, isInitialized } = useContext(UserContext);
  const { onNavigate } = useContext(RouterContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setError(null);
    setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!isLoggedIn && isInitialized) {
      onNavigate("/");
    }
  }, [isLoggedIn, onNavigate, isInitialized]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!updatedProduct.product_name) {
      setError("Product name is required");
      return;
    }
    if (!updatedProduct.price) {
      setError("Price is required");
      return;
    }
    if (!updatedProduct.description) {
      setError("Description is required");
      return;
    }
    try {
      const { data } = await apiClient.updateProduct(productId, updatedProduct);
      setProduct(data);
      toast.success("Product updated successfully");
    } catch (e) {
      console.error(e);
      setError(e.response.data.error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await apiClient.product(productId);
        setLoading(false);
        setProduct(data);
        setUpdatedProduct(data);
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
    <form onSubmit={handleSubmit}>
      <h2>Update product:</h2>
      <img src={product.image_url} alt="Product Image" />
      <br />
      <label className={styles.formLabel}>Product Name</label>
      <input
        className={styles.formInput}
        type="text"
        value={updatedProduct.product_name}
        onChange={handleInputChange}
        name="product_name"
      />
      <label className={styles.formLabel}>Price</label>
      <input
        className={styles.formInput}
        type="number"
        value={updatedProduct.price}
        onChange={handleInputChange}
        name="price"
      />
      <label className={styles.formLabel}>Description</label>
      <br />
      <textarea
        type="number"
        value={updatedProduct.description}
        onChange={handleInputChange}
        name="description"
        className={styles.formTextarea}
      />
      {error ? <p className={styles.errorMessage}>{error}</p> : null}
      <button type="submit" className={styles.submitButton}>
        Update
      </button>
    </form>
  );
};

export default ProductsEdit;
