//React
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

//Ant
import { Result, Button, Divider, Flex } from "antd";

//Faker Api
import FakeAPI from "../Js/FakeApi";

//Components
import ListaAlumnos from "../Components/Layout/Alumno/ListaAlumnos";

//Css
import DetalleCss from '@css/Views/DetalleGrupos.module.css';

export default function DetalleGruposView(){

        const fakeAPI = new FakeAPI();
    
        const navigate = useNavigate();
        const currentLocation = useLocation();
    
        const { grupoID, grupoName } = currentLocation.state || {};
    
        const [detalle, setDetalle] = useState({ alumnos: [] });
    
        useEffect(() => {
            if (grupoID) {
                const detalleGruposData = fakeAPI.getGrupoDetails(grupoID);
                setDetalle(detalleGruposData);
            }
        }, [grupoID]);
        
    
        if (!grupoID) {
            return (
                <Result
                    status="404"
                    title="Acceso no válido"
                    subTitle="Debes acceder a esta página desde el listado de grupos"
                    extra={<Button type="primary" onClick={() => navigate('/')}>Volver</Button>}
                />
            );
        }

        const data = detalle.alumnos;
        console.log(data);

        return(
        
                        <>
                        <section className={DetalleCss.detalleGrupo}>
                            <Divider>
                                <h1>Detalle de { grupoName }</h1>
                            </Divider>
                            <ListaAlumnos/>
                        </section>
                        </>
        
            );
    
}