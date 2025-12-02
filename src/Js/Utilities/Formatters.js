import dateKeys from "./dateKeys";
import dayjs from "dayjs";


/**
 * Transforma un objeto de API (clave: valor) en un array
 * listo para usarse en un Select de Ant Design.
 * * @param {Object} rawData - El objeto de la API (ej. { m: 'Masculino', f: 'Femenino' })
 * @returns {Array} dataSelect - Un array para Select (ej. [{ value: 'm', label: 'Masculino' }, ...])
 */
export const apiObjectToSelectOptions = (rawData) => {
    const data = rawData ?? {};
    const dataSelect = Object.entries(data).map(([value, label]) => ({
        label: label,
        value: value
    }));

    return dataSelect;
}

/**
 * Convierte recursivamente objetos Dayjs en strings con formato dentro de estructuras de datos complejas.
 * 
 * Esta función recorre recursivamente objetos, arrays y estructuras anidadas para encontrar y formatear
 * cualquier instancia de Dayjs a strings en el formato especificado. Útil para preparar datos de formularios
 * antes de enviarlos a APIs que esperan strings en lugar de objetos fecha.
 * 
 * @param {any} rawData - Los datos a sanitizar. Puede ser cualquier tipo de dato
*/

export const sanitizeFormDates = (data, format = "YYYY-MM-DD") => {
    
    if(data === null || data === undefined) return data;

    if (dayjs.isDayjs(data)) {
        return data.format(format);
    }

    if (Array.isArray(data)) {
        return data.map(item => sanitizeFormDates(item, format));
    }

    if (typeof data === 'object') {
        return Object.keys(data).reduce((acc, key) => {
            acc[key] = sanitizeFormDates(data[key], format);
            return acc;
        }, {});
    }

    return data;

}