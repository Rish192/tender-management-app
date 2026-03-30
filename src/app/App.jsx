// src/app/App.jsx

import AppRoutes from "./routes";
import { UIProvider, useUI } from "../store/uiStore.jsx";
import { TenderProvider } from "../store/tenderStore.jsx";

// ✅ IMPORT PANEL
import NotificationPanel from "../components/common/NotificationPanel";

// 🔥 CREATE INNER COMPONENT (THIS IS KEY)
const GlobalUI = () => {
  const { notificationPanelOpen, setNotificationPanelOpen, panelNotifications } = useUI();

  // const dummyNotifications = [
  //   { id: 1, text: "Tender processed successfully", type: "close" },
  //   { id: 2, text: "CBA validation completed", type: "mark_read" },
  // ];

  return (
    <NotificationPanel
      open={notificationPanelOpen}
      onClose={() => setNotificationPanelOpen(false)}
      notifications={panelNotifications}
      onView={(n) => console.log("Navigate to tender: ", n.notification_id)}
      onCloseItem={(n) => console.log("Mark as read: ", n.notification_id)}
    />
  );
};

function App() {
  return (
    <UIProvider>
      <TenderProvider>
        {/* ROUTES */}
        <AppRoutes />

        {/* 🔥 GLOBAL PANEL (WORKS EVERYWHERE) */}
        <GlobalUI />
      </TenderProvider>
    </UIProvider>
  );
}

export default App;