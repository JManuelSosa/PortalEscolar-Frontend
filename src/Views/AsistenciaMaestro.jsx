{/*import { Card, Table, Button, Tag, Space } from 'antd';
import { TeamOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

export default function AsistenciaMaestro() {
    const columns = [
        {
            title: 'Estudiante',
            dataIndex: 'estudiante',
            key: 'estudiante',
        },
        {
            title: 'Asistencia',
            dataIndex: 'asistencia',
            key: 'asistencia',
            render: (asistencia) => (
                <Tag color={asistencia ? 'green' : 'red'}>
                    {asistencia ? 'Presente' : 'Ausente'}
                </Tag>
            )
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (_, record) => (
                <Space>
                    <Button type="primary" size="small" icon={<CheckCircleOutlined />}>
                        Presente
                    </Button>
                    <Button danger size="small" icon={<CloseCircleOutlined />}>
                        Ausente
                    </Button>
                </Space>
            )
        }
    ];

    const data = [
        { key: 1, estudiante: 'Juan Pérez', asistencia: true },
        { key: 2, estudiante: 'María García', asistencia: false },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <Card title="Pase de Lista" icon={<TeamOutlined />}>
                <Table columns={columns} dataSource={data} />
            </Card>
        </div>
    );
} */}