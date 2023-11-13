import { authURL } from "../axiosInstance/authURL";

export const getProfile = async (token) => {
  try {
    const response = await authURL(token).get(
      "/employee/profile/getEmployeeProfileData"
    );
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching users data:", error);
    return error.response.data;
  }
};

export const togglePreferredEmail = async (token) => {
  try {
    const response = await authURL(token).get(
      "/employee/profile/togglePreferredEmail"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users data:", error);
    return error.response.data;
  }
};
