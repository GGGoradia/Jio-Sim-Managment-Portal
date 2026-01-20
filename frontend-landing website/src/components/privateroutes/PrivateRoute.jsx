import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/bussiness/login" replace />;
  }

  // Role check (only if roles are specified)
  if (
    allowedRoles &&
    (!user?.roles || !allowedRoles.some((r) => user.roles.includes(r)))
  ) {
    return <Navigate to="/bussiness/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
