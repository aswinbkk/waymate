const baseUrl = "http://localhost:3000/user";

// Register User
export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${baseUrl}/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            }
        );
        const data = await response.json();
        console.log("Register Response:", data);
        return data;

    } catch (error) {
        console.error(
            "Register User Error:",
            error
        );
        return null;
    }
};

// Login User
export const loginUser = async (postData) => {

    try {
        const response = await fetch(`${baseUrl}/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(postData)
            }
        );
        const data = await response.json();
        console.log("Login Response:", data);
        return data;
    } catch (error) {
        console.error(
            "Login User Error:",
            error
        );
        return null;
    }
};

// Forgot Password
export const forgotPassword = async (emailData) => {

    try {
        const response = await fetch(`${baseUrl}/forgot-password`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(emailData)
            }
        );
        const data = await response.json();
        console.log("Forgot Password Response:", data);
        return data;

    } catch (error) {
        console.error(
            "Forgot Password Error:",
            error
        );
        return null;
    }
};

// Reset Password
export const resetPassword = async (resetData) => {

    try {
        const response = await fetch(`${baseUrl}/reset-password`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(resetData)
            }
        );
        const data = await response.json();
        console.log("Reset Password Response:", data);
        return data;

    } catch (error) {
        console.error(
            "Reset Password Error:",
            error
        );
        return null;
    }
};

// Get Profile
export const getProfile = async () => {

    try {
        const response = await fetch(`${baseUrl}/profile`,
            {
                method: "GET",
                credentials: "include"
            }
        );
        const data = await response.json();
        console.log("Profile Response:", data);
        return data;

    } catch (error) {
        console.error(
            "Get Profile Error:",
            error
        );
        return null;
    }
};

// Update Profile
export const updateProfile = async (updateData) => {

    try {
        const response = await fetch(`${baseUrl}/update-profile`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(updateData)
            }
        );
        const data = await response.json();
        console.log("Update Profile Response:", data);
        return data;

    } catch (error) {
        console.error(
            "Update Profile Error:",
            error
        );
        return null;
    }
};