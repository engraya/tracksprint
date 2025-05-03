import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";


const PublicRoute = () => {
  const isLoggedIn = useSelector((state : RootState) => state.auth.currentUser);
  const isAuthenticated = isLoggedIn;

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;