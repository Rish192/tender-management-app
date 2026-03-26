// src/store/tenderStore.jsx

import { createContext, useContext, useState } from "react";

const TenderContext = createContext();

export const TenderProvider = ({ children }) => {
  const [tenders, setTendersState] = useState([]);

  // ✅ SET ALL TENDERS (used for API / refresh)
  const setTenders = (data) => {
    setTendersState(data);
  };

  // ✅ UPDATED (ID SAFETY FIX)
  const addTender = (tender) => {
    setTendersState((prev) => [
      {
        ...tender,
        id: tender.id || Date.now(), // 🔥 ensures unique ID always
      },
      ...prev,
    ]);
  };

  // ✅ UPDATE EXISTING TENDER
  const updateTender = (id, updatedData) => {
    setTendersState((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, ...updatedData } : t
      )
    );
  };

  return (
    <TenderContext.Provider
      value={{
        tenders,
        setTenders,
        addTender,
        updateTender,
      }}
    >
      {children}
    </TenderContext.Provider>
  );
};

// ✅ CUSTOM HOOK
export const useTenderStore = () => useContext(TenderContext);