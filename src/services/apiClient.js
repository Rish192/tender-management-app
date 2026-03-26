// src/services/apiClient.js

const BASE_URL = "http://localhost:3000"; // change later

export const apiClient = async (url, options = {}) => {
  try {
    const response = await fetch(BASE_URL + url, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    return response.json();
  } catch (error) {
    console.error("API Error:", error);
  }
};