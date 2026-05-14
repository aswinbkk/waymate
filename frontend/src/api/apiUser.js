const baseUrl = "http://localhost:3000";

export const loginUser = async (postData) => {
    try {
        const response = await fetch(`${baseUrl}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        });
        console.log("Response is", response);
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error:", error);
        return null;

    }
};