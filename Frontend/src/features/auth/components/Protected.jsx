import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router'

const Protected = ({children}) => {
    const {user,loading} = useAuth()
    if (loading) {
        // Show a loading spinner or placeholder while checking auth
        return <div>Loading...</div>;  // Replace with your preferred loading UI
    }
    if(!user || user===null) {
        return <Navigate to={"/login"} replace/>
    }
    return children
}

export default Protected