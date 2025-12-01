import React, { useState } from 'react';
import {
    Layout,
    Menu,
    Card,
    Row,
    Col,
    Typography,
    Avatar,
    Badge,
    Button,
    Statistic,
    Progress,
    List,
    Tag,
    Space,
    Tooltip,
    Dropdown,
    Timeline
} from 'antd';
import {
    DesktopOutlined,
    CalendarOutlined,
    BookOutlined,
    TeamOutlined,
    FileDoneOutlined,
    BellOutlined,
    LogoutOutlined,
    UserOutlined,
    ClockCircleOutlined,
    CheckCircleOutlined,
    RightOutlined,
    SettingOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const MaestroHome = () => {
    const [collapsed, setCollapsed] = useState(false);

    // --- DATOS SIMULADOS (MOCK DATA) ---

    // Información del Profesor
    const teacherInfo = {
        name: "Ing. Alejandro Mendoza",
        role: "Docente Titular",
        department: "Dpto. de Sistemas y Computación"
    };

    // Clase que está por comenzar (Widget Prioritario)
    const nextClass = {
        subject: "Programación Orientada a Objetos",
        group: "4°A - Ing. Software",
        time: "10:00 AM - 12:00 PM",
        room: "Laboratorio 2",
        status: "starts_soon" // starts_soon, active, finished
    };

    // Lista de Cursos Asignados
    const myCourses = [
        { id: 1, name: "Matemáticas Discretas", group: "1°B", students: 32, progress: 45, pendingGrades: 5, color: '#1890ff' },
        { id: 2, name: "Programación Web", group: "7°A", students: 28, progress: 70, pendingGrades: 0, color: '#722ed1' },
        { id: 3, name: "Base de Datos", group: "5°C", students: 30, progress: 30, pendingGrades: 12, color: '#faad14' },
    ];

    // Notificaciones / Tareas Pendientes
    const pendingTasks = [
        { id: 1, task: "Subir calificaciones del Parcial 1", deadline: "Hoy, 23:59", type: "urgent" },
        { id: 2, task: "Revisar proyectos finales de Web", deadline: "Mañana", type: "normal" },
        { id: 3, task: "Junta de academia", deadline: "Viernes 12:00", type: "info" },
    ];

    // --- COLORES INSTITUCIONALES ---
    const colors = {
        primary: '#002766', // Azul Marino
        accent: '#faad14',  // Dorado
        bg: '#f0f2f5'
    };

    // --- MENU ITEMS ---

    // Menu de usuario (Dropdown)
    const userMenu = {
        items: [
            { key: '1', label: 'Mi Perfil', icon: <UserOutlined /> },
            { key: '2', label: 'Configuración', icon: <SettingOutlined /> },
            { type: 'divider' },
            { key: '3', label: 'Cerrar Sesión', icon: <LogoutOutlined />, danger: true },
        ]
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>

            {/* --- SIDEBAR --- */}


            {/* --- LAYOUT PRINCIPAL --- */}
            <Layout className="site-layout" style={{ background: colors.bg }}>

                {/* HEADER */}
                <Header style={{ padding: '0 24px', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <Title level={4} style={{ margin: 0, color: colors.primary }}>
                        Hola, {teacherInfo.name.split(" ")[1]} 👋
                    </Title>

                    <Space size="large">
                        <Tooltip title="Notificaciones">
                            <Badge count={pendingTasks.length} size="small">
                                <Button type="text" shape="circle" icon={<BellOutlined style={{ fontSize: '20px' }} />} />
                            </Badge>
                        </Tooltip>

                        <Dropdown menu={userMenu} trigger={['click']}>
                            <Space style={{ cursor: 'pointer', padding: '5px 10px', borderRadius: '20px', background: '#f5f5f5' }}>
                                <Avatar style={{ backgroundColor: colors.accent, verticalAlign: 'middle' }} icon={<UserOutlined />} />
                                <span style={{ fontWeight: 500, color: '#333' }}>{teacherInfo.role}</span>
                            </Space>
                        </Dropdown>
                    </Space>
                </Header>

                {/* CONTENIDO DEL DASHBOARD */}
                <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280 }}>

                    {/* 1. SECCIÓN SUPERIOR: CLASE ACTUAL + ESTADÍSTICAS RÁPIDAS */}
                    <Row gutter={[24, 24]}>

                        {/* WIDGET: PRÓXIMA CLASE (Destacado) */}
                        <Col xs={24} md={14} lg={16}>
                            <Card
                                style={{ borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #002766 0%, #0040a6 100%)', color: 'white' }}
                                bodyStyle={{ padding: '24px' }}
                            >
                                <Row align="middle" justify="space-between">
                                    <Col>
                                        <Tag color="#faad14" style={{ marginBottom: '10px', fontWeight: 'bold', border: 'none', color: '#000' }}>
                                            EN 15 MINUTOS
                                        </Tag>
                                        <Title level={2} style={{ color: 'white', margin: '0 0 5px 0' }}>{nextClass.subject}</Title>
                                        <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px' }}>
                                            <TeamOutlined /> {nextClass.group} &nbsp; | &nbsp; <EnvironmentOutlined /> {nextClass.room}
                                        </Text>
                                    </Col>
                                    <Col>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: '28px', fontWeight: 'bold' }}><ClockCircleOutlined /> 10:00</div>
                                            <Button size="large" style={{ marginTop: '15px', color: colors.primary, fontWeight: 'bold', borderRadius: '6px' }}>
                                                Iniciar Pase de Lista
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>

                        {/* WIDGET: RESUMEN (Stats) */}
                        <Col xs={24} md={10} lg={8}>
                            <Card style={{ borderRadius: '12px', height: '100%' }}>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Statistic title="Estudiantes Totales" value={90} prefix={<UserOutlined />} valueStyle={{ color: colors.primary }} />
                                    </Col>
                                    <Col span={12}>
                                        <Statistic title="Tareas por Revisar" value={17} prefix={<FileDoneOutlined />} valueStyle={{ color: '#ff4d4f' }} />
                                    </Col>
                                </Row>
                                <div style={{ marginTop: '20px' }}>
                                    <Text type="secondary">Progreso del Semestre</Text>
                                    <Progress percent={60} strokeColor={colors.accent} showInfo={false} />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                                        <Text style={{ fontSize: '12px' }}>Semana 8</Text>
                                        <Text style={{ fontSize: '12px' }}>Semana 16</Text>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>

                    {/* 2. SECCIÓN MEDIA: CURSOS ACTIVOS */}
                    <Title level={4} style={{ marginTop: '30px', color: colors.primary }}>Mis Asignaturas Activas</Title>
                    <Row gutter={[24, 24]}>
                        {myCourses.map((course) => (
                            <Col xs={24} sm={12} lg={8} key={course.id}>
                                <Card
                                    hoverable
                                    style={{ borderRadius: '12px', borderTop: `4px solid ${course.color}` }}
                                    actions={[
                                        <Tooltip title="Tomar Asistencia"><CheckCircleOutlined key="attendance" /></Tooltip>,
                                        <Tooltip title="Ver Calificaciones"><FileDoneOutlined key="grades" /></Tooltip>,
                                        <Tooltip title="Ir al Curso"><RightOutlined key="go" /></Tooltip>
                                    ]}
                                >
                                    <Card.Meta
                                        avatar={<Avatar style={{ backgroundColor: course.color }} icon={<BookOutlined />} />}
                                        title={course.name}
                                        description={<Text strong>{course.group} • {course.students} Alumnos</Text>}
                                    />
                                    <div style={{ marginTop: '20px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                            <Text type="secondary" style={{ fontSize: '12px' }}>Avance del temario</Text>
                                            <Text style={{ fontSize: '12px' }}>{course.progress}%</Text>
                                        </div>
                                        <Progress percent={course.progress} size="small" strokeColor={course.color} />

                                        {course.pendingGrades > 0 && (
                                            <div style={{ marginTop: '15px', background: '#fff1f0', padding: '8px', borderRadius: '6px', border: '1px solid #ffa39e', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <BellOutlined style={{ color: '#ff4d4f' }} />
                                                <Text type="danger" style={{ fontSize: '12px' }}>{course.pendingGrades} entregas sin calificar</Text>
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    {/* 3. SECCIÓN INFERIOR: AGENDA / TIMELINE */}
                    <Row gutter={[24, 24]} style={{ marginTop: '30px' }}>
                        <Col xs={24} lg={12}>
                            <Card title="Agenda del Día" bordered={false} style={{ borderRadius: '12px' }}>
                                <Timeline
                                    items={[
                                        { color: 'green', children: '08:00 AM - Entra de calificaciones (Completado)' },
                                        { color: 'blue', children: <><Text strong>10:00 AM - Programación Orientada a Objetos</Text><br /><Text type="secondary">Lab 2 • Grupo 4A</Text></> },
                                        { color: 'gray', children: <><Text>12:00 PM - Hora de Comida</Text></> },
                                        { color: 'blue', children: <><Text strong>01:00 PM - Base de Datos</Text><br /><Text type="secondary">Aula 105 • Grupo 5C</Text></> },
                                    ]}
                                />
                            </Card>
                        </Col>
                        {/* <Col xs={24} lg={12}>
                            <Card title="Avisos Importantes" bordered={false} style={{ borderRadius: '12px' }}>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={pendingTasks}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <List.Item.Meta
                                                avatar={<Avatar icon={<BellOutlined />} style={{ backgroundColor: item.type === 'urgent' ? '#ff4d4f' : '#1890ff' }} />}
                                                title={<Text delete={false}>{item.task}</Text>}
                                                description={`Vence: ${item.deadline}`}
                                            />
                                            <Button type="link">Ver</Button>
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </Col>/* */}
                    </Row>

                </Content>

                <div style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
                    EduConnect Docente ©2025
                </div>
            </Layout>
        </Layout>
    );
};

// Necesitamos importar este icono adicional que usé en el código
import { EnvironmentOutlined } from '@ant-design/icons';

export default MaestroHome;