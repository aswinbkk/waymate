const baseUrl = "http://localhost:3000/user-ride";

export const getUserRide = async () => {
    try {
        const response = await fetch(`${baseUrl}/view-all-ride`);
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
    }
};

export const userJoinRide = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/join/${id}`, {
      method: "POST",
      credentials: "include"
    });
    const data = await response.json();
    console.log("join response", data);
    return data;

  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};