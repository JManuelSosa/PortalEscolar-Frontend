const USER_HOME = '/home';
const ADMIN_PATH = '/admin';

export const routes = {
    
    // Publicas
    landing: '/',
    login: '/login',
    pricing: '/pricing',
    unauthorized: '/unauthorized',
    asistenciaMaestro: '/asistencias',

    // Con Inicio de sesión
    userHome: USER_HOME,

    // Admin 
    adminHome: {
        path: ADMIN_PATH,
        backRoute: USER_HOME
    },
    empleados: {
        path: '/empleados',
        backRoute: ADMIN_PATH
    },
    periodosEscolares: {
        path: '/periodos',
        backRoute: ADMIN_PATH
    },
    divisiones: {
        path: '/divisiones',
        backRoute: ADMIN_PATH
    },
    gruposGlobal: {
        path: '/grupos',
        backRoute: ADMIN_PATH
    },
    // Carreras (dependen de division)
    carreras: {
        path: '/divisiones/:divisionID/carreras',
        nav: (divisionID) => `/divisiones/${divisionID}/carreras`,
        backRoute: '/divisiones'
    },
    // Grupos (dependen de Carrera)
    grupos: {
        path: '/carreras/:carreraID/grupos',
        nav: (carreraID) => `/carreras/${carreraID}/grupos`
    },
    // Detalle de Grupo (depende de Grupo)
    detalleGrupo: {
        path: '/grupos/:grupoID',
        nav: (grupoID) => `/grupos/${grupoID}`
    }

}
