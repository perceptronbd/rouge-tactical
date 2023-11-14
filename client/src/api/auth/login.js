import { baseURL } from "../axiosInstance/baseURL";

export const loginAPI = async (email, password) => {
  try {
    const res = await baseURL.post("/auth/login", {
      email,
      password,
    });

    console.log("res", res);

    return res;
  } catch (error) {
    console.log("error status:", error.response);
    return error.response;
  }
};
