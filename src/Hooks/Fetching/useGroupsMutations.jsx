import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationStore } from "../../stores/notificationStore";
import { api } from  "@js/api";
import { App as AntApp } from "antd";
import { queryKeys } from "../../Js/Utilities/QueryKeys";
import { useSchoolStore } from "../../stores/schoolStore";
//* Componentes
import ButtonCloseNotification from "../../Components/Utilities/ButtonCloseNotification";
import NotificationContentError from "../../Components/Utilities/NotificationContentError";


export function useGroupMutations() {
    
    const queryClient = useQueryClient();
    const schoolId = useSchoolStore((state) => state.currentSchoolId);
    const apiNotifications = useNotificationStore.getState().notificationApi;
    const { message: messageApi } = AntApp.useApp ? AntApp.useApp() : { message: null };

    function close (key){
        if(apiNotifications) apiNotifications.destroy(key);
    }

    // Mutacion para registro
    const addGroupGlobal = useMutation({
        mutationFn: (formData) => { 
            
            const formatData = {
                name: formData.nombreGrupo,
                grade: formData.grado,
                group: formData.grupo,
                career: formData.carrera,
                shift: formData.turno,
                school_period: formData.periodo
            }
            
            return api.post('/groups', formatData);
        },
        onSuccess: (res, variables) => {
            messageApi.success('Grupo registrado con éxito');

            const divisionIdToInvalidate = res.data.meta?.division_id;
            queryClient.invalidateQueries({ queryKey: queryKeys.groups(schoolId) });
            
            if (divisionIdToInvalidate) queryClient.invalidateQueries({queryKey: queryKeys.careersByDivision(schoolId, divisionIdToInvalidate)});

            if (variables.carrera) queryClient.invalidateQueries({ queryKey: queryKeys.groupsByCareer(schoolId, variables.carrera) });
    
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
        addGroupGlobal: addGroupGlobal.mutate,
        isPendingGlobal: addGroupGlobal.isPending,
        isSuccessGlobal: addGroupGlobal.isSuccess,
    };

}