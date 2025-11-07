import { useState } from "react";
import { Card, Button } from "antd"
import { useGetEmployees } from "../../Hooks/Fetching/useGetData"
import ListaEmpleados from "../../Components/Layout/Admin/ListaEmpleados";
import EmployeeOnboardDrawer from "../../Components/Layout/Admin/EmployeeOnboardDrawer";

export default function EmpleadosView(){

    const { data: employees = [], isLoading, isError } = useGetEmployees();
    const [openDrawer, setOpenDrawer] = useState(false);
    
    const showDrawer = () => {
        setOpenDrawer(true);
    };

    const closeDrawer = () => {
        setOpenDrawer(false);
    };
    console.log(employees);

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
            <EmployeeOnboardDrawer onClose={closeDrawer} open={openDrawer}/>
            
        </>
    )
}