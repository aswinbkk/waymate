import React, { createContext, useState, useEffect } from "react";
import { getProfile } from "../api/apiUser";
import { getAgencyProfile } from "../api/apiAgency";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore login session
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Try USER login
        const userResponse = await getProfile();

        if (userResponse?.success) {
          setUser({
            ...userResponse.user,
            role: "user",
          });
          return;
        }

        // Try AGENCY login
        const agencyResponse = await getAgencyProfile();

        if (agencyResponse?.success) {
          setUser({
            ...agencyResponse.agency,
            role: "agency",
          });
          return;
        }

        // No valid session
        setUser(null);
      } catch (error) {
        console.error("Auth error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;