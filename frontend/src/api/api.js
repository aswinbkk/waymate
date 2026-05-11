const baseUrl = "http://localhost:3000";

export const getData = async () => {
    try {
        const response = await fetch(`${baseUrl}/user-ride/search`);

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        return await response.json();
    } catch (error) {
        console.error("Error:", error);
    }
};