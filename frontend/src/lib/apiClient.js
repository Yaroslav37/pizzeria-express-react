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

const client = {
  login,
  products,
};

export default client;
