import React, { useContext } from "react";
import { UserContext } from "./context/user.context";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext);
  if (user !== null) {
    return children;
  }
  return <Navigate to="/" />;
}

export default ProtectedRoute;
