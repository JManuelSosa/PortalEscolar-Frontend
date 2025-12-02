// Rutas de navegacion
import { routes } from './Routes';

// Tabler Icons
import { 
    IconHomeMove,
    IconBackpack, 
    IconBallpen, 
    IconUsersGroup, 
    IconBook2, 
    IconUserCircle,
    IconPencilSearch
} from '@tabler/icons-react';

// Estilos para los iconos
import MiCss from '@css/Layout/NavbarComponent.module.css';

// Props de los iconos
const IconProps = {
    size: 38,
    stroke: 1.25,
    color: 'rgb(220,220,220)',
    className: MiCss.menuIcon,
};

const menus = {
    admin: [
        {
            key: 'admin0',
            icon: <IconHomeMove {...IconProps} />,
            label: 'Ir al panel',
            path: routes.adminHome
        },
        {
            key: 'admin1',
            icon: <IconBackpack  {...IconProps}/>,
            label: 'Estudiantes',
        },
        {
            key: 'admin2',
            icon: <IconUsersGroup {...IconProps}/>,
            label: 'Empleados',
        },
        {
            key: 'admin3',
            icon: <IconBallpen {...IconProps}/>,
            label: 'Profesores',
        },
        {
            key: 'adminsub1',
            label: 'Biblioteca',
            icon: <IconBook2 {...IconProps}/>,
            // children: [
            //     {
            //         key: 'admin5',
            //         label: 'Option 5',
            //     },
            //     {
            //         key: 'admin6',
            //         label: 'Option 6',
            //     },
            //     {
            //         key: 'admin7',
            //         label: 'Option 7',
            //     },
            //     {
            //         key: 'admin8',
            //         label: 'Option 8',
            //     },
            // ],
        },
    ],

    user: [
        {
            key: 'user0',
            icon: <IconHomeMove {...IconProps} />,
            label: 'Ir al Home',
            path: routes.userHome
        },
        {
            key: 'user1',
            label: 'Mi perfil',
            icon: <IconUserCircle {...IconProps}/>
        },
        {
            key: 'user2',
            label: 'Listado de escuelas',
            icon: <IconPencilSearch {...IconProps}/>
        },
    ]

}

const getMenusMap = () => {
    let map = {};

    Object.keys(menus).map( (key) => {
        map[key] = key;
    });

    return map;
};


export function getMenu(selectedMenu){
    return menus[selectedMenu] ?? [];
}

export const mapMenus = getMenusMap();