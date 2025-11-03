
export const personalFormRules = {
    name: [
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

    first_last_name: [
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

    second_last_name: [
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

    gender: [{ 
            required: true, 
            message: 'Por favor selecciona tu género' 
    }],

    address: [
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

    phone_number: [
        { 
            required: true, 
            message: 'Teléfono obligatorio' 
        },
        {
            pattern: /^[0-9]{10}$/,
            message: 'El teléfono debe tener exactamente 10 dígitos'
        }
    ],

    state: [
        {
            required: true,
            message: 'El estado es requerido'
        }
    ],

    city: [
        { 
            required: true, 
            message: 'Por favor selecciona una ciudad' 
        }
    ],

    birth_date: [
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