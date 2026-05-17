const baseUrl = "http://localhost:3000/agency-ride";

export const getAgencyRide = async () => {
    try {
        const response = await fetch(`${baseUrl}/view-all-ride`);
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
    }
};