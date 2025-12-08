// React
import { useState } from "react";

import { useDivisions } from "../../Hooks/Fetching/useDivisions";

// Formularios
import NewDivisionForm from "../../Components/Forms/NewDivisionForm";

// Utilidades
import ListaDivisiones from "../../Components/Layout/Admin/ListaDivisiones";
import { useDivisionMutations } from "../../Hooks/Fetching/useDivisionMutations";

//AntDesign
import { Divider, Button, Tooltip, Drawer, Form } from "antd";

// Css
import css from '@css/Views/admin/DivisionesView.module.css';

// Iconos
import { IconPlus } from "@tabler/icons-react";


export default function DivisionView(){

    const [open, setOpen] = useState(false);
    const { addNewDivision, isPending } = useDivisionMutations();
    const [form] = Form.useForm();

    const { data: divisiones = [], isLoading, isError } = useDivisions();

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        form.resetFields();
        setOpen(false);
    };

    const onFinish = (values) => {
        addNewDivision(values, {
            onSuccess: () => {
                onClose()
            }
        });
    }

    return(
        <>
        <section className={ css.container }>

            <div className={css['header-view']}>
                <div className={css.titleView}>
                    <h1>Divisiones de la escuela</h1>
                    <span>
                        Administración de las divisiones escolares de la institución
                    </span>
                </div>

                <div className={css.containerButtons}>
                    <Tooltip title={"Añadir División"}>
                        <Button type="primary" shape="circle" onClick={showDrawer} className={css.controlButton}>
                            <IconPlus size={28}/>
                        </Button>
                    </Tooltip>
                </div>
            </div>

            <ListaDivisiones divisiones={divisiones} isLoading={isLoading} isError={isError}/>

            <Drawer onClose={onClose} open={open} title="Agregar división">
                <NewDivisionForm form={form} isPending={isPending} onFinish={onFinish}/>
            </Drawer>
        </section>
        </>
    );
}