import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/tasks';

// Interceptor para añadir el token a cada petición
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axios;