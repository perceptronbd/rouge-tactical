import { authURL } from "../axiosInstance/authURL";

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
  const token = sessionStorage.getItem("token");
  try {
    const res = await authURL(token).post("/admin/user/addEmployee", data);

    console.log("res", res.data);

    return res;
  } catch (error) {
    console.log("error status code:", error);
    return error.response;
  }
};
