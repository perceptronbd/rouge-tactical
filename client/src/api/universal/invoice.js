import { authURL } from "../axiosInstance/authURL";

export const createInvoice = async (data) => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await authURL(token).post("/invoice/createInvoice", data);

    return res;
  } catch (error) {
    return error.response;
  }
};

export const updateInvoice = async (data) => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await authURL(token).put("/invoice/updateInvoice", data);
    console.log("res:", res);
    return res;
  } catch (error) {
    console.log("error:", error.response);
    return error.response;
  }
};

export const deleteInvoice = async (data) => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await authURL(token).put("/invoice/deleteInvoice", data);

    return res;
  } catch (error) {
    return error.response;
  }
};

export const getAllInvoices = async (data) => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await authURL(token).get("/invoice/getAllInvoice", data);

    return res;
  } catch (error) {
    return error.response;
  }
};
