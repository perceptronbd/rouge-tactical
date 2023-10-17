import axios from "axios";

export const loginAPI = async (email, password) => {
  try {
    const res = await axios.post("http://localhost:5000/api/v1/auth/login", {
      email,
      password,
    });

    console.log("res", res.data);

    return res.data;
  } catch (error) {
    console.log("error status code:", error.response.status);
    return error.response.data;
  }
};
