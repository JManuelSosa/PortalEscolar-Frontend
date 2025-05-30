import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FakeAPI from "../Js/FakeApi";


import CardContent from "../Components/General/CardContent";
import { VsCodeIcon } from "../Js/Icons";
import { IndustrialIcon } from "../Js/Icons";
import { AdministracionIcon } from "../Js/Icons";

//AntDesign
import { Col, Row, Divider, Card } from "antd";

//Css
import StyleDivision from '@css/Views/DivisionView.module.css';

export default function DivisionView(){

    const [divisiones, setDivisiones] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Simula la llamada a la API
        const api = new FakeAPI();
        setDivisiones(api.getAllDivisiones());
    }, []);

    function verCarreras(idDivision, nameDivision){
        navigate("/Carreras", { state: { divisionID: idDivision, divisionName: nameDivision } });
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
                <h1>Divisiones de la escuela</h1>
            </Divider>

            <Row gutter={[16, 16]} className={StyleDivision.RowContenido}>
                
                {divisiones.map((division) => (
                    <Col key={division.id} xs={24} md={12} lg={8} onClick={() => { verCarreras(division.id, division.name) }}>
                        <Card className={StyleDivision.CardDivisiones} hoverable>
                            <Row className={StyleDivision.HeaderCard}>
                                { obtenerIcono(division.id) }
                            </Row>
                            <Row className={StyleDivision.BodyCard}>
                                <h2 className={StyleDivision.TitleHomeOptions}>
                                    {division.name} {/* Renderiza el nombre de la división */}
                                </h2>
                            </Row>
                        </Card>
                    </Col>
                ))}


            </Row>
        </section>
        </>
    );
}