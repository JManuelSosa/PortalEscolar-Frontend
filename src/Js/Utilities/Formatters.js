/**
 * Transforma un objeto de API (clave: valor) en un array
 * listo para usarse en un Select de Ant Design.
 * * @param {Object} rawData - El objeto de la API (ej. { m: 'Masculino', f: 'Femenino' })
 * @returns {Array} dataSelect - Un array para Select (ej. [{ value: 'm', label: 'Masculino' }, ...])
 */
export const apiObjectToSelectOptions = (rawData) => {
    const data = rawData ?? {};
    const dataSelect = Object.entries(data).map( ([value, label]) => ({
        label: label,
        value: value
    }));

    return dataSelect;
}