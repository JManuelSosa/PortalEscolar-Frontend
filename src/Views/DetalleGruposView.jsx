//React
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

//Ant
import { Result, Button, Divider, Row, Table, Space } from "antd";

//Faker Api
import FakeAPI from "../Js/FakeApi";

//Components
import CardContent from "../Components/General/CardContent";
import AlumnoResumen from "../Components/Layout/Alumno/AlumnoResumen";
//Css


export default function DetalleGruposView(){

        const fakeAPI = new FakeAPI();
    
        const navigate = useNavigate();
        const currentLocation = useLocation();
    
        const { grupoID, grupoName } = currentLocation.state || {};
    
        const [detalle, setDetalle] = useState([]);
    
        useEffect(() => {
            if (grupoID) {
                const detalleGruposData = fakeAPI.getGrupoDetails(grupoID);
                setDetalle(detalleGruposData);
                
            }
        }, [grupoID]);
        
        console.log(detalle);
    
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

        const columns = [
            {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name'
            },
            {
            title: 'Edad',
            dataIndex: 'age',
            key: 'age',
            },
            {
            title: 'Correo',
            dataIndex: 'email',
            key: 'email',
            },
            {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                <Button type="primary"> Enviar Correo </Button>
                </Space>
            ),
            },
        ];

        const data = detalle.alumnos;

        return(
        
                        <>
                        <section className="Divisiones">
                
                            <Divider>
                                <h1>Detalle de { grupoName }</h1>
                            </Divider>
                            <div>
                                <AlumnoResumen/>
                            </div>
                            <Table columns={columns} dataSource={data} />;
                            
                            
                        </section>
                        </>
        
            );
    
}