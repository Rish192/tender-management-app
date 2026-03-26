// src/services/tenderService.js

import { apiClient } from "./apiClient";

export const getTenders = () => apiClient("/tenders");

export const uploadTender = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return fetch("/tenders/upload", {
    method: "POST",
    body: formData,
  });
};

export const getTenderById = (id) =>
  apiClient(`/tenders/${id}`);