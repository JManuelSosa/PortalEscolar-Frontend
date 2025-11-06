// PanelAlumnoView.js
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
  Table,
  List,
  Timeline,
  Progress,
  Badge,
  Avatar,
  Modal,
  Form,
  Input,
  Select,
  Upload,
  message,
  Tabs,
  Descriptions,
  Calendar,
  Alert
} from 'antd';
import { 
  UserOutlined,
  BookOutlined,
  CalendarOutlined,
  DollarOutlined,
  MessageOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  FileTextOutlined,
  TeamOutlined,
  BarChartOutlined,
  SettingOutlined,
  EyeOutlined,
  DownloadOutlined,
  SendOutlined,
  UploadOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

const PanelAlumnoView = () => {
  const [loading, setLoading] = useState(false);
  const [isMensajeModalVisible, setIsMensajeModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('resumen');
  const [form] = Form.useForm();

  // Datos del alumno
  const alumnoData = {
    nombre: 'Juan Carlos Mendoza López',
    matricula: 'A23110015',
    carrera: 'Ingeniería en Sistemas',
    semestre: '6° Semestre',
    grupo: '3°A - Sistemas',
    periodo: 'Agosto - Diciembre 2024',
    estado: 'Activo',
    foto: '/img/alumno.jpg'
  };

  // Datos de colegiaturas
  const pagosData = [
    {
      id: 1,
      concepto: 'Colegiatura Agosto 2024',
      fechaVencimiento: '2024-08-05',
      monto: 4500.00,
      estado: 'pagado',
      fechaPago: '2024-08-01',
      referencia: 'PAGO-001234',
      metodo: 'Transferencia'
    },
    {
      id: 2,
      concepto: 'Colegiatura Septiembre 2024',
      fechaVencimiento: '2024-09-05',
      monto: 4500.00,
      estado: 'pagado',
      fechaPago: '2024-09-03',
      referencia: 'PAGO-001235',
      metodo: 'Tarjeta de Crédito'
    },
    {
      id: 3,
      concepto: 'Colegiatura Octubre 2024',
      fechaVencimiento: '2024-10-05',
      monto: 4500.00,
      estado: 'pendiente',
      fechaPago: null,
      referencia: null,
      metodo: null
    },
    {
      id: 4,
      concepto: 'Colegiatura Noviembre 2024',
      fechaVencimiento: '2024-11-05',
      monto: 4500.00,
      estado: 'pendiente',
      fechaPago: null,
      referencia: null,
      metodo: null
    },
    {
      id: 5,
      concepto: 'Inscripción Semestral',
      fechaVencimiento: '2024-07-25',
      monto: 2500.00,
      estado: 'pagado',
      fechaPago: '2024-07-20',
      referencia: 'PAGO-001233',
      metodo: 'Efectivo'
    },
    {
      id: 6,
      concepto: 'Laboratorio de Computación',
      fechaVencimiento: '2024-08-15',
      monto: 800.00,
      estado: 'pagado',
      fechaPago: '2024-08-10',
      referencia: 'PAGO-001236',
      metodo: 'Transferencia'
    }
  ];

  // Horarios
  const horariosData = [
    {
      dia: 'Lunes',
      clases: [
        { materia: 'Programación Avanzada', hora: '07:00 - 09:00', aula: 'A-301', profesor: 'Dr. Carlos Rodríguez' },
        { materia: 'Base de Datos', hora: '09:00 - 11:00', aula: 'A-301', profesor: 'Ing. Laura Martínez' },
        { materia: 'Redes de Computadoras', hora: '11:00 - 13:00', aula: 'Lab-202', profesor: 'Mtro. Roberto Sánchez' }
      ]
    },
    {
      dia: 'Martes',
      clases: [
        { materia: 'Sistemas Operativos', hora: '07:00 - 09:00', aula: 'B-205', profesor: 'Dr. Ana García' },
        { materia: 'Programación Avanzada', hora: '09:00 - 11:00', aula: 'A-301', profesor: 'Dr. Carlos Rodríguez' },
        { materia: 'Taller de Investigación', hora: '11:00 - 13:00', aula: 'Biblioteca', profesor: 'Dra. Patricia López' }
      ]
    },
    {
      dia: 'Miércoles',
      clases: [
        { materia: 'Base de Datos', hora: '07:00 - 09:00', aula: 'A-301', profesor: 'Ing. Laura Martínez' },
        { materia: 'Redes de Computadoras', hora: '09:00 - 11:00', aula: 'Lab-202', profesor: 'Mtro. Roberto Sánchez' },
        { materia: 'Sistemas Operativos', hora: '11:00 - 13:00', aula: 'B-205', profesor: 'Dr. Ana García' }
      ]
    },
    {
      dia: 'Jueves',
      clases: [
        { materia: 'Programación Avanzada', hora: '07:00 - 09:00', aula: 'A-301', profesor: 'Dr. Carlos Rodríguez' },
        { materia: 'Taller de Investigación', hora: '09:00 - 11:00', aula: 'Biblioteca', profesor: 'Dra. Patricia López' }
      ]
    },
    {
      dia: 'Viernes',
      clases: [
        { materia: 'Sistemas Operativos', hora: '07:00 - 09:00', aula: 'B-205', profesor: 'Dr. Ana García' },
        { materia: 'Base de Datos', hora: '09:00 - 11:00', aula: 'A-301', profesor: 'Ing. Laura Martínez' }
      ]
    }
  ];

  // Asistencias
  const asistenciasData = [
    {
      materia: 'Programación Avanzada',
      totalClases: 45,
      asistencias: 40,
      faltas: 3,
      retardos: 2,
      porcentaje: 89
    },
    {
      materia: 'Base de Datos',
      totalClases: 40,
      asistencias: 38,
      faltas: 1,
      retardos: 1,
      porcentaje: 95
    },
    {
      materia: 'Sistemas Operativos',
      totalClases: 42,
      asistencias: 35,
      faltas: 5,
      retardos: 2,
      porcentaje: 83
    },
    {
      materia: 'Redes de Computadoras',
      totalClases: 38,
      asistencias: 36,
      faltas: 1,
      retardos: 1,
      porcentaje: 95
    },
    {
      materia: 'Taller de Investigación',
      totalClases: 30,
      asistencias: 28,
      faltas: 2,
      retardos: 0,
      porcentaje: 93
    }
  ];

  // Calificaciones
  const calificacionesData = [
    {
      materia: 'Programación Avanzada',
      profesor: 'Dr. Carlos Rodríguez',
      parcial1: 85,
      parcial2: 92,
      parcial3: 88,
      proyecto: 95,
      final: 90,
      estado: 'Aprobado'
    },
    {
      materia: 'Base de Datos',
      profesor: 'Ing. Laura Martínez',
      parcial1: 90,
      parcial2: 87,
      parcial3: 93,
      proyecto: 89,
      final: 90,
      estado: 'Aprobado'
    },
    {
      materia: 'Sistemas Operativos',
      profesor: 'Dr. Ana García',
      parcial1: 78,
      parcial2: 82,
      parcial3: 85,
      proyecto: 80,
      final: 81,
      estado: 'Aprobado'
    },
    {
      materia: 'Redes de Computadoras',
      profesor: 'Mtro. Roberto Sánchez',
      parcial1: 92,
      parcial2: 88,
      parcial3: 90,
      proyecto: 94,
      final: 91,
      estado: 'Aprobado'
    },
    {
      materia: 'Taller de Investigación',
      profesor: 'Dra. Patricia López',
      parcial1: 95,
      parcial2: 90,
      proyecto: 92,
      final: 92,
      estado: 'Aprobado'
    }
  ];

  // Mensajes y comunicaciones
  const mensajesData = [
    {
      id: 1,
      profesor: 'Dr. Carlos Rodríguez',
      materia: 'Programación Avanzada',
      asunto: 'Recordatorio: Entrega Proyecto Final',
      mensaje: 'Les recuerdo que la entrega del proyecto final es el próximo viernes. Favor de subir todos los archivos a la plataforma.',
      fecha: '2024-10-15 14:30',
      leido: false
    },
    {
      id: 2,
      profesor: 'Ing. Laura Martínez',
      materia: 'Base de Datos',
      asunto: 'Cambio de Laboratorio',
      mensaje: 'La sesión de laboratorio de mañana se cambiará al laboratorio 205 debido a mantenimiento.',
      fecha: '2024-10-14 10:15',
      leido: true
    },
    {
      id: 3,
      profesor: 'Dr. Ana García',
      materia: 'Sistemas Operativos',
      asunto: 'Calificaciones Parcial 2',
      mensaje: 'Ya están disponibles las calificaciones del segundo parcial en el sistema.',
      fecha: '2024-10-12 16:45',
      leido: true
    }
  ];

  // Próximas actividades
  const proximasActividades = [
    {
      id: 1,
      tipo: 'examen',
      materia: 'Programación Avanzada',
      titulo: 'Examen Parcial 3',
      fecha: '2024-10-25',
      hora: '07:00',
      aula: 'A-301'
    },
    {
      id: 2,
      tipo: 'entrega',
      materia: 'Base de Datos',
      titulo: 'Proyecto Final - Entrega',
      fecha: '2024-11-15',
      hora: '23:59',
      aula: 'Plataforma'
    },
    {
      id: 3,
      tipo: 'tarea',
      materia: 'Sistemas Operativos',
      titulo: 'Tarea 5 - Gestión de Memoria',
      fecha: '2024-10-20',
      hora: '23:59',
      aula: 'Plataforma'
    }
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleEnviarMensaje = async (values) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      message.success('Mensaje enviado correctamente al profesor');
      setIsMensajeModalVisible(false);
      form.resetFields();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error('Error al enviar el mensaje');
    }
  };

  const handlePagarColegiatura = (pago) => {
    Modal.info({
      title: 'Proceso de Pago',
      content: (
        <div>
          <p>Redirigiendo al sistema de pagos para: <strong>{pago.concepto}</strong></p>
          <p>Monto: <strong>${pago.monto.toFixed(2)}</strong></p>
          <Alert 
            message="Serás redirigido a la pasarela de pagos segura" 
            type="info" 
            style={{ marginTop: 16 }}
          />
        </div>
      ),
      onOk() {
        // Simular redirección a pasarela de pagos
        message.info('Procesando pago...');
      }
    });
  };

  const getEstadoPagoColor = (estado) => {
    return estado === 'pagado' ? 'green' : 'orange';
  };

  const getEstadoCalificacionColor = (calificacion) => {
    if (calificacion >= 90) return 'green';
    if (calificacion >= 80) return 'blue';
    if (calificacion >= 70) return 'orange';
    return 'red';
  };

  const columnsPagos = [
    {
      title: 'Concepto',
      dataIndex: 'concepto',
      key: 'concepto',
      render: (text, record) => (
        <Space direction="vertical" size="small">
          <div style={{ fontWeight: 'bold' }}>{text}</div>
          {record.referencia && (
            <div style={{ fontSize: '12px', color: '#666' }}>
              Ref: {record.referencia}
            </div>
          )}
        </Space>
      )
    },
    {
      title: 'Fecha Vencimiento',
      dataIndex: 'fechaVencimiento',
      key: 'fechaVencimiento',
      render: (fecha) => (
        <Space>
          <CalendarOutlined />
          {fecha}
        </Space>
      )
    },
    {
      title: 'Monto',
      dataIndex: 'monto',
      key: 'monto',
      render: (monto) => `$${monto.toFixed(2)}`
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      render: (estado, record) => (
        <Tag color={getEstadoPagoColor(estado)}>
          {estado.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <Space>
          {record.estado === 'pendiente' ? (
            <Button 
              type="primary" 
              size="small"
              onClick={() => handlePagarColegiatura(record)}
            >
              Pagar Ahora
            </Button>
          ) : (
            <Button 
              type="link" 
              size="small"
              icon={<DownloadOutlined />}
            >
              Recibo
            </Button>
          )}
        </Space>
      )
    }
  ];

  const columnsCalificaciones = [
    {
      title: 'Materia',
      dataIndex: 'materia',
      key: 'materia',
      render: (text, record) => (
        <Space direction="vertical" size="small">
          <div style={{ fontWeight: 'bold' }}>{text}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {record.profesor}
          </div>
        </Space>
      )
    },
    {
      title: 'Parcial 1',
      dataIndex: 'parcial1',
      key: 'parcial1',
      render: (calif) => (
        <Tag color={getEstadoCalificacionColor(calif)}>
          {calif}
        </Tag>
      )
    },
    {
      title: 'Parcial 2',
      dataIndex: 'parcial2',
      key: 'parcial2',
      render: (calif) => (
        <Tag color={getEstadoCalificacionColor(calif)}>
          {calif}
        </Tag>
      )
    },
    {
      title: 'Parcial 3',
      dataIndex: 'parcial3',
      key: 'parcial3',
      render: (calif) => (
        <Tag color={getEstadoCalificacionColor(calif)}>
          {calif}
        </Tag>
      )
    },
    {
      title: 'Proyecto',
      dataIndex: 'proyecto',
      key: 'proyecto',
      render: (calif) => (
        <Tag color={getEstadoCalificacionColor(calif)}>
          {calif}
        </Tag>
      )
    },
    {
      title: 'Final',
      dataIndex: 'final',
      key: 'final',
      render: (calif) => (
        <Tag color={getEstadoCalificacionColor(calif)} style={{ fontWeight: 'bold' }}>
          {calif}
        </Tag>
      )
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      render: (estado) => (
        <Tag color={estado === 'Aprobado' ? 'green' : 'red'}>
          {estado}
        </Tag>
      )
    }
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header del Alumno */}
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={6}>
            <Space>
              <Avatar size={64} icon={<UserOutlined />} src={alumnoData.foto} />
              <div>
                <h2 style={{ margin: 0 }}>{alumnoData.nombre}</h2>
                <p style={{ margin: 0, color: '#666' }}>{alumnoData.matricula}</p>
              </div>
            </Space>
          </Col>
          <Col xs={24} md={18}>
            <Row gutter={[16, 16]}>
              <Col xs={12} sm={6}>
                <Statistic title="Carrera" value={alumnoData.carrera} prefix={<BookOutlined />} />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic title="Semestre" value={alumnoData.semestre} prefix={<TeamOutlined />} />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic title="Grupo" value={alumnoData.grupo} prefix={<UserOutlined />} />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic title="Periodo" value={alumnoData.periodo} prefix={<CalendarOutlined />} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      {/* Tabs Principales */}
      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        type="card"
        items={[
          {
            key: 'resumen',
            label: (
              <Space>
                <BarChartOutlined />
                Resumen General
              </Space>
            ),
            children: (
              <Row gutter={[16, 16]}>
                {/* Estadísticas Rápidas */}
                <Col xs={24} md={8}>
                  <Card title="Estado Académico" loading={loading}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <Statistic 
                        title="Promedio General" 
                        value={87.5} 
                        suffix="/100" 
                        valueStyle={{ color: '#52c41a' }}
                      />
                      <Statistic 
                        title="Asistencia General" 
                        value={91} 
                        suffix="%" 
                        valueStyle={{ color: '#1890ff' }}
                      />
                      <Statistic 
                        title="Materias Inscritas" 
                        value={5} 
                        valueStyle={{ color: '#722ed1' }}
                      />
                    </Space>
                  </Card>
                </Col>

                <Col xs={24} md={8}>
                  <Card title="Estado de Pagos" loading={loading}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <Statistic 
                        title="Pagado este Semestre" 
                        value={11800} 
                        prefix="$" 
                        valueStyle={{ color: '#52c41a' }}
                      />
                      <Statistic 
                        title="Pendiente por Pagar" 
                        value={9000} 
                        prefix="$" 
                        valueStyle={{ color: '#fa8c16' }}
                      />
                      <Statistic 
                        title="Próximo Vencimiento" 
                        value="2024-10-05" 
                        valueStyle={{ color: '#ff4d4f' }}
                      />
                    </Space>
                  </Card>
                </Col>

                <Col xs={24} md={8}>
                  <Card title="Próximas Actividades" loading={loading}>
                    <Timeline>
                      {proximasActividades.map(actividad => (
                        <Timeline.Item 
                          key={actividad.id}
                          dot={<CalendarOutlined />}
                          color="blue"
                        >
                          <p style={{ margin: 0, fontWeight: 'bold' }}>{actividad.titulo}</p>
                          <p style={{ margin: 0 }}>{actividad.materia}</p>
                          <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                            {actividad.fecha} {actividad.hora} - {actividad.aula}
                          </p>
                        </Timeline.Item>
                      ))}
                    </Timeline>
                  </Card>
                </Col>

                {/* Asistencias Resumen */}
                <Col xs={24}>
                  <Card title="Resumen de Asistencias" loading={loading}>
                    <Row gutter={[16, 16]}>
                      {asistenciasData.map((materia, index) => (
                        <Col xs={24} md={8} lg={6} key={index}>
                          <Card size="small">
                            <div style={{ textAlign: 'center' }}>
                              <h4 style={{ marginBottom: 8 }}>{materia.materia}</h4>
                              <Progress 
                                type="circle" 
                                percent={materia.porcentaje} 
                                width={80}
                                strokeColor={
                                  materia.porcentaje >= 90 ? '#52c41a' :
                                  materia.porcentaje >= 80 ? '#1890ff' : '#fa8c16'
                                }
                              />
                              <div style={{ marginTop: 8, fontSize: '12px' }}>
                                <div>{materia.asistencias} presentes</div>
                                <div>{materia.faltas} faltas • {materia.retardos} retardos</div>
                              </div>
                            </div>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Card>
                </Col>
              </Row>
            )
          },
          {
            key: 'pagos',
            label: (
              <Space>
                <DollarOutlined />
                Pagos y Colegiaturas
              </Space>
            ),
            children: (
              <div>
                <Alert
                  message="Sistema de Pagos en Línea"
                  description="Puedes realizar tus pagos de colegiatura y servicios escolares de forma segura a través de nuestra plataforma."
                  type="info"
                  showIcon
                  style={{ marginBottom: 16 }}
                />
                
                <Card title="Estado de Pagos" loading={loading}>
                  <Table 
                    columns={columnsPagos} 
                    dataSource={pagosData} 
                    rowKey="id"
                    pagination={false}
                  />
                </Card>

                <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                  <Col xs={24} md={12}>
                    <Card title="Resumen Financiero" size="small">
                      <Descriptions column={1} size="small">
                        <Descriptions.Item label="Total Pagado">
                          <strong>$11,800.00</strong>
                        </Descriptions.Item>
                        <Descriptions.Item label="Total Pendiente">
                          <strong style={{ color: '#ff4d4f' }}>$9,000.00</strong>
                        </Descriptions.Item>
                        <Descriptions.Item label="Próximo Vencimiento">
                          05 de Octubre 2024
                        </Descriptions.Item>
                        <Descriptions.Item label="Estado de Cuenta">
                          <Tag color="green">Al Corriente</Tag>
                        </Descriptions.Item>
                      </Descriptions>
                    </Card>
                  </Col>
                  <Col xs={24} md={12}>
                    <Card title="Métodos de Pago" size="small">
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Button block icon={<DollarOutlined />}>Transferencia Bancaria</Button>
                        <Button block icon={<DollarOutlined />}>Tarjeta de Crédito/Débito</Button>
                        <Button block icon={<DollarOutlined />}>Pago en Efectivo</Button>
                        <Button block icon={<DollarOutlined />}>PayPal</Button>
                      </Space>
                    </Card>
                  </Col>
                </Row>
              </div>
            )
          },
          {
            key: 'horarios',
            label: (
              <Space>
                <CalendarOutlined />
                Horarios
              </Space>
            ),
            children: (
              <div>
                <Card 
                  title={`Horario - ${alumnoData.periodo}`} 
                  loading={loading}
                  extra={
                    <Button icon={<DownloadOutlined />}>
                      Descargar Horario
                    </Button>
                  }
                >
                  <Row gutter={[16, 16]}>
                    {horariosData.map((dia, index) => (
                      <Col xs={24} md={8} lg={6} key={index}>
                        <Card 
                          title={dia.dia} 
                          size="small"
                          headStyle={{ 
                            backgroundColor: '#1890ff', 
                            color: 'white',
                            textAlign: 'center'
                          }}
                        >
                          <List
                            size="small"
                            dataSource={dia.clases}
                            renderItem={clase => (
                              <List.Item>
                                <List.Item.Meta
                                  title={clase.materia}
                                  description={
                                    <div>
                                      <div>{clase.hora}</div>
                                      <div style={{ fontSize: '12px', color: '#666' }}>
                                        {clase.aula} - {clase.profesor}
                                      </div>
                                    </div>
                                  }
                                />
                              </List.Item>
                            )}
                          />
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Card>

                <Card title="Horario Semanal Visual" style={{ marginTop: 16 }} loading={loading}>
                  <Calendar
                    fullscreen={false}
                    onSelect={(value) => console.log('Fecha seleccionada:', value)}
                    headerRender={({ value, type, onChange, onTypeChange }) => null}
                  />
                </Card>
              </div>
            )
          },
          {
            key: 'asistencias',
            label: (
              <Space>
                <CheckCircleOutlined />
                Asistencias y Calificaciones
              </Space>
            ),
            children: (
              <div>
                <Tabs type="card">
                  <TabPane tab="Asistencias" key="asistencias">
                    <Card title="Resumen de Asistencias por Materia" loading={loading}>
                      <Row gutter={[16, 16]}>
                        {asistenciasData.map((materia, index) => (
                          <Col xs={24} md={12} lg={8} key={index}>
                            <Card size="small">
                              <div style={{ textAlign: 'center' }}>
                                <h4>{materia.materia}</h4>
                                <Progress 
                                  percent={materia.porcentaje}
                                  status={
                                    materia.porcentaje >= 80 ? 'success' : 
                                    materia.porcentaje >= 70 ? 'normal' : 'exception'
                                  }
                                />
                                <Space style={{ marginTop: 8 }} size="small">
                                  <Tag color="green">{materia.asistencias} P</Tag>
                                  <Tag color="red">{materia.faltas} F</Tag>
                                  <Tag color="orange">{materia.retardos} R</Tag>
                                </Space>
                                <div style={{ marginTop: 8, fontSize: '12px', color: '#666' }}>
                                  Total de clases: {materia.totalClases}
                                </div>
                              </div>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </Card>
                  </TabPane>

                  <TabPane tab="Calificaciones" key="calificaciones">
                    <Card title="Calificaciones del Periodo" loading={loading}>
                      <Table 
                        columns={columnsCalificaciones} 
                        dataSource={calificacionesData} 
                        rowKey="materia"
                        pagination={false}
                      />
                    </Card>

                    <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                      <Col xs={24} md={12}>
                        <Card title="Promedio General" size="small">
                          <div style={{ textAlign: 'center' }}>
                            <Progress 
                              type="circle" 
                              percent={87.5} 
                              width={150}
                              strokeColor="#52c41a"
                              format={percent => (
                                <div>
                                  <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                    {percent}%
                                  </div>
                                  <div style={{ fontSize: '12px', color: '#666' }}>
                                    Promedio
                                  </div>
                                </div>
                              )}
                            />
                          </div>
                        </Card>
                      </Col>
                      <Col xs={24} md={12}>
                        <Card title="Estadísticas" size="small">
                          <Descriptions column={1} size="small">
                            <Descriptions.Item label="Materia Más Alta">
                              Taller de Investigación (92)
                            </Descriptions.Item>
                            <Descriptions.Item label="Materia Más Baja">
                              Sistemas Operativos (81)
                            </Descriptions.Item>
                            <Descriptions.Item label="Estado General">
                              <Tag color="green">Aprobado</Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Ranking en Grupo">
                              8° de 30 alumnos
                            </Descriptions.Item>
                          </Descriptions>
                        </Card>
                      </Col>
                    </Row>
                  </TabPane>
                </Tabs>
              </div>
            )
          },
          {
            key: 'comunicacion',
            label: (
              <Space>
                <MessageOutlined />
                Comunicación
                <Badge count={1} size="small" />
              </Space>
            ),
            children: (
              <div>
                <Card 
                  title="Comunicación con Profesores" 
                  loading={loading}
                  extra={
                    <Button 
                      type="primary" 
                      icon={<SendOutlined />}
                      onClick={() => setIsMensajeModalVisible(true)}
                    >
                      Nuevo Mensaje
                    </Button>
                  }
                >
                  <List
                    dataSource={mensajesData}
                    renderItem={mensaje => (
                      <List.Item
                        actions={[
                          <Button type="link" size="small">Responder</Button>
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<Avatar icon={<UserOutlined />} />}
                          title={
                            <Space>
                              <span>{mensaje.asunto}</span>
                              {!mensaje.leido && <Badge dot color="blue" />}
                            </Space>
                          }
                          description={
                            <div>
                              <div>
                                <strong>{mensaje.profesor}</strong> - {mensaje.materia}
                              </div>
                              <div>{mensaje.mensaje}</div>
                              <div style={{ fontSize: '12px', color: '#666', marginTop: 4 }}>
                                {mensaje.fecha}
                              </div>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Card>

                <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                  <Col xs={24} md={12}>
                    <Card title="Profesores del Semestre" size="small">
                      <List
                        size="small"
                        dataSource={[
                          { nombre: 'Dr. Carlos Rodríguez', materia: 'Programación Avanzada', email: 'carlos.rodriguez@escuela.edu' },
                          { nombre: 'Ing. Laura Martínez', materia: 'Base de Datos', email: 'laura.martinez@escuela.edu' },
                          { nombre: 'Dr. Ana García', materia: 'Sistemas Operativos', email: 'ana.garcia@escuela.edu' },
                          { nombre: 'Mtro. Roberto Sánchez', materia: 'Redes de Computadoras', email: 'roberto.sanchez@escuela.edu' },
                          { nombre: 'Dra. Patricia López', materia: 'Taller de Investigación', email: 'patricia.lopez@escuela.edu' }
                        ]}
                        renderItem={profesor => (
                          <List.Item
                            actions={[
                              <Button type="link" size="small" onClick={() => {
                                setActiveTab('comunicacion');
                                form.setFieldsValue({ profesor: profesor.nombre });
                                setIsMensajeModalVisible(true);
                              }}>
                                Mensaje
                              </Button>
                            ]}
                          >
                            <List.Item.Meta
                              title={profesor.nombre}
                              description={
                                <div>
                                  <div>{profesor.materia}</div>
                                  <div style={{ fontSize: '12px', color: '#666' }}>
                                    {profesor.email}
                                  </div>
                                </div>
                              }
                            />
                          </List.Item>
                        )}
                      />
                    </Card>
                  </Col>
                  <Col xs={24} md={12}>
                    <Card title="Contacto de Emergencia" size="small">
                      <Alert
                        message="Coordinación Académica"
                        description={
                          <div>
                            <p><strong>Teléfono:</strong> (555) 123-4567</p>
                            <p><strong>Email:</strong> coordinacion@escuela.edu</p>
                            <p><strong>Horario de Atención:</strong> Lunes a Viernes 8:00 - 18:00</p>
                          </div>
                        }
                        type="info"
                        showIcon
                      />
                    </Card>
                  </Col>
                </Row>
              </div>
            )
          }
        ]}
      />

      {/* Modal para Enviar Mensaje */}
      <Modal
        title="Enviar Mensaje a Profesor"
        open={isMensajeModalVisible}
        onCancel={() => {
          setIsMensajeModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleEnviarMensaje}
        >
          <Form.Item
            label="Seleccionar Profesor"
            name="profesor"
            rules={[{ required: true, message: 'Selecciona un profesor' }]}
          >
            <Select placeholder="Selecciona el profesor">
              <Option value="Dr. Carlos Rodríguez">Dr. Carlos Rodríguez - Programación Avanzada</Option>
              <Option value="Ing. Laura Martínez">Ing. Laura Martínez - Base de Datos</Option>
              <Option value="Dr. Ana García">Dr. Ana García - Sistemas Operativos</Option>
              <Option value="Mtro. Roberto Sánchez">Mtro. Roberto Sánchez - Redes de Computadoras</Option>
              <Option value="Dra. Patricia López">Dra. Patricia López - Taller de Investigación</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Asunto"
            name="asunto"
            rules={[{ required: true, message: 'Ingresa el asunto del mensaje' }]}
          >
            <Input placeholder="Ej: Duda sobre el proyecto final" />
          </Form.Item>

          <Form.Item
            label="Mensaje"
            name="mensaje"
            rules={[{ required: true, message: 'Escribe tu mensaje' }]}
          >
            <TextArea 
              rows={6}
              placeholder="Escribe tu mensaje detallado aquí..."
            />
          </Form.Item>

          <Form.Item
            label="Archivos Adjuntos (Opcional)"
            name="archivos"
          >
            <Upload 
              beforeUpload={() => false}
              multiple
            >
              <Button icon={<UploadOutlined />}>Seleccionar Archivos</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button 
                onClick={() => {
                  setIsMensajeModalVisible(false);
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
                icon={<SendOutlined />}
              >
                Enviar Mensaje
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PanelAlumnoView;