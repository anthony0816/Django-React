
import axios from "axios";


//Obtener todos los Usuarios del Sistema
export const getAllUsers = async () => {
    try {
        
        const token = localStorage.getItem("access_token"); 
        if (!token) throw new Error("No hay token, el usuario no está autenticado");
        
        
        const response = await axios.get("http://localhost:8000/tasks/api/v1/users/", {
            headers: {
                Authorization: `Bearer ${token}`, 
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

        
        return response.data;

    } catch (error) {
        console.error("Error al obtener usuarios:", error.response?.data || error.message);
    }
};


