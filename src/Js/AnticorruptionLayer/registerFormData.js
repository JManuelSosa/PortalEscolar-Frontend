//? Archivo de capa anticorrupción (ACL) para manejar la transformación de los datos que vienen que la api.
//? Esta capa se encarga de obtener los datos de la Api y transformalos segun las necesidades de la aplicación.
//? Esta capa se encarga de transormar los datos de registro de usuario para que los formularios los consuman directamente

export const transformRegisterFormData = (rawApiData) => {

    if (!rawApiData) {
        return { states: [], genders: [], statesById: {} };
    }

    //* 1. Transformar Estados
    const rawStates = rawApiData['estados_y_ciudades'] ?? [];

    const statesForSelect = rawStates.map(state => ({
        label: state.name,
        value: state.id
    }));

    //* 2. Transformar Generos
    const rawGenders = rawApiData['generos'] ?? {};

    const gendersForSelect = Object.entries(rawGenders).map( ([value, label]) => ({
        label: label,
        value: value
    }));

    //* 3. Obtener estados indexados para su busqueda rápida
    const statesById = rawStates.reduce( (acc, state) => {
        acc[state.id] = state;
        return acc;
    }, {});

    return { statesForSelect, gendersForSelect, statesById };
}