const baseUrl = "http://localhost:3000/user";

export const loginUser = async (postData) => {
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

export const registerUser = async (userData) => {

  try {

    const response = await fetch(
      `${baseUrl}/register`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify(userData)
      }
    );

    const data =
      await response.json();

    console.log("Response:", data);

    return data;

  } catch (error) {

    console.error(
      "Register User Error:",
      error
    );

  }

};