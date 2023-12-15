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
  users,
};

export default client;
