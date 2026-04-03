  import axios from "axios";

  const api = axios.create({
      baseURL:"http://localhost:3000",
      withCredentials:true //by default axios prevents accessing cookies hence we allow it
  })
  export const register = async ({username,password,email}) => {
    try {
      const response = await api.post(
        "/api/auth/register",
        {
          username,
          email,
          password,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };

  export const login = async ({password,email}) => {
    try {
      const response = await api.post(
        "/api/auth/login",
        {
          email,
          password,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  export const logout = async () => {
    try {
      const response = await api.get("/api/auth/logout");

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Logout failed");
    }
  };

  export const getme = async () => {
    try {
      const response = await api.get("/api/auth/get-me");

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  export default { register, login, logout, getme };
