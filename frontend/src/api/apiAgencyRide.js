const baseUrl = "http://localhost:3000/agency-ride";

// Create agency ride
export const createAgencyRide = async (rideData) => {
  try {
    const response = await fetch(`${baseUrl}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(rideData)
    });
    const data = await response.json();
    console.log("Create Agency Ride:", data);
    return data;

  } catch (error) {
    console.error("Create Agency Ride Error:", error);
    return null;
  }
};

// Update agency ride
export const updateAgencyRide = async (id, updatedData) => {
  try {
    const response = await fetch(`${baseUrl}/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(updatedData)
    });
    const data = await response.json();
    console.log("Update Agency Ride:", data);
    return data;

  } catch (error) {
    console.error("Update Agency Ride Error:", error);
    return null;
  }
};

// Delete agency ride
export const deleteAgencyRide = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/delete/${id}`, {
      method: "DELETE",
      credentials: "include"
    });
    const data = await response.json();
    console.log("Delete Agency Ride:", data);
    return data;

  } catch (error) {
    console.error("Delete Agency Ride Error:", error);
    return null;
  }
};

// Add passenger
export const addPassenger = async (id, userId) => {
  try {
    const response = await fetch(`${baseUrl}/add-passenger/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ userId })
    });
    const data = await response.json();
    console.log("Add Passenger:", data);
    return data;

  } catch (error) {
    console.error("Add Passenger Error:", error);
    return null;
  }
};

// Remove passenger
export const removePassenger = async (id, userId) => {
  try {
    const response = await fetch(`${baseUrl}/remove-passenger/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ userId })
    });
    const data = await response.json();
    console.log("Remove Passenger:", data);
    return data;

  } catch (error) {
    console.error("Remove Passenger Error:", error);
    return null;
  }
};

// Agency dashboard
export const agencyDashboard = async () => {
  try {
    const response = await fetch(`${baseUrl}/dashboard`, {
      credentials: "include"
    });
    const data = await response.json();
    console.log("Agency Dashboard:", data);
    return data;

  } catch (error) {
    console.error("Agency Dashboard Error:", error);
    return null;
  }
};

// View agency created rides
export const viewAgencyCreatedRides = async () => {
  try {
    const response = await fetch(`${baseUrl}/view-created-rides`, {
      credentials: "include"
    });
    const data = await response.json();
    console.log("View Agency Created Rides:", data);
    return data;

  } catch (error) {
    console.error("View Agency Created Rides Error:", error);
    return null;
  }
};

// Search agency rides
export const searchAgencyRides = async (searchData) => {
  try {
    const response = await fetch(`${baseUrl}/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(searchData)
    });
    const data = await response.json();
    console.log("Search Agency Rides:", data);
    return data;

  } catch (error) {
    console.error("Search Agency Rides Error:", error);
    return null;
  }
};

// Get all agency rides
export const getAgencyRide = async () => {
  try {
    const response = await fetch(`${baseUrl}/view-all-ride`);
    const data = await response.json();
    console.log("Get Agency Ride:", data);
    return data;

  } catch (error) {
    console.error("Get Agency Ride Error:", error);
    return null;
  }
};