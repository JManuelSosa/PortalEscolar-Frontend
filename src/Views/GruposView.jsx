//React
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

//Ant
import { Result, Button, Divider, Row, Col } from "antd";

//Faker Api
import FakeAPI from "../Js/FakeApi";

//Components
import CardContent from "../Components/General/CardContent";

//Css
import '../CSS/Views/GruposView.css';


export default function GruposView(){

        const fakeAPI = new FakeAPI();
    
        const navigate = useNavigate();
        const currentLocation = useLocation();
    
        const { carreraID, carreraName } = currentLocation.state || {};
    
        const [grupos, setGrupos] = useState([]);
    
        useEffect(() => {
            if (carreraID) {
                const gruposData = fakeAPI.getGruposByCarrera(carreraID);
                setGrupos(gruposData);
            }
        }, [carreraID]);
    
    
        if (!carreraID) {
            return (
                <Result
                    status="404"
                    title="Acceso no válido"
                    subTitle="Debes acceder a esta página desde el listado de carreras"
                    extra={<Button type="primary" onClick={() => navigate('/')}>Volver</Button>}
                />
            );
        }

        function verDetalleGrupos(idGrupo, nameGrupo){
            navigate("/DetalleGrupo", { state: { grupoID: idGrupo, grupoName: nameGrupo } });
        }

        return(
        
                        <>
                        <section className="Divisiones">
                
                            <Divider>
                                <h1>Grupos en { carreraName }</h1>
                            </Divider>
                
                            <Row gutter={[16, 16]} className="RowContenido">
                                
                                {grupos.map((grupo) => (
                                    <Col key={grupo.id} xs={24} md={12} lg={8} onClick={() => { verDetalleGrupos(grupo.id, grupo.name) }}>
                                        <CardContent className={"CardGrupos"}>
                                            <Row className="GruposBodyCard">
                                                <h2 className="GruposName">
                                                    {grupo.name} {/* Renderiza el nombre de la división */}
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