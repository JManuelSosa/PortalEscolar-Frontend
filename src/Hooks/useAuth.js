import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../stores/authStore"; 
import { api } from  "../Js/api";
import { message } from "antd";

export function useAuth() {

    const { login, logout, token } = useAuthStore();

    // Mutation para login
    const loginMutation = useMutation({
        mutationFn: (credentials) => api.post('/login', credentials),
        onSuccess: (res) => {
            login(res.data); // Guardar en Zustand
            message.success('Inicio de sesión exitoso');
        },
    });

    // Mutation para logout
    const logoutMutation = useMutation({
        mutationFn: () => api.post("/auth/logout"),
        onSuccess: () => {
            logout();
            message.info("Sesión cerrada correctamente");
        },
    });

    return {
        login: loginMutation.mutate,
        logout: logoutMutation.mutate,
        isLoading: loginMutation.isLoading,
        token,
    };

}