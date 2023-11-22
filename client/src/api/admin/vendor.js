import { authURL } from "../axiosInstance/authURL";

export const createVendor = async (data) => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await authURL(token).post("/vendor/createVendor", data);
    console.log("res:", res);
    return res;
  } catch (error) {
    console.log("error:", error.response);
    return error.response;
  }
};

export const getAllVendors = async () => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await authURL(token).get("/vendor/getAllVendor");
    return res;
  } catch (error) {
    console.log("error:", error.response);

    return error.response;
  }
};
