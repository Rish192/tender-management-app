// src/api/tenderApi.js
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const STORAGE_KEY = "tenders_db";

// 🔹 GET ALL
export const getTenderListAPI = async () => {
  const response = await axios.get(`${BASE_URL}/tenders`, {
    headers: {
      'Accept': 'application/json',
    }
  });
  return response.data;
};

// 🔹 ADD
export const addTenderAPI = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${BASE_URL}/tender/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Add Tender API Error: ", error);
    throw error;
  }
};

// 🔹 GET ONE
export const getTenderDetailsAPI = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/tender/${id}`, {
      headers: { 'Accept': 'application/json' }
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching tender details:", err);
    return null;
  }
};

// 🔹 UPDATE (SAVE DRAFT)
export const updateTenderAPI = async (tenderId, payload) => {
  try{
    const response = await axios.put(`${BASE_URL}/tender/${tenderId}`, payload);
    return response.data;
  } catch (error) {
    console.error("API Error: ", error);
    throw error;
  }
};

export const getNotificationsAPI = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/notifications`, {
      headers: { 'Accept': 'application/json' }
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching notifications:", err);
    return [];
  }
};

export const markNotificationAsReadAPI = async (notification_id) => {
  try {
    const response = await axios.put(`${BASE_URL}/notification/${notification_id}/read`);
    return response.data;
  } catch (err) {
    console.error("Error marking notification as read:", err);
    throw err;
  }
};

// 🔹 UPLOAD CBA (SIMULATION)
export const uploadCBAAPI = async (tenderId, file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${BASE_URL}/tender/${tenderId}/cba/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("CBA Upload API Error: ", error);
    throw error;
  }
  // const tenders = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  // const updated = tenders.map((t) =>
  //   t.id === id ? { ...t, cbaUploaded: true } : t
  // );

  // localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  // return true;
};

// 🔹 SEND FOR CHECKING (SIMULATE PROCESSING → READY)
export const sendForCheckingAPI = async (id) => {
  const tenders = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  // Step 1: Processing
  let updated = tenders.map((t) =>
    t.id === id ? { ...t, status: "Processing" } : t
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  // Step 2: After delay → Ready
  setTimeout(() => {
    const latest = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    const finalData = latest.map((t) =>
      t.id === id ? { ...t, status: "Ready" } : t
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(finalData));
  }, 4000);

  return true;
};