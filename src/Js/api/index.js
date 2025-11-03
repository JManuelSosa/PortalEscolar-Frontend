import axios from "axios";

// Stores
import { useAuthStore } from "../../stores/authStore";
import { useSchoolStore } from "../../stores/schoolStore";

// UI
import { message } from "antd";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

//? Interceptor para incluir los datos de Zustand
api.interceptors.request.use(
    (config) => {

        const authStore = useAuthStore.getState();
        const schoolStore = useSchoolStore.getState();
        authStore.checkExpiration(); //* Verificar si el token todavía le queda tiempo en cada petición.

        const token = authStore.token; //? Token global guardado en la sesión
        const schoolId = schoolStore.currentSchoolId;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        if(schoolId && !config.url.startsWith(`/${schoolId}`)) {
            config.url = `${schoolId}${config.url}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

//? Interceptor para manejar errores globales
api.interceptors.response.use(
    (response) => response, // simplemente devuelve la respuesta si todo va bien

    (error) => {
        const status = error.response?.status;
        const data = error.response?.data;
        const store = useAuthStore.getState();

        // Manejar errores de conexión
        if (!error.response) {
            message.error("Error de conexión. Verifica tu internet o si el servidor está activo.");
            return Promise.reject(error);
        }

        //~ Si el token expira o no es válido
        if (status === 401 && !requestUrl.endsWith('/login')) {
            message.error("Tu sesión ha expirado. Por favor inicia sesión nuevamente.");
            store.logout();
        }

        return Promise.reject(error);
    }
);

export { api };