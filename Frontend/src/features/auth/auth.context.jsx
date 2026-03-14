import { useState } from "react";
import { createContext } from "react";

// This is the state layer 
const AuthContext = createContext()

export const AuthProvider = ({children}) => {
        const [user, setUser] = useState(null)
        const [loading, setloading] = useState(false)
        const [error, setError] = useState(null)

        return (
            <AuthContext.Provider value={{user,setUser,loading,setloading,error,setError}}>
                {children}
            </AuthContext.Provider>
        )
    }
export default AuthContext