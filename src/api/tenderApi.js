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
  const tenders = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  const newTender = {
    id: Date.now(),
    number: Math.floor(Math.random() * 10000),
    name: file.name,
    dueDate: "10 Mar 2026",
    validityEnd: "12 Jun 2026",
    tat: "5 Days",
    validity: "7 Days",
    status: "Draft",
    date: "2026-03-10",
  };

  const updated = [newTender, ...tenders];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  return newTender;
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

// 🔹 UPLOAD CBA (SIMULATION)
export const uploadCBAAPI = async (id, file) => {
  const tenders = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  const updated = tenders.map((t) =>
    t.id === id ? { ...t, cbaUploaded: true } : t
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  return true;
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