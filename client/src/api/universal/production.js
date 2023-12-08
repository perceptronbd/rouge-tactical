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

export const getAllProductions = async () => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await authURL(token).get("/admin/production/getProduction");

    return res;
  } catch (error) {
    return error.response;
  }
};

export const updateProduction = async (data) => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await authURL(token).put(
      "/admin/production/updateProduction",
      data
    );

    return res;
  } catch (error) {
    return error.response;
  }
};

export const deleteProduction = async (productionId) => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await authURL(token).delete(
      "/admin/production/deleteProduction/" + productionId
    );

    return res;
  } catch (error) {
    return error.response;
  }
};
