// ActividadesMaestroView.js
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
  InputNumber,
  Upload,
  message,
  Timeline,
  Badge,
  Descriptions,
  Switch
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined,
  FileTextOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  UploadOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const ActividadesMaestroView = () => {
  const [actividades, setActividades] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [actividadEditando, setActividadEditando] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  // Datos falsos de grupos
  const gruposEjemplo = [
    {
      id: 1,
      nombre: '3°A - Sistemas',
      carrera: 'Ingeniería en Sistemas',
      materia: 'Programación Avanzada',
      alumnos: 28
    },
    {
      id: 2,
      nombre: '2°B - Administración',
      carrera: 'Administración de Empresas',
      materia: 'Matemáticas Financieras',
      alumnos: 22
    },
    {
      id: 3,
      nombre: '4°C - EVyND',
      carrera: 'Entornos Virtuales Y Negocios Digitales',
      materia: 'Desarrollo Web Avanzado',
      alumnos: 32
    }
  ];

  // Datos falsos de actividades
  const actividadesEjemplo = [
    {
      id: 1,
      titulo: 'Proyecto Final - Sistema de Gestión',
      descripcion: 'Desarrollar un sistema de gestión completo utilizando los patrones de diseño vistos en clase.',
      grupoId: 1,
      grupo: '3°A - Sistemas',
      materia: 'Programación Avanzada',
      valor: 30,
      fechaCreacion: '2024-10-15',
      fechaEntrega: '2024-11-20',
      estado: 'activa',
      tipo: 'proyecto',
      entregasRecibidas: 15,
      totalAlumnos: 28,
      archivos: ['requisitos.pdf', 'plantilla.zip']
    },
    {
      id: 2,
      titulo: 'Examen Parcial - Unidades 1-3',
      descripcion: 'Examen que cubre los temas de las primeras tres unidades del curso.',
      grupoId: 1,
      grupo: '3°A - Sistemas',
      materia: 'Programación Avanzada',
      valor: 25,
      fechaCreacion: '2024-10-10',
      fechaEntrega: '2024-10-25',
      estado: 'activa',
      tipo: 'examen',
      entregasRecibidas: 20,
      totalAlumnos: 28,
      archivos: ['guia_estudio.pdf']
    },
    {
      id: 3,
      titulo: 'Tarea - Análisis de Algoritmos',
      descripcion: 'Resolver los problemas de análisis de complejidad algorítmica.',
      grupoId: 2,
      grupo: '2°B - Administración',
      materia: 'Matemáticas Financieras',
      valor: 15,
      fechaCreacion: '2024-10-12',
      fechaEntrega: '2024-10-19',
      estado: 'activa',
      tipo: 'tarea',
      entregasRecibidas: 18,
      totalAlumnos: 22,
      archivos: ['problemas.pdf', 'formularios.xlsx']
    },
    {
      id: 4,
      titulo: 'Práctica de Laboratorio - Bases de Datos',
      descripcion: 'Creación y manipulación de bases de datos relacionales.',
      grupoId: 3,
      grupo: '4°C - EVyND',
      materia: 'Desarrollo Web Avanzado',
      valor: 20,
      fechaCreacion: '2024-10-08',
      fechaEntrega: '2024-10-22',
      estado: 'activa',
      tipo: 'laboratorio',
      entregasRecibidas: 25,
      totalAlumnos: 32,
      archivos: ['script_bd.sql', 'manual.pdf']
    },
    {
      id: 5,
      titulo: 'Investigación - Frameworks Modernos',
      descripcion: 'Investigación sobre frameworks de desarrollo web modernos.',
      grupoId: 3,
      grupo: '4°C - EVyND',
      materia: 'Desarrollo Web Avanzado',
      valor: 10,
      fechaCreacion: '2024-09-28',
      fechaEntrega: '2024-10-05',
      estado: 'vencida',
      tipo: 'investigacion',
      entregasRecibidas: 30,
      totalAlumnos: 32,
      archivos: ['instrucciones.pdf']
    }
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setGrupos(gruposEjemplo);
      setActividades(actividadesEjemplo);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCrearActividad = () => {
    setIsModalVisible(true);
  };

  const handleEditarActividad = (actividad) => {
    setActividadEditando(actividad);
    editForm.setFieldsValue({
      ...actividad,
      fechaEntrega: actividad.fechaEntrega ? moment(actividad.fechaEntrega) : null
    });
    setIsEditModalVisible(true);
  };

  const handleEliminarActividad = (actividad) => {
    Modal.confirm({
      title: '¿Eliminar actividad?',
      content: `¿Estás seguro de que quieres eliminar "${actividad.titulo}"?`,
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        setActividades(actividades.filter(a => a.id !== actividad.id));
        message.success('Actividad eliminada correctamente');
      }
    });
  };

  const handleSubmitActividad = async (values) => {
    try {
      setLoading(true);
      
      // Simular procesamiento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const nuevaActividad = {
        id: actividades.length + 1,
        ...values,
        fechaCreacion: new Date().toISOString().split('T')[0],
        estado: 'activa',
        entregasRecibidas: 0,
        totalAlumnos: grupos.find(g => g.id === values.grupoId)?.alumnos || 0,
        grupo: grupos.find(g => g.id === values.grupoId)?.nombre,
        materia: grupos.find(g => g.id === values.grupoId)?.materia,
        archivos: []
      };

      setActividades([...actividades, nuevaActividad]);
      setIsModalVisible(false);
      form.resetFields();
      setLoading(false);
      
      message.success('Actividad creada exitosamente');
    } catch (error) {
      setLoading(false);
      message.error('Error al crear la actividad');
    }
  };

  const handleSubmitEdicion = async (values) => {
    try {
      setLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const actividadesActualizadas = actividades.map(act =>
        act.id === actividadEditando.id 
          ? { ...act, ...values }
          : act
      );

      setActividades(actividadesActualizadas);
      setIsEditModalVisible(false);
      setActividadEditando(null);
      editForm.resetFields();
      setLoading(false);
      
      message.success('Actividad actualizada exitosamente');
    } catch (error) {
      setLoading(false);
      message.error('Error al actualizar la actividad');
    }
  };

  const getEstadoColor = (estado) => {
    return estado === 'activa' ? 'green' : 'red';
  };

  const getTipoColor = (tipo) => {
    const colores = {
      proyecto: 'purple',
      examen: 'red',
      tarea: 'blue',
      laboratorio: 'green',
      investigacion: 'orange'
    };
    return colores[tipo] || 'default';
  };

  const getPorcentajeEntregas = (actividad) => {
    return Math.round((actividad.entregasRecibidas / actividad.totalAlumnos) * 100);
  };

  const columns = [
    {
      title: 'Actividad',
      dataIndex: 'titulo',
      key: 'titulo',
      render: (text, record) => (
        <Space direction="vertical" size="small">
          <div style={{ fontWeight: 'bold' }}>{text}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {record.grupo} • {record.materia}
          </div>
          <Space>
            <Tag color={getTipoColor(record.tipo)}>{record.tipo}</Tag>
            <Tag color={getEstadoColor(record.estado)}>{record.estado}</Tag>
          </Space>
        </Space>
      )
    },
    {
      title: 'Fechas',
      key: 'fechas',
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <div>
            <CalendarOutlined /> Creación: {record.fechaCreacion}
          </div>
          <div>
            <ClockCircleOutlined /> Entrega: {record.fechaEntrega}
          </div>
        </Space>
      )
    },
    {
      title: 'Valor',
      dataIndex: 'valor',
      key: 'valor',
      render: (valor) => (
        <Tag color="gold" style={{ fontSize: '14px', fontWeight: 'bold' }}>
          {valor} pts
        </Tag>
      )
    },
    {
      title: 'Entregas',
      key: 'entregas',
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <div>
            {record.entregasRecibidas}/{record.totalAlumnos} alumnos
          </div>
          <div style={{ 
            width: '100%', 
            backgroundColor: '#f0f0f0', 
            borderRadius: 4,
            height: 6
          }}>
            <div 
              style={{ 
                width: `${getPorcentajeEntregas(record)}%`, 
                backgroundColor: getPorcentajeEntregas(record) > 50 ? '#52c41a' : '#faad14',
                height: 6,
                borderRadius: 4
              }} 
            />
          </div>
          <small>{getPorcentajeEntregas(record)}%</small>
        </Space>
      )
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <Space>
          <Button 
            type="link" 
            icon={<EyeOutlined />}
            onClick={() => handleVerDetalles(record)}
          >
            Ver
          </Button>
          <Button 
            type="link" 
            icon={<EditOutlined />}
            onClick={() => handleEditarActividad(record)}
          >
            Editar
          </Button>
          <Button 
            type="link" 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => handleEliminarActividad(record)}
          >
            Eliminar
          </Button>
        </Space>
      )
    }
  ];

  const handleVerDetalles = (actividad) => {
    Modal.info({
      title: actividad.titulo,
      width: 600,
      content: (
        <div>
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="Descripción">
              {actividad.descripcion}
            </Descriptions.Item>
            <Descriptions.Item label="Grupo">
              {actividad.grupo}
            </Descriptions.Item>
            <Descriptions.Item label="Materia">
              {actividad.materia}
            </Descriptions.Item>
            <Descriptions.Item label="Valor">
              {actividad.valor} puntos
            </Descriptions.Item>
            <Descriptions.Item label="Fecha de Creación">
              {actividad.fechaCreacion}
            </Descriptions.Item>
            <Descriptions.Item label="Fecha de Entrega">
              {actividad.fechaEntrega}
            </Descriptions.Item>
            <Descriptions.Item label="Estado">
              <Tag color={getEstadoColor(actividad.estado)}>
                {actividad.estado}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Tipo">
              <Tag color={getTipoColor(actividad.tipo)}>
                {actividad.tipo}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Entregas">
              {actividad.entregasRecibidas} de {actividad.totalAlumnos} alumnos
            </Descriptions.Item>
          </Descriptions>
          
          {actividad.archivos && actividad.archivos.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <h4>Archivos adjuntos:</h4>
              <ul>
                {actividad.archivos.map((archivo, index) => (
                  <li key={index}>
                    <FileTextOutlined /> {archivo}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={12}>
            <h1 style={{ margin: 0, color: '#1890ff' }}>
              <FileTextOutlined /> Gestión de Actividades
            </h1>
            <p style={{ margin: 0, color: '#666' }}>
              Crea y gestiona actividades para tus grupos
            </p>
          </Col>
          <Col xs={24} md={12} style={{ textAlign: 'right' }}>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              size="large"
              onClick={handleCrearActividad}
            >
              Nueva Actividad
            </Button>
          </Col>
        </Row>
      </div>

      {/* Estadísticas */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={6}>
          <Card>
            <Statistic
              title="Total Actividades"
              value={actividades.length}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card>
            <Statistic
              title="Activas"
              value={actividades.filter(a => a.estado === 'activa').length}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card>
            <Statistic
              title="Promedio Entregas"
              value={Math.round(actividades.reduce((acc, a) => acc + getPorcentajeEntregas(a), 0) / actividades.length)}
              suffix="%"
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card>
            <Statistic
              title="Total Grupos"
              value={grupos.length}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* Tabla de Actividades */}
      <Card 
        title="Lista de Actividades" 
        loading={loading}
        extra={
          <Space>
            <Select defaultValue="todos" style={{ width: 150 }}>
              <Option value="todos">Todos los estados</Option>
              <Option value="activa">Activas</Option>
              <Option value="vencida">Vencidas</Option>
            </Select>
            <Select defaultValue="todos" style={{ width: 150 }}>
              <Option value="todos">Todos los tipos</Option>
              <Option value="proyecto">Proyectos</Option>
              <Option value="examen">Exámenes</Option>
              <Option value="tarea">Tareas</Option>
            </Select>
          </Space>
        }
      >
        <Table 
          columns={columns} 
          dataSource={actividades} 
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* Modal para Crear Actividad */}
      <Modal
        title={
          <Space>
            <PlusOutlined />
            Crear Nueva Actividad
          </Space>
        }
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmitActividad}
        >
          <Form.Item
            label="Título de la Actividad"
            name="titulo"
            rules={[{ required: true, message: 'Ingresa el título de la actividad' }]}
          >
            <Input placeholder="Ej: Proyecto Final - Sistema de Gestión" />
          </Form.Item>

          <Form.Item
            label="Descripción"
            name="descripcion"
            rules={[{ required: true, message: 'Ingresa la descripción de la actividad' }]}
          >
            <TextArea 
              rows={4} 
              placeholder="Describe detalladamente la actividad, los objetivos y los requisitos..." 
            />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Grupo"
                name="grupoId"
                rules={[{ required: true, message: 'Selecciona el grupo' }]}
              >
                <Select placeholder="Selecciona un grupo">
                  {grupos.map(grupo => (
                    <Option key={grupo.id} value={grupo.id}>
                      {grupo.nombre} ({grupo.materia})
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Tipo de Actividad"
                name="tipo"
                rules={[{ required: true, message: 'Selecciona el tipo' }]}
              >
                <Select placeholder="Selecciona el tipo">
                  <Option value="tarea">Tarea</Option>
                  <Option value="proyecto">Proyecto</Option>
                  <Option value="examen">Examen</Option>
                  <Option value="laboratorio">Laboratorio</Option>
                  <Option value="investigacion">Investigación</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Valor en Calificación"
                name="valor"
                rules={[{ required: true, message: 'Ingresa el valor' }]}
              >
                <InputNumber 
                  min={1}
                  max={100}
                  style={{ width: '100%' }}
                  placeholder="Puntos"
                  addonAfter="pts"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Fecha de Entrega"
                name="fechaEntrega"
                rules={[{ required: true, message: 'Selecciona la fecha de entrega' }]}
              >
                <DatePicker 
                  style={{ width: '100%' }}
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Archivos Adjuntos"
            name="archivos"
          >
            <Upload 
              beforeUpload={() => false} // Prevenir subida automática
              multiple
            >
              <Button icon={<UploadOutlined />}>Seleccionar Archivos</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button 
                onClick={() => {
                  setIsModalVisible(false);
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
              >
                Crear Actividad
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal para Editar Actividad */}
      <Modal
        title={
          <Space>
            <EditOutlined />
            Editar Actividad
          </Space>
        }
        open={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false);
          editForm.resetFields();
          setActividadEditando(null);
        }}
        footer={null}
        width={700}
      >
        {actividadEditando && (
          <Form
            form={editForm}
            layout="vertical"
            onFinish={handleSubmitEdicion}
          >
            <Form.Item
              label="Título de la Actividad"
              name="titulo"
              rules={[{ required: true, message: 'Ingresa el título de la actividad' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Descripción"
              name="descripcion"
              rules={[{ required: true, message: 'Ingresa la descripción de la actividad' }]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Valor en Calificación"
                  name="valor"
                  rules={[{ required: true, message: 'Ingresa el valor' }]}
                >
                  <InputNumber 
                    min={1}
                    max={100}
                    style={{ width: '100%' }}
                    addonAfter="pts"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Fecha de Entrega"
                  name="fechaEntrega"
                  rules={[{ required: true, message: 'Selecciona la fecha de entrega' }]}
                >
                  <DatePicker 
                    style={{ width: '100%' }}
                    format="YYYY-MM-DD"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Estado"
              name="estado"
            >
              <Select>
                <Option value="activa">Activa</Option>
                <Option value="vencida">Vencida</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                <Button 
                  onClick={() => {
                    setIsEditModalVisible(false);
                    editForm.resetFields();
                    setActividadEditando(null);
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
                >
                  Actualizar Actividad
                </Button>
              </Space>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default ActividadesMaestroView;