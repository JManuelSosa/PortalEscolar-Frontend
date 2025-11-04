// React
import { useNavigate } from "react-router-dom";

// Ant
import { Button, Result } from "antd";

// Css
import css from '@css/Views/public/Unauthorized.module.css';

//Rutas
import { routes } from "../../Js/Utilities/Routes";

export default function UnauthorizedView(){

    const navigate = useNavigate();

    const exit = () => {
        navigate(routes.userHome);
    }

    return(
        <>
            <div className={css.container}>
                <Result 
                    status="403" 
                    title="403"
                    subTitle="No tienes autorización para acceder a esta página"
                    extra={<Button type="primary" onClick={() => { exit() }}>Regresar al Home</Button>}
                />
            </div>

        </>
    )

}