import { authURL } from "../axiosInstance/authURL";

export const createProduction = async (data) => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await authURL(token).post(
      "/admin/production/createProduction",
      data
    );

    return res;
  } catch (error) {
    return error.response;
  }
};
