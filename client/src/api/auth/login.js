import { baseURL } from "../axiosInstance/baseURL";

export const loginAPI = async (email, password) => {
  try {
    const res = await baseURL.post("/auth/login", {
      email,
      password,
    });

    console.log("res", res.data);

    return res.data;
  } catch (error) {
    console.log("error status code:", error.response.status);
    return error.response.data;
  }
};
