import { useMutation } from "@tanstack/react-query";
import { useNotificationStore } from "../../stores/notificationStore";
import { api } from  "@js/api";
import { App as AntApp } from "antd";
import { queryKeys } from "../../Js/Utilities/QueryKeys";

//* Componentes
import ButtonCloseNotification from "../../Components/Utilities/ButtonCloseNotification";
import NotificationContentError from "../../Components/Utilities/NotificationContentError";

export function useEmployeeMutations() {

    const apiNotifications = useNotificationStore.getState().notificationApi;
    const { message: messageApi } = AntApp.useApp ? AntApp.useApp() : { message: null };

    function close (key){
        if(apiNotifications) apiNotifications.destroy(key);
    }

    // Mutacion para registro
    const onBoardMutation = useMutation({
        mutationFn: (formData) => { 
            
            const data = {...formData};
            
            if (data.birth_date) {
                data.birth_date = data.birth_date.format('YYYY-MM-DD');
            }

            if(data.entry_date) {
                data.entry_date = data.entry_date.format('YYYY-MM-DD');
            }
            
            const formatData = {
                person: {
                    name: data.name,
                    first_last_name: data.first_last_name,
                    second_last_name: data.second_last_name,
                    curp: data.curp,
                    gender: data.gender,
                    phone_number: data.phone_number,
                    birth_date: data.birth_date,
                    address: data.address,
                    state: data.state,
                    city_id: data.city
                },
                employee: {
                    entry_date: data.entry_date,
                    comments: data.comments ?? null,
                    employee_role: data.employee_role
                },
                teacher: {
                    academic_degree: data.academic_degree ?? null,
                    career_name: data.career_name ?? null
                }
            }
            
            return api.post('/employees', formatData);
        },
        onSuccess: (res) => {
            messageApi.success('Empleado registrado con éxito');
            queryClient.invalidateQueries({ queryKey: [queryKeys.employees] });
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