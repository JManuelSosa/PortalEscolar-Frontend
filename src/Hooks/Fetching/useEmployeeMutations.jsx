import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationStore } from "../../stores/notificationStore";
import { api } from  "@js/api";
import { App as AntApp } from "antd";
import { queryKeys } from "../../Js/Utilities/QueryKeys";
import { useSchoolStore } from "../../stores/schoolStore";
//* Componentes
import ButtonCloseNotification from "../../Components/Utilities/ButtonCloseNotification";
import NotificationContentError from "../../Components/Utilities/NotificationContentError";

//* Utilidades
import dayjs from "dayjs";
import dateKeys from "../../Js/Utilities/dateKeys";

export function useEmployeeMutations() {
    
    const queryClient = useQueryClient();
    const schoolId = useSchoolStore((state) => state.currentSchoolId);
    const apiNotifications = useNotificationStore.getState().notificationApi;
    const { message: messageApi } = AntApp.useApp ? AntApp.useApp() : { message: null };

    function close (key){
        if(apiNotifications) apiNotifications.destroy(key);
    }

    // Mutacion para registro
    const onBoardMutation = useMutation({
        mutationFn: (formData) => { 

            const data = Object.keys(formData).reduce((acc, key) => {
                const currentValue = formData[key];

                if(dateKeys.includes(key) && dayjs.isDayjs(currentValue)){
                    acc[key] = currentValue.format('YYYY-MM-DD');
                }
                else{
                    acc[key] = currentValue;
                }

                return acc;
            },{});
            
            const formatData = {
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
                },
                employee: {
                    entry_date: data.fecha_entrada,
                    comments: data.comentarios ?? null,
                    employee_role: data.rol
                },
                teacher: {
                    academic_degree: data.grado_academico ?? null,
                    career_name: data.carrera ?? null
                }
            }
            
            return api.post('/employees', formatData);
        },
        onSuccess: (res) => {
            messageApi.success('Empleado registrado con éxito');
            queryClient.invalidateQueries({ queryKey: queryKeys.employees(schoolId) });
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



    return {
        onBoardEmployee: onBoardMutation.mutate,
        isOnBoarding: onBoardMutation.isPending,
        isOnBoardingSuccess: onBoardMutation.isSuccess,
    };

}