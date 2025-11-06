// React
import { useLocation, useNavigate } from "react-router-dom";

// Iconos
import { IconArrowNarrowLeft } from "@tabler/icons-react";

// Utilidades
import { routes } from '../../Js/Utilities/Routes';

// Css
import HeaderStyle from '@css/Layout/HeaderComponent.module.css';

export default function ArrowBackNavigate(){

    const location = useLocation();
    const navigate = useNavigate();

    if (location.pathname === routes.userHome || location.pathname === '/') {
        return null;
    }

    // 2. Mapa de Excepciones: Define manualmente los padres lógicos de rutas planas.
    const manualParents = {
        [routes.adminHome]: routes.userHome,  // '/adminHome' regresa a '/userHome'
        [routes.divisiones]: routes.userHome, // '/divisiones' regresa a '/adminHome'
        // Futuros ejemplos:
        // '/teacherHome': ROUTES.USER_HOME,
        // '/maestro/grupos': '/teacherHome',
    };

    const handleBackNavigation = () => {

        if (manualParents[location.pathname]) {
            navigate(manualParents[location.pathname]);
            return;
        }

        const pathSegments = location.pathname.split('/').filter(Boolean);
        // Ejemplo: pathname -> "/Divisiones/123/Carreras"
        // split('/') -> ["", "Divisiones", "123", "Carreras"]
        // filter(Boolean)' -> ["Divisiones", "123", "Carreras"]

        if (pathSegments.length <= 1) {
            navigate(routes.userHome);
            return;
        }

        const parentSegments = pathSegments.slice(0, -1); // Quita el ultimo elemento del array de pathSegments
        const parentPath = `/${ parentSegments.join('/') }`;
        
        navigate(parentPath);
    };

    return (    
        <div className={ HeaderStyle.headerIconContainer } onClick={handleBackNavigation}>
            <IconArrowNarrowLeft size={45} stroke={1.5} />
        </div>
    )

}