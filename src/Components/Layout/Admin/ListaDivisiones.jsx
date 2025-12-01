// React
import { useNavigate } from "react-router-dom";

// Utilidades
import LoadingLogo from "../../Utilities/LoadingLogo";
import { routes } from "../../../Js/Utilities/Routes";

//Ant
import { Flex, Card, Spin, Alert, Empty } from "antd";

// Iconos
import { IconSchool } from "@tabler/icons-react";

//css
import css from '@css/Layout/ListaDivisiones.module.css'

export default function ListaDivisiones({ divisiones, isLoading, isError }) {

    const navigate = useNavigate();

    const goToCareer = (divisionId, name) => {
        navigate(routes.carreras.nav(divisionId), {
            state: {
                divisionName: name
            }
        });
    };
    

    if (isError) {
        return (
            <Alert 
                message="Error al cargar empleados"
                description={error?.message || "No se pudieron cargar los datos"}
                type="error"
                showIcon
            />
        );
    }

    if (isLoading) {
        return (
            <div style={{height:"100%", width: "100%", display: 'flex', justifyContent:'center', alignItems:'center', overflow:'hidden'}}>
                <Spin indicator={<LoadingLogo/>}/>
            </div>
        );
    }

    if (divisiones.length === 0) {
        return (
            <div style={{height:"800px", width: "100%", display: 'flex', justifyContent:'center', alignItems:'center', overflow:'hidden'}}>
                <Empty description="No hay divisiones registradas" image={Empty.PRESENTED_IMAGE_SIMPLE}/>
            </div>
        );
    }

    const cardClassNames = {
        body: css.cardBody
    }

    return (

        <Flex wrap gap={24} justify="space-evenly" align="center">
            {
                divisiones.map((division) => {
                    return(
                        <Card key={ division.id } className={ css.card } classNames={cardClassNames} onClick={ () => { goToCareer(division.id, division.name) }}>
                            <div className={ css.cardInfo}>
                                <span>{ division.name }</span>
                                <span> Número de carreras: { division.careers_count }</span>
                            </div>
                            <div className={ css.cardIcon}>
                                <div className={ css.iconBg }>
                                    <IconSchool></IconSchool>
                                </div>
                            </div>
                        </Card>
                    );
                })
            }
        </Flex> 

    )

}