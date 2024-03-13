import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import FullPageSpinner from "./FullPageSpinner";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  // 1. LOAD THE AUTHENTICATED USER
  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  // 2. IF THE USER IS LOADING, RETURN A SPINNER
  if (isLoading) return <FullPageSpinner />;

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
