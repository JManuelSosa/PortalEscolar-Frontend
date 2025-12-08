
// Ant
import { Card } from "antd"

// Iconos
import { IconCalendarClock } from "@tabler/icons-react";
import { IconGroup } from "../../../Js/Icons";

// Css
import css from '@css/Components/CardGrupo.module.css';


export default function CardGrupo({ forCareer = false, group }) {

    const cardClassNames = {
        body: css['card-body']
    }

    return (
        <>
            <Card hoverable className={css['card']} classNames={cardClassNames}>

                <div className={css['card-header']}>
                    <span>
                        {group.nombre}
                    </span>
                    <div className={css['card-icon']}>
                        <IconGroup size={28}/>
                    </div>
                    
                </div>

                <div className={css['card-info-group']}>

                    <div className={css['info-grado-grupo']}>
                        <div className={css['item-description']}>
                            <span>Grado: </span>
                            <span>{group.grado}</span>
                        </div>
                        <div className={css['item-description']}>
                            <span>Grupo: </span>
                            <span>{group.grupo}</span>
                        </div>
                    </div>

                    <div className={css['info-career-period']}>
                        <div className={css['item-description']}>
                            <span>Carrera: </span>
                            <span>{group.carrera}</span>
                        </div>
                        

                        <div className={css['info-period']}>
                            <IconCalendarClock/>
                            <span>Ciclo escolar: {group.periodoEscolar}</span>
                        </div>
                        
                    </div>
                    
                </div>

                
            </Card>
        </>
    )
}