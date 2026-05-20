import React, { createContext, useState } from 'react'

export const AuthProvider = createContext()

const AuthContext = ({ children }) => {
    const [user, setUser] = useState(null)
    return (
        <AuthProvider.Provider value={{ user, setUser }}>
            {children}
        </AuthProvider.Provider>
    )
}

export default AuthContext