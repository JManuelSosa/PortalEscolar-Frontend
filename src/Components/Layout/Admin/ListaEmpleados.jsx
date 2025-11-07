import { List, Alert, Spin, Empty, Button, Space, Avatar, Tag} from "antd";
import { IconUser,IconEye, IconEdit } from "@tabler/icons-react";
import LoadingLogo from "../../Utilities/LoadingLogo";

export default function ListaEmpleados({ employees, isLoading, isError, error }) {
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
                <Spin indicator={<LoadingLogo/>} tip="Cargando empleados"/>
            </div>
        );
    }

    if (employees.length === 0) {
        return (
            <Empty 
                description="No hay empleados registrados"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
        );
    }

    return (
        <List
            itemLayout="horizontal" // Alinea el avatar y el contenido
            dataSource={employees}
            renderItem={(employeeSchool) => {
                
                // Obtenemos los datos anidados de forma segura
                const person = employeeSchool.employee?.person;
                
                // Construimos el nombre completo
                const fullName = person 
                    ? `${person.name} ${person.first_last_name} ${person.second_last_name}`
                    : 'Nombre no disponible';
                
                // Datos del rol y estado
                const role = employeeSchool.role || 'Sin rol';
                const status = employeeSchool.status || 'desconocido';

                return (
                    <List.Item
                        key={employeeSchool.id} // Usa el ID real como key
                        actions={[
                            <Button type="text" icon={<IconEye/>} key="view">Ver detalles</Button>,
                            <Button type="text" icon={<IconEdit />} key="edit">Editar</Button>
                        ]}
                    >
                        <List.Item.Meta
                            avatar={
                                <Avatar 
                                    src={person?.photo_url} // Muestra la foto si existe
                                    icon={<IconUser />}   // Fallback a un ícono
                                />
                            }
                            title={
                                <Space>
                                    {fullName}
                                    <Tag color={status === 'active' ? 'green' : 'red'}>
                                        {status.toUpperCase()}
                                    </Tag>
                                </Space>
                            }
                            description={`Rol: ${role}`}
                        />
                    </List.Item>
                );
            }}
        />
    );
}