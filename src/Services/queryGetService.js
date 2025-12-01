import { api } from "../Js/api";

const queryGetService = {

    getEmployees: async () => {
        const response = await api.get('/employees');
        return response.data.employees; // Devuelve solo los datos
    },

    getDivisions: async() => {
        const response = await api.get('/divisions');
        return response.data.divisiones;
    },

    getCareersByDivision: async (divisionId) => {
        const response = await api.get(`/divisions/${divisionId}/careers`);
        console.log(response.data.data);
        return response.data.data;
    }
}

Object.freeze(queryGetService);

export default queryGetService;