// src/app/routes.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import TenderOverview from "../pages/TenderOverview";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tender/:id" element={<TenderOverview />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;