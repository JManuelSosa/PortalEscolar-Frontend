import { Card, List, Tag, Statistic, Row, Col } from 'antd';
import { BookOutlined, TeamOutlined } from '@ant-design/icons';

export default function GruposMaestro() {
    const grupos = [
        {
            id: 1,
            materia: 'Matemáticas Avanzadas',
            grupo: 'Grupo A',
            periodo: '2024-1',
            estudiantes: 25,
            horario: 'Lunes y Miércoles 10:00-12:00'
        },
        {
            id: 2,
            materia: 'Física General',
            grupo: 'Grupo B',
            periodo: '2024-1',
            estudiantes: 30,
            horario: 'Martes y Jueves 14:00-16:00'
        }
    ];

    return (
        <div style={{ padding: '20px' }}>
            <Card title="Grupos y Materias Asignadas">
                <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
                    <Col span={8}>
                        <Statistic title="Total Grupos" value={grupos.length} prefix={<BookOutlined />} />
                    </Col>
                    <Col span={8}>
                        <Statistic title="Total Estudiantes" value={55} prefix={<TeamOutlined />} />
                    </Col>
                    <Col span={8}>
                        <Statistic title="Materias" value={2} prefix={<BookOutlined />} />
                    </Col>
                </Row>

                <List
                    dataSource={grupos}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<BookOutlined style={{ fontSize: '24px' }} />}
                                title={item.materia}
                                description={
                                    <div>
                                        <Tag color="blue">{item.grupo}</Tag>
                                        <Tag color="green">Periodo: {item.periodo}</Tag>
                                        <br />
                                        <span>Estudiantes: {item.estudiantes}</span>
                                        <br />
                                        <span>Horario: {item.horario}</span>
                                    </div>
                                }
                            />
                        </List.Item>
                    )}
                />
            </Card>
        </div>
    );
}