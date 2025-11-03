import Layout from "antd/es/layout/layout";
const { Header } = Layout;

import "../CSS/HeaderComponent.css";
import AuthMenu from "../Components/AuthMenu";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function HeaderLayout() {
    const { state, dispatch } = useAuth();

    const escuela = "Utm";
    const navigate = useNavigate();
    const onLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/Login");//
    }

    return (
        <Header className="header-home">
            <span>Bienvenido {escuela}</span>
            <AuthMenu
                user={state?.user}
                onLogout={onLogout}
            />
        </Header>
    );
}


