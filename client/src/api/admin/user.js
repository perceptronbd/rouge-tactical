import { authURL } from "../axiosInstance/authURL";

export const getAllUsers = async () => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await authURL(token).get("/admin/user/getAllUserData");

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

    return res;
  } catch (error) {
    console.log("error status code:", error);
    return error.response;
  }
};

export const updateUser = async (userId, data) => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await authURL(token).put(
      "/admin/user/updateEmployee/" + userId,
      data
    );

    return res;
  } catch (error) {
    console.log("error status code:", error);
    return error.response;
  }
};

export const deleteUser = async (userId) => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await authURL(token).delete(
      "/admin/user/deleteEmployee/" + userId
    );

    return res;
  } catch (error) {
    console.log("error status code:", error);
    return error.response;
  }
};
