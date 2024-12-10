import React from "react";

const AdminAuthRoute = ({ children }) => {
  //const navigate = useNavigate();
  //get user from localStorage
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const isAdmin = user?.userFound?.isAdmin;

  if (!isAdmin) {
    return <p>Admin only</p>;
  }
  return <>{children}</>;
};

export default AdminAuthRoute;
