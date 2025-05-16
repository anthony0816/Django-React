import axios from 'axios';

const API_URL = 'http://localhost:8000/tasks';  // URL de tu backend Django

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/api/token/`, {
            username,
            password,
        });
        const { access, refresh } = response.data;
        
        // Guarda los tokens en localStorage (o en un estado global como Redux/Context)
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        
        return response;  // Devuelve el token de acceso
    } catch (error) {
        console.error("Error en login:", error.response.data);
        throw error;  // Propaga el error para manejarlo en el componente
    }
};