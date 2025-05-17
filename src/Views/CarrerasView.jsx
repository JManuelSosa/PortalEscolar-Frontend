//React
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

//Ant
import { Result, Button, Divider, Row, Col } from "antd";

//Faker Api
import FakeAPI from "../Js/FakeApi";

//Components
import CardContent from "../Components/General/CardContent";

//Icons
import { VsCodeIcon } from "../Js/Icons";
import { IndustrialIcon } from "../Js/Icons";
import { AdministracionIcon } from "../Js/Icons";

//Css
import StyleCarreras from '@css/Views/CarrerasView.module.css';

export default function CarrerasView(){

    const fakeAPI = new FakeAPI();

    const navigate = useNavigate();
    const currentLocation = useLocation();

    const { divisionID, divisionName } = currentLocation.state || {};

    const [carreras, setCarreras] = useState([]);

    useEffect(() => {
        if (divisionID) {
            const carrerasData = fakeAPI.getCarrerasByDivision(divisionID);
            setCarreras(carrerasData);
        }
    }, [divisionID]);


    if (!divisionID) {
        return (
            <Result
                status="404"
                title="Acceso no válido"
                subTitle="Debes acceder a esta página desde el listado de divisiones"
                extra={<Button type="primary" onClick={() => navigate('/')}>Volver al inicio</Button>}
            />
        );
    }

    function verGrupos(idCarrera, nameCarrera){
        navigate("/Grupos", { state: { carreraID: idCarrera, carreraName: nameCarrera, divisionID: divisionID, divisionName: divisionName } });
    }

    function obtenerIcono(divisionID){
    
            switch(divisionID){
                case 1: 
                return <VsCodeIcon strokeColor={"rgb(var(--conifer-700))"} strokeWidth={2} size={180}/>
    
                case 2: 
                return <IndustrialIcon strokeColor={"rgb(var(--conifer-700))"} strokeWidth={2} size={180}/>
    
                case 3: 
                return <AdministracionIcon strokeColor={"rgb(var(--conifer-700))"} strokeWidth={2} size={180}/>
            }
    
    }

    return(

                <>
                <section className="Divisiones">
        
                    <Divider>
                        <h1>Carreras en { name }</h1>
                    </Divider>
        
                    <Row gutter={[16, 16]} className={StyleCarreras.RowContenido}>
                        
                        {carreras.map((carrera) => (
                            <Col key={carrera.id} xs={24} md={12} lg={8} onClick={() => { verGrupos(carrera.id, carrera.name )}}>
                                <CardContent className={StyleCarreras.CardGrupos} hoverable>
                                    <Row className={StyleCarreras.HeaderCard}>
                                        { obtenerIcono(divisionID) }
                                    </Row>
                                    <Row className={StyleCarreras.BodyCard}>
                                        <h2 className={StyleCarreras.TitleHomeOptions}>
                                            {carrera.name} {/* Renderiza el nombre de la división */}
                                        </h2>
                                    </Row>
                                </CardContent>
                            </Col>
                        ))}
        
        
                    </Row>
                </section>
                </>

    );
}