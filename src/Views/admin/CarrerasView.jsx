//React
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";

// Utilidades
import { useCareerByDivision } from "../../Hooks/Fetching/useCareersByDivision";
import { useCareerMutations } from "../../Hooks/Fetching/useCareersMutations";
import ListaCarreras from "../../Components/Layout/Admin/ListaCarreras";
import NewCareerForm from "../../Components/Forms/NewCareerForm";

//Css
import css from '@css/Views/CarrerasView.module.css';

// Ant Desing
import { Tooltip, Button, Drawer, Form } from "antd";

// Iconos 
import { IconPlus } from "@tabler/icons-react";

export default function CarrerasView(){

    const [open, setOpen] = useState(false);
    const { divisionID } = useParams();
    const location = useLocation();
    const { divisionName } = location.state || {};

    const { data, isLoading, isError } = useCareerByDivision(divisionID);
    const { newCareer, isPending, isSuccess } = useCareerMutations(divisionID);
    const [form] = Form.useForm();

    const navigate = useNavigate();

    const openDrawer = () => {
        setOpen(true);
    }

    const closeDrawer = () => {
        form.resetFields();
        setOpen(false);
    }

    const onFinish = (values) => {
        newCareer(values, {
            onSuccess: () => {
                closeDrawer()
            }
        });
    }

    return(

        <>
            <section className="Divisiones">
                <span className={css.titleView}>
                    <h1>Carreras en: { divisionName }</h1>
                </span>

                <div className={css.containerButtons}>
                    <Tooltip title={"Añadir Carrera"}>
                        <Button type="primary" shape="circle" className={css.controlButton} onClick={openDrawer}>
                            <IconPlus size={28}/>
                        </Button>
                    </Tooltip>
                </div>

                <ListaCarreras carreras={data} isError={isError} isLoading={isLoading}/>

                <Drawer open={open} onClose={closeDrawer} title="Agregar carrera">
                    <NewCareerForm form={form} onFinish={onFinish} isPending={isPending}/>
                </Drawer>

            </section>
        </>

    );
}