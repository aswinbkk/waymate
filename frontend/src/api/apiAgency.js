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

export const registerAgency = async (agencyData) => {

  try {

    const response = await fetch(
      `${baseUrl}/register`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify(agencyData)
      }
    );

    return await response.json();

  } catch (error) {

    console.error(
      "Register User Error:",
      error
    );

  }

};