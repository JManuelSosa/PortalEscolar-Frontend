// AprobacionJustificacionesView.js
import React, { useState, useEffect } from 'react';
import {
    Row,
    Col,
    Card,
    Button,
    Table,
    Tag,
    Space,
    Divider,
    Statistic,
    Modal,
    Form,
    Input,
    Select,
    DatePicker,
    message,
    Descriptions,
    Timeline,
    Badge,
    List,
    Tooltip,
    Alert,
    Switch
} from 'antd';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    EyeOutlined,
    FileTextOutlined,
    CalendarOutlined,
    UserOutlined,
    ClockCircleOutlined,
    ExclamationCircleOutlined,
    DownloadOutlined,
    FilterOutlined,
    SyncOutlined,
    WarningOutlined,
    InfoCircleOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const AprobacionJustificacionesView = () => {
    const [justificaciones, setJustificaciones] = useState([]);
    const [justificacionSeleccionada, setJustificacionSeleccionada] = useState(null);
    const [isDetalleModalVisible, setIsDetalleModalVisible] = useState(false);
    const [isAprobarModalVisible, setIsAprobarModalVisible] = useState(false);
    const [isRechazarModalVisible, setIsRechazarModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filtroEstado, setFiltroEstado] = useState('pendiente');
    const [form] = Form.useForm();

    // Datos falsos de justificaciones
    const justificacionesEjemplo = [
        {
            id: 1,
            alumno: 'Juan Carlos Mendoza López',
            matricula: 'A23110015',
            grupo: '3°A - Sistemas',
            carrera: 'Ingeniería en Sistemas',
            materia: 'Programación Avanzada',
            fechaSolicitud: '2024-10-18 09:30',
            fechaInicio: '2024-10-15',
            fechaFin: '2024-10-17',
            tipoAusencia: 'enfermedad',
            motivo: 'Cuadro gripal con fiebre alta. Visité al médico y adjunto certificado médico.',
            estado: 'pendiente',
            archivos: [
                { nombre: 'certificado_medico.pdf', tipo: 'pdf', tamaño: '2.4 MB' },
                { nombre: 'receta_medicamentos.jpg', tipo: 'imagen', tamaño: '1.2 MB' }
            ],
            faltasJustificar: [
                {
                    fecha: '2024-10-15',
                    materia: 'Programación Avanzada',
                    horario: '07:00 - 09:00',
                    tipo: 'Teoría',
                    tema: 'Patrones de Diseño - Singleton'
                },
                {
                    fecha: '2024-10-16',
                    materia: 'Programación Avanzada',
                    horario: '07:00 - 09:00',
                    tipo: 'Práctica',
                    tema: 'Laboratorio Patrones Factory'
                },
                {
                    fecha: '2024-10-17',
                    materia: 'Programación Avanzada',
                    horario: '07:00 - 09:00',
                    tipo: 'Teoría',
                    tema: 'Patrones Observer y Strategy'
                }
            ],
            totalFaltas: 3,
            historial: [
                {
                    fecha: '2024-10-18 09:30',
                    accion: 'solicitud_enviada',
                    usuario: 'Alumno',
                    comentario: 'Solicitud de justificación enviada'
                }
            ]
        },
        {
            id: 2,
            alumno: 'María Fernanda Reyes García',
            matricula: 'A23110028',
            grupo: '4°B - EVyND',
            carrera: 'Entornos Virtuales y Negocios Digitales',
            materia: 'Desarrollo Web Avanzado',
            fechaSolicitud: '2024-10-17 14:20',
            fechaInicio: '2024-10-16',
            fechaFin: '2024-10-16',
            tipoAusencia: 'familiar',
            motivo: 'Fallecimiento de familiar directo. Requerí asistir al funeral y trámites relacionados.',
            estado: 'pendiente',
            archivos: [
                { nombre: 'constancia_funeraria.pdf', tipo: 'pdf', tamaño: '1.8 MB' }
            ],
            faltasJustificar: [
                {
                    fecha: '2024-10-16',
                    materia: 'Desarrollo Web Avanzado',
                    horario: '09:00 - 11:00',
                    tipo: 'Teoría',
                    tema: 'React Hooks Avanzados'
                }
            ],
            totalFaltas: 1,
            historial: [
                {
                    fecha: '2024-10-17 14:20',
                    accion: 'solicitud_enviada',
                    usuario: 'Alumno',
                    comentario: 'Solicitud de justificación enviada'
                }
            ]
        },
        {
            id: 3,
            alumno: 'Carlos Eduardo Silva Torres',
            matricula: 'A23110042',
            grupo: '2°C - Administración',
            carrera: 'Administración de Empresas',
            materia: 'Matemáticas Financieras',
            fechaSolicitud: '2024-10-16 11:15',
            fechaInicio: '2024-10-12',
            fechaFin: '2024-10-14',
            tipoAusencia: 'medica',
            motivo: 'Cirugía programada de apéndice. Período de recuperación según indicación médica.',
            estado: 'aprobada',
            archivos: [
                { nombre: 'orden_cirugia.pdf', tipo: 'pdf', tamaño: '3.1 MB' },
                { nombre: 'alta_medica.pdf', tipo: 'pdf', tamaño: '2.7 MB' }
            ],
            faltasJustificar: [
                {
                    fecha: '2024-10-12',
                    materia: 'Matemáticas Financieras',
                    horario: '14:00 - 16:00',
                    tipo: 'Teoría',
                    tema: 'Interés Compuesto'
                },
                {
                    fecha: '2024-10-14',
                    materia: 'Matemáticas Financieras',
                    horario: '14:00 - 16:00',
                    tipo: 'Práctica',
                    tema: 'Ejercicios de Anualidades'
                }
            ],
            totalFaltas: 2,
            fechaAprobacion: '2024-10-17 10:30',
            aprobadoPor: 'Dr. Roberto Sánchez',
            comentariosAprobacion: 'Documentación médica en orden. Justificación aprobada.',
            historial: [
                {
                    fecha: '2024-10-16 11:15',
                    accion: 'solicitud_enviada',
                    usuario: 'Alumno',
                    comentario: 'Solicitud de justificación enviada'
                },
                {
                    fecha: '2024-10-17 10:30',
                    accion: 'aprobada',
                    usuario: 'Dr. Roberto Sánchez',
                    comentario: 'Justificación aprobada - Faltas justificadas en sistema'
                }
            ]
        },
        {
            id: 4,
            alumno: 'Ana Patricia Morales Díaz',
            matricula: 'A23110033',
            grupo: '5°A - Software',
            carrera: 'Desarrollo de Software',
            materia: 'Base de Datos Avanzada',
            fechaSolicitud: '2024-10-15 16:45',
            fechaInicio: '2024-10-10',
            fechaFin: '2024-10-11',
            tipoAusencia: 'academica',
            motivo: 'Participación en Hackathon Nacional de Programación. Representé a la institución.',
            estado: 'rechazada',
            archivos: [
                { nombre: 'constancia_participacion.pdf', tipo: 'pdf', tamaño: '1.5 MB' },
                { nombre: 'carta_institucion.pdf', tipo: 'pdf', tamaño: '2.0 MB' }
            ],
            faltasJustificar: [
                {
                    fecha: '2024-10-10',
                    materia: 'Base de Datos Avanzada',
                    horario: '11:00 - 13:00',
                    tipo: 'Laboratorio',
                    tema: 'Optimización de Consultas'
                },
                {
                    fecha: '2024-10-11',
                    materia: 'Base de Datos Avanzada',
                    horario: '11:00 - 13:00',
                    tipo: 'Teoría',
                    tema: 'Transacciones y Concurrencia'
                }
            ],
            totalFaltas: 2,
            fechaRechazo: '2024-10-16 09:15',
            rechazadoPor: 'Ing. Laura Martínez',
            motivoRechazo: 'Las actividades de laboratorio son fundamentales y deben recuperarse. Coordinar con el profesor para programar la recuperación.',
            historial: [
                {
                    fecha: '2024-10-15 16:45',
                    accion: 'solicitud_enviada',
                    usuario: 'Alumno',
                    comentario: 'Solicitud de justificación enviada'
                },
                {
                    fecha: '2024-10-16 09:15',
                    accion: 'rechazada',
                    usuario: 'Ing. Laura Martínez',
                    comentario: 'Justificación rechazada - Se requiere recuperación de laboratorio'
                }
            ]
        },
        {
            id: 5,
            alumno: 'Diego Alejandro Cruz Mendoza',
            matricula: 'A23110019',
            grupo: '3°A - Sistemas',
            carrera: 'Ingeniería en Sistemas',
            materia: 'Programación Avanzada',
            fechaSolicitud: '2024-10-18 08:20',
            fechaInicio: '2024-10-17',
            fechaFin: '2024-10-17',
            tipoAusencia: 'enfermedad',
            motivo: 'Problemas gastrointestinales. Visita a urgencias médicas.',
            estado: 'pendiente',
            archivos: [
                { nombre: 'reporte_urgencias.pdf', tipo: 'pdf', tamaño: '1.9 MB' }
            ],
            faltasJustificar: [
                {
                    fecha: '2024-10-17',
                    materia: 'Programación Avanzada',
                    horario: '07:00 - 09:00',
                    tipo: 'Teoría',
                    tema: 'Patrones Observer y Strategy'
                }
            ],
            totalFaltas: 1,
            historial: [
                {
                    fecha: '2024-10-18 08:20',
                    accion: 'solicitud_enviada',
                    usuario: 'Alumno',
                    comentario: 'Solicitud de justificación enviada'
                }
            ]
        }
    ];

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setJustificaciones(justificacionesEjemplo);
            setLoading(false);
        }, 1500);
    }, []);

    const handleVerDetalles = (justificacion) => {
        setJustificacionSeleccionada(justificacion);
        setIsDetalleModalVisible(true);
    };

    const handleAprobar = (justificacion) => {
        setJustificacionSeleccionada(justificacion);
        form.setFieldsValue({
            comentarios: ''
        });
        setIsAprobarModalVisible(true);
    };

    const handleRechazar = (justificacion) => {
        setJustificacionSeleccionada(justificacion);
        form.setFieldsValue({
            motivoRechazo: ''
        });
        setIsRechazarModalVisible(true);
    };

    const aprobarJustificacion = async (valores) => {
        try {
            setLoading(true);

            // Simular procesamiento
            await new Promise(resolve => setTimeout(resolve, 2000));

            const justificacionesActualizadas = justificaciones.map(j =>
                j.id === justificacionSeleccionada.id
                    ? {
                        ...j,
                        estado: 'aprobada',
                        fechaAprobacion: new Date().toLocaleString(),
                        aprobadoPor: 'Docente Actual', // En producción sería el usuario logueado
                        comentariosAprobacion: valores.comentarios,
                        historial: [
                            ...j.historial,
                            {
                                fecha: new Date().toLocaleString(),
                                accion: 'aprobada',
                                usuario: 'Docente Actual',
                                comentario: 'Justificación aprobada - Faltas justificadas automáticamente en el sistema'
                            }
                        ]
                    }
                    : j
            );

            setJustificaciones(justificacionesActualizadas);
            setIsAprobarModalVisible(false);
            setJustificacionSeleccionada(null);
            form.resetFields();
            setLoading(false);

            // Mostrar mensaje de éxito
            message.success({
                content: (
                    <div>
                        <strong>¡Justificación Aprobada!</strong>
                        <br />
                        Se han justificado automáticamente {justificacionSeleccionada.totalFaltas} falta(s) en el sistema de asistencias.
                    </div>
                ),
                duration: 5,
            });

            // Aquí se conectaría con el sistema de asistencias para actualizar las faltas
            console.log('🔄 Actualizando sistema de asistencias...');
            console.log('✅ Faltas justificadas:', justificacionSeleccionada.faltasJustificar);
            console.log('📝 Comentarios:', valores.comentarios);

        } catch (error) {
            setLoading(false);
            message.error('Error al aprobar la justificación');
        }
    };

    const rechazarJustificacion = async (valores) => {
        try {
            setLoading(true);

            await new Promise(resolve => setTimeout(resolve, 1500));

            const justificacionesActualizadas = justificaciones.map(j =>
                j.id === justificacionSeleccionada.id
                    ? {
                        ...j,
                        estado: 'rechazada',
                        fechaRechazo: new Date().toLocaleString(),
                        rechazadoPor: 'Docente Actual',
                        motivoRechazo: valores.motivoRechazo,
                        historial: [
                            ...j.historial,
                            {
                                fecha: new Date().toLocaleString(),
                                accion: 'rechazada',
                                usuario: 'Docente Actual',
                                comentario: `Justificación rechazada - Motivo: ${valores.motivoRechazo}`
                            }
                        ]
                    }
                    : j
            );

            setJustificaciones(justificacionesActualizadas);
            setIsRechazarModalVisible(false);
            setJustificacionSeleccionada(null);
            form.resetFields();
            setLoading(false);

            message.success('Justificación rechazada correctamente');

        } catch (error) {
            setLoading(false);
            message.error('Error al rechazar la justificación');
        }
    };

    const getEstadoColor = (estado) => {
        const colores = {
            pendiente: 'orange',
            aprobada: 'green',
            rechazada: 'red'
        };
        return colores[estado] || 'default';
    };

    const getEstadoIcon = (estado) => {
        const iconos = {
            pendiente: <ExclamationCircleOutlined />,
            aprobada: <CheckCircleOutlined />,
            rechazada: <CloseCircleOutlined />
        };
        return iconos[estado];
    };

    const getTipoColor = (tipo) => {
        const colores = {
            enfermedad: 'red',
            medica: 'magenta',
            familiar: 'purple',
            academica: 'blue',
            personal: 'volcano'
        };
        return colores[tipo] || 'default';
    };

    const getTipoText = (tipo) => {
        const textos = {
            enfermedad: 'Enfermedad',
            medica: 'Procedimiento Médico',
            familiar: 'Asunto Familiar',
            academica: 'Actividad Académica',
            personal: 'Asunto Personal'
        };
        return textos[tipo] || tipo;
    };

    const justificacionesFiltradas = filtroEstado === 'todos'
        ? justificaciones
        : justificaciones.filter(j => j.estado === filtroEstado);

    const estadisticas = {
        total: justificaciones.length,
        pendientes: justificaciones.filter(j => j.estado === 'pendiente').length,
        aprobadas: justificaciones.filter(j => j.estado === 'aprobada').length,
        rechazadas: justificaciones.filter(j => j.estado === 'rechazada').length
    };

    const columns = [
        {
            title: 'Alumno',
            dataIndex: 'alumno',
            key: 'alumno',
            render: (text, record) => (
                <Space direction="vertical" size="small">
                    <div style={{ fontWeight: 'bold' }}>{text}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                        {record.matricula} • {record.grupo}
                    </div>
                    <div style={{ fontSize: '12px' }}>
                        <FileTextOutlined /> <strong>{record.materia}</strong>
                    </div>
                </Space>
            )
        },
        {
            title: 'Periodo de Ausencia',
            key: 'periodo',
            render: (_, record) => (
                <Space direction="vertical" size="small">
                    <div>
                        <CalendarOutlined /> <strong>{record.fechaInicio} a {record.fechaFin}</strong>
                    </div>
                    <div>
                        <Tag color={getTipoColor(record.tipoAusencia)}>
                            {getTipoText(record.tipoAusencia)}
                        </Tag>
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                        <UserOutlined /> {record.totalFaltas} falta(s) por justificar
                    </div>
                </Space>
            )
        },
        {
            title: 'Solicitud',
            key: 'solicitud',
            render: (_, record) => (
                <Space direction="vertical" size="small">
                    <div>
                        <ClockCircleOutlined /> {record.fechaSolicitud}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                        <FileTextOutlined /> {record.archivos?.length || 0} archivo(s) adjunto(s)
                    </div>
                </Space>
            )
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado',
            render: (estado, record) => (
                <Badge
                    status={
                        estado === 'pendiente' ? 'processing' :
                            estado === 'aprobada' ? 'success' : 'error'
                    }
                    text={
                        <Tag
                            color={getEstadoColor(estado)}
                            icon={getEstadoIcon(estado)}
                            style={{ fontWeight: 'bold', fontSize: '12px' }}
                        >
                            {estado.toUpperCase()}
                        </Tag>
                    }
                />
            )
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (_, record) => (
                <Space>
                    <Tooltip title="Ver detalles completos">
                        <Button
                            icon={<EyeOutlined />}
                            onClick={() => handleVerDetalles(record)}
                        >
                            Detalles
                        </Button>
                    </Tooltip>

                    {record.estado === 'pendiente' && (
                        <>
                            <Tooltip title="Aprobar justificación">
                                <Button
                                    type="primary"
                                    icon={<CheckCircleOutlined />}
                                    onClick={() => handleAprobar(record)}
                                    style={{ background: '#52c41a', borderColor: '#52c41a' }}
                                >
                                    Aprobar
                                </Button>
                            </Tooltip>
                            <Tooltip title="Rechazar justificación">
                                <Button
                                    danger
                                    icon={<CloseCircleOutlined />}
                                    onClick={() => handleRechazar(record)}
                                >
                                    Rechazar
                                </Button>
                            </Tooltip>
                        </>
                    )}
                </Space>
            )
        }
    ];

    return (
        <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ marginBottom: 24 }}>
                <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} md={12}>
                        <h1 style={{ margin: 0, color: '#1890ff' }}>
                            <FileTextOutlined /> Aprobación de Justificaciones
                        </h1>
                        <p style={{ margin: 0, color: '#666' }}>
                            Revisa y gestiona las solicitudes de justificación de ausencias de los alumnos
                        </p>
                    </Col>
                    <Col xs={24} md={12} style={{ textAlign: 'right' }}>
                        <Space>
                            <Select
                                value={filtroEstado}
                                onChange={setFiltroEstado}
                                style={{ width: 180 }}
                                suffixIcon={<FilterOutlined />}
                            >
                                <Option value="pendiente">Pendientes de Revisión</Option>
                                <Option value="aprobada">Aprobadas</Option>
                                <Option value="rechazada">Rechazadas</Option>
                                <Option value="todos">Todas las Solicitudes</Option>
                            </Select>
                            <Button
                                icon={<SyncOutlined />}
                                onClick={() => {
                                    setLoading(true);
                                    setTimeout(() => setLoading(false), 1000);
                                }}
                            >
                                Actualizar
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </div>

            {/* Alert Informativo */}
            <Alert
                message="Proceso de Aprobación Automática"
                description="Al aprobar una justificación, todas las faltas dentro del periodo especificado se justificarán automáticamente en el sistema de asistencias. Esta acción no se puede deshacer."
                type="info"
                showIcon
                icon={<InfoCircleOutlined />}
                style={{ marginBottom: 24 }}
            />

            {/* Estadísticas */}
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                <Col xs={24} md={6}>
                    <Card>
                        <Statistic
                            title="Total Solicitudes"
                            value={estadisticas.total}
                            prefix={<FileTextOutlined />}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card>
                        <Statistic
                            title="Pendientes de Revisión"
                            value={estadisticas.pendientes}
                            valueStyle={{ color: '#fa8c16' }}
                            prefix={<ExclamationCircleOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card>
                        <Statistic
                            title="Aprobadas"
                            value={estadisticas.aprobadas}
                            valueStyle={{ color: '#52c41a' }}
                            prefix={<CheckCircleOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card>
                        <Statistic
                            title="Rechazadas"
                            value={estadisticas.rechazadas}
                            valueStyle={{ color: '#ff4d4f' }}
                            prefix={<CloseCircleOutlined />}
                        />
                    </Card>
                </Col>
            </Row>

            <Divider />

            {/* Tabla de Justificaciones */}
            <Card
                title={
                    <Space>
                        <FileTextOutlined />
                        Solicitudes de Justificación
                        <Tag color="blue">{justificacionesFiltradas.length}</Tag>
                    </Space>
                }
                loading={loading}
                extra={
                    <span style={{ color: '#666', fontSize: '14px' }}>
                        Mostrando {justificacionesFiltradas.length} de {justificaciones.length} solicitudes
                    </span>
                }
            >
                <Table
                    columns={columns}
                    dataSource={justificacionesFiltradas}
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} de ${total} solicitudes`
                    }}
                />
            </Card>

            {/* Modal de Detalles */}
            <Modal
                title="Detalles de la Solicitud de Justificación"
                open={isDetalleModalVisible}
                onCancel={() => setIsDetalleModalVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setIsDetalleModalVisible(false)}>
                        Cerrar
                    </Button>,
                    justificacionSeleccionada?.estado === 'pendiente' && (
                        <>
                            <Button
                                key="rechazar"
                                danger
                                icon={<CloseCircleOutlined />}
                                onClick={() => {
                                    setIsDetalleModalVisible(false);
                                    handleRechazar(justificacionSeleccionada);
                                }}
                            >
                                Rechazar
                            </Button>
                            <Button
                                key="aprobar"
                                type="primary"
                                icon={<CheckCircleOutlined />}
                                onClick={() => {
                                    setIsDetalleModalVisible(false);
                                    handleAprobar(justificacionSeleccionada);
                                }}
                            >
                                Aprobar Justificación
                            </Button>
                        </>
                    )
                ]}
                width={900}
            >
                {justificacionSeleccionada && (
                    <div>
                        {/* Información Principal */}
                        <Descriptions title="Información del Alumno" bordered column={2} size="small">
                            <Descriptions.Item label="Nombre" span={2}>
                                {justificacionSeleccionada.alumno}
                            </Descriptions.Item>
                            <Descriptions.Item label="Matrícula">
                                {justificacionSeleccionada.matricula}
                            </Descriptions.Item>
                            <Descriptions.Item label="Grupo">
                                {justificacionSeleccionada.grupo}
                            </Descriptions.Item>
                            <Descriptions.Item label="Carrera">
                                {justificacionSeleccionada.carrera}
                            </Descriptions.Item>
                            <Descriptions.Item label="Materia">
                                {justificacionSeleccionada.materia}
                            </Descriptions.Item>
                        </Descriptions>

                        <Divider />

                        {/* Detalles de la Ausencia */}
                        <Descriptions title="Detalles de la Ausencia" bordered column={2} size="small">
                            <Descriptions.Item label="Tipo de Ausencia">
                                <Tag color={getTipoColor(justificacionSeleccionada.tipoAusencia)}>
                                    {getTipoText(justificacionSeleccionada.tipoAusencia)}
                                </Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Estado">
                                <Tag
                                    color={getEstadoColor(justificacionSeleccionada.estado)}
                                    icon={getEstadoIcon(justificacionSeleccionada.estado)}
                                >
                                    {justificacionSeleccionada.estado.toUpperCase()}
                                </Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Fecha de Solicitud">
                                {justificacionSeleccionada.fechaSolicitud}
                            </Descriptions.Item>
                            <Descriptions.Item label="Periodo de Ausencia">
                                {justificacionSeleccionada.fechaInicio} a {justificacionSeleccionada.fechaFin}
                            </Descriptions.Item>
                            <Descriptions.Item label="Total de Faltas" span={2}>
                                <strong>{justificacionSeleccionada.totalFaltas} falta(s)</strong>
                            </Descriptions.Item>
                            <Descriptions.Item label="Motivo" span={2}>
                                {justificacionSeleccionada.motivo}
                            </Descriptions.Item>
                        </Descriptions>

                        <Divider />

                        {/* Faltas a Justificar */}
                        <h4>
                            <ExclamationCircleOutlined /> Faltas que serán Justificadas
                            <Tag color="blue" style={{ marginLeft: 8 }}>
                                {justificacionSeleccionada.faltasJustificar.length}
                            </Tag>
                        </h4>
                        <List
                            size="small"
                            dataSource={justificacionSeleccionada.faltasJustificar}
                            renderItem={falta => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<CalendarOutlined />}
                                        title={`${falta.fecha} - ${falta.horario}`}
                                        description={
                                            <div>
                                                <div><strong>{falta.materia}</strong> - {falta.tipo}</div>
                                                <div style={{ color: '#666', fontSize: '12px' }}>Tema: {falta.tema}</div>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            )}
                        />

                        {/* Archivos Adjuntos */}
                        {justificacionSeleccionada.archivos && justificacionSeleccionada.archivos.length > 0 && (
                            <>
                                <Divider />
                                <h4>
                                    <FileTextOutlined /> Archivos Adjuntos
                                    <Tag color="green" style={{ marginLeft: 8 }}>
                                        {justificacionSeleccionada.archivos.length}
                                    </Tag>
                                </h4>
                                <List
                                    size="small"
                                    dataSource={justificacionSeleccionada.archivos}
                                    renderItem={archivo => (
                                        <List.Item
                                            actions={[
                                                <Button type="link" icon={<DownloadOutlined />} size="small">
                                                    Descargar
                                                </Button>
                                            ]}
                                        >
                                            <List.Item.Meta
                                                avatar={<FileTextOutlined />}
                                                title={archivo.nombre}
                                                description={`Tipo: ${archivo.tipo} • Tamaño: ${archivo.tamaño}`}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </>
                        )}

                        {/* Historial */}
                        <Divider />
                        <h4>
                            <ClockCircleOutlined /> Historial de la Solicitud
                        </h4>
                        <Timeline>
                            {justificacionSeleccionada.historial.map((item, index) => (
                                <Timeline.Item
                                    key={index}
                                    color={
                                        item.accion === 'solicitud_enviada' ? 'blue' :
                                            item.accion === 'aprobada' ? 'green' : 'red'
                                    }
                                    dot={
                                        item.accion === 'solicitud_enviada' ? <UserOutlined /> :
                                            item.accion === 'aprobada' ? <CheckCircleOutlined /> : <CloseCircleOutlined />
                                    }
                                >
                                    <p style={{ margin: 0, fontWeight: 'bold' }}>
                                        {item.accion === 'solicitud_enviada' ? 'SOLICITUD ENVIADA' :
                                            item.accion === 'aprobada' ? 'JUSTIFICACIÓN APROBADA' : 'JUSTIFICACIÓN RECHAZADA'}
                                    </p>
                                    <p style={{ margin: 0, color: '#666' }}>{item.fecha}</p>
                                    <p style={{ margin: 0 }}>Por: {item.usuario}</p>
                                    {item.comentario && (
                                        <p style={{ margin: 0, fontStyle: 'italic' }}>"{item.comentario}"</p>
                                    )}
                                </Timeline.Item>
                            ))}
                        </Timeline>
                    </div>
                )}
            </Modal>

            {/* Modal para Aprobar */}
            <Modal
                title={
                    <Space>
                        <CheckCircleOutlined style={{ color: '#52c41a' }} />
                        Aprobar Justificación
                    </Space>
                }
                open={isAprobarModalVisible}
                onCancel={() => {
                    setIsAprobarModalVisible(false);
                    form.resetFields();
                }}
                footer={null}
                width={600}
            >
                {justificacionSeleccionada && (
                    <div>
                        {/* Alerta de Confirmación */}
                        <Alert
                            message="Confirmación de Aprobación"
                            description={
                                <div>
                                    <p>Al aprobar esta justificación, <strong>{justificacionSeleccionada.totalFaltas} falta(s)</strong> serán automáticamente justificadas en el sistema de asistencias.</p>
                                    <p><strong>Esta acción no se puede deshacer.</strong></p>
                                </div>
                            }
                            type="warning"
                            showIcon
                            icon={<WarningOutlined />}
                            style={{ marginBottom: 16 }}
                        />

                        {/* Resumen de la Justificación */}
                        <Card size="small" title="Resumen de la Justificación" style={{ marginBottom: 16 }}>
                            <Descriptions column={1} size="small">
                                <Descriptions.Item label="Alumno">{justificacionSeleccionada.alumno}</Descriptions.Item>
                                <Descriptions.Item label="Periodo">{justificacionSeleccionada.fechaInicio} a {justificacionSeleccionada.fechaFin}</Descriptions.Item>
                                <Descriptions.Item label="Faltas a Justificar">{justificacionSeleccionada.totalFaltas}</Descriptions.Item>
                                <Descriptions.Item label="Tipo">{getTipoText(justificacionSeleccionada.tipoAusencia)}</Descriptions.Item>
                            </Descriptions>
                        </Card>

                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={aprobarJustificacion}
                        >
                            <Form.Item
                                label="Comentarios (Opcional)"
                                name="comentarios"
                            >
                                <TextArea
                                    rows={3}
                                    placeholder="Puedes agregar comentarios adicionales para el alumno..."
                                />
                            </Form.Item>

                            <Form.Item>
                                <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                                    <Button
                                        onClick={() => {
                                            setIsAprobarModalVisible(false);
                                            form.resetFields();
                                        }}
                                        disabled={loading}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={loading}
                                        icon={<CheckCircleOutlined />}
                                        style={{ background: '#52c41a', borderColor: '#52c41a' }}
                                    >
                                        Aprobar y Justificar Faltas
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    </div>
                )}
            </Modal>

            {/* Modal para Rechazar */}
            <Modal
                title={
                    <Space>
                        <CloseCircleOutlined style={{ color: '#ff4d4f' }} />
                        Rechazar Justificación
                    </Space>
                }
                open={isRechazarModalVisible}
                onCancel={() => {
                    setIsRechazarModalVisible(false);
                    form.resetFields();
                }}
                footer={null}
                width={600}
            >
                {justificacionSeleccionada && (
                    <div>
                        {/* Alerta de Confirmación */}
                        <Alert
                            message="Confirmación de Rechazo"
                            description="Al rechazar esta justificación, las faltas permanecerán en el registro del alumno."
                            type="error"
                            showIcon
                            style={{ marginBottom: 16 }}
                        />

                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={rechazarJustificacion}
                        >
                            <Form.Item
                                label="Motivo del Rechazo"
                                name="motivoRechazo"
                                rules={[{ required: true, message: 'Debes especificar el motivo del rechazo' }]}
                                extra="Este mensaje será visible para el alumno."
                            >
                                <TextArea
                                    rows={4}
                                    placeholder="Explica detalladamente por qué se rechaza esta justificación..."
                                />
                            </Form.Item>

                            <Form.Item>
                                <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                                    <Button
                                        onClick={() => {
                                            setIsRechazarModalVisible(false);
                                            form.resetFields();
                                        }}
                                        disabled={loading}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="primary"
                                        danger
                                        htmlType="submit"
                                        loading={loading}
                                        icon={<CloseCircleOutlined />}
                                    >
                                        Rechazar Justificación
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default AprobacionJustificacionesView;