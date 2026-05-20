import { use } from "react";
import { Navigate, useLocation } from "react-router";
import Loading from "../Pages/Loading/Loding";
import AuthContext from "../Firebase/AuthContext";

const PrivetRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();
  if (loading) {
    return <Loading></Loading>;
  }
  if (user) {
    return children;
  }
  return <Navigate to={"/login"} state={location?.pathname}></Navigate>;
};

export default PrivetRoute;
