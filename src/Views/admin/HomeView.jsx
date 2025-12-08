import { Flex, Card } from "antd";

//Icons
import { IconBackpack, IconUsersGroup, IconBallpen, IconBook2, IconSchool, IconCalendarTime } from '@tabler/icons-react';
import { IconGroup } from "../../Js/Icons";

//Css
import HomeCss from '@css/Views/HomeView.module.css';

import { useNavigate } from "react-router-dom";


import { routes } from '@js/Utilities/Routes.js';

const cardClassNames = {
    body: HomeCss.cardBody
}

const sections = [
    {
        title: 'Estudiantes',
        description: 'Gestiona operaciones de los estudiantes',
        icon: <IconBackpack></IconBackpack>,
        key: 'estudiantes'
    },
    {
        title: 'Empleados',
        description: 'Administra a los empleados de la institución',
        icon: <IconUsersGroup></IconUsersGroup>,
        key: 'empleados',
        path: routes.empleados.path
    },
    {
        title: 'Periodos Escolares',
        description: 'Establece y gestiona los periodos temporales de la institución',
        icon: <IconCalendarTime></IconCalendarTime>,
        key: 'periodosEscolares',
        path: routes.periodosEscolares.path
    },
    {
        title: 'Profesores',
        description: 'Coordina materias y grupos asignados a tus docentes',
        icon: <IconBallpen></IconBallpen>,
        key: 'maestros'
    },
    {
        title: 'Divisiones',
        description: 'Gestiona tus divisiones escolares',
        icon: <IconSchool></IconSchool>,
        key: 'divisiones',
        path: routes.divisiones.path
    },
    {
        title: 'Grupos',
        description: 'Administra tus grupos escolares por periodo escolar',
        icon: <IconGroup strokeColor={'var(--primary)'}/>,
        key: 'gruposEscolares',
        path: routes.gruposGlobal.path
    }
];

export default function HomeView(){

    const navigate = useNavigate();

    return(
        <>
            <Flex wrap justify="space-between" align="center" className={ HomeCss.head }>
                <h1 className={ HomeCss.homeTittle }> Panel Administrativo </h1>
                <div className={ HomeCss.imageContainer }>
                    <img className={ HomeCss.logoSchool } src="/img/EduConnectColor.png" alt="Logo de la escuela"/>
                </div>
            </Flex>
            
    
            <Flex wrap gap={24} justify="space-evenly" align="center">
                {
                    sections.map((section) => {
                        return(
                            <Card key={ section.key } className={ HomeCss.card} classNames={cardClassNames} onClick={ () => { navigate(section.path ?? routes.userHome) }}>
                                <div className={ HomeCss.cardInfo}>
                                    <span>{ section.title }</span>
                                    <span>{ section.description }</span>
                                </div>
                                <div className={ HomeCss.cardIcon}>
                                    <div className={ HomeCss.iconBg }>
                                        { section.icon }
                                    </div>
                                </div>
                            </Card>
                        );
                    })
                }
            </Flex>


        </>
    );
    
}