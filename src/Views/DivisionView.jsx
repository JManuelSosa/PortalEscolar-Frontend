
import CardContent from "../Components/CardContent";
import { IconSchool } from "../Js/Icons";

//AntDesign
import { Col, Row, Divider } from "antd";
import { Button } from "antd";

//Css
import '../CSS/Divisiones.css';

export default function DivisionView(){

    return(
        <>
        <section className="Divisiones">

            <Divider>
                <h1>Divisiones de la escuela</h1>
            </Divider>

            <Row gutter={[16, 16]} className="RowContenido">
                <Col xs={24} md={12} lg={8}>
                    <CardContent>
                        <Row className="HeaderCard">
                            <IconSchool strokeColor={"rgb(var(--conifer-700))"} strokeWidth={2} size={200}></IconSchool>
                        </Row>
                        <Row className="BodyCard">
                            <h2 className="TittleHomeOptions">
                                Industrial
                            </h2>
                        </Row>
                    </CardContent>
                </Col>

                <Col xs={24} md={12} lg={8}>
                    <CardContent>
                        <Row className="HeaderCard">
                            <IconSchool strokeColor={"rgb(var(--conifer-700))"} strokeWidth={2} size={200}></IconSchool>
                        </Row>
                        <Row className="BodyCard">
                            <h2 className="TittleHomeOptions">
                                Informacion
                            </h2>
                        </Row>
                    </CardContent>
                </Col>

                <Col xs={24} md={12} lg={8}>
                    <CardContent>
                        <Row className="HeaderCard">
                            <IconSchool strokeColor={"rgb(var(--conifer-700))"} strokeWidth={2} size={200}></IconSchool>
                        </Row>
                        <Row className="BodyCard">
                            <h2 className="TittleHomeOptions">
                                Administración
                            </h2>
                        </Row>
                    </CardContent>
                </Col>

                <Col xs={24} md={12} lg={8}>
                    
                    <CardContent>
                        <Row className="HeaderCard">
                            <IconSchool strokeColor={"rgb(var(--conifer-700))"} strokeWidth={2} size={200}></IconSchool>
                        </Row>
                        <Row className="BodyCard">
                            <h2 className="TittleHomeOptions">
                                Innovacion y Desarrollo Estrátegico 
                            </h2>
                        </Row>
                    </CardContent>
                </Col>
            </Row>
        </section>
        </>
    );
}