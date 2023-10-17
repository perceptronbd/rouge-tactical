import axios from "axios";

export const loginAPI = async (
  email,
  password,
  setErrMsg,
  setShowModal,
  setIsError
) => {
  try {
    const res = await axios.post("http://localhost:5000/api/v1/auth/login", {
      email,
      password,
    });
    return res.data;
  } catch (error) {
    console.log("error status code:", error.response.status);
    if (error.response.status === 401) {
      setErrMsg("Invalid email or password");
      setShowModal(true);
      setIsError(true);
    } else {
      setErrMsg("Something went wrong");
      setShowModal(true);
      setIsError(true);
    }
  }
};
