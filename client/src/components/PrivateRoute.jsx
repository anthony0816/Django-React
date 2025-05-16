import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider ';
import { useContext } from 'react';

export const PrivateRoute = ({ element }) => {
  const {isAuthenticated} = useContext(AuthContext);
  return isAuthenticated ? element : <Navigate to="/" />;
};
