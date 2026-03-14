import { useContext } from "react";
import AuthContext from "../auth.context.jsx";
import { login, register, logout } from "../services/auth.api.js";

//This is the hook layer
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  const { user, setUser, loading, setloading, error, setError } = context;
    console.log(  `CONTEXT DESTRUCTURED : ${user}`)
  const handleLogin = async ({ email, password }) => {
    setloading(true);
    setError(null);
    try {
      const data = await login({ email, password });
      if (data) {
        setUser(data.user);
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setloading(false);
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    console.log("Inside useAuth handleRegister")
    setloading(true);
    setError(null);
    try {
      const data = await register({ username, email, password });
      console.log("Fetching data from register")
      if (data) {
        setUser(data.user);
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setloading(false);
    }
  };

  const handleLogout = async () => {
    setloading(true);
    setError(null);
    try {
      await logout();
      setUser(null);
    } catch (err) {
      setError(err.message || "Logout failed.");
    } finally {
      setloading(false);
    }
  };

  return { user, loading, error, handleLogin, handleLogout, handleRegister };
};
