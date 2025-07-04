import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const id = localStorage.getItem("userId");
    const email = localStorage.getItem("email");
    
    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role);
      setUserId(id);
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
      setUserId(null);
    }
    setLoading(false);
  };

  const login = (token, role, userId = null) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    if (userId) {
      localStorage.setItem("userId", userId.toString());
    }
    setIsAuthenticated(true);
    setUserRole(role);
    setUserId(userId);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("fullname");
    setIsAuthenticated(false);
    setUserRole(null);
    setUserId(null);
    
    // Dispatch custom event to notify other components of logout
    window.dispatchEvent(new CustomEvent('authChange'));
    
    navigate("/login", { replace: true });
  };

  return {
    isAuthenticated,
    userRole,
    userId,
    loading,
    login,
    logout,
    checkAuthStatus
  };
};

export default useAuth;
