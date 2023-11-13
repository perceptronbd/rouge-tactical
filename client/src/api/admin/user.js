import { authURL } from "../axiosInstance/authURL";

export const getAllUsers = async () => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await authURL(token).get("/user/getAllUserData");

    return res.data;
  } catch (error) {
    console.log("error status code:", error.response.status);
    return error.response.data;
  }
};

export const createUser = async (data) => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await authURL(token).post("/user/addEmployee", data);

    return res;
  } catch (error) {
    console.log("error status code:", error);
    return error.response;
  }
};

export const updateUser = async (id, data) => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await authURL(token).put("/user/updateEmployee/" + id, data);

    return res;
  } catch (error) {
    console.log("error status code:", error);
    return error.response;
  }
};
