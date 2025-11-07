import { api } from '../Js/api';

const publicDataService = {

    getRegisterFormData: async () => {
        const response = await api.get('/dataNewUser', { global: true });
        return response.data.data;
    },

    getOnBoardEmployeeFormData: async () => {
        const response = await api.get('/dataOnBoardEmployee', { global: true });
        return response.data.data;
    }

}

Object.freeze(publicDataService);

export default publicDataService;