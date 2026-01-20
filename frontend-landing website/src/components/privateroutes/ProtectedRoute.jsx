import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../features/auth/authSlice";

const MAX_TIME = 1000 * 60 * 60 * 1; //  1 hour

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, loginTime } = useSelector(state => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/bussiness/login" replace />;
  }

  if (loginTime && Date.now() - loginTime > MAX_TIME) {
    dispatch(logOut());
    return <Navigate to="/bussiness/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
