// React
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from "../stores/authStore";

// Ant
import { Spin } from 'antd';
import LoadingLogo from '../Components/Utilities/LoadingLogo';

// Este componente protege rutas que REQUIEREN inicio de sesión (cualquier rol)
const ProtectedRoute = () => {

    const [isHydrated, setIsHydrated] = useState(false);
    const user = useAuthStore(state => state.user);

    useEffect(() => {
        // hasHydrated() nos dice si la carga inicial desde sessionStorage terminó
        setIsHydrated(useAuthStore.persist.hasHydrated());
    }, []);

    if (!isHydrated) {
        return <Spin tip="Cargando sesión..." indicator={<LoadingLogo/>} size="large" fullscreen />;
    }

    if (!user) {
        return <Navigate to="/Login" replace/>;
    }

    // 3. Si hay usuario, permite el paso a la ruta anidada (renderiza el <Outlet>)
    return <Outlet/>;
};

export default ProtectedRoute;