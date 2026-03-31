// src/store/uiStore.jsx

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getNotificationsAPI, markNotificationAsReadAPI } from "../api/tenderApi";
import NotificationPanel from './../components/common/NotificationPanel';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [cbaUploadOpen, setCbaUploadOpen] = useState(false);
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
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const refreshPanelNotifications = useCallback(async () => {
    const data = await getNotificationsAPI();
    if (Array.isArray(data)) {
      data.forEach(newNotif => {
        const isNew = !panelNotifications.some(old => old.notification_id === newNotif.notification_id);

        if (isNew && newNotif.status === "UNREAD") {
          if (newNotif.message && newNotif.message.includes("RFP Extraction completed")) {
            showNotification("Document extracted successfully");
          }
        }
      });

      setPanelNotifications(data);
      const unread = data.filter(n => n.status !== "READ").length;
      setNotificationCount(unread);
    }
  }, [panelNotifications, showNotification]);

  const markAllAsRead = async () => {
    const unreadIds = panelNotifications
      .filter((n) => n.status !== "READ")
      .map((n) => n.notification_id);

    if (unreadIds.length === 0) return;

    try {
      await Promise.all(unreadIds.map((id) => markNotificationAsReadAPI(id)));
      await refreshPanelNotifications();
    } catch (err) {
      console.error("Failed to mark notifications as read: ", err);
    }
  };

  useEffect(() => {
    if (notificationPanelOpen) {
      markAllAsRead();
    }
  }, [notificationPanelOpen]);

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
        refreshPanelNotifications,

        cbaUploadOpen,
        setCbaUploadOpen,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

// ✅ CUSTOM HOOK
export const useUI = () => useContext(UIContext);