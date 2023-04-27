import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ProtectedRoutePropTypes } from "./ProtectedRoute.props";

const ProtectedRoute = ({ children }) => {
  const [cookies] = useCookies(["token"]);

  if (cookies?.token) return children;
  else return <Navigate to="/login" replace />;
};

ProtectedRoute.propTypes = ProtectedRoutePropTypes;

export default ProtectedRoute;
