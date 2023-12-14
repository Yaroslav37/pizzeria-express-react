import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3001",
});

const login = async ({ email, password }) => {
  const response = await apiClient.post("/login", { email, password });
  return response;
};

const client = {
  login,
};

export default client;
