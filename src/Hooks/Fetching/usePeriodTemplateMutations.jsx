import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationStore } from "../../stores/notificationStore";
import { api } from  "@js/api";
import { App as AntApp } from "antd";
import { queryKeys } from "../../Js/Utilities/QueryKeys";
import { useSchoolStore } from "../../stores/schoolStore";
//* Componentes
import ButtonCloseNotification from "../../Components/Utilities/ButtonCloseNotification";
import NotificationContentError from "../../Components/Utilities/NotificationContentError";

import { sanitizeFormDates } from "../../Js/Utilities/Formatters";


export function usePeriodTemplateMutations() {
    
    const queryClient = useQueryClient();
    const schoolId = useSchoolStore((state) => state.currentSchoolId);
    const apiNotifications = useNotificationStore.getState().notificationApi;
    const { message: messageApi } = AntApp.useApp ? AntApp.useApp() : { message: null };

    function close (key){
        if(apiNotifications) apiNotifications.destroy(key);
    }

    // Mutacion para registro
    const addPeriodTemplate = useMutation({
        mutationFn: (formData) => { 

            let subperiodosEscolares = [];

            if(formData.subperiodosEscolares){
                subperiodosEscolares = formData.subperiodosEscolares.map(el => ({
                    school_subperiod_id: el.tipoSubperiodo,
                    name: el.nombre,
                    order_number: el.numeroOrdinal,
                    start_date: sanitizeFormDates(el.fechaInicio),
                    end_date: sanitizeFormDates(el.fechaFin)
                }));
            }
            
            
            const formatData = {
                school_period: {
                    name: formData.periodoEscolar.nombre,
                    school_year_id: formData.periodoEscolar.cicloEscolar,
                    school_period_id: formData.periodoEscolar.tipoPeriodoEscolar,
                    order_number: formData.periodoEscolar.numeroOrdinal,
                    start_date: sanitizeFormDates(formData.periodoEscolar.fechaInicio),
                    end_date: sanitizeFormDates(formData.periodoEscolar.fechaFin)
                },
                school_subperiods: subperiodosEscolares
            }
            
            return api.post('/schoolPeriods', formatData);
        },
        onSuccess: (res) => {
            messageApi.success('Periodo escolar registrado con éxito');
            queryClient.invalidateQueries({ queryKey: queryKeys.periodTemplates(schoolId)});
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
        postNewSchoolPeriod: addPeriodTemplate.mutate,
        isPending: addPeriodTemplate.isPending,
        isSuccess: addPeriodTemplate.isSuccess,
    };

}