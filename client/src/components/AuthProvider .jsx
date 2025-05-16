// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Necesitarás instalar: npm install jwt-decode
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // Para mostrar carga mientras verificamos
    
    useEffect(() => {
    const verifyToken = () => {
        const token = localStorage.getItem('access_token');
        
        if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
        }

        try {
        // Verificar si el token ha expirado
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();
        
        if (isExpired) {
            localStorage.removeItem('access_token');
            setIsAuthenticated(false);
        } else {
            setIsAuthenticated(true);
        }
        } catch (error) {
        localStorage.removeItem('access_token');
        setIsAuthenticated(false);
        } finally {
        setLoading(false);

        }
    };

    verifyToken();
    }, []);

    return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading }}>
        {children}
    </AuthContext.Provider>
    );
};