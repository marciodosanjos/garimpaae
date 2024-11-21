import { jwtDecode } from "jwt-decode";
import React from "react";
import Login from "../../pages/Login/Login";

const isTokenValid = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    console.error("Invalid token", error);
    return false;
  }
};

const AuthRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const isLoggedIn = user?.token && isTokenValid(user.token);

  if (!isLoggedIn) {
    return <Login />;
  }
  return <>{children}</>;
};

export default AuthRoute;
