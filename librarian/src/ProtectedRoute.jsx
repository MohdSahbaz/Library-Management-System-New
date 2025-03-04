import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Start with null

  useEffect(() => {
    const token = localStorage.getItem("librarianToken");
    setIsAuthenticated(!!token);
  }, []); // Run only on mount

  if (isAuthenticated === null) return <div>Loading...</div>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
