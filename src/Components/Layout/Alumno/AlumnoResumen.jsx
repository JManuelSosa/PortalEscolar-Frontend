// Ant Design
import { Avatar, Row, Card, Tag } from "antd"

//Tabler Icons
import { IconMailPlus } from '@tabler/icons-react';
import { IconUserSquareRounded } from '@tabler/icons-react';

import AlumnoCss from '@css/Components/AlumnoComponent.module.css';

export default function AlumnoResumen({ alumno }){

    const { id, name, age, enrollment, status } = alumno;

    const clasesCard = {
        body: AlumnoCss.cardBody,
        actions: AlumnoCss.cardActions
    }

    const statusClass = {
        1: AlumnoCss.activeStudent,
        2: AlumnoCss.waitPayStudent,
        3: AlumnoCss.disenrollmentStudent
    }

    const labelsStatus = {
        1: "Activo",
        2: "Pago pendiente",
        3: "No inscrito"
    }
    
    const clasesTag = [
        AlumnoCss.tagAntStudent,
        statusClass[status]
    ].filter(Boolean).join(' ');

    const actions = [
        <span className={AlumnoCss.spanActions} key={"sendMessage"}>
            <IconMailPlus size="30"/> Enviar Mensaje
        </span>,
        <span className={AlumnoCss.spanActions} key={"goToProfile"}>
            <IconUserSquareRounded size="30"/> Ver perfil
        </span>
        
    ]

    return(
        <>

            <Card className={AlumnoCss.mainCard} classNames={clasesCard} variant="borderless" hoverable actions={actions}>
                <span className={AlumnoCss.numberList}>{ id }</span>
                <Tag className={clasesTag}>{labelsStatus[status]}</Tag>
                <Row className={`${AlumnoCss.itemCard} ${AlumnoCss.imageCard}`}>
                    <Avatar size={150} src="/img/fotoReducida.jpg" loading="lazy"/>
                </Row>
                <Row className={`${AlumnoCss.itemCard}`}>
                    <span className={AlumnoCss.nameStudent}>{ name }</span>
                </Row>
                <Row className={AlumnoCss.contenidoCard} justify={"center"} align={"middle"}>
                    <span className={`${AlumnoCss.dataStudent} ${AlumnoCss.enrollmentStudent}`}>{enrollment}</span>
                </Row>
                <Row className={AlumnoCss.contenidoCard} align={"middle"} justify={"space-around"}>
                    <span className={`${AlumnoCss.dataStudent} ${AlumnoCss.careerStudent} `}>EVND</span>
                    <span className={`${AlumnoCss.dataStudent} ${AlumnoCss.ageStudent}`}>Edad: { age }</span>
                </Row>
            </Card>
        </>
    )
}