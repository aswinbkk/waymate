import React, { createContext, useState, useEffect } from "react";
import { getProfile } from "../api/apiUser";
import { getAgencyProfile } from "../api/apiAgency";

export const AuthProvider = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore Login
  useEffect(() => {
    const fetchUser = async () => {

      try {
        // Check User Login
        const userResponse = await getProfile();
        console.log("1",userResponse);
        

        if (userResponse?.success) {
          setUser({ ...userResponse.user, role: "user" });
          return;
        }

        // Check Agency Login
        const agencyResponse = await getAgencyProfile();
        console.log("2",agencyResponse);
        if (agencyResponse?.success) {
          setUser({ ...agencyResponse.agency, role: "agency" });

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
    <AuthProvider.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthProvider.Provider>
  );
};

export default AuthContextProvider;