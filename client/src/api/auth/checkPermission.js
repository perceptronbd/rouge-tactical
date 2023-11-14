import { authURL } from "../axiosInstance/authURL";

export const checkPermission = async (token) => {
  try {
    const res = await authURL(token).get("/role/checkPermission");

    console.log("res", res.data);

    return res.data;
  } catch (error) {
    console.log("error status code:", error.response.status);
    return error.response.data;
  }
};
