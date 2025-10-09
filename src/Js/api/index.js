import axios from "axios";

// Stores
import { useAuthStore } from "../../stores/authStore";
import { useSchoolStore } from "../../stores/schoolStore";

// UI
import { message } from "antd";

const api = axios.create({
    baseURL: "http://127.0.0.1/api",
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

        //~ Si el token expira o no es válido
        if (status === 401) {
            message.error("Tu sesión ha expirado. Por favor inicia sesión nuevamente.");
            store.logout();
        }

        //~ Errores de validación o negocio
        else if (status === 422 && data?.errors) {
            const firstError = Object.values(data.errors)[0][0];
            message.error(firstError);
        }

        // Errores de servidor o conexión
        else if (status >= 500) {
            message.error("Ocurrió un error en el servidor. Inténtalo más tarde.");
        }

        // Otros errores (como 404 o 400)
        else {
            message.error(data?.message || "Error al procesar la solicitud.");
        }

        return Promise.reject(error);
    }
);

export { api };