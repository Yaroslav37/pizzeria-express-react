import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3001",
});

const login = async ({ email, password }) => {
  const response = await apiClient.post("/login", { email, password });
  return response;
};

const products = async (params = {}) => {
  const response = await apiClient.get("/products", { params });
  return response;
};

const product = async (id) => {
  const response = await apiClient.get(`/products/${id}`);
  return response;
};

const updateProduct = async (id, data) => {
  const response = await apiClient.put(`/products/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response;
};

const createProduct = async (data) => {
  const response = await apiClient.post(`/products`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response;
};

const deleteProduct = async (id) => {
  const response = await apiClient.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response;
};

const orders = async () => {
  const response = await apiClient.get("/orders", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response;
};

const users = async () => {
  const response = await apiClient.get("/users", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response;
};

const client = {
  login,
  products,
  orders,
<<<<<<< Updated upstream
  users,
=======
  product,
  updateProduct,
  createProduct,
  deleteProduct,
>>>>>>> Stashed changes
};

export default client;
