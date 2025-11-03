import { api } from '../Js/api';

const publicDataService = {

    getRegisterFormData: async () => {
        const response = await api.get('/dataNewUser');
        return response.data.data;
    }
}

Object.freeze(publicDataService);

export default publicDataService;