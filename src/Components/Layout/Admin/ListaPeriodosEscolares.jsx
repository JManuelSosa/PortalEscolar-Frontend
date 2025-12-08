// Iconos
import { IconCalendarCheck, IconEdit, IconEyeSearch } from "@tabler/icons-react"

// Ant
import { Divider, Tooltip } from "antd"

// Css
import css from '@css/Components/ListaPeriodosEscolares.module.css';

export default function ListaPeriodosEscolares({ periodosData }) {

    return (
        <>
            <div className={css['list-header']}>
                <span>Información del Periodo</span>
                <span>Acciones</span>
            </div>
            
            <div className={css['list-content']}>
                { periodosData.map( e => (
                    <div className={css['list-element']} key={e.id}>

                        <div className={css['content']}>
                            <div className={css['icon-calendar']}>
                                <IconCalendarCheck size={36}/>
                            </div>

                            <div className={css['info-list']}>
                                <span className={css['ciclo-escolar']}>
                                    { e.nombre }
                                </span>
                                <div className={css['info-details']}>
                                    <div className={css['item-details']}>
                                        <span className={css['item-detail-title']}> 
                                            Ciclo Escolar: 
                                        </span>
                                        <span>
                                            { e.cicloEscolar }
                                        </span>
                                    </div>
                                    <div className={css['item-details']}>
                                        <span className={css['item-detail-title']}> 
                                            Periodo Escolar: 
                                        </span>
                                        <span>
                                            { e.tipoPeriodo }
                                        </span>
                                    </div>
                                    <div className={css['item-details']}>
                                        <span className={css['item-detail-title']}> 
                                            Número Ordinal: 
                                        </span>
                                        <span>
                                            { e.numeroOrdinal } 
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className={css['info-dates']}>
                                <div className={ css['info-dates-details'] }>
                                    <span>Inicio</span>
                                    <span>
                                        { e.fechaInicio }
                                    </span>
                                </div>
                                <div className={ css['info-dates-details'] }>
                                    <span>Final</span>
                                    <span>
                                        { e.fechaFin }
                                    </span>
                                </div>
                            </div>
                        
                        </div>

                        <div className={css['actions']}>
                            {/* <IconEdit size={32} className={css['icon-action']}/> 
                            <Divider type="vertical" /> */}
                            <Tooltip title={"Ver detalles"}>
                                <IconEyeSearch  size={32}className={css['icon-action']}/>
                            </Tooltip>
                        </div>

                    </div>
                ))}
            </div>
        

        </>
    )

}