const baseUrl = "http://localhost:3000";

export const getData = async (searchData) => {
    try {
        const response = await fetch(`${baseUrl}/user-ride/search`,
            {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(searchData)
        });
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
            throw new Error(data.msg || "Failed to fetch data");
        }
        return data;

    } catch (error) {
        console.log("Error:", error);
        return null;
    }
};