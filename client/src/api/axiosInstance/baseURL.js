import axios from "axios";

export const baseURL = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});
