import React from "react";

const PrivateRoute = ({ children }) => {
  // Bypass authentication and always allow access
  return children;
};

export default PrivateRoute;