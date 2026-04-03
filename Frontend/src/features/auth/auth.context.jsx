import { useState, createContext, useEffect } from "react";
import { getme } from "./services/auth.api";

// This is the state layer
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAndSetUser = async () => {
      try {
        const data = await getme();

        if (data) {
          setUser(data.user);
        } else setUser(null);
      } catch (err) {
        console.log("Error while getting and setting data");
        setError(err);
      } finally {
        setloading(false);
      }
    };

    getAndSetUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, setloading, error, setError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
