// src/store/uiStore.jsx

import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { getNotificationsAPI, markNotificationAsReadAPI, updateTenderAPI } from "../api/tenderApi";
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

  // ✅ GLOBAL UPLOAD STATES
  const [isUploadingTender, setIsUploadingTender] = useState(false);
  const [isUploadingCba, setIsUploadingCba] = useState(false);

  // ✅ NEW (for Edit flow)
  const [selectedTenderId, setSelectedTenderId] = useState(null);

  // ✅ SEARCH MODAL
  const [searchOpen, setSearchOpen] = useState(false);

  // ✅ GLOBAL FILTER STATE
  const [filters, setFilters] = useState({
    name: "",
    date: "",
  });

  const shownNotificationsRef = useRef(new Set());

  // ✅ GLOBAL NOTIFICATION (TOP RIGHT TOAST)
  const showNotification = useCallback((message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  }, []);

  const refreshPanelNotifications = useCallback(async () => {
    const data = await getNotificationsAPI();
    if (Array.isArray(data)) {
      for (const newNotif of data) {
        const hasbeenShown = shownNotificationsRef.current.has(newNotif.notification_id);

        if (newNotif.status === "UNREAD" && !hasbeenShown) {
          if (newNotif.message && newNotif.message.includes("RFP Extraction completed")) {
            showNotification("Document extracted successfully");
            shownNotificationsRef.current.add(newNotif.notification_id);
          } 
          else if (newNotif.message && newNotif.message.includes("CBA Analysis is completed")) {
            if (newNotif.tender_id) {
              try {
                const payload = { tender_status: "CBA Completed" };
                await updateTenderAPI(newNotif.tender_id, payload);
              } catch (err) {
                console.error("Failed to update tender status: ", err);
              }
            }
          }
        }
      };

      setPanelNotifications(data);
      const unread = data.filter(n => n.status !== "READ").length;
      setNotificationCount(unread);
    }
  }, [showNotification]);

  const markAsRead = async (notificationId) => {
    try {
      await markNotificationAsReadAPI(notificationId);
      await refreshPanelNotifications();
    } catch (err) {
      console.error("Failed to mark notification as read: ", err);
    }
  };

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
        markAsRead,

        cbaUploadOpen,
        setCbaUploadOpen,

        // 🔹 Upload States
        isUploadingTender,
        setIsUploadingTender,
        isUploadingCba,
        setIsUploadingCba,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);