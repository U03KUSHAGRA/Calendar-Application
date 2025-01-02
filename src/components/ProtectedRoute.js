// src/components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAuthenticated, isAdmin, requiredRole }) => {
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/" />;
  }

  if (requiredRole && requiredRole !== (isAdmin ? 'admin' : 'user')) {
    // Redirect to appropriate dashboard if role doesn't match
    return <Navigate to={isAdmin ? '/admin-dashboard' : '/user-dashboard'} />;
  }

  return children;
};

export default ProtectedRoute;
