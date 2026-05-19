const baseUrl = "http://localhost:3000/user-ride";

// Get all rides
export const getUserRide = async () => {
    try {
        const response = await fetch(`${baseUrl}/view-all-ride`);
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

// Create ride
export const createUserRide = async (postData) => {
    try {
        const response = await fetch( `${baseUrl}/create`,
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
        return data;

    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};


// Update ride
export const updateUserRide = async (id, postData) => {
    try {
        const response = await fetch( `${baseUrl}/update/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(postData)
            }
        );
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};


// Delete ride
export const deleteUserRide = async (id) => {
    try {
        const response = await fetch(`${baseUrl}/delete/${id}`,
            {
                method: "DELETE",
                credentials: "include"
            }
        );
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

// Add passenger
export const addPassenger = async (id, userId) => {

    try {
        const response = await fetch(`${baseUrl}/add-passenger/${id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ userId })
            }
        );
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

// Remove passenger
export const removePassenger = async (id, userId) => {

    try {
        const response = await fetch(
            `${baseUrl}/remove-passenger/${id}`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ userId })
            }
        );
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

// Join ride
export const userJoinRide = async (id) => {
    try {
        const response = await fetch( `${baseUrl}/join/${id}`,
            {
                method: "POST",
                credentials: "include"
            }
        );
        const data = await response.json();
        console.log("join response", data);
        return data;

    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

// Leave ride
export const userLeaveRide = async (id) => {
    try {
        const response = await fetch(
            `${baseUrl}/leave/${id}`,
            {
                method: "POST",
                credentials: "include"
            }
        );
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

// User dashboard
export const userDashboard = async () => {
    try {
        const response = await fetch( `${baseUrl}/dashboard`,
            {
                credentials: "include"
            }
        );
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

// View created rides
export const viewUserCreatedRides = async () => {
    try {
        const response = await fetch(`${baseUrl}/created-rides`,
            {
                credentials: "include"
            }
        );
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

// View joined rides
export const viewUserJoinedRides = async () => {
    try {
        const response = await fetch(`${baseUrl}/joined-rides`,
            {
                credentials: "include"
            }
        );
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

// Search rides
export const searchUserRides = async (searchData) => {
    try {
        const response = await fetch(`${baseUrl}/search`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(searchData)
            }
        );
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};