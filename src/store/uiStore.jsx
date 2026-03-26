// src/store/uiStore.jsx

import { createContext, useContext, useState } from "react";

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);

  // ✅ NEW (for Edit flow)
  const [selectedTenderId, setSelectedTenderId] = useState(null);

  // ✅ SEARCH MODAL
  const [searchOpen, setSearchOpen] = useState(false);

  // ✅ GLOBAL FILTER STATE
  const [filters, setFilters] = useState({
    name: "",
    date: "",
  });

  // ✅ 🔥 NEW: NOTIFICATION PANEL STATE
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);

  // ✅ GLOBAL NOTIFICATION (TOP RIGHT TOAST)
  const showNotification = (message) => {
    setNotification(message);
    setNotificationCount((prev) => prev + 1);

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <UIContext.Provider
      value={{
        // 🔹 Modals
        uploadOpen,
        setUploadOpen,
        editOpen,
        setEditOpen,
        searchOpen,
        setSearchOpen,

        // 🔹 Selected Tender
        selectedTenderId,
        setSelectedTenderId,

        // 🔹 Filters
        filters,
        setFilters,

        // 🔹 Notifications (Toast)
        notification,
        showNotification,
        notificationCount,

        // 🔥 NEW PANEL CONTROL
        notificationPanelOpen,
        setNotificationPanelOpen,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

// ✅ CUSTOM HOOK
export const useUI = () => useContext(UIContext);