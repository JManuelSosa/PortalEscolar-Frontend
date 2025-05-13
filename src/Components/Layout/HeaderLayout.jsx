//React
import { useLocation, useNavigate } from "react-router-dom";

// Ant Design
import Layout from "antd/es/layout/layout";
const { Header } = Layout;
import { Col, Row, Divider} from "antd";
import { Button } from "antd";
import { Popover } from "antd";

//Iconos
import { IconMainLogo } from "../../Js/Icons";
import { IconUserFill } from "../../Js/Icons";
import { IconBackArrow } from "../../Js/Icons";

import '../../CSS/Layout/HeaderComponent.css';

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
            <div className="headerIconContainer" onClick={() => {navigate(path, { state })}}>
                <IconBackArrow size={45} strokeColor={"rgb(var(--conifer-800))"} ></IconBackArrow>
            </div>
        );
    }

    //Popover
    const contentPopover = (
        <div class="headerMenuUser">
            <Divider>Cuenta</Divider>
            <ul className="headerUserOptions">
                <li>
                    <Button type="ghost" block className="headerButtonOptions">Mi perfil</Button>
                </li>
                <li>
                    <Button type="ghost" block className="headerButtonOptions">Cerrar sesión</Button>
                </li>
            </ul>
        </div>
    );


    return(
        <Header className='header-home'>
            <Row className="headerMainRow">
                <Col span={11} className="headerColBackArrow">
                    { renderArrowBack() }
                </Col>
                <Col span={2} className="headerCol" onClick={()=>{navigate('/')}}>
                    <IconMainLogo size={60}/>
                </Col>
                <Col span={11} className="headerColButtonUser">
                    <Popover content={ contentPopover } trigger={"click"}>
                        <Button className="headerBtnUser" type="text" shape="circle">
                            <IconUserFill size={40}/>
                        </Button>
                    </Popover>
                </Col>
            </Row>
        </Header>  
    )
}