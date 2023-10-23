import axios from "axios";

export const authURL = (token) => {
  console.log("token", token);
  return axios.create({
    baseURL: "http://localhost:5000/api/v1",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
