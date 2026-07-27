import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function ProtectedRoute() {
  const { user } = useAuth();
  const hasToken = !!localStorage.getItem("ndc_admin_token");
  if (!user && !hasToken) return <Navigate to="/login" replace />;
  return <Outlet />;
}
