// Css
import css from '@css/Layout/ListaCarreras.module.css';

// Utilidades
import LoadingLogo from '../../Utilities/LoadingLogo';

//Icons
import { IconHomeFilled, IconUsersGroup } from '@tabler/icons-react';

// Ant
import { Alert, Spin, Empty, Card} from 'antd';


export default function ListaCarreras({ carreras, isLoading, isError }){

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

    if (carreras.length === 0) {
        return (
            <div style={{height: "400px", width: "100%", display: 'flex', justifyContent:'center', alignItems:'center', overflow:'hidden'}}>
                <Empty description="No hay carreras registradas" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
        );
    }

    const cardClassNames = {
        body: css.cardBody,
    }

    return(

        <section className={css.listaCarreras}>
            {carreras.map((carrera) => (
                <Card key={carrera.key} className={css.cardCarrera} classNames={cardClassNames} hoverable>

                    <div className={css.careerTitle}>
                        {carrera.name}
                    </div>
                    
                    <div className={css.careerInfo}>
                        <div className={css.careerData}>
                            <span className={css.dataTitle}>Grupos</span>
                            <div>
                                <div className={ css.data}>
                                    <span>
                                        { carrera.groups }
                                    </span>
                                    <div className={ css.iconBg }>
                                        <IconHomeFilled/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={css.careerData}>
                            <span className={css.dataTitle}>Alumnos</span>
                            <div>
                                <div className={ css.data}>
                                    <span>
                                        { carrera.studentsCount }
                                    </span>
                                    <div className={ css.iconBg }>
                                        <IconUsersGroup/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    </div>
                    
                </Card>
            ))}
        </section>

    )
}