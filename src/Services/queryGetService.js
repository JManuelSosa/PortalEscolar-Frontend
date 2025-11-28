import { api } from "../Js/api";

const queryGetService = {

    getEmployees: async () => {
        const response = await api.get('/employees');
        return response.data.employees; // Devuelve solo los datos
    }
}

Object.freeze(queryGetService);

export default queryGetService;