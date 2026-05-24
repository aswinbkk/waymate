import React, { createContext, useState, useEffect } from "react";
import { getProfile } from "../api/apiUser";

export const AuthProvider = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore login on refresh
  useEffect(() => {
    const fetchUser = async () => {

      try {
        const response = await getProfile();
        
        if (response.success) {
            setUser(response.user);

        } else {
          setUser(null);
        }

      } catch (error) {
        console.error(error);
        setUser(null);

      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthProvider.Provider
      value={{ user, setUser, loading }} >
      {children}
    </AuthProvider.Provider>
  );
};

export default AuthContextProvider;