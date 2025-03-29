import { Col, Row } from "antd";
import CardContent from "../Components/CardContent";

//Icons
import { IconSchool } from "../Js/Icons";
import { IconCertificate } from '../Js/Icons';
import { IconMail } from "../Js/Icons";

//Css
import '../CSS/HomeView.css';


export default function HomeView(){

    const Usuario = 'Usuario';
    return(
        <>
            <h1 className="HomeTittle">Bienvenido {Usuario} </h1>
            <Row className="MainOpcion" gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={8}>
                    <CardContent className={'CardMenu'}>
                        <Row className="HeaderCard">
                            <IconSchool strokeColor={"rgb(var(--conifer-700))"} strokeWidth={2} size={200}></IconSchool>
                        </Row>
                        <Row className="BodyCard">
                            <h2 className="TittleHomeOptions">
                                Alumnos
                            </h2>
                        </Row>
                    </CardContent>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                    <CardContent className={'CardMenu'}>
                        <Row className="HeaderCard">
                            <IconMail strokeColor={"rgb(var(--conifer-700))"} strokeWidth={2} size={200}></IconMail>
                        </Row>
                        <Row className="BodyCard">
                            <h2 className="TittleHomeOptions">
                                Avisos
                            </h2>
                        </Row>
                    </CardContent>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                    <CardContent className={'CardMenu'}>
                        
                            <Row className="HeaderCard">
                                <IconCertificate strokeColor={"rgb(var(--conifer-700))"} strokeWidth={2} size={200}></IconCertificate>
                            </Row>
                            <Row className="BodyCard">
                                <h2 className="TittleHomeOptions">
                                    Documentos
                                </h2>
                            </Row>
                        
                    </CardContent>
                </Col>
            </Row>
        </>
    );
    
}