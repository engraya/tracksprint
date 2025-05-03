import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";


const PrivateRoute = () => {
  const isLoggedIn = useSelector((state : RootState) => state.auth.currentUser);
  return !isLoggedIn  ? <Navigate to="/auth" /> : <Outlet />;
  
};

export default PrivateRoute;