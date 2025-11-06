import React, { useState } from 'react';
import { Card, Row, Col, Button, Typography, Tag, Space, Divider } from 'antd';
import { TeamOutlined, CalendarOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const GruposView = ({ onSelectGroup }) => {
    // Datos de los grupos basados en la imagen
    const grupos = [
        {
            id: 'A',
            nombre: 'Grupo A - 3º Sistemas',
            curso: 'Central Superior del Sistema',
            estado: 'Valorado',
            horario: '07:00 - 09:00',
            aula: 'A-381',
            valorial: 2,
            alumnos: 2050,
            materias: ['Programador Admissão', 'Salas de Datos'],
            periodo: 'Agosto-Diciembre 2024',
            semanaActual: 'Semana 8 de 18',
            fecha: '2024-12-20'
        },
        {
            id: 'B',
            nombre: 'Grupo B - 2º Administración',
            curso: 'Cirena: Administración de Energías',
            estado: 'Valorando',
            horario: '14:00 - 16:00',
            aula: 'B-265',
            valorial: 1,
            alumnos: 2226,
            materias: ['Matemática: Funciones'],
            periodo: 'Agosto-Diciembre 2024',
            semanaActual: 'Semana 8 de 18',
            fecha: '2024-12-20'
        },
        {
            id: 'C',
            nombre: 'Grupo C - 4º EVyND',
            curso: 'Central: Oriente Valable Y Negocios Digitales',
            estado: 'Valorado',
            horario: '08:00 - 12:00',
            aula: 'C-101',
            valorial: 2,
            alumnos: 3025,
            materias: ['Salarios Web', 'Valorado Legal'],
            periodo: 'Agosto-Diciembre 2024',
            semanaActual: 'Semana 8 de 18',
            fecha: '2024-12-20'
        }
    ];

    const handleSelectGroup = (grupo) => {
        if (onSelectGroup) {
            onSelectGroup(grupo);
        }
    };

    const getStatusColor = (estado) => {
        switch (estado) {
            case 'Valorado':
                return 'success';
            case 'Valorando':
                return 'processing';
            default:
                return 'default';
        }
    };

    return (
        <div style={{ padding: '24px' }}>
            {/* Header del Periodo */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <Title level={2}>Período Activo: Agosto-Diciembre 2024</Title>
                <Text type="secondary" strong>
                    Semana 8 de 18 - Diciembre 2024-12-20
                </Text>
            </div>

            <Row gutter={[24, 24]}>
                {grupos.map((grupo) => (
                    <Col xs={24} md={12} lg={8} key={grupo.id}>
                        <Card
                            title={
                                <Space>
                                    <TeamOutlined />
                                    <span>{grupo.nombre}</span>
                                    <Tag color={getStatusColor(grupo.estado)}>
                                        {grupo.estado}
                                    </Tag>
                                </Space>
                            }
                            extra={
                                <Button
                                    type="primary"
                                    onClick={() => handleSelectGroup(grupo)}
                                >
                                    Pase de Lista
                                </Button>
                            }
                            style={{
                                height: '100%',
                                border: `2px solid ${grupo.estado === 'Valorando' ? '#1890ff' :
                                    grupo.estado === 'Valorado' ? '#52c41a' : '#d9d9d9'
                                    }`
                            }}
                        >
                            {/* Información del Curso */}
                            <div style={{ marginBottom: '16px' }}>
                                <Text strong>{grupo.curso}</Text>
                            </div>

                            {/* Horario y Aula */}
                            <Space direction="vertical" size="small" style={{ width: '100%', marginBottom: '16px' }}>
                                <Space>
                                    <ClockCircleOutlined />
                                    <Text>Horario: {grupo.horario}</Text>
                                </Space>
                                <Space>
                                    <UserOutlined />
                                    <Text>Aula: {grupo.aula}</Text>
                                </Space>
                            </Space>

                            {/* Estadísticas */}
                            <Row gutter={[8, 8]} style={{ marginBottom: '16px' }}>
                                <Col span={12}>
                                    <div style={{ textAlign: 'center' }}>
                                        <Text strong>Valorial</Text>
                                        <br />
                                        <Tag color="blue">{grupo.valorial}</Tag>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div style={{ textAlign: 'center' }}>
                                        <Text strong>Alumnos</Text>
                                        <br />
                                        <Tag color="green">{grupo.alumnos}</Tag>
                                    </div>
                                </Col>
                            </Row>

                            {/* Materias */}
                            <div style={{ marginBottom: '16px' }}>
                                <Text strong>Materias a cargo:</Text>
                                <div style={{ marginTop: '8px' }}>
                                    {grupo.materias.map((materia, index) => (
                                        <Tag key={index} color="orange" style={{ marginBottom: '4px' }}>
                                            {materia}
                                        </Tag>
                                    ))}
                                </div>
                            </div>

                            {/* Footer con información del período */}
                            <Divider style={{ margin: '12px 0' }} />
                            <div style={{ textAlign: 'center' }}>
                                <Text type="secondary" style={{ fontSize: '12px' }}>
                                    <CalendarOutlined /> {grupo.semanaActual}
                                </Text>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default GruposView;