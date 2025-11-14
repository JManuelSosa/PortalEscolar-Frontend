//* React
import { useState } from "react";

//* Ant
import { Card, Button, Modal, Tooltip } from "antd";

//* Iconos
import { IconUser, IconUsersPlus } from "@tabler/icons-react";

//* Hooks
import { useEmployees } from "../../Hooks/Fetching/useEmployees";

//* Componentes
import ListaEmpleados from "../../Components/Layout/Admin/ListaEmpleados";
import EmployeeOnboardForm from "../../Components/Layout/Admin/EmployeeOnboardForm";
import ButtonCancelModal from "../../Components/Utilities/ButtonCancelModal";

//* Css
import css from '@css/Views/admin/EmpleadosView.module.css';



export default function EmpleadosView(){

    const { data: employees = [], isLoading, isError } = useEmployees();
    

    const [isModalOpen, setIsModalOpen] = useState(false);
    const close = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);

    const modalClassNames = {
        mask: css['modal-mask'],
        content: css['modal-content'],
        header: css['modal-header'],
        body: css['modal-body'],
        footer: css['modal-footer']
    }

    const buttonClassNames = {
        icon: css['icon-btn']
    }

    return (
        <>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <h1>Empleados de la institución</h1>
                <div>
                    <Tooltip title={"Alta de empleado"}>
                        <Button className={css['button-addEmployee']} classNames={buttonClassNames} size="large" type="primary" onClick={openModal} shape="circle" icon={<IconUsersPlus/>}/>
                    </Tooltip>
                </div>
            </div>
            <Card>
                <ListaEmpleados employees={employees} isLoading={isLoading} isError={isError}/>
            </Card>
            <Modal 
                title={"Alta de nuevo empleado"}
                open={isModalOpen}  
                closeIcon={null}
                width={{
                    xs: '90%',
                    sm: '80%',
                    md: '70%',
                    lg: '60%',
                    xl: '50%',
                    xxl: '40%',
                }}
                centered
                maskClosable={false}
                classNames={modalClassNames}
                destroyOnHidden={true}
                footer={[<ButtonCancelModal onClose={close}/>]}
            >
                <EmployeeOnboardForm closeModal={close}/>
            </Modal>
        </>
    )
}