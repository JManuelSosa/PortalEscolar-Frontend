import { Col, Row, Card } from "antd";

//Icons
import { IconSchool } from "../Js/Icons";
import { IconCertificate } from '../Js/Icons';
import { IconMail } from "../Js/Icons";

//Css
import HomeCss from '@css/Views/HomeView.module.css';

import { useNavigate } from "react-router-dom";


export default function HomeView(){

    const Usuario = 'Universidad Iberoamericana';
    const navigate = useNavigate();
    return(
        <>
            <h1 className={ HomeCss.homeTittle }>Bienvenido {Usuario} </h1>
            <Row className={ HomeCss.mainOpcion } gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={8}>
                    <Card className={ HomeCss.cardMenu } hoverable>
                        <Row className={ HomeCss.headerCard } onClick={() => { navigate('/Divisiones')}}>
                            <IconSchool strokeColor={"rgb(var(--conifer-700))"} strokeWidth={2} size={200}></IconSchool>
                        </Row>
                        <Row className={ HomeCss.bodyCard }>
                            <h2 className={ HomeCss.titleHomeOptions }>
                                Divisiones
                            </h2>
                        </Row>
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                    <Card className={ HomeCss.cardMenu } hoverable>
                        <Row className={ HomeCss.headerCard }>
                            <IconMail strokeColor={"rgb(var(--conifer-700))"} strokeWidth={2} size={200}></IconMail>
                        </Row>
                        <Row className={ HomeCss.bodyCard }>
                            <h2 className={ HomeCss.titleHomeOptions }>
                                Avisos
                            </h2>
                        </Row>
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                    <Card className={ HomeCss.cardMenu } hoverable>
                        
                            <Row className={ HomeCss.headerCard }>
                                <IconCertificate strokeColor={"rgb(var(--conifer-700))"} strokeWidth={2} size={200}></IconCertificate>
                            </Row>
                            <Row className={ HomeCss.bodyCard }>
                                <h2 className={ HomeCss.titleHomeOptions }>
                                    Documentos
                                </h2>
                            </Row>
                        
                    </Card>
                </Col>
            </Row>
        </>
    );
    
}