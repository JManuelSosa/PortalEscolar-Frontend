

export default class FakeAPI {


    constructor() {

        // Si ya existe una instancia, retórnala
        if (FakeAPI.instance) {
            return FakeAPI.instance;
        }

        
        this.data = {

            divisiones: [
                {
                    id: 1,
                    name: "División de tecnologías de la información y comunicación",
                    carreras: [
                    {
                        id: 1,
                        name: "Infraestructura en redes digitales",
                        grupos: [
                        {
                            id: 1,
                            name: "IRD1",
                            maestros: [
                            { id: 1, name: "Profesor Juan Pérez", email: "juan.perez@escuela.edu", telefono: "123-456-789" }
                            ],
                            alumnos: [
                                {
                                    id: 1,
                                    name: "Pedro Fernández",
                                    age: 25,
                                    email: "pedro.fernández@escuela.edu",
                                    notifications: []
                                },
                                {
                                    id: 2,
                                    name: "Ana Sánchez",
                                    age: 21,
                                    email: "ana.sánchez@escuela.edu",
                                    notifications: []
                                },
                                {
                                    id: 3,
                                    name: "Pedro Fernández",
                                    age: 18,
                                    email: "pedro.fernández@escuela.edu",
                                    notifications: []
                                },
                                {
                                    id: 4,
                                    name: "Laura López",
                                    age: 25,
                                    email: "laura.lópez@escuela.edu",
                                    notifications: []
                                },
                                {
                                    id: 5,
                                    name: "Juan Martínez",
                                    age: 21,
                                    email: "juan.martínez@escuela.edu",
                                    notifications: []
                                },
                            ]
                        },
                        {
                            id: 2,
                            name: "IRD2",
                            maestros: [
                            { id: 2, name: "Profesor María López", email: "maria.lopez@escuela.edu", telefono: "987-654-321" }
                            ],
                            alumnos: [
                                {
                                    id: 6,
                                    name: "Pedro Torres",
                                    age: 18,
                                    email: "pedro.torres@escuela.edu",
                                    notificactions: []
                                },
                                {
                                    id: 7,
                                    name: "María Martínez",
                                    age: 21,
                                    email: "maría.martínez@escuela.edu",
                                    notificactions: []
                                },
                                {
                                    id: 8,
                                    name: "Sofía Rodríguez",
                                    age: 22,
                                    email: "sofía.rodríguez@escuela.edu",
                                    notificactions: []
                                },
                                {
                                    id: 9,
                                    name: "José Díaz",
                                    age: 19,
                                    email: "josé.díaz@escuela.edu",
                                    notificactions: []
                                },
                                {
                                    id: 10,
                                    name: "Ana Gómez",
                                    age: 23,
                                    email: "ana.gómez@escuela.edu",
                                    notificactions: []
                                },
                            ]
                        },
                        {
                            id: 3,
                            name: "IRD3",
                            maestros: [
                            { id: 3, name: "Profesor Carlos Hernández", email: "carlos.hernandez@escuela.edu", telefono: "456-789-123" }
                            ],
                            alumnos: [
                                {
                                    id: 11,
                                    name: "José Torres",
                                    age: 22,
                                    email: "josé.torres@escuela.edu",
                                    notificactions: []
                                },
                                {
                                    id: 12,
                                    name: "Laura López",
                                    age: 23,
                                    email: "laura.lópez@escuela.edu",
                                    notificactions: []
                                },
                                {
                                    id: 13,
                                    name: "José Rodríguez",
                                    age: 19,
                                    email: "josé.rodríguez@escuela.edu",
                                    notificactions: []
                                },
                                {
                                    id: 14,
                                    name: "Miguel Sánchez",
                                    age: 21,
                                    email: "miguel.sánchez@escuela.edu",
                                    notificactions: []
                                },
                                {
                                    id: 15,
                                    name: "Miguel Torres",
                                    age: 22,
                                    email: "miguel.torres@escuela.edu",
                                    notificactions: []
                                },
                            ]
                        }
                        ]
                    },
                    {
                        id: 2,
                        name: "Desarrollo de software multiplataforma",
                        grupos: [
                            {
                                id: 4,
                                name: "DSM1",
                                maestros: [
                                { id: 4, name: "Profesor Ana Martínez", email: "ana.martinez@escuela.edu", telefono: "321-654-987" }
                                ],
                                alumnos: [
                                    {
                                        id: 16,
                                        name: "Laura Pérez",
                                        age: 25,
                                        email: "laura.pérez@escuela.edu",
                                        notificactions: []
                                    },
                                    {
                                        id: 17,
                                        name: "Elena Rodríguez",
                                        age: 25,
                                        email: "elena.rodríguez@escuela.edu",
                                        notificactions: []
                                    },
                                    {
                                        id: 18,
                                        name: "Ana Rodríguez",
                                        age: 19,
                                        email: "ana.rodríguez@escuela.edu",
                                        notificactions: []
                                    },
                                    {
                                        id: 19,
                                        name: "Juan Martínez",
                                        age: 19,
                                        email: "juan.martínez@escuela.edu",
                                        notificactions: []
                                    },
                                    {
                                        id: 20,
                                        name: "Carlos Gómez",
                                        age: 25,
                                        email: "carlos.gómez@escuela.edu",
                                        notificactions: []
                                    }
                                ]
                            },
                            {
                                id: 5,
                                name: "DSM2",
                                maestros: [
                                { id: 5, name: "Profesor Luis Ramírez", email: "luis.ramirez@escuela.edu", telefono: "159-753-486" }
                                ],
                                alumnos: [
                                    {
                                        id: 21,
                                        name: "Ana López",
                                        age: 22,
                                        email: "ana.lópez@escuela.edu",
                                        notificactions: []
                                    },
                                    {
                                        id: 22,
                                        name: "Elena Fernández",
                                        age: 23,
                                        email: "elena.fernández@escuela.edu",
                                        notificactions: []
                                    },
                                    {
                                        id: 23,
                                        name: "Sofía López",
                                        age: 25,
                                        email: "sofía.lópez@escuela.edu",
                                        notificactions: []
                                    },
                                    {
                                        id: 24,
                                        name: "Pedro Rodríguez",
                                        age: 20,
                                        email: "pedro.rodríguez@escuela.edu",
                                        notificactions: []
                                    },
                                    {
                                        id: 25,
                                        name: "Carlos Rodríguez",
                                        age: 18,
                                        email: "carlos.rodríguez@escuela.edu",
                                        notificactions: []
                                    }
                                ]
                            },
                            {
                                id: 6,
                                name: "DSM3",
                                maestros: [
                                { id: 6, name: "Profesor Sofía Torres", email: "sofia.torres@escuela.edu", telefono: "753-951-357" }
                                ],
                                alumnos: [
                                    {
                                        id: 26,
                                        name: "Laura Torres",
                                        age: 19,
                                        email: "laura.torres@escuela.edu",
                                        notificactions: []
                                    },
                                    {
                                        id: 27,
                                        name: "Elena Gómez",
                                        age: 24,
                                        email: "elena.gómez@escuela.edu",
                                        notificactions: []
                                    },
                                    {
                                        id: 28,
                                        name: "Sofía Pérez",
                                        age: 24,
                                        email: "sofía.pérez@escuela.edu",
                                        notificactions: []
                                    },
                                    {
                                        id: 29,
                                        name: "María Díaz",
                                        age: 24,
                                        email: "maría.díaz@escuela.edu",
                                        notificactions: []
                                    },
                                    {
                                        id: 30,
                                        name: "Ana Gómez",
                                        age: 24,
                                        email: "ana.gómez@escuela.edu",
                                        notificactions: []
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        id: 3,
                        name: "Entornos virtuales y negocios digitales",
                        grupos: [
                            {
                                id: 7,
                                name: "EVND1",
                                maestros: [
                                { id: 7, name: "Profesor Pedro Gómez", email: "pedro.gomez@escuela.edu", telefono: "951-357-852" }
                                ],
                                alumnos: [
                                    {
                                        id: 31,
                                        name: "Elena García",
                                        age: 21,
                                        email: "elena.garcía@escuela.edu",
                                        notificactions: []
                                    },
                                    {
                                        id: 32,
                                        name: "Sofía Rodríguez",
                                        age: 19,
                                        email: "sofía.rodríguez@escuela.edu",
                                        notificactions: []
                                    },
                                    {
                                        id: 33,
                                        name: "Miguel Rodríguez",
                                        age: 22,
                                        email: "miguel.rodríguez@escuela.edu",
                                        notificactions: []
                                    },
                                    {
                                        id: 34,
                                        name: "Miguel García",
                                        age: 24,
                                        email: "miguel.garcía@escuela.edu",
                                        notificactions: []
                                    },
                                    {
                                        id: 35,
                                        name: "Carlos Martínez",
                                        age: 19,
                                        email: "carlos.martínez@escuela.edu",
                                        notificactions: []
                                    }
                                ]
                            },
                            {
                                id: 8,
                                name: "EVND2",
                                maestros: [
                                { id: 8, name: "Profesor Elena Castro", email: "elena.castro@escuela.edu", telefono: "357-852-159" }
                                ],
                                alumnos: [
                                    {
                                        id: 36,
                                        name: "Laura García",
                                        age: 18,
                                        email: "laura.garcía@escuela.edu",
                                        notificactions: []
                                    },
                                    {
                                        id: 37,
                                        name: "Carlos García",
                                        age: 23,
                                        email: "carlos.garcía@escuela.edu",
                                        notificactions: []
                                    },
                                    {
                                        id: 38,
                                        name: "María Gómez",
                                        age: 19,
                                        email: "maría.gómez@escuela.edu",
                                        notificactions: []
                                    },
                                    {
                                        id: 39,
                                        name: "Laura García",
                                        age: 20,
                                        email: "laura.garcía@escuela.edu",
                                        notificactions: []
                                    },
                                    {
                                        id: 40,
                                        name: "Ana López",
                                        age: 24,
                                        email: "ana.lópez@escuela.edu",
                                        notificactions: []
                                    }
                                ]
                            },
                            {
                                id: 9,
                                name: "EVND3",
                                maestros: [
                                { id: 9, name: "Profesor Andrés Jiménez", email: "andres.jimenez@escuela.edu", telefono: "852-159-753" }
                                ],
                                alumnos: [
                                    {
                                        id: 41,
                                        name: "Carlos Gómez",
                                        age: 19,
                                        email: "carlos.gómez@escuela.edu",
                                        notificactions: []
                                    },
                                    {
                                        id: 42,
                                        name: "Ana Torres",
                                        age: 24,
                                        email: "ana.torres@escuela.edu",
                                        notificactions: []
                                    },
                                    {
                                        id: 43,
                                        name: "María Pérez",
                                        age: 24,
                                        email: "maría.pérez@escuela.edu",
                                        notificactions: []
                                    },
                                    {
                                        id: 44,
                                        name: "José Martínez",
                                        age: 24,
                                        email: "josé.martínez@escuela.edu",
                                        notificactions: []
                                    },
                                    {
                                        id: 45,
                                        name: "Carlos López",
                                        age: 23,
                                        email: "carlos.lópez@escuela.edu",
                                        notificactions: []
                                    }
                                ]
                            }
                        ]
                    }
                    ]
                },
                {
                    id:2,
                    name: "División de Industrial",
                    carreras: [
                        {
                            id: 4,
                            name: "Manufactura aeronáutica",
                            grupos: [
                                {
                                    id: 10,
                                    name: "MNA1",
                                    maestros: [
                                    { id: 10, name: "Profesor Lucía Vargas", email: "lucia.vargas@escuela.edu", telefono: "159-753-357" }
                                    ],
                                    alumnos: [
                                        {
                                            id: 46,
                                            name: "María Fernández",
                                            age: 18,
                                            email: "maría.fernández@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 47,
                                            name: "Ana Rodríguez",
                                            age: 24,
                                            email: "ana.rodríguez@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 48,
                                            name: "Elena García",
                                            age: 25,
                                            email: "elena.garcía@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 49,
                                            name: "José Pérez",
                                            age: 18,
                                            email: "josé.pérez@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 50,
                                            name: "Miguel Sánchez",
                                            age: 21,
                                            email: "miguel.sánchez@escuela.edu",
                                            notificactions: []
                                        }
                                    ]
                                },
                                {
                                    id: 11,
                                    name: "MNA2",
                                    maestros: [
                                    { id: 11, name: "Profesor Camilo Vargas", email: "camilo.vargas@escuela.edu", telefono: "199-573-123" }
                                    ],
                                    alumnos: [
                                        {
                                            id: 51,
                                            name: "José López",
                                            age: 24,
                                            email: "josé.lópez@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 52,
                                            name: "Pedro López",
                                            age: 20,
                                            email: "pedro.lópez@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 53,
                                            name: "Elena Torres",
                                            age: 19,
                                            email: "elena.torres@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 54,
                                            name: "Sofía Fernández",
                                            age: 22,
                                            email: "sofía.fernández@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 55,
                                            name: "Sofía López",
                                            age: 19,
                                            email: "sofía.lópez@escuela.edu",
                                            notificactions: []
                                        }
                                    ]
                                },
                                {
                                    id: 12,
                                    name: "MNA3",
                                    maestros: [
                                    { id: 12, name: "Profesor Daniela Chávez", email: "daniela.chavez@escuela.edu", telefono: "357-159-951" }
                                    ],
                                    alumnos: [
                                        {
                                            id: 56,
                                            name: "Pedro Díaz",
                                            age: 23,
                                            email: "pedro.díaz@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 57,
                                            name: "Miguel Gómez",
                                            age: 21,
                                            email: "miguel.gómez@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 58,
                                            name: "Carlos Rodríguez",
                                            age: 21,
                                            email: "carlos.rodríguez@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 59,
                                            name: "Elena Gómez",
                                            age: 18,
                                            email: "elena.gómez@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 60,
                                            name: "Carlos Díaz",
                                            age: 21,
                                            email: "carlos.díaz@escuela.edu",
                                            notificactions: []
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 5,
                            name: "Diseño y moda",
                            grupos: [
                                {
                                    id: 13,
                                    name: "DYM1",
                                    maestros: [
                                    { id: 13, name: "Profesor Ricardo Peña", email: "ricardo.pena@escuela.edu", telefono: "159-951-357" }
                                    ],
                                    alumnos: [
                                        {
                                            id: 61,
                                            name: "Miguel Pérez",
                                            age: 18,
                                            email: "miguel.pérez@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 62,
                                            name: "Miguel Sánchez",
                                            age: 19,
                                            email: "miguel.sánchez@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 63,
                                            name: "Elena García",
                                            age: 19,
                                            email: "elena.garcía@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 64,
                                            name: "Carlos Rodríguez",
                                            age: 21,
                                            email: "carlos.rodríguez@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 65,
                                            name: "Laura Martínez",
                                            age: 18,
                                            email: "laura.martínez@escuela.edu",
                                            notificactions: []
                                        }
                                    ]
                                },
                                {
                                    id: 14,
                                    name: "DYM2",
                                    maestros: [
                                    { id: 14, name: "Profesor Gabriela Navarro", email: "gabriela.navarro@escuela.edu", telefono: "951-357-123" }
                                    ],
                                    alumnos: [
                                        {
                                            id: 66,
                                            name: "Pedro Torres",
                                            age: 21,
                                            email: "pedro.torres@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 67,
                                            name: "Miguel Rodríguez",
                                            age: 22,
                                            email: "miguel.rodríguez@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 68,
                                            name: "José García",
                                            age: 24,
                                            email: "josé.garcía@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 69,
                                            name: "Miguel Díaz",
                                            age: 21,
                                            email: "miguel.díaz@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 70,
                                            name: "Sofía Sánchez",
                                            age: 24,
                                            email: "sofía.sánchez@escuela.edu",
                                            notificactions: []
                                        }
                                    ]
                                },
                                {
                                    id: 15,
                                    name: "DYM3",
                                    maestros: [
                                    { id: 15, name: "Profesor Miguel Ortega", email: "miguel.ortega@escuela.edu", telefono: "357-123-456" }
                                    ],
                                    alumnos: [
                                        {
                                            id: 71,
                                            name: "Ana Torres",
                                            age: 19,
                                            email: "ana.torres@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 72,
                                            name: "Sofía Fernández",
                                            age: 22,
                                            email: "sofía.fernández@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 73,
                                            name: "Carlos Martínez",
                                            age: 20,
                                            email: "carlos.martínez@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 74,
                                            name: "Pedro Torres",
                                            age: 25,
                                            email: "pedro.torres@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 75,
                                            name: "Ana Torres",
                                            age: 18,
                                            email: "ana.torres@escuela.edu",
                                            notificactions: []
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 6,
                            name: "Energía sostenible",
                            grupos: [
                                {
                                    id: 16,
                                    name: "ENS1",
                                    maestros: [
                                    {id: 16, name: "Profesor Patricia Mendoza", email: "patricia.mendoza@escuela.edu", telefono: "123-456-789" }
                                    ],
                                    alumnos: [
                                        {
                                            id: 76,
                                            name: "Pedro Rodríguez",
                                            age: 20,
                                            email: "pedro.rodríguez@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 77,
                                            name: "José Sánchez",
                                            age: 25,
                                            email: "josé.sánchez@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 78,
                                            name: "Sofía Torres",
                                            age: 22,
                                            email: "sofía.torres@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 79,
                                            name: "Juan Rodríguez",
                                            age: 25,
                                            email: "juan.rodríguez@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 80,
                                            name: "Carlos Torres",
                                            age: 18,
                                            email: "carlos.torres@escuela.edu",
                                            notificactions: []
                                        }
                                    ]
                                },
                                {
                                    id: 17,
                                    name: "ENS2",
                                    maestros: [
                                    { id: 17, name: "Profesor Raúl Salazar", email: "raul.salazar@escuela.edu", telefono: "654-987-321" }
                                    ],
                                    alumnos: [
                                        {
                                            id: 81,
                                            name: "José Sánchez",
                                            age: 23,
                                            email: "josé.sánchez@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 82,
                                            name: "Pedro López",
                                            age: 24,
                                            email: "pedro.lópez@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 83,
                                            name: "Juan Sánchez",
                                            age: 25,
                                            email: "juan.sánchez@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 84,
                                            name: "Carlos Martínez",
                                            age: 23,
                                            email: "carlos.martínez@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 85,
                                            name: "Miguel Martínez",
                                            age: 24,
                                            email: "miguel.martínez@escuela.edu",
                                            notificactions: []
                                        }
                                    ]
                                },
                                {
                                    id: 18,
                                    name: "ENS3",
                                    maestros: [
                                    { id: 18, name: "Profesor Carmen Flores", email: "carmen.flores@escuela.edu", telefono: "987-321-654" }
                                    ],
                                    alumnos: [
                                        {
                                            id: 86,
                                            name: "Carlos Martínez",
                                            age: 18,
                                            email: "carlos.martínez@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 87,
                                            name: "José Martínez",
                                            age: 25,
                                            email: "josé.martínez@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 88,
                                            name: "Ana Sánchez",
                                            age: 22,
                                            email: "ana.sánchez@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 89,
                                            name: "María Torres",
                                            age: 19,
                                            email: "maría.torres@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 90,
                                            name: "Elena Pérez",
                                            age: 20,
                                            email: "elena.pérez@escuela.edu",
                                            notificactions: []
                                        }
                                    ]
                                }
                            ]
                        },
                    ]
            
                },
                {
                    id:3,
                    name: "División de administración",
                    carreras:[
                        {
                            id: 7,
                            name: "Mercadotecnia",
                            grupos: [
                                {
                                    id: 19,
                                    name: "MEC1",
                                    maestros: [
                                    { id: 19, name: "Profesor Fernando Álvarez", email: "fernando.alvarez@escuela.edu", telefono: "321-654-159" }
                                    ],
                                    alumnos: [
                                        {
                                            id: 91,
                                            name: "María Gómez",
                                            age: 23,
                                            email: "maría.gómez@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 92,
                                            name: "Sofía García",
                                            age: 24,
                                            email: "sofía.garcía@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 93,
                                            name: "Juan Sánchez",
                                            age: 21,
                                            email: "juan.sánchez@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 94,
                                            name: "Ana Fernández",
                                            age: 23,
                                            email: "ana.fernández@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 95,
                                            name: "Carlos Sánchez",
                                            age: 20,
                                            email: "carlos.sánchez@escuela.edu",
                                            notificactions: []
                                        }
                                    ]
                                },
                                {
                                    id: 20,
                                    name: "MEC2",
                                    maestros: [
                                    { id: 20, name: "Profesor Silvia Romero", email: "silvia.romero@escuela.edu", telefono: "654-159-753" }
                                    ],
                                    alumnos: [
                                        {
                                            id: 96,
                                            name: "Pedro Pérez",
                                            age: 24,
                                            email: "pedro.pérez@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 97,
                                            name: "María Díaz",
                                            age: 22,
                                            email: "maría.díaz@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 98,
                                            name: "José Pérez",
                                            age: 23,
                                            email: "josé.pérez@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 99,
                                            name: "María Torres",
                                            age: 19,
                                            email: "maría.torres@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 100,
                                            name: "Elena Gómez",
                                            age: 19,
                                            email: "elena.gómez@escuela.edu",
                                            notificactions: []
                                        }
                                    ]
                                },
                                {
                                    id: 21,
                                    name: "MEC3",
                                    maestros: [
                                    { id: 21, name: "Profesor Manuel Domínguez", email: "manuel.dominguez@escuela.edu", telefono: "159-753-951" }
                                    ],
                                    alumnos: [
                                        {
                                            id: 101,
                                            name: "Sofía Díaz",
                                            age: 24,
                                            email: "sofía.díaz@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 102,
                                            name: "Carlos Rodríguez",
                                            age: 23,
                                            email: "carlos.rodríguez@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 103,
                                            name: "María Rodríguez",
                                            age: 21,
                                            email: "maría.rodríguez@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 104,
                                            name: "Ana Gómez",
                                            age: 20,
                                            email: "ana.gómez@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 105,
                                            name: "José García",
                                            age: 21,
                                            email: "josé.garcía@escuela.edu",
                                            notificactions: []
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 8,
                            name: "Logistica",
                            grupos: [
                                {
                                    id: 22,
                                    name: "LOG1",
                                    maestros: [
                                    { id: 22, name: "Profesor Valeria Cortés", email: "valeria.cortes@escuela.edu", telefono: "753-951-357" }
                                    ],
                                    alumnos: [
                                        {
                                            id: 106,
                                            name: "Ana Díaz",
                                            age: 22,
                                            email: "ana.díaz@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 107,
                                            name: "Juan Díaz",
                                            age: 21,
                                            email: "juan.díaz@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 108,
                                            name: "Miguel Pérez",
                                            age: 23,
                                            email: "miguel.pérez@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 109,
                                            name: "María Martínez",
                                            age: 24,
                                            email: "maría.martínez@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 110,
                                            name: "Laura Gómez",
                                            age: 25,
                                            email: "laura.gómez@escuela.edu",
                                            notificactions: []
                                        }
                                    ]
                                },
                                {
                                    id: 23,
                                    name: "LOG2",
                                    maestros: [
                                    { id: 23, name: "Profesor Alejandro Fuentes", email: "alejandro.fuentes@escuela.edu", telefono: "951-357-654" }
                                    ],
                                    alumnos: [
                                        {
                                            id: 111,
                                            name: "Elena Díaz",
                                            age: 25,
                                            email: "elena.díaz@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 112,
                                            name: "María Sánchez",
                                            age: 24,
                                            email: "maría.sánchez@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 113,
                                            name: "Laura Díaz",
                                            age: 21,
                                            email: "laura.díaz@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 114,
                                            name: "Juan Díaz",
                                            age: 22,
                                            email: "juan.díaz@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 115,
                                            name: "Ana García",
                                            age: 21,
                                            email: "ana.garcía@escuela.edu",
                                            notificactions: []
                                        }
                            
                                    ]
                                },
                                {
                                    id: 24,
                                    name: "LOG3",
                                    maestros: [
                                    { id: 24, name: "Profesor Laura Estrada", email: "laura.estrada@escuela.edu", telefono: "357-654-789" }
                                    ],
                                    alumnos: [
                                        {
                                            id: 116,
                                            name: "Miguel Martínez",
                                            age: 24,
                                            email: "miguel.martínez@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 117,
                                            name: "Carlos Gómez",
                                            age: 24,
                                            email: "carlos.gómez@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 118,
                                            name: "José Rodríguez",
                                            age: 18,
                                            email: "josé.rodríguez@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 119,
                                            name: "Laura Díaz",
                                            age: 23,
                                            email: "laura.díaz@escuela.edu",
                                            notificactions: []
                                        },
                                        {
                                            id: 120,
                                            name: "Elena Gómez",
                                            age: 19,
                                            email: "elena.gómez@escuela.edu",
                                            notificactions: []
                                        }
                                    ]
                                }
                            ]
                        },
                    ]
            
                }
                ],
                documentos: [
                {
                    id: 1,
                    name: "Constancia de Estudios",
                    price: 60,
                    description: "Constancia de estudios válida para trámites oficiales.",
                    availableForPurchase: true
                }
                ],
                pagos: [
                    {
                        id: 1,
                        name: "Pago de colegiatura cuatrimestral",
                        price: 1720,
                        description: "Colegiatura cuatrimestral del periodo Septiembre-Diciembre 2025",
                        availableForPurchase: false
                    }
                ]

        };

        this.idCounters = {
            division: 3,
            carrera: 8,
            grupo: 24,
            maestro: 24,
            alumno: 120,
        };

        // Guarda la instancia en la propiedad estática
        FakeAPI.instance = this;
    }

    // 🔹 Generar un ID único para cada entidad
    generateId(type) {
        return this.idCounters[type]++;
    }

    // 🔹 Agregar una nueva división
    addDivision(name) {
        const newDivision = { id: this.generateId('division'), name, carreras: [] };
        this.data.divisiones.push(newDivision);
        return newDivision;
    }

    // 🔹 Agregar una nueva carrera a una división
    addCarrera(divisionId, name) {
        const division = this.data.divisiones.find(d => d.id === divisionId);
        if (!division) return `División con id ${divisionId} no encontrada.`;

        const newCarrera = { id: this.generateId('carrera'), name, grupos: [] };
        division.carreras.push(newCarrera);
        return newCarrera;
    }

    // 🔹 Agregar un nuevo grupo a una carrera
    addGrupo(carreraId, name) {
        for (const division of this.data.divisiones) {
            const carrera = division.carreras.find(c => c.id === carreraId);
            if (carrera) {
                const newGrupo = { id: this.generateId('grupo'), name, maestros: [], alumnos: [] };
                carrera.grupos.push(newGrupo);
                return newGrupo;
            }
        }
        return `Carrera con id ${carreraId} no encontrada.`;
    }

    // 🔹 Agregar un nuevo maestro a un grupo
    addMaestro(grupoId, name, email, telefono) {
        for (const division of this.data.divisiones) {
            for (const carrera of division.carreras) {
                for (const grupo of carrera.grupos) {
                    if (grupo.id === grupoId) {
                        const newMaestro = {
                            id: this.generateId('maestro'),
                            name,
                            email,
                            telefono
                        };
                        grupo.maestros.push(newMaestro);
                        return newMaestro;
                    }
                }
            }
        }
        return `Grupo con id ${grupoId} no encontrado.`;
    }

    // 🔹 Agregar un nuevo alumno a un grupo
    addAlumno(grupoId, name, email) {
        for (const division of this.data.divisiones) {
            for (const carrera of division.carreras) {
                for (const grupo of carrera.grupos) {
                    if (grupo.id === grupoId) {
                        const newAlumno = {
                            id: this.generateId('alumno'),
                            name,
                            email
                        };
                        grupo.alumnos.push(newAlumno);
                        return newAlumno;
                    }
                }
            }
        }
        return `Grupo con id ${grupoId} no encontrado.`;
    }

    // 🔹 Obtener todas las divisiones
    getAllDivisiones() {
        return this.data.divisiones;
    }

    // 🔹 Obtener todos los maestros
    getAllMaestros() {
        let allMaestros = [];
        for (const division of this.data.divisiones) {
            for (const carrera of division.carreras) {
                for (const grupo of carrera.grupos) {
                    allMaestros = allMaestros.concat(grupo.maestros);
                }
            }
        }
        return allMaestros;
    }

    // 🔹 Obtener todos los alumnos
    getAllAlumnos() {
        let allAlumnos = [];
        for (const division of this.data.divisiones) {
            for (const carrera of division.carreras) {
                for (const grupo of carrera.grupos) {
                    allAlumnos = allAlumnos.concat(grupo.alumnos);
                }
            }
        }
        return allAlumnos;
    }

    // 🔹 Eliminar maestro por ID
    deleteMaestro(maestroId) {
        for (const division of this.data.divisiones) {
            for (const carrera of division.carreras) {
                for (const grupo of carrera.grupos) {
                    const index = grupo.maestros.findIndex(m => m.id === maestroId);
                    if (index !== -1) {
                        const removed = grupo.maestros.splice(index, 1);
                        return `Maestro ${removed[0].name} eliminado correctamente.`;
                    }
                }
            }
        }
        return `Maestro con id ${maestroId} no encontrado.`;
    }

    // 🔹 Eliminar alumno por ID
    deleteAlumno(alumnoId) {
        for (const division of this.data.divisiones) {
            for (const carrera of division.carreras) {
                for (const grupo of carrera.grupos) {
                    const index = grupo.alumnos.findIndex(a => a.id === alumnoId);
                    if (index !== -1) {
                        const removed = grupo.alumnos.splice(index, 1);
                        return `Alumno ${removed[0].name} eliminado correctamente.`;
                    }
                }
            }
        }
        return `Alumno con id ${alumnoId} no encontrado.`;
    }

    getAllCarreras() {
        return this.data.divisiones.flatMap(division => division.carreras);
    }
    
    getCarrerasByDivision(idDivision) {
        const division = this.data.divisiones.find(division => division.id === idDivision);
        return division ? division.carreras : []; // Retorna array de carreras o vacío si no existe
    }
    
    addCarrera(division, carrera) {
        if (!this.data.divisiones[division]) {
            this.data.divisiones[division] = [];
        }
        if (!this.data.divisiones[division].includes(carrera)) {
            this.data.divisiones[division].push(carrera);
            return `Carrera "${carrera}" añadida a la división "${division}".`;
        }
        return `La carrera "${carrera}" ya existe en la división "${division}".`;
    }
    
    deleteCarrera(division, carrera) {
        if (this.data.divisiones[division]) {
            const index = this.data.divisiones[division].indexOf(carrera);
            if (index !== -1) {
                this.data.divisiones[division].splice(index, 1);
                return `Carrera "${carrera}" eliminada de la división "${division}".`;
            }
        }
        return `No se encontró la carrera "${carrera}" en la división "${division}".`;
    }

        /**
     * Obtiene todos los grupos de una carrera específica
     * @param {number} carreraId - ID de la carrera
     * @returns {Array} - Array de grupos o array vacío si no se encuentra
     */
    getGruposByCarrera(carreraId) {
        // Encuentra la carrera en todas las divisiones
        for (const division of this.data.divisiones) {
            const carreraEncontrada = division.carreras.find(c => c.id === carreraId);
            if (carreraEncontrada) {
                return carreraEncontrada.grupos || [];
            }
        }
        return [];
    }

    /**
     * Crea un nuevo grupo en una carrera específica
     * @param {number} carreraId - ID de la carrera
     * @param {string} nombreGrupo - Nombre del nuevo grupo
     * @returns {Object} - El grupo creado o null si no se pudo crear
     */
    createGrupo(carreraId, nombreGrupo) {
        for (const division of this.data.divisiones) {
            const carreraEncontrada = division.carreras.find(c => c.id === carreraId);
            if (carreraEncontrada) {
                const nuevoGrupo = {
                    id: this.generateId('grupo'),
                    name: nombreGrupo,
                    maestros: [],
                    alumnos: []
                };
                
                if (!carreraEncontrada.grupos) {
                    carreraEncontrada.grupos = [];
                }
                
                carreraEncontrada.grupos.push(nuevoGrupo);
                return nuevoGrupo;
            }
        }
        return null;
    }

        /**
     * Elimina un grupo de una carrera
     * @param {number} carreraId - ID de la carrera
     * @param {number} grupoId - ID del grupo a eliminar
     * @returns {boolean} - true si se eliminó, false si no se encontró
     */
    deleteGrupo(carreraId, grupoId) {
        for (const division of this.data.divisiones) {
            const carreraEncontrada = division.carreras.find(c => c.id === carreraId);
            if (carreraEncontrada && carreraEncontrada.grupos) {
                const index = carreraEncontrada.grupos.findIndex(g => g.id === grupoId);
                if (index !== -1) {
                    carreraEncontrada.grupos.splice(index, 1);
                    return true;
                }
            }
        }
        return false;
    }


        /**
     * Obtiene todos los detalles de un grupo específico
     * @param {number} grupoId - ID del grupo a buscar
     * @returns {Object|null} - Objeto con toda la información del grupo o null si no se encuentra
     */
    getGrupoDetails(grupoId) {
        for (const division of this.data.divisiones) {
            for (const carrera of division.carreras) {
                const grupoEncontrado = carrera.grupos.find(g => g.id === grupoId);
                if (grupoEncontrado) {
                    return {
                        ...grupoEncontrado,
                        division: {
                            id: division.id,
                            name: division.name
                        },
                        carrera: {
                            id: carrera.id,
                            name: carrera.name
                        }
                    };
                }
            }
        }
        return null;
    }

        /**
     * Obtiene los maestros de un grupo específico
     * @param {number} grupoId - ID del grupo
     * @returns {Array} - Array de maestros o array vacío si no se encuentra
     */
    getMaestrosByGrupo(grupoId) {
        const grupo = this.getGrupoDetails(grupoId);
        return grupo ? grupo.maestros : [];
    }

        /**
     * Obtiene los alumnos de un grupo específico
     * @param {number} grupoId - ID del grupo
     * @returns {Array} - Array de alumnos o array vacío si no se encuentra
     */
    getAlumnosByGrupo(grupoId) {
        const grupo = this.getGrupoDetails(grupoId);
        return grupo ? grupo.alumnos : [];
    }

        /**
     * Busca un alumno específico en un grupo
     * @param {number} grupoId - ID del grupo
     * @param {number} alumnoId - ID del alumno
     * @returns {Object|null} - Objeto del alumno o null si no se encuentra
     */
    getAlumnoInGrupo(grupoId, alumnoId) {
        const alumnos = this.getAlumnosByGrupo(grupoId);
        return alumnos.find(a => a.id === alumnoId) || null;
    }

        /**
     * Busca un maestro específico en un grupo
     * @param {number} grupoId - ID del grupo
     * @param {number} maestroId - ID del maestro
     * @returns {Object|null} - Objeto del maestro o null si no se encuentra
     */
    getMaestroInGrupo(grupoId, maestroId) {
        const maestros = this.getMaestrosByGrupo(grupoId);
        return maestros.find(m => m.id === maestroId) || null;
    }



}



// 🚀 **Ejemplo de uso**
// const api = new FakeAPI();

// // Agregamos divisiones
// const division1 = api.addDivision("División de Ingeniería");
// console.log(division1);

// const division2 = api.addDivision("División de Ciencias Sociales");
// console.log(division2);

// // Agregamos carreras
// const carrera1 = api.addCarrera(division1.id, "Ingeniería en Software");
// console.log(carrera1);

// const carrera2 = api.addCarrera(division1.id, "Ingeniería en Redes");
// console.log(carrera2);

// // Agregamos grupos
// const grupo1 = api.addGrupo(carrera1.id, "Grupo A");
// console.log(grupo1);

// const grupo2 = api.addGrupo(carrera2.id, "Grupo B");
// console.log(grupo2);

// // Agregamos maestros
// const maestro1 = api.addMaestro(grupo1.id, "Profesor Juan Pérez", "juan.perez@escuela.edu", "123-456-789");
// console.log(maestro1);

// const maestro2 = api.addMaestro(grupo2.id, "Profesora Ana Gómez", "ana.gomez@escuela.edu", "987-654-321");
// console.log(maestro2);

// // Agregamos alumnos
// const alumno1 = api.addAlumno(grupo1.id, "Pedro López", "pedro.lopez@escuela.edu");
// console.log(alumno1);

// const alumno2 = api.addAlumno(grupo2.id, "María Torres", "maria.torres@escuela.edu");
// console.log(alumno2);

// // Obtener datos
// console.log("📌 Todas las divisiones:", api.getAllDivisiones());
// console.log("📌 Todos los maestros:", api.getAllMaestros());
// console.log("📌 Todos los alumnos:", api.getAllAlumnos());

// // Eliminamos un maestro
// console.log(api.deleteMaestro(maestro1.id));

// // Eliminamos un alumno
// console.log(api.deleteAlumno(alumno1.id));

// // Revisamos los datos después de eliminaciones
// console.log("📌 Todos los maestros después de eliminar:", api.getAllMaestros());
// console.log("📌 Todos los alumnos después de eliminar:", api.getAllAlumnos());
