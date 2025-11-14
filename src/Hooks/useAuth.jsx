import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../stores/authStore"; 
import { useNotificationStore } from "../stores/notificationStore";
import { api } from  "../Js/api";
import { App as AntApp } from "antd";
import NotificationContentError from "../Components/Utilities/NotificationContentError";

//* Componentes
import ButtonCloseNotification from "../Components/Utilities/ButtonCloseNotification";

export function useAuth() {

    const { loginStore, logoutStore, token } = useAuthStore();
    const apiNotifications = useNotificationStore.getState().notificationApi;
    const { message: messageApi } = AntApp.useApp ? AntApp.useApp() : { message: null };

    function close (key){
        if(apiNotifications) apiNotifications.destroy(key);
    }

    // Mutation para login
    const loginMutation = useMutation({
        mutationFn: (credentials) => api.post('/login', credentials),
        onSuccess: (res) => {
            loginStore(res.data);
            messageApi.success('Inicio de sesión exitoso');
        },
        onError: (error) => {
            const data = error.response?.data;
            const key = `open${Date.now()}`;
            const btn = <ButtonCloseNotification onClick={ () => close(key) }/>

            if(apiNotifications){
                apiNotifications.error({
                    message: 'No fue posible iniciar sesión',
                    description: data.message || `Error: ${error.message || 'Error desconocido'}`,
                    actions: btn,
                    key,
                    placement: "topRight"
                });
            }

        }
    });

    // Mutacion para registro
    const registerMutation = useMutation({
        mutationFn: (formData) => { 
            
            const data = {...formData};
            
            if (data.fecha_nacimiento) {
                data.fecha_nacimiento = data.fecha_nacimiento.format('YYYY-MM-DD');
            }
            
            const formatData = {
                user: {
                    email: data.email,
                    password: data.password
                },
                person: {
                    name: data.nombre,
                    first_last_name: data.primer_apellido,
                    second_last_name: data.segundo_apellido,
                    curp: data.curp,
                    gender: data.genero,
                    phone_number: data.numero_telefonico,
                    birth_date: data.fecha_nacimiento,
                    address: data.direccion,
                    state: data.estado,
                    city_id: data.ciudad
                }
            }
            
            return api.post('/register', formatData);
        },
        onSuccess: (res) => {
            loginStore(res.data);
            messageApi.success('¡Registro exitoso! Bienvenido');
        },
        onError: (error) => {
            const data = error.response?.data;
            const key = `open${Date.now()}`;
            const btn = <ButtonCloseNotification onClick={ () => close(key) }/>

            let descriptionContent;

            if (data?.errors && Object.keys(data.errors).length > 0) {
                descriptionContent = <NotificationContentError data={data}/>
            } else {
                descriptionContent = data?.message || `Error: ${error.message || 'Error desconocido'}`;
            }

            if(apiNotifications){
                apiNotifications.error({
                    message: 'No fue posible completar el registro',
                    description: descriptionContent,
                    actions: btn,
                    key,
                    placement: "topRight"
                });
            }

        }
    });

    // Mutation para logout
    const logoutMutation = useMutation({
        mutationFn: () => api.post("/auth/logout"),
        onSuccess: () => {
            logoutStore();
            messageApi.info("Sesión cerrada correctamente");
        },
    });

    return {
        login: loginMutation.mutate,
        inLoginProcess: loginMutation.isPending,
        isLoginSuccess: loginMutation.isSuccess,
        
        register: registerMutation.mutate,
        isRegistering: registerMutation.isPending,
        isRegisterSuccess: registerMutation.isSuccess,

        logout: logoutMutation.mutate,
        isLoggingOut: logoutMutation.isPending,

        token,
    };

}