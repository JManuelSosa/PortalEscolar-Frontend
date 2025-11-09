import { apiObjectToSelectOptions } from "../Utilities/Formatters";


//? Archivo de capa anticorrupción (ACL) para manejar la transformación de los datos que vienen que la api.
//? Esta capa se encarga de obtener los datos de la Api y transformalos segun las necesidades de la aplicación.
//? Esta capa se encarga de transormar los datos de registro de usuario para que los formularios los consuman directamente

export const transformOnBoardEmployeeFormData = (rawApiData) => {

    if (!rawApiData) {
        return { 
            statesForSelect: [], 
            gendersForSelect: [], 
            statesById: {}, 
            rolesForSelect: [], 
            academicDegreesForSelect: [] 
        };
    }


    //* 1. Transformar Estados
    const statesForSelect = rawApiData['estados_y_ciudades'].map(state => ({
        label: state.name,
        value: state.id
    }));

    //* 2. Transformar Generos
    const gendersForSelect = apiObjectToSelectOptions(rawApiData['generos']);

    //* 3. Obtener estados indexados para su busqueda rápida
    const statesById = rawApiData['estados_y_ciudades'].reduce( (acc, state) => {
        acc[state.id] = state;
        return acc;
    }, {});


    //* 4. Transformar roles
    const rolesForSelect = apiObjectToSelectOptions(rawApiData['roles_empleado']);

    //* 5 Transformar grados academicos
    const academicDegreesForSelect = apiObjectToSelectOptions(rawApiData['grados_academicos']);

    return { statesForSelect, gendersForSelect, statesById, rolesForSelect, academicDegreesForSelect };
}
