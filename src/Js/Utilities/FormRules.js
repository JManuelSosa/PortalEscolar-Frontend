import dayjs from "dayjs"


export const personalFormRules = {
    nombre: [
        { 
            required: true, 
            message: 'El nombre es requerido' 
        },
        { 
            min: 2, 
            message: 'Minimo 2 caracteres' 
        },
        { 
            max: 50, 
            message: 'Maximo 50 caracteres' 
        },
        {
            pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
            message: 'Solo letras y espacios'
        }
    ],

    primer_apellido: [
        { 
        required: true, 
        message: 'El primer apellido es requerido' 
        },
        { 
        min: 2, 
        message: 'Minimo 2 caracteres' 
        },
        { 
        max: 50, 
        message: 'Maximo 50 caracteres' 
        },
        {
        pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        message: 'Solo letras y números'
        }
    ],

    segundo_apellido: [
        { 
            required: false 
        },
        { 
            min: 2, 
            message: 'Mínimo 2 caracteres' 
        },
        { 
            max: 50, 
            message: 'Máximo 50 caracteres' 
        },
        {
            pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/,
            message: 'Solo letras y espacios'
        }
    ],

    curp: [
    { 
        required: true, 
        message: 'La CURP es obligatoria' 
    },
    {
        len: 18,
        message: 'La CURP debe tener exactamente 18 caracteres'
    },
    // {
    //     pattern: /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[A-Z0-9][0-9]$/,
    //     message: 'Formato de CURP inválido'
    // }
    ],

    genero: [{ 
            required: true, 
            message: 'Por favor selecciona tu género' 
    }],

    direccion: [
        { 
            required: true, 
            message: 'Por favor ingresa tu dirección' 
        },
        { 
            min: 10, 
            message: 'Mínimo 10 caracteres' 
        },
        { 
            max: 200, 
            message: 'Máximo 200 caracteres' 
        }
    ],

    numero_telefonico: [
        { 
            required: true, 
            message: 'Teléfono obligatorio' 
        },
        {
            pattern: /^[0-9]{10}$/,
            message: 'El teléfono debe tener exactamente 10 dígitos'
        }
    ],

    estado: [
        {
            required: true,
            message: 'El estado es requerido'
        }
    ],

    ciudad: [
        { 
            required: true, 
            message: 'Por favor selecciona una ciudad' 
        }
    ],

    fecha_nacimiento: [
        { 
            required: true, 
            message: 'Por favor ingresa tu fecha de nacimiento' 
        }
    ]
}

export const loginFormRules = {
    email: [
        {
            required: true,
            message: "El correo es obligatorio"
        },
        {
            type: 'email',
            message: "Introduzca un email válido"
        }
    ],
    password: [
        {
            required: true,
            message: "La contraseña es obligatoria"
        },
        {   
            type: "string",
            message: "La contraseña debe ser alfanumérica"
        },
        {
            min: 8,
            message: "Mínimo 8 caracteres"
        }
    ]
}

export const onBoardEmployeeFormRules = {
    fecha_entrada: [
        {
            required: true,
            message: "Fecha de entrada requerida"
        }
    ],
    rol: [
        {
            required: true,
            message: "Rol de empleado requerido"
        }
    ],
    carrera: [
        { required: true, message: "Carrera requerida" }
    ],
    grado_academico: [
        {
            required: true,
            message: "Seleccione un grado académico"
        }
    ]
}

export const newDivisionFormRules = {
    nombre: [
        {  required: true, message: "El nombre de la división es requerido"}
    ]
}

export const newCareerFormRules = {
    nombre: [
        {  required: true, message: "El nombre de la carrera es requerido"}
    ]
}

export const schoolPeriodFormRules = {
    periodoEscolar: {
        nombre: [
            { required: true, message: "El nombre del periodo es obligatorio" },
            { max: 100, message: "El nombre es muy largo" }
        ],
        fechaInicio: [
            { required: true, message: "Selecciona la fecha de inicio" },
            {   
                type: "date",
                message: "La fecha de inicio debe ser fecha"
            },
        ],
        fechaFin: [
            { required: true, message: "Selecciona la fecha de fin" },
            {   
                type: "date",
                message: "La fecha de fin debe ser fecha"
            },
        ],
        numeroOrdinal: [
            {required: true, message: "El orden del periodo es requerido"},
            { type: "number", message: "Debe ser un número"}
        ],

    },

    // SECCIÓN 2: Reglas para los hijos de la lista (subperiodosEscolares)
    subperiodosEscolares: {
        nombre: [
            { required: true, message: "Nombre del parcial requerido" }
        ],
        tipo: [
            { required:true, message: "Seleccione un tipo de subperiodo" }
        ],
        fechas: [
            { required: true, message: "Campo de fecha requerido" }
        ]
    }
};




/**
 * Validador personalizado para rangos de fechas
 * @param {function} getFieldValue - Función para obtener valores del form
 * @param {array} compareFieldPath - Ruta del campo contra el cual comparar (ej: ['padre', 'inicio'])
 * @param {string} type - 'after' (debe ser después) o 'before' (debe ser antes)
 */
export const dateRangeValidator = (getFieldValue, compareFieldPath, type = 'after') => ({
    validator(_, value) {
        // 1. Si no hay valor actual o no hay valor de comparación, pasamos (dejamos que la regla 'required' se encargue)
        const compareValue = getFieldValue(compareFieldPath);
        if (!value || !compareValue) {
            return Promise.resolve();
        }

        // 2. Comparamos usando Day.js
        if (type === 'after') {
            // Validar que 'value' (Fin) sea DESPUÉS de 'compareValue' (Inicio)
            if (value.isBefore(compareValue) || value.isSame(compareValue)) {
                return Promise.reject(new Error('La fecha fin debe ser posterior a la de inicio'));
            }
        } else {
            // Validar que 'value' (Inicio) sea ANTES de 'compareValue' (Fin)
            if (value.isAfter(compareValue) || value.isSame(compareValue)) {
                return Promise.reject(new Error('La fecha inicio debe ser anterior a la de fin'));
            }
        }

        return Promise.resolve();
    },
});