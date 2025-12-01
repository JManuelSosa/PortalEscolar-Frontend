
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