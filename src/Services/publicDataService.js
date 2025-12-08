import { api } from '../Js/api';

const publicDataService = {

    getRegisterFormData: async () => {
        const response = await api.get('/dataNewUser', { global: true });
        return response.data.data;
    },

    getOnBoardEmployeeFormData: async () => {
        const response = await api.get('/dataOnBoardEmployee', { global: true });
        return response.data.data;
    },

    getSystemEmployees: async () => {
        const response = await api.get('/allemployees', { global: true });
        return response.data.data;
    },

    getPeriodTemplateFormData: async () => {
        const response = await api.get('/dataNewPeriodTemplate', { global: true });
        return response.data.data;
    },

    getNewGroupFormData: async () => {
        const response = await api.get('/dataNewGroup');
        return response.data.data;
    }



}

Object.freeze(publicDataService);

export default publicDataService;