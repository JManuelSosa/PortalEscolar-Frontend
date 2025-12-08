// React
import { useLocation, useNavigate, matchPath } from "react-router-dom";

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

    const handleBackNavigation = () => {

        const currentRouteConfig = Object.values(routes).find(route => {
            // Solo nos interesan los objetos complejos que tienen 'path'
            if (typeof route === 'object' && route.path) {
                // matchPath verifica si la URL actual coincide con el patrón (ej: /divisiones/1/carreras coincide con /divisiones/:id/carreras)
                return matchPath(route.path, location.pathname);
            }
            return false;
        });

        // Si encontramos la configuración de la ruta actual y tiene un padre forzado:
        if (currentRouteConfig && currentRouteConfig.backRoute) {
            navigate(currentRouteConfig.backRoute);
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