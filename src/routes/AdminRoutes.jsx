import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./../components/admin/AdminLayout";
import AdminDashboard from "./../components/admin/AdminDashboard";
import AdminLogin from "./../components/admin/AdminLogin";
import { useAuth } from "./../context/AuthContext";

const ProtectedAdminRoute = ({ children }) => {
  const { isAdmin } = useAuth();
  return isAdmin ? children : <Navigate to="/admin/login" replace />;
};

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route
        path="/*"
        element={
          <ProtectedAdminRoute>
            <AdminLayout />
          </ProtectedAdminRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
