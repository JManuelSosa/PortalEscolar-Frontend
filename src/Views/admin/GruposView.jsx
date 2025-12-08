//React
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

//Ant
import { Button, Modal, Form, Spin } from "antd";

// Iconos
import { IconPlus } from "@tabler/icons-react";

//Css
import StyleGrupos from '@css/Views/admin/GruposView.module.css';

// Hooks
import { useGroupsByCareer } from "../../Hooks/Fetching/useGroupsByCareer";
import { useNewGroupFormData } from "../../Hooks/Fetching/usePublicData";
import { useGroupMutations } from "../../Hooks/Fetching/useGroupsMutations";

// Componentes
import CardGrupo from "../../Components/Layout/Admin/CardGrupo";
import NewGroupForm from "../../Components/Forms/NewGroupForm";
import ButtonsCloseModal from "../../Components/Utilities/ButtonsCloseModal";
import LoadingLogo from "../../Components/Utilities/LoadingLogo";


export default function GruposView() {

    const [open, setOpen] = useState(false);
    let { carreraID } = useParams();
    const location = useLocation();
    const { data:groups, isLoading, isError } = useGroupsByCareer(carreraID);
    const { data:dataSelects, isLoading:isLoadingFormData, isError:isErrorFormData } = useNewGroupFormData();
    const { addGroupGlobal, isPendingGlobal } = useGroupMutations();
    

    const [form] = Form.useForm();
    carreraID = parseInt(carreraID);
    const { careerName } = location.state || {};

    const openModal = () => {
        setOpen(true);
    }

    const closeModal = () => {
        form.resetFields();
        setOpen(false);
    }

    const submitForm = () => {
        form.submit();
    }

    const onFinish = (values) => {
        addGroupGlobal(values, {
            onSuccess: () => {
                closeModal();
            }
        });
    }


    const modalClassNames = {
        header: StyleGrupos['header-modal'],
        body: StyleGrupos['body-modal'],
        content: StyleGrupos['content-modal'],
        footer: StyleGrupos['footer-modal']
    }
    

    if(isLoading && isLoadingFormData) {
        return (
            <div style={{height:"100%", width: "100%", display: 'flex', justifyContent:'center', alignItems:'center', overflow:'hidden'}}>
                <Spin indicator={<LoadingLogo/>}/>
            </div>
        );
    }

    return (

        <>
            <section className={StyleGrupos.Divisiones}>

                <div className={StyleGrupos['header-view']}>
                    <div className={StyleGrupos['labels-view']}>
                        <h1>Grupos en {careerName}</h1>
                        <span>Grupos específicos de esta carrera.</span>
                    </div>
                    <Button shape="circle" type="primary" className={StyleGrupos['control-button']}>
                        <IconPlus size={28} onClick={openModal}/>
                    </Button>
                </div>

                <div className={StyleGrupos['responsive-grid']}>
                    {
                        groups?.map( grupo => 
                            <div key={grupo.groupKey}>
                                <CardGrupo group={grupo}/>
                            </div>
                        )
                    }
                </div>

                <Modal
                    title={"Crear Nuevo Grupo"}
                    onCancel={closeModal}
                    centered
                    open={open}
                    footer={<ButtonsCloseModal onOk={submitForm} onClose={closeModal} isPending={isPendingGlobal} descriptionOk={"Agregar grupo"}/>}
                    className={StyleGrupos['modal']}
                    classNames={modalClassNames}
                    width={{
                        xs: '90%',
                        sm: '80%',
                        md: '70%',
                        lg: '60%',
                        xl: '50%',
                        xxl: '40%',
                    }}
                >
                    <NewGroupForm form={form} onFinish={onFinish} dataSelects={dataSelects} inCareer={carreraID}/>
                </Modal>
                

            </section>
        </>

    );

}