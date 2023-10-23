import { checkPermission } from "../auth/checkPermission";

export const isRoleAdmin = async (setLoading, setIsAdmin) => {
  const token = sessionStorage.getItem("token");
  console.log("isRoleAdmin");
  setLoading(true);
  const checkRole = async () => {
    try {
      const response = await checkPermission(token);

      if (response.data.role === "admin") {
        setIsAdmin(true);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  checkRole();
};
