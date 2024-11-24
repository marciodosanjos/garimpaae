import React from "react";

const AdminAuthRoute = ({ children }) => {
  //get user from localStorage
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const isAdmin = !user?.userFound?.isAdmin ? true : false;
  if (!isAdmin) {
    return <h1>Denied, Admin only</h1>;
  }
  return <>{children}</>;
};

export default AdminAuthRoute;
