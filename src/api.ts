import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

export const createShortUrl = async (url: string) => {
  const data = await api.post("/create", { url });
  return data;
};

export const fetchUrlList = async () => {
  const data = await api.get("/list");
  return data;
};
