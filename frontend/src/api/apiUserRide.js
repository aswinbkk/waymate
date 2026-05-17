const baseUrl = "http://localhost:3000";

export const getUserRide = async () => {
    try {
        const response = await fetch(`${baseUrl}/user-ride/view-all-ride`);
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
    }
};

export const userJoinRide = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/user/join/${id}`, {
      method: "POST",
      credentials: "include"
    });
    return await response.json();

  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};