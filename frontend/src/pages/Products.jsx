import { useState, useEffect, useContext } from "react";
import styles from "./Products.module.css";
import apiClient from "../lib/apiClient";
import { RouterContext } from "../lib/Router";
import { UserContext } from "../contexts/UserContext";

// TASK 8. Catalog
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
<<<<<<< Updated upstream
  const [sort, setSort] = useState("id__asc");
=======
  const [sort, setSort] = useState("id_asc");
  const { onLinkClick } = useContext(RouterContext);
  const { isLoggedIn } = useContext(UserContext);
>>>>>>> Stashed changes

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await apiClient.products({ search, sort });
      setProducts(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {}, [sort]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await apiClient.products();
      setLoading(false);
      setProducts(data);
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <>
      <div className={styles.searchContainer}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <select
            name="sort"
            className={styles.sortSelect}
            onChange={(e) => setSort(e.target.value)}
            value={sort}
          >
            <option value="id__asc" selected={sort === "id__asc"}>
              Sort by...
            </option>
            <option value="price__asc" selected={sort === "price__asc"}>
              Sort by price ASC
            </option>
            <option value="price__desc" selected={sort === "price__desc"}>
              Sort by price DESC
            </option>
            <option value="product_name__asc" selected={sort === "product_name__asc"}>
              Sort by name ASC
            </option>
            <option value="product_name__desc" selected={sort === "product_name__desc"}>
              Sort by name DESC
            </option>
          </select>
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </form>
        {isLoggedIn ? (
          <a
            href="/products/new"
            className={styles.updateButton}
            onClick={onLinkClick}
          >
            Create
          </a>
        ) : null}
      </div>
      <div className={styles.gridContainer}>
        {products.map((product) => (
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
              <a
                className={styles.productButton}
                href={`/products/${product.id}`}
                onClick={onLinkClick}
              >
                Детали
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
