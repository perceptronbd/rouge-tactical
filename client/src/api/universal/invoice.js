import { authURL } from "../axiosInstance/authURL";

export const createInvoice = async (data) => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await authURL(token).post("/invoice/createInvoice", data);
    console.log("res:", res);
    return res;
  } catch (error) {
    console.log("error:", error.response);
    return error.response;
  }
};

export const getAllInvoices = async (data) => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await authURL(token).get("/invoice/getAllInvoice", data);
    console.log("res:", res);
    return res;
  } catch (error) {
    console.log("error:", error.response);
    return error.response;
  }
};