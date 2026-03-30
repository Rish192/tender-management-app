// src/store/uiStore.jsx

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getNotificationsAPI } from "../api/tenderApi";
import NotificationPanel from './../components/common/NotificationPanel';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const [panelNotifications, setPanelNotifications] = useState([]);

  // ✅ NEW (for Edit flow)
  const [selectedTenderId, setSelectedTenderId] = useState(null);

  // ✅ SEARCH MODAL
  const [searchOpen, setSearchOpen] = useState(false);

  // ✅ GLOBAL FILTER STATE
  const [filters, setFilters] = useState({
    name: "",
    date: "",
  });

  // ✅ GLOBAL NOTIFICATION (TOP RIGHT TOAST)
  const showNotification = (message) => {
    setNotification(message);
    // setNotificationCount((prev) => prev + 1);

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const refreshPanelNotifications = useCallback(async () => {
    const data = await getNotificationsAPI();
    if (Array.isArray(data)) {
      setPanelNotifications(data);
      const unread = data.filter(n => n.status !== "READ").length;
      setNotificationCount(unread);
    }
  }, []);

  useEffect(() => {
    refreshPanelNotifications();
    const interval = setInterval(refreshPanelNotifications, 10000);
    return () => clearInterval(interval);
  }, [refreshPanelNotifications]);

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
        panelNotifications,
        refreshPanelNotifications
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

// ✅ CUSTOM HOOK
export const useUI = () => useContext(UIContext);