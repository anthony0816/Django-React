// src/components/ProtectedRoutes.jsx
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthProvider ';

export const ProtectedRoutes = () => {
    const { isAuthenticated, loading } = useContext(AuthContext);

    if (loading) {
    return <div className="loading-spinner">Cargando...</div>; // Puedes personalizar esto
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};