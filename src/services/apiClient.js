// src/services/apiClient.js

const BASE_URL = "http://18.205.19.187:8000"; // change later

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