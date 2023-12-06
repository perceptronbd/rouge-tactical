import { authURL } from "../axiosInstance/authURL";

export const createPurchase = async (data) => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await authURL(token).post(
      "/purchaseOrder/createPurchaseOrder",
      data
    );

    return res;
  } catch (error) {
    return error.response;
  }
};

export const updatePurchase = async (data) => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await authURL(token).put("/purchase/updateInvoice", data);
    console.log("res:", res);
    return res;
  } catch (error) {
    console.log("error:", error.response);
    return error.response;
  }
};

export const deletePurchase = async (data) => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await authURL(token).put("/purchase/deleteInvoice", data);

    return res;
  } catch (error) {
    return error.response;
  }
};

export const getAllPurchases = async (data) => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await authURL(token).get(
      "/purchaseOrder/getAllPurchaseOrder",
      data
    );

    return res;
  } catch (error) {
    return error.response;
  }
};
