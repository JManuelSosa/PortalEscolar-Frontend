import React, { useState } from 'react';
import {
    Table,
    Button,
    Space,
    Typography,
    Card,
    Tag,
    message,
    Modal,
    Descriptions,
    Switch
} from 'antd';
import { ArrowLeftOutlined, TeamOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const PaseListaView = ({ grupo, onBack }) => {
    const [estudiantes, setEstudiantes] = useState([
        {
            id: 1,
            nombre: 'Juan Pérez',
            matricula: '2024001',
            asistencia: null,
            fecha: '2024-12-20'
        },
        {
            id: 2,
            nombre: 'María García',
            matricula: '2024002',
            asistencia: null,
            fecha: '2024-12-20'
        },
        {
            id: 3,
            nombre: 'Carlos López',
            matricula: '2024003',
            asistencia: null,
            fecha: '2024-12-20'
        },
        // ... más estudiantes según el número de alumnos del grupo
    ]);

    const [asistenciaRegistrada, setAsistenciaRegistrada] = useState(false);

    const handleAsistencia = (id, presente) => {
        setEstudiantes(prev =>
            prev.map(est =>
                est.id === id ? { ...est, asistencia: presente } : est
            )
        );
    };

    const registrarAsistencia = () => {
        const sinRegistrar = estudiantes.some(est => est.asistencia === null);
        if (sinRegistrar) {
            message.warning('Por favor, registre la asistencia de todos los estudiantes');
            return;
        }

        setAsistenciaRegistrada(true);
        message.success('Asistencia registrada exitosamente');
    };

    const columns = [
        {
            title: 'Matrícula',
            dataIndex: 'matricula',
            key: 'matricula',
            width: 120,
        },
        {
            title: 'Nombre del Estudiante',
            dataIndex: 'nombre',
            key: 'nombre',
        },
        {
            title: 'Asistencia',
            key: 'asistencia',
            width: 150,
            render: (_, record) => (
                <Space>
                    <Button
                        type={record.asistencia === true ? 'primary' : 'default'}
                        icon={<CheckOutlined />}
                        onClick={() => handleAsistencia(record.id, true)}
                    >
                        Presente
                    </Button>
                    <Button
                        type={record.asistencia === false ? 'primary' : 'default'}
                        danger
                        icon={<CloseOutlined />}
                        onClick={() => handleAsistencia(record.id, false)}
                    >
                        Ausente
                    </Button>
                </Space>
            ),
        },
        {
            title: 'Estado',
            key: 'estado',
            width: 100,
            render: (_, record) => (
                record.asistencia === true ? (
                    <Tag color="green">Presente</Tag>
                ) : record.asistencia === false ? (
                    <Tag color="red">Ausente</Tag>
                ) : (
                    <Tag color="orange">Pendiente</Tag>
                )
            ),
        },
    ];

    const resumenAsistencia = {
        total: estudiantes.length,
        presentes: estudiantes.filter(est => est.asistencia === true).length,
        ausentes: estudiantes.filter(est => est.asistencia === false).length,
        pendientes: estudiantes.filter(est => est.asistencia === null).length,
    };

    return (
        <div style={{ padding: '24px' }}>
            {/* Header */}
            <Space direction="vertical" style={{ width: '100%', marginBottom: '24px' }}>
                <Button icon={<ArrowLeftOutlined />} onClick={onBack}>
                    Volver a Grupos
                </Button>

                <Card>
                    <Descriptions title={`Pase de Lista - ${grupo.nombre}`} bordered>
                        <Descriptions.Item label="Curso">{grupo.curso}</Descriptions.Item>
                        <Descriptions.Item label="Aula">{grupo.aula}</Descriptions.Item>
                        <Descriptions.Item label="Horario">{grupo.horario}</Descriptions.Item>
                        <Descriptions.Item label="Fecha">{grupo.fecha}</Descriptions.Item>
                        <Descriptions.Item label="Período">{grupo.periodo}</Descriptions.Item>
                        <Descriptions.Item label="Semana">{grupo.semanaActual}</Descriptions.Item>
                    </Descriptions>
                </Card>
            </Space>

            {/* Resumen de Asistencia */}
            <Card style={{ marginBottom: '24px' }}>
                <Space size="large">
                    <div style={{ textAlign: 'center' }}>
                        <Text strong>Total Estudiantes</Text>
                        <br />
                        <Tag color="blue" style={{ fontSize: '16px', padding: '8px' }}>
                            {resumenAsistencia.total}
                        </Tag>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Text strong>Presentes</Text>
                        <br />
                        <Tag color="green" style={{ fontSize: '16px', padding: '8px' }}>
                            {resumenAsistencia.presentes}
                        </Tag>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Text strong>Ausentes</Text>
                        <br />
                        <Tag color="red" style={{ fontSize: '16px', padding: '8px' }}>
                            {resumenAsistencia.ausentes}
                        </Tag>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Text strong>Pendientes</Text>
                        <br />
                        <Tag color="orange" style={{ fontSize: '16px', padding: '8px' }}>
                            {resumenAsistencia.pendientes}
                        </Tag>
                    </div>
                </Space>
            </Card>

            {/* Tabla de Estudiantes */}
            <Card
                title={
                    <Space>
                        <TeamOutlined />
                        <span>Lista de Estudiantes</span>
                        {asistenciaRegistrada && (
                            <Tag color="green">Asistencia Registrada</Tag>
                        )}
                    </Space>
                }
                extra={
                    <Button
                        type="primary"
                        onClick={registrarAsistencia}
                        disabled={asistenciaRegistrada}
                    >
                        {asistenciaRegistrada ? 'Asistencia Registrada' : 'Registrar Asistencia'}
                    </Button>
                }
            >
                <Table
                    columns={columns}
                    dataSource={estudiantes}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 800 }}
                />
            </Card>
        </div>
    );
};

export default PaseListaView;