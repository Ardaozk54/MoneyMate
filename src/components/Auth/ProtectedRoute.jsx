import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthSkeleton from "../Skeleton/AuthSkeleton";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <AuthSkeleton />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
