import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

api.interceptors.request.use((config) => {
  const sessionData = sessionStorage.getItem("user");
  if (sessionData) {
    try {
      const parsedData = JSON.parse(sessionData);
      const token = parsedData.state.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error parsing session storage data", error);
      throw error;
    }
  }
  return config;
});
