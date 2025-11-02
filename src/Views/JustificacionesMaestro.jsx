import { Card, List, Button, Tag, Space } from 'antd';
import { UserOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

export default function JustificacionesMaestro() {
    const justificaciones = [
        {
            id: 1,
            estudiante: 'Juan Pérez',
            materia: 'Matemáticas Avanzadas',
            fecha: '2024-01-15',
            estado: 'pendiente'
        },
        {
            id: 2,
            estudiante: 'Ana López',
            materia: 'Física General',
            fecha: '2024-01-14',
            estado: 'aprobada'
        }
    ];

    return (
        <div style={{ padding: '20px' }}>
            <Card title="Gestión de Justificaciones">
                <List
                    dataSource={justificaciones}
                    renderItem={(item) => (
                        <List.Item
                            actions={[
                                <Button type="primary" icon={<CheckCircleOutlined />}>
                                    Aprobar
                                </Button>,
                                <Button danger icon={<CloseCircleOutlined />}>
                                    Rechazar
                                </Button>
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<UserOutlined />}
                                title={item.estudiante}
                                description={
                                    <Space direction="vertical">
                                        <span>{item.materia}</span>
                                        <Tag color={item.estado === 'aprobada' ? 'green' : 'orange'}>
                                            {item.estado === 'aprobada' ? 'Aprobada' : 'Pendiente'}
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
}