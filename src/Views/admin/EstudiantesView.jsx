// Ant
import { Button } from "antd";

// Componentes
import ListadoAlumno from "./ListadoAlumno"

// Css
import css from '@css/Views/admin/EstudiantesView.module.css';

// Iconos
import { IconPlus } from "@tabler/icons-react";

export default function EstudiantesView(){


    return (
        <>
            <div className={css['header-view']}>
                <div className={css['titleView']}>
                    <h1>Estudiantes</h1>
                    <span>
                        Gestiona los alumnos inscritos en esta institución
                    </span>
                </div>

                <div className={css["containerButtons"]}>
                    <Button className={css['controlButton']} type="primary" shape="circle">
                        <IconPlus size={28} />
                    </Button>
                </div>
                
            </div>
            <ListadoAlumno/>
        </>
    )
}