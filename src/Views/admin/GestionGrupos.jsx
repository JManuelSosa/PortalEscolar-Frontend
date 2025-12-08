// React
import { useState } from 'react';

// Ant
import { Tooltip, Button, Modal, Form, Spin } from 'antd';

// Iconos
import { IconPlus } from '@tabler/icons-react';

// Componentes
import NewGroupForm from '../../Components/Forms/NewGroupForm';
import CardGrupo from '../../Components/Layout/Admin/CardGrupo';
import ButtonsCloseModal from '../../Components/Utilities/ButtonsCloseModal';
import TabsGrupos from '../../Components/Layout/Admin/TabsGrupos';
import LoadingLogo from '../../Components/Utilities/LoadingLogo';

// Css
import css from '@css/Views/admin/GruposView.module.css';

// Hooks
import { useGroups } from '../../Hooks/Fetching/UseGroups';
import { useNewGroupFormData } from '../../Hooks/Fetching/usePublicData';
import { useGroupMutations } from '../../Hooks/Fetching/useGroupsMutations';


const GestionGrupos = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const { data, isLoading } = useGroups();
    const { data:dataSelects, isLoading:isLoadingFormData, isError:isErrorFormData } = useNewGroupFormData();
    const { addGroupGlobal, isPendingGlobal } = useGroupMutations();

    const openModal = () => {        
        setIsModalOpen(true);
    };

    const closeModal = () => {
        form.resetFields();
        setIsModalOpen(false);
    }

    const onFinish = (values) => {
        addGroupGlobal(values, {
            onSuccess: () => {
                closeModal();
            }
        });
    }

    const submitForm = () => {
        form.submit();
    }

    const modalClassNames = {
        header: css['header-modal'],
        body: css['body-modal'],
        content: css['content-modal'],
        footer: css['footer-modal']
    }

    if(isLoading, isLoadingFormData) {
        return (
            <div style={{height:"100%", width: "100%", display: 'flex', justifyContent:'center', alignItems:'center', overflow:'hidden'}}>
                <Spin indicator={<LoadingLogo/>}/>
            </div>
        );
    }

    const gruposPorCarrera = data?.reduce((acc, group) => {

        const carreraKey = group.carreraKey;
        const gruposPrevios = acc[carreraKey] || [];

        return {
            ...acc,
            [carreraKey]: [...gruposPrevios, group]
        }

    }, {});


    return (
        <>

            <div className={css['header-view']}>
                <div className={css['labels-view']}>
                    <h1>Gestión de Grupos</h1>
                    <span>Administración académica de grupos</span>
                </div>

                <Tooltip title={"Agregar grupo"}>
                    <Button className={css['control-button']} type="primary" shape='circle' icon={<IconPlus size={28}/>} onClick={() => openModal()}></Button>
                </Tooltip>
            </div>

            <TabsGrupos dataTabs={gruposPorCarrera}/>

            <Modal
                title={"Crear Nuevo Grupo"}
                onCancel={closeModal}
                centered
                open={isModalOpen}
                footer={<ButtonsCloseModal onOk={submitForm} onClose={closeModal} isPending={isPendingGlobal} descriptionOk={"Agregar Carrera"}/>}
                className={css['modal']}
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
                <NewGroupForm form={form} onFinish={onFinish} dataSelects={dataSelects}/>
            </Modal>

            
    </>

    );
};

export default GestionGrupos;
