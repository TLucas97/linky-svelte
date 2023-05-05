import axios from "axios";

const api = axios.create({
  baseURL: "https://linkshortener-production-99e0.up.railway.app/api",
});

export const createShortUrl = async (url: string) => {
  const data = await api.post("/create", { url });
  return data;
};

export const fetchUrlList = async () => {
  const data = await api.get("/list");
  return data;
};
