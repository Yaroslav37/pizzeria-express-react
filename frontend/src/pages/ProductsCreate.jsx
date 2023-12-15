import { useState, useEffect, useContext } from "react";
import apiClient from "../lib/apiClient";
import styles from "./Products.module.css";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/UserContext";
import { RouterContext } from "../lib/Router";

// TASK 3. Create
const ProductsCreate = () => {
  const [updatedProduct, setUpdatedProduct] = useState({
    image_url:
      "https://dodopizza-a.akamaihd.net/static/Img/Products/70834e6311c0483493bf2279dbc1718d_292x292.webp",
    product_name: "Пепперони",
    price: 12.99,
    description:
      "Пикантная пепперони, мно-о-ого моцареллы и томатный соус. Самая популярная пицца",
  });
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
      const { data } = await apiClient.createProduct(updatedProduct);
      toast.success("Product created successfully");
      onNavigate(`/products/${data.id}`);
    } catch (e) {
      console.error(e);
      setError(e.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create product:</h2>
      <img src={updatedProduct.image_url} alt="Product Image" />
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
        Create
      </button>
    </form>
  );
};

export default ProductsCreate;
