

export const routes = {

    // Publicas
    landing: '/',
    login: '/login',
    pricing: '/pricing',
    unauthorized: '/unauthorized',
    asistenciaMaestro: '/asistencias',

    // Con login
    userHome: '/home',

    // Admin 
    adminHome: '/admin',

    // División
    divisiones: '/divisiones',
    carreras: {
        path: '/divisiones/:divisionID/carreras',
        nav: (divisionID) => `/divisiones/${divisionID}/carreras`
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