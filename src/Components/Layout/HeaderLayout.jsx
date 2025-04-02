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
    const navigate = useNavigate(); 

    const getBackRoute = () => {
        const backRoutes = {
            "/Divisiones": "/", // Si estás en /Divisiones, regresa al Home
            "/Carreras": "/Divisiones", // Si estás en /profile, regresa a /dashboard
            "/Grupos": "/Divisiones", // Si estás en /settings, regresa a /profile
            "/DetalleGrupo": "/Divisiones"
        };

        return backRoutes[currentLocation.pathname] || "/"; // Valor por defecto
    };

    function renderArrowBack(){
        if(currentLocation.pathname === '/'){
            return;
        }

        return(
            <div className="headerIconContainer" onClick={() => {navigate(getBackRoute())}}>
                <IconBackArrow size={50} strokeColor={"rgb(var(--conifer-800))"} ></IconBackArrow>
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