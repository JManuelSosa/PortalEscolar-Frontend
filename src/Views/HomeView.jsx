import { Col, Row } from "antd";
import CardContent from "../Components/CardContent";

import '../CSS/HomeView.css';


export default function HomeView(){

    const Usuario = 'Usuario';
    return(
        <>
            <h1 className="HomeTittle">Bienvenido {Usuario} </h1>
            <Row className="MainOpcion">
                <Col sm={24} md={8}>
                    <CardContent></CardContent>
                </Col>
                <Col sm={24} md={8}></Col>
                <Col sm={24} md={8}></Col>
            </Row>
        </>
    );
    
}