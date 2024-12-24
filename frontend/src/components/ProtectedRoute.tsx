import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = !!localStorage.getItem("user-token");
  console.log(isAuthenticated);
  return isAuthenticated ? children : <Navigate to="../auth/signup" />;
};
