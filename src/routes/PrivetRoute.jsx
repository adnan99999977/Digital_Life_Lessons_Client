import { Navigate, useLocation } from "react-router-dom"; // ✅ FIX
import { AuthContext } from "../auth/AuthContext";
import { useContext } from "react";
import Loading from "../components/shared/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <Navigate
        to="/log-in"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
};

export default PrivateRoute;
