import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Products.module.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:3001/products");
      setLoading(false);
      setProducts(data);
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <div className={styles.gridContainer}>
      {products.map((product) => (
        <div className={styles.productCard}>
          <img
            src={product.image_url}
            alt="Product Image"
            className={styles.productImage}
          />
          <div className={styles.productDetails}>
            <h3 className={styles.productName}>{product.product_name}</h3>
            <p className={styles.productDescription}>{product.description}</p>
            <div className={styles.productPrice}>{product.price} руб.</div>
            <a
              className={styles.productButton}
              href={`/products/${product.id}`}
            >
              Купить
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
