//React
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Ant Design
import { Col, Row, Layout } from "antd";
const { Header } = Layout;

//Iconos
import { IconMainLogo } from "../../../Js/Icons";
import { IconUserFilled } from '@tabler/icons-react';

// Componentes
import DrawerUser from "./DrawerUser";
import ArrowBackNavigate from "../../Utilities/ArrowBackNavigate";

// Utilidades
import { routes } from '../../../Js/Utilities/Routes';

// Estilos
import HeaderStyle from '@css/Layout/HeaderComponent.module.css';


export default function HeaderLayout(){
    
    const navigate = useNavigate();
    const [openDrawer, setOpenDrawer] = useState(false);

    const showDrawer = () => {
        setOpenDrawer(true);
    };

    const closeDrawer = () => {
        setOpenDrawer(false);
    };

    const navigateHome = () => {
        navigate(routes.userHome);
    }


    return(
        <>
            <Header className={ HeaderStyle.headerHome }>
                <Row className={ HeaderStyle.headerMainRow }>
                    <Col span={11} className={ HeaderStyle.headerColBackArrow }>
                        <ArrowBackNavigate/>
                    </Col>
                    <Col span={2} className={ HeaderStyle.headerCol } onClick={ navigateHome }>
                        <IconMainLogo className={ HeaderStyle.iconMain } size={50}/>
                    </Col>
                    <Col span={11} className={ HeaderStyle.headerColButtonUser }>
                            <IconUserFilled className={ HeaderStyle.headerBtnUser } size={32} onClick={showDrawer}/>
                    </Col>
                </Row>
            </Header> 
            <DrawerUser open={ openDrawer } onClose={closeDrawer} />
        </>
    )
}