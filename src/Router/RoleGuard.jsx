// React
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { routes } from "../Js/Utilities/Routes";

const RoleGuard = ({ allowedRoles }) => {

    const schools = useAuthStore(state => state.schools);
    const userRoles = schools.map(school => school.role) || [];

    const hasPermission = userRoles.some(role => allowedRoles.includes(role));

    if (!hasPermission) {
        return <Navigate to={ routes.unauthorized } replace />; 
    }

    return <Outlet />;
}

export default RoleGuard;