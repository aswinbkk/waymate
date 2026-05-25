const baseUrl = "http://localhost:3000/agency";

// Register agency
export const registerAgency = async (agencyData) => {
  try {
    const response = await fetch(`${baseUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(agencyData)
    });
    const data = await response.json();
    console.log("Register Agency:", data);
    return data;

  } catch (error) {
    console.error("Register Agency Error:", error);
    return null;
  }
};

// Login agency
export const loginAgency = async (postData) => {

  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(postData)
    });
    const data = await response.json();
    console.log("Login Agency:", data);
    return data;

  } catch (error) {
    console.error("Login Agency Error:", error);
    return null;
  }
};

// Forgot password
export const forgotAgencyPassword = async (emailData) => {
  try {
    const response = await fetch(`${baseUrl}/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(emailData)
    });
    const data = await response.json();
    console.log("Forgot Password:", data);
    return data;

  } catch (error) {
    console.error("Forgot Password Error:", error);
    return null;
  }
};

// Reset password
export const resetAgencyPassword = async (resetData) => {
  try {
    const response = await fetch(`${baseUrl}/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(resetData)
    });
    const data = await response.json();
    console.log("Reset Password:", data);
    return data;

  } catch (error) {
    console.error("Reset Password Error:", error);
    return null;
  }
};

// Get profile
export const getAgencyProfile = async () => {
  try {
    const response = await fetch(`${baseUrl}/profile`, {
      method: "GET",
      credentials: "include"
    });
    const data = await response.json();
    console.log("Get Profile:", data);
    return data;

  } catch (error) {
    console.error("Get Profile Error:", error);
    return null;
  }
};

// Update profile
export const updateAgencyProfile = async (updatedData) => {
  try {
    const response = await fetch(`${baseUrl}/update-profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(updatedData)
    });
    const data = await response.json();
    console.log("Update Profile:", data);
    return data;

  } catch (error) {
    console.error("Update Profile Error:", error);
    return null;
  }
};