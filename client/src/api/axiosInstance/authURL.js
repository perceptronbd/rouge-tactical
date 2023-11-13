import axios from "axios";

export const authURL = (token) => {
  return axios.create({
    baseURL: "http://localhost:5000/api/v1/admin",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
