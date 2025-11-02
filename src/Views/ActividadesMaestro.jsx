{/*import { Card, Button, List, Tag, Space } from 'antd';
import { FileTextOutlined, PlusOutlined } from '@ant-design/icons';

export default function ActividadesMaestro() {
    const actividades = [
        {
            id: 1,
            titulo: 'Tarea de Matemáticas',
            materia: 'Matemáticas Avanzadas',
            fecha: '2024-01-20',
            estado: 'pendiente'
        },
        {
            id: 2,
            titulo: 'Examen Parcial Física',
            materia: 'Física General',
            fecha: '2024-01-25',
            estado: 'calificado'
        }
    ];

    return (
        <div style={{ padding: '20px' }}>
            <Card
                title="Actividades Escolares"
                extra={
                    <Button type="primary" icon={<PlusOutlined />}>
                        Nueva Actividad
                    </Button>
                }
            >
                <List
                    dataSource={actividades}
                    renderItem={(item) => (
                        <List.Item
                            actions={[
                                <Button type="link">Editar</Button>,
                                <Button type="link">Calificar</Button>
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<FileTextOutlined />}
                                title={item.titulo}
                                description={
                                    <Space>
                                        <span>{item.materia}</span>
                                        <Tag color={item.estado === 'calificado' ? 'green' : 'orange'}>
                                            {item.estado === 'calificado' ? 'Calificado' : 'Pendiente'}
                                        </Tag>
                                    </Space>
                                }
                            />
                        </List.Item>
                    )}
                />
            </Card>
        </div>
    );
}*/}