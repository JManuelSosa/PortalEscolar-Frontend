//? Archivo de capa anticorrupción (ACL) para manejar la transformación de los datos que vienen que la api.
//? Esta capa se encarga de obtener los datos de la Api y transformalos segun las necesidades de la aplicación.
//? Esta capa se encarga de transormar los datos de registro de usuario para que los formularios los consuman directamente

export const periodTemplateFormData = (rawApiData) => {

    if (!rawApiData) {
        return { cicloEscolar: [], periodosEscolares: [], superiodosEscolares: [] };
    }

    //* 1. Transformar ciclos escolares
    const dataCycle = rawApiData['cicloEscolar'] ?? [];
    const cycleForSelect = dataCycle ? [{ value: dataCycle.id, label: dataCycle.name }]: [];

    //* 2. Transformar periodos escolares
    const rawPeriodos = rawApiData['periodosEscolares'] ?? [];
    const periodosForSelect = rawPeriodos.map( periodo => ({
        value: periodo.id,
        label: periodo.name
    }));

    //* 3. Transformar subperiodos escolares
    const rawSubperiodos = rawApiData['subperiodosEscolares'] ?? [];
    const subperiodosForSelect = rawSubperiodos.map( subperiodo => ({
        value: subperiodo.id,
        label: subperiodo.name
    }));

    return { cycleForSelect, periodosForSelect, subperiodosForSelect };
}