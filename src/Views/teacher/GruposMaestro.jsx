// MaestroView.js
import React, { useState, useEffect } from 'react';
import {
    Row,
    Col,
    Card,
    Button,
    Tag,
    Space,
    Divider,
    Statistic,
    Avatar,
    List,
    Descriptions,
    Modal,
    Form,
    Input,
    Select,
    Table,
    Tabs,
    Timeline,
    Badge,
    message
} from 'antd';
import {
    TeamOutlined,
    UserOutlined,
    BookOutlined,
    CalendarOutlined,
    ClockCircleOutlined,
    CheckCircleOutlined,
    FileTextOutlined,
    BarChartOutlined,
    SettingOutlined,
    EditOutlined,
    EyeOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { Meta } = Card;
const { TabPane } = Tabs;

const MaestroView = () => {
    const [grupos, setGrupos] = useState([]);
    const [materias, setMaterias] = useState([]);
    const [asistencias, setAsistencias] = useState([]);
    const [grupoSeleccionado, setGrupoSeleccionado] = useState(null);
    const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);
    const [isDetalleModalVisible, setIsDetalleModalVisible] = useState(false);
    const [isAsistenciaModalVisible, setIsAsistenciaModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [periodoActivo, setPeriodoActivo] = useState({});

    // Datos de ejemplo para el periodo activo
    const periodoActivoEjemplo = {
        id: 1,
        nombre: 'Agosto-Diciembre 2024',
        fechaInicio: '2024-08-15',
        fechaFin: '2024-12-20',
        estado: 'activo',
        semanasTotales: 18,
        semanaActual: 8
    };

    // Grupos a cargo del maestro
    const gruposEjemplo = [
        {
            id: 1,
            nombre: 'Grupo A - 3° Sistemas',
            carrera: 'Ingeniería en Sistemas',
            grado: '3°',
            turno: 'Matutino',
            horario: 'Lunes y Miércoles 7:00 - 9:00',
            aula: 'A-301',
            capacidad: 30,
            alumnosInscritos: 28,
            materias: ['Programación Avanzada', 'Bases de Datos'],
            estado: 'activo'
        },
        {
            id: 2,
            nombre: 'Grupo B - 2° Administración',
            carrera: 'Administración de Empresas',
            grado: '2°',
            turno: 'Vespertino',
            horario: 'Martes y Jueves 14:00 - 16:00',
            aula: 'B-205',
            capacidad: 25,
            alumnosInscritos: 22,
            materias: ['Matemáticas Financieras'],
            estado: 'activo'
        },
        {
            id: 3,
            nombre: 'Grupo C - 4° EVyND',
            carrera: 'Entornos Virtuales Y Negocios Digitales',
            grado: '4°',
            turno: 'Matutino',
            horario: 'Viernes 9:00 - 12:00',
            aula: 'C-101',
            capacidad: 35,
            alumnosInscritos: 32,
            materias: ['Desarrollo Web', 'Marketing Digital'],
            estado: 'activo'
        }
    ];

    // Materias a cargo del maestro
    const materiasEjemplo = [
        {
            id: 1,
            nombre: 'Programación Avanzada',
            clave: 'PROG-301',
            grupoId: 1,
            horario: 'Lunes y Miércoles 7:00 - 9:00',
            aula: 'A-301',
            creditos: 8,
            tipo: 'Obligatoria',
            alumnosInscritos: 28,
            avance: 45,
            proximaClase: '2024-10-15',
            estado: 'activa'
        },
        {
            id: 2,
            nombre: 'Bases de Datos',
            clave: 'BD-302',
            grupoId: 1,
            horario: 'Lunes y Miércoles 9:00 - 11:00',
            aula: 'A-301',
            creditos: 6,
            tipo: 'Obligatoria',
            alumnosInscritos: 28,
            avance: 60,
            proximaClase: '2024-10-15',
            estado: 'activa'
        },
        {
            id: 3,
            nombre: 'Matemáticas Financieras',
            clave: 'MAT-201',
            grupoId: 2,
            horario: 'Martes y Jueves 14:00 - 16:00',
            aula: 'B-205',
            creditos: 6,
            tipo: 'Obligatoria',
            alumnosInscritos: 22,
            avance: 55,
            proximaClase: '2024-10-16',
            estado: 'activa'
        },
        {
            id: 4,
            nombre: 'Desarrollo Web',
            clave: 'DW-401',
            grupoId: 3,
            horario: 'Viernes 9:00 - 11:00',
            aula: 'C-101',
            creditos: 8,
            tipo: 'Especialidad',
            alumnosInscritos: 32,
            avance: 40,
            proximaClase: '2024-10-18',
            estado: 'activa'
        },
        {
            id: 5,
            nombre: 'Marketing Digital',
            clave: 'MKD-402',
            grupoId: 3,
            horario: 'Viernes 11:00 - 12:00',
            aula: 'C-101',
            creditos: 4,
            tipo: 'Especialidad',
            alumnosInscritos: 32,
            avance: 35,
            proximaClase: '2024-10-18',
            estado: 'activa'
        }
    ];

    // Asistencias de ejemplo
    const asistenciasEjemplo = [
        {
            id: 1,
            materiaId: 1,
            fecha: '2024-10-08',
            hora: '07:00',
            tema: 'Patrones de Diseño - Singleton y Factory',
            alumnosPresentes: 25,
            alumnosTotales: 28,
            estado: 'completada'
        },
        {
            id: 2,
            materiaId: 1,
            fecha: '2024-10-10',
            hora: '07:00',
            tema: 'Patrones de Diseño - Observer y Strategy',
            alumnosPresentes: 26,
            alumnosTotales: 28,
            estado: 'completada'
        },
        {
            id: 3,
            materiaId: 2,
            fecha: '2024-10-08',
            hora: '09:00',
            tema: 'Normalización de Bases de Datos - 3FN',
            alumnosPresentes: 24,
            alumnosTotales: 28,
            estado: 'completada'
        }
    ];

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setPeriodoActivo(periodoActivoEjemplo);
            setGrupos(gruposEjemplo);
            setMaterias(materiasEjemplo);
            setAsistencias(asistenciasEjemplo);
            setLoading(false);
        }, 1000);
    }, []);

    const handleVerDetalles = (grupo) => {
        setGrupoSeleccionado(grupo);
        setIsDetalleModalVisible(true);
    };

    const handleTomarAsistencia = (materia) => {
        setMateriaSeleccionada(materia);
        setIsAsistenciaModalVisible(true);
    };

    const handleVerAvance = (materia) => {
        message.info(`Mostrando avance de ${materia.nombre}`);
        // Aquí iría la lógica para mostrar el avance detallado
    };

    const getMateriasPorGrupo = (grupoId) => {
        return materias.filter(materia => materia.grupoId === grupoId);
    };

    const getAsistenciasPorMateria = (materiaId) => {
        return asistencias.filter(asistencia => asistencia.materiaId === materiaId);
    };

    const getColorAvance = (avance) => {
        if (avance >= 80) return '#52c41a';
        if (avance >= 60) return '#faad14';
        if (avance >= 40) return '#1890ff';
        return '#ff4d4f';
    };

    const columnsMaterias = [
        {
            title: 'Materia',
            dataIndex: 'nombre',
            key: 'nombre',
            render: (text, record) => (
                <Space>
                    <BookOutlined />
                    <div>
                        <div style={{ fontWeight: 'bold' }}>{text}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>{record.clave}</div>
                    </div>
                </Space>
            )
        },
        {
            title: 'Horario',
            dataIndex: 'horario',
            key: 'horario',
            render: (text) => (
                <Space>
                    <ClockCircleOutlined />
                    {text}
                </Space>
            )
        },
        {
            title: 'Aula',
            dataIndex: 'aula',
            key: 'aula'
        },
        {
            title: 'Avance',
            dataIndex: 'avance',
            key: 'avance',
            render: (avance) => (
                <div>
                    <div style={{
                        width: '100%',
                        backgroundColor: '#f0f0f0',
                        borderRadius: 4,
                        height: 8,
                        marginBottom: 4
                    }}>
                        <div
                            style={{
                                width: `${avance}%`,
                                backgroundColor: getColorAvance(avance),
                                height: 8,
                                borderRadius: 4
                            }}
                        />
                    </div>
                    <span style={{ fontSize: '12px' }}>{avance}%</span>
                </div>
            )
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (_, record) => (
                <Space>
                    <Button
                        type="primary"
                        size="small"
                        icon={<UserOutlined />}
                        onClick={() => handleTomarAsistencia(record)}
                    >
                        Asistencia
                    </Button>
                    <Button
                        size="small"
                        icon={<BarChartOutlined />}
                        onClick={() => handleVerAvance(record)}
                    >
                        Avance
                    </Button>
                    <Button
                        size="small"
                        icon={<EyeOutlined />}
                    >
                        Detalles
                    </Button>
                </Space>
            )
        }
    ];

    const columnsAsistencias = [
        {
            title: 'Fecha',
            dataIndex: 'fecha',
            key: 'fecha',
            render: (fecha) => (
                <Space>
                    <CalendarOutlined />
                    {fecha}
                </Space>
            )
        },
        {
            title: 'Tema',
            dataIndex: 'tema',
            key: 'tema'
        },
        {
            title: 'Asistencia',
            key: 'asistencia',
            render: (_, record) => (
                <Tag color={record.estado === 'completada' ? 'green' : 'orange'}>
                    {record.alumnosPresentes}/{record.alumnosTotales}
                </Tag>
            )
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado',
            render: (estado) => (
                <Tag color={estado === 'completada' ? 'green' : 'blue'}>
                    {estado}
                </Tag>
            )
        }
    ];

    return (
        <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
            {/* Header con Periodo Activo */}
            <Card style={{ marginBottom: 24 }}>
                <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} md={12}>
                        <Space direction="vertical" size="small">
                            <h2 style={{ margin: 0, color: '#1890ff' }}>
                                <CalendarOutlined /> Periodo Activo: {periodoActivo.nombre}
                            </h2>
                            <p style={{ margin: 0, color: '#666' }}>
                                Semana {periodoActivo.semanaActual} de {periodoActivo.semanasTotales} •
                                Del {periodoActivo.fechaInicio} al {periodoActivo.fechaFin}
                            </p>
                        </Space>
                    </Col>
                    <Col xs={24} md={12}>
                        <Row gutter={[16, 16]}>
                            <Col xs={8}>
                                <Statistic title="Grupos" value={grupos.length} prefix={<TeamOutlined />} />
                            </Col>
                            <Col xs={8}>
                                <Statistic title="Materias" value={materias.length} prefix={<BookOutlined />} />
                            </Col>
                            <Col xs={8}>
                                <Statistic title="Avance Promedio" value={Math.round(materias.reduce((acc, m) => acc + m.avance, 0) / materias.length)} suffix="%" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>

            <Tabs defaultActiveKey="grupos">
                <TabPane tab={<span><TeamOutlined /> Mis Grupos</span>} key="grupos">
                    {/* Grid de Grupos */}
                    <Row gutter={[16, 16]}>
                        {grupos.map(grupo => {
                            const materiasGrupo = getMateriasPorGrupo(grupo.id);

                            return (
                                <Col key={grupo.id} xs={24} lg={8}>
                                    <Card
                                        hoverable
                                        loading={loading}
                                        actions={[
                                            <Button
                                                type="primary"
                                                onClick={() => handleVerDetalles(grupo)}
                                                icon={<EyeOutlined />}
                                                block
                                            >
                                                Ver Detalles
                                            </Button>
                                        ]}
                                    >
                                        <Meta
                                            avatar={<Avatar size="large" icon={<TeamOutlined />} />}
                                            title={grupo.nombre}
                                            description={
                                                <div>
                                                    <p><strong>Carrera:</strong> {grupo.carrera}</p>
                                                    <p><strong>Turno:</strong> {grupo.turno}</p>
                                                    <p><strong>Horario:</strong> {grupo.horario}</p>
                                                    <p><strong>Aula:</strong> {grupo.aula}</p>
                                                    <p><strong>Materias:</strong> {materiasGrupo.length}</p>
                                                    <p><strong>Alumnos:</strong> {grupo.alumnosInscritos}/{grupo.capacidad}</p>

                                                    <Divider style={{ margin: '12px 0' }} />

                                                    <div>
                                                        <strong>Materias a cargo:</strong>
                                                        <ul style={{ paddingLeft: 20, margin: '8px 0' }}>
                                                            {materiasGrupo.map(materia => (
                                                                <li key={materia.id}>{materia.nombre}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            }
                                        />
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                </TabPane>

                <TabPane tab={<span><BookOutlined /> Mis Materias</span>} key="materias">
                    <Table
                        columns={columnsMaterias}
                        dataSource={materias}
                        rowKey="id"
                        pagination={{ pageSize: 10 }}
                        loading={loading}
                    />
                </TabPane>

                <TabPane tab={<span><BarChartOutlined /> Resumen General</span>} key="resumen">
                    <Row gutter={[16, 16]}>
                        <Col xs={24} lg={12}>
                            <Card title="Próximas Clases" loading={loading}>
                                <Timeline>
                                    {materias.slice(0, 3).map(materia => (
                                        <Timeline.Item
                                            key={materia.id}
                                            dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}
                                            color="blue"
                                        >
                                            <p style={{ margin: 0, fontWeight: 'bold' }}>{materia.nombre}</p>
                                            <p style={{ margin: 0 }}>{materia.proximaClase} - {materia.horario}</p>
                                            <p style={{ margin: 0 }}><small>Aula: {materia.aula}</small></p>
                                        </Timeline.Item>
                                    ))}
                                </Timeline>
                            </Card>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Card title="Asistencias Recientes" loading={loading}>
                                <Table
                                    columns={columnsAsistencias}
                                    dataSource={asistencias.slice(0, 5)}
                                    rowKey="id"
                                    pagination={false}
                                    size="small"
                                />
                            </Card>
                        </Col>
                    </Row>
                </TabPane>
            </Tabs>

            {/* Modal de Detalles del Grupo */}
            <Modal
                title={`Detalles del Grupo - ${grupoSeleccionado?.nombre}`}
                open={isDetalleModalVisible}
                onCancel={() => setIsDetalleModalVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setIsDetalleModalVisible(false)}>
                        Cerrar
                    </Button>
                ]}
                width={900}
            >
                {grupoSeleccionado && (
                    <>
                        <Descriptions bordered column={2} style={{ marginBottom: 20 }}>
                            <Descriptions.Item label="Carrera" span={2}>
                                {grupoSeleccionado.carrera}
                            </Descriptions.Item>
                            <Descriptions.Item label="Grado">{grupoSeleccionado.grado}</Descriptions.Item>
                            <Descriptions.Item label="Turno">{grupoSeleccionado.turno}</Descriptions.Item>
                            <Descriptions.Item label="Horario">{grupoSeleccionado.horario}</Descriptions.Item>
                            <Descriptions.Item label="Aula">{grupoSeleccionado.aula}</Descriptions.Item>
                            <Descriptions.Item label="Alumnos">
                                {grupoSeleccionado.alumnosInscritos}/{grupoSeleccionado.capacidad}
                            </Descriptions.Item>
                        </Descriptions>

                        <Card title="Materias del Grupo" size="small">
                            <Table
                                columns={columnsMaterias}
                                dataSource={getMateriasPorGrupo(grupoSeleccionado.id)}
                                rowKey="id"
                                pagination={false}
                            />
                        </Card>
                    </>
                )}
            </Modal>

            {/* Modal para Tomar Asistencia */}
            <Modal
                title={`Tomar Asistencia - ${materiaSeleccionada?.nombre}`}
                open={isAsistenciaModalVisible}
                onCancel={() => setIsAsistenciaModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsAsistenciaModalVisible(false)}>
                        Cancelar
                    </Button>,
                    <Button key="submit" type="primary">
                        Guardar Asistencia
                    </Button>
                ]}
                width={700}
            >
                {materiaSeleccionada && (
                    <div>
                        <Descriptions size="small" column={2} style={{ marginBottom: 20 }}>
                            <Descriptions.Item label="Fecha">{new Date().toLocaleDateString()}</Descriptions.Item>
                            <Descriptions.Item label="Horario">{materiaSeleccionada.horario}</Descriptions.Item>
                            <Descriptions.Item label="Aula">{materiaSeleccionada.aula}</Descriptions.Item>
                            <Descriptions.Item label="Alumnos">{materiaSeleccionada.alumnosInscritos}</Descriptions.Item>
                        </Descriptions>

                        <Form layout="vertical">
                            <Form.Item label="Tema de la clase">
                                <Input.TextArea
                                    placeholder="Describa el tema que se verá en esta clase..."
                                    rows={3}
                                />
                            </Form.Item>

                            <Form.Item label="Lista de Alumnos">
                                <Card size="small">
                                    <p>Aquí iría la lista interactiva de alumnos para marcar asistencia...</p>
                                    <p><small>Funcionalidad de toma de asistencia en desarrollo</small></p>
                                </Card>
                            </Form.Item>
                        </Form>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default MaestroView;