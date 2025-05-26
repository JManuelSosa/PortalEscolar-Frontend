//React
import { useLocation, useNavigate } from "react-router-dom";

// Ant Design
import Layout from "antd/es/layout/layout";
const { Header } = Layout;
import { Col, Row, Divider} from "antd";
import { Button } from "antd";
import { Popover } from "antd";

//Iconos
import { IconMainLogo } from "../../../Js/Icons";
import { IconUserFill } from "../../../Js/Icons";
import { IconBackArrow } from "../../../Js/Icons";


import HeaderStyle from '@css/Layout/HeaderComponent.module.css';

export default function HeaderLayout(){

    const currentLocation = useLocation(); 
    //Para el funcionamiento del boton 'back'
    const { divisionID, divisionName } = currentLocation.state || {};
    const { carreraID, carreraName } = currentLocation.state || {};

    const navigate = useNavigate(); 

    const getBackRoute = () => {
        const backRoutes = {
            "/Divisiones": { path: "/", state: null }, // Si estás en /Divisiones, regresa al Home
            "/Carreras": { path: "/Divisiones", state:null }, // Si estás en /Carreras regresa a /Divisiones
            "/Grupos": { path:"/Carreras", state: { divisionID, divisionName }}, // Si estás en /DetalleGrupo, regresa a /Grupos
            "/DetalleGrupo": { path:"/Grupos", state: { carreraID, carreraName, divisionID, divisionName } }
        };

        return backRoutes[currentLocation.pathname] || "/"; // Valor por defecto
    };

    let { path, state } = getBackRoute();

    function renderArrowBack(){
        if(currentLocation.pathname === '/'){
            return;
        }

        return(
            <div className={ HeaderStyle.headerIconContainer } onClick={() => {navigate(path, { state })}}>
                <IconBackArrow size={45} strokeColor={"rgb(var(--conifer-800))"} ></IconBackArrow>
            </div>
        );
    }

    //Popover
    const contentPopover = (
        <div class={ HeaderStyle.headerMenuUser }>
            <Divider>Cuenta</Divider>
            <ul className={ HeaderStyle.headerUserOptions }>
                <li>
                    <Button type="ghost" block className={ HeaderStyle.headerButtonOptions }>Mi perfil</Button>
                </li>
                <li>
                    <Button type="ghost" block className={ HeaderStyle.headerButtonOptions }>Cerrar sesión</Button>
                </li>
            </ul>
        </div>
    );


    return(
        <Header className={ HeaderStyle.headerHome }>
            <Row className={ HeaderStyle.headerMainRow }>
                <Col span={11} className={ HeaderStyle.headerColBackArrow }>
                    { renderArrowBack() }
                </Col>
                <Col span={2} className={ HeaderStyle.headerCol } onClick={()=>{navigate('/')}}>
                    <IconMainLogo className={ HeaderStyle.iconMain } size={60}/>
                </Col>
                <Col span={11} className={ HeaderStyle.headerColButtonUser }>
                    <Popover content={ contentPopover } trigger={"click"}>
                        <Button className={ HeaderStyle.headerBtnUser } type="text" shape="circle">
                            <IconUserFill size={40}/>
                        </Button>
                    </Popover>
                </Col>
            </Row>
        </Header>  
    )
}