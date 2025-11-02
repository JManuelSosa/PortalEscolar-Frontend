//React
import { useState } from 'react';
import { Link } from 'react-router-dom';

//AntDesign
import { Card, Row, Col, Button, Tag, Statistic, List, Avatar, Badge } from 'antd';
import {
    TeamOutlined,
    BookOutlined,
    CheckCircleOutlined,
    FileTextOutlined,
    ClockCircleOutlined,
    UserOutlined,
    CalendarOutlined
} from '@ant-design/icons';

//Css - Ruta corregida
import PanelMaestroStyle from '../CSS/Components/PanelMaestro.module.css';

const { Meta } = Card;

export default function PanelMaestro() {
    // Datos de ejemplo
    const [materiasAsignadas] = useState([
        {
            id: 1,
            nombre: 'Matemáticas Avanzadas',
            grupo: 'Grupo A',
            periodo: '2024-1',
            estudiantes: 25,
            actividadesPendientes: 3
        },
        {
            id: 2,
            nombre: 'Física General',
            grupo: 'Grupo B',
            periodo: '2024-1',
            estudiantes: 30,
            actividadesPendientes: 1
        }
    ]);

    const [justificacionesPendientes] = useState([
        {
            id: 1,
            estudiante: 'Juan Pérez',
            materia: 'Matemáticas Avanzadas',
            fecha: '2024-01-15',
            estado: 'pendiente'
        },
        {
            id: 2,
            estudiante: 'María García',
            materia: 'Física General',
            fecha: '2024-01-14',
            estado: 'pendiente'
        }
    ]);

    const cardsFunciones = [
        {
            title: 'Pase de Lista',
            description: 'Registro de asistencia diaria de estudiantes',
            icon: <TeamOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
            path: '/maestros/asistencia',
            color: '#1890ff'
        },
        {
            title: 'Actividades Escolares',
            description: 'Crear y calificar tareas y exámenes',
            icon: <FileTextOutlined style={{ fontSize: '24px', color: '#52c41a' }} />,
            path: '/maestros/actividades',
            color: '#52c41a'
        },
        {
            title: 'Justificaciones',
            description: 'Aprobar o rechazar justificaciones de inasistencia',
            icon: <CheckCircleOutlined style={{ fontSize: '24px', color: '#faad14' }} />,
            path: '/maestros/justificaciones',
            color: '#faad14'
        },
        {
            title: 'Grupos y Materias',
            description: 'Ver grupos asignados y materias por periodo',
            icon: <BookOutlined style={{ fontSize: '24px', color: '#722ed1' }} />,
            path: '/maestros/grupos',
            color: '#722ed1'
        }
    ];

    return (
        <div className={PanelMaestroStyle.panelMaestro}>
            {/* Header del Panel */}
            <div className={PanelMaestroStyle.panelHeader}>
                <h1>Panel del Maestro</h1>
                <p>Bienvenido al sistema de gestión académica</p>
            </div>

            {/* Estadísticas rápidas*/}
            <Row gutter={[16, 16]} className={PanelMaestroStyle.statsRow}>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Total de Materias"
                            value={materiasAsignadas.length}
                            prefix={<BookOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Estudiantes Totales"
                            value={55}
                            prefix={<TeamOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Actividades Pendientes"
                            value={4}
                            prefix={<FileTextOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Justificaciones por Revisar"
                            value={justificacionesPendientes.length}
                            prefix={<ClockCircleOutlined />}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Cards de Funciones Principales*/}
            <Row gutter={[16, 16]} className={PanelMaestroStyle.cardsRow}>
                {cardsFunciones.map((card, index) => (
                    <Col xs={24} sm={12} lg={6} key={index}>
                        <Link to={card.path}>
                            <Card
                                hoverable
                                className={PanelMaestroStyle.functionCard}
                                actions={[
                                    <Button type="link" style={{ color: card.color }}>
                                        Acceder
                                    </Button>
                                ]}
                            >
                                <Meta
                                    avatar={card.icon}
                                    title={card.title}
                                    description={card.description}
                                />
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>

            {/* Materias Asignadas */}
            <Row gutter={[16, 16]} className={PanelMaestroStyle.contentRow}>
                <Col xs={24} lg={12}>
                    <Card
                        title="Materias y Grupos Asignados"
                        extra={<Button type="link">Ver Todos</Button>}
                        className={PanelMaestroStyle.materiasCard}
                    >
                        <List
                            itemLayout="horizontal"
                            dataSource={materiasAsignadas}
                            renderItem={(materia) => (
                                <List.Item
                                    actions={[
                                        <Button type="link" size="small">
                                            Pase de Lista
                                        </Button>,
                                        <Button type="link" size="small">
                                            Actividades
                                        </Button>
                                    ]}
                                >
                                    <List.Item.Meta
                                        avatar={<BookOutlined style={{ fontSize: '20px', color: '#1890ff' }} />}
                                        title={materia.nombre}
                                        description={
                                            <div>
                                                <Tag color="blue">{materia.grupo}</Tag>
                                                <Tag color="green">Periodo: {materia.periodo}</Tag>
                                                <br />
                                                <span>Estudiantes: {materia.estudiantes}</span>
                                                {materia.actividadesPendientes > 0 && (
                                                    <Badge
                                                        count={`${materia.actividadesPendientes} pendientes`}
                                                        style={{ backgroundColor: '#ff4d4f', marginLeft: '10px' }}
                                                    />
                                                )}
                                            </div>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>

                {/* Justificaciones Pendientes */}
                <Col xs={24} lg={12}>
                    <Card
                        title="Justificaciones por Revisar"
                        extra={<Button type="link">Ver Todas</Button>}
                        className={PanelMaestroStyle.justificacionesCard}
                    >
                        <List
                            itemLayout="horizontal"
                            dataSource={justificacionesPendientes}
                            renderItem={(justificacion) => (
                                <List.Item
                                    actions={[
                                        <Button type="primary" size="small" ghost>
                                            Aprobar
                                        </Button>,
                                        <Button type="primary" danger size="small" ghost>
                                            Rechazar
                                        </Button>
                                    ]}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar icon={<UserOutlined />} />}
                                        title={justificacion.estudiante}
                                        description={
                                            <div>
                                                <div>{justificacion.materia}</div>
                                                <div>
                                                    <CalendarOutlined /> {justificacion.fecha}
                                                    <Tag color="orange" style={{ marginLeft: '8px' }}>
                                                        Pendiente
                                                    </Tag>
                                                </div>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
} 
