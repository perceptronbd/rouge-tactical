import { authURL } from "../axiosInstance/authURL";
import { baseURL } from "../axiosInstance/baseURL";

export const getAllUsers = async () => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await authURL(token).get("/admin/user/getAllUserData");

    console.log("res", res.data);

    return res.data;
  } catch (error) {
    console.log("error status code:", error.response.status);
    return error.response.data;
  }
};

export const createUser = async (data) => {
  try {
    const res = await baseURL.post("/auth/registration", data);

    console.log("res", res.data);

    return res.data;
  } catch (error) {
    console.log("error status code:", error);
    return error.response;
  }
};
