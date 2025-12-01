import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationStore } from "../../stores/notificationStore";
import { api } from  "@js/api";
import { App as AntApp } from "antd";
import { queryKeys } from "../../Js/Utilities/QueryKeys";
import { useSchoolStore } from "../../stores/schoolStore";

//* Componentes
import ButtonCloseNotification from "../../Components/Utilities/ButtonCloseNotification";
import NotificationContentError from "../../Components/Utilities/NotificationContentError";


export function useCareerMutations(divisionId) {
    
    const queryClient = useQueryClient();
    const apiNotifications = useNotificationStore.getState().notificationApi;
    const schoolId = useSchoolStore((state) => state.currentSchoolId);
    const { message: messageApi } = AntApp.useApp ? AntApp.useApp() : { message: null };

    function close (key){
        if(apiNotifications) apiNotifications.destroy(key);
    }

    // Mutacion para registro
    const addCareer = useMutation({
        mutationFn: (formData) => { 
            
            const formatData = {
                name: formData.nombre,
                division_id: divisionId 
            }
            
            return api.post('/careers', formatData);
        },
        onSuccess: (res) => {
            messageApi.success('Carrera registrada con éxito');
            queryClient.invalidateQueries({ queryKey: queryKeys.careersByDivision(schoolId, divisionId) });
            queryClient.invalidateQueries({ queryKey: queryKeys.divisions(schoolId)})
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
        newCareer: addCareer.mutate,
        isPending: addCareer.isPending,
        isSuccess: addCareer.isSuccess,
    };

}