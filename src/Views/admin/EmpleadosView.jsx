//* React
import { useState } from "react";

//* Ant
import { Card, Button } from "antd"

//* Hooks
import { useGetEmployees } from "../../Hooks/Fetching/useGetData"
import { useOnBoardEmployeeFormData } from "../../Hooks/Fetching/usePublicData";

//* Componentes
import ListaEmpleados from "../../Components/Layout/Admin/ListaEmpleados";
import EmployeeOnboardModal from "../../Components/Layout/Admin/EmployeeOnboardModal";

export default function EmpleadosView(){

    const { data: employees = [], isLoading, isError } = useGetEmployees();
    const newEmployeeFormData = useOnBoardEmployeeFormData();

    return (
        <>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <h1>Empleados de la institución</h1>
                <div>
                    <Button type="primary" onClick={showDrawer}> Añadir Empleado </Button>
                </div>
            </div>
            <Card>
                <ListaEmpleados employees={employees} isLoading={isLoading} isError={isError}/>
            </Card>
            <EmployeeOnboardModal formData={newEmployeeFormData}/>
            
        </>
    )
}