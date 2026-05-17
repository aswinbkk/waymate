const baseUrl = "http://localhost:3000/agency";

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
        console.log("Login response", response);
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error:", error);
        return null;

    }
};

export const registerAgency = async () => {
    try {
        const response = await fetch(`${baseUrl}/view-all-ride`);
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
    }
};