import { useState } from 'react';
import {
  Layout,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Space,
  Tag,
  Form,
  Input,
  Select,
  Modal,
  message,
  Tooltip,
  Table,
  Empty,
  InputNumber
} from 'antd';
import {
  PlusOutlined,
  AppstoreOutlined,
  BarsOutlined,
  SearchOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  LaptopOutlined,
  ReadOutlined,
  ExperimentOutlined,
  TeamOutlined,
  BankOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const ClassroomManager = () => {
  // --- ESTADOS ---
  const [viewMode, setViewMode] = useState('grid'); // 'grid' o 'list'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');

  // --- COLORES CORPORATIVOS ---
  const colors = {
    primary: '#002766',
    accent: '#faad14',
    success: '#52c41a',
    error: '#ff4d4f',
    bg: '#f0f2f5'
  };

  // --- DATOS INICIALES (Simulados) ---
  const [classrooms, setClassrooms] = useState([
    { id: 1, name: 'Aula Magna A', type: 'auditorio', available: true, capacity: 120 },
    { id: 2, name: 'Laboratorio de Redes', type: 'laboratorio', available: false, capacity: 25 },
    { id: 3, name: 'Salón 101 - Edificio B', type: 'teoria', available: true, capacity: 30 },
    { id: 4, name: 'Laboratorio de Química', type: 'taller', available: true, capacity: 20 },
    { id: 5, name: 'Sala de Juntas Rectoría', type: 'admin', available: true, capacity: 12 },
  ]);

  // --- LÓGICA DEL FORMULARIO ---
  const handleAddClassroom = (values) => {
    const newClassroom = {
      id: Date.now(),
      name: values.name,
      available: values.available === 'true', // Convertir string a boolean
      type: values.type,
      capacity: values.capacity || 0 // Campo opcional extra para realismo
    };

    setClassrooms([...classrooms, newClassroom]);
    message.success('Aula agregada correctamente');
    setIsModalOpen(false);
    form.resetFields();
  };

  // --- HELPER PARA ICONOS SEGÚN TIPO ---
  const getTypeIcon = (type) => {
    switch (type) {
      case 'laboratorio': return <LaptopOutlined style={{ fontSize: '24px', color: '#1890ff' }} />;
      case 'auditorio': return <BankOutlined style={{ fontSize: '24px', color: '#722ed1' }} />;
      case 'taller': return <ExperimentOutlined style={{ fontSize: '24px', color: '#fa8c16' }} />;
      case 'admin': return <TeamOutlined style={{ fontSize: '24px', color: '#52c41a' }} />;
      default: return <ReadOutlined style={{ fontSize: '24px', color: colors.primary }} />; // Teoría
    }
  };

  const getTypeLabel = (type) => {
    const types = {
      laboratorio: 'Laboratorio de Cómputo',
      auditorio: 'Auditorio / Aula Magna',
      taller: 'Taller / Experimental',
      admin: 'Administrativo',
      teoria: 'Aula Teórica'
    };
    return types[type] || 'General';
  };

  // --- FILTRADO DE BÚSQUEDA ---
  const filteredClassrooms = classrooms.filter(c =>
    c.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // --- CONFIGURACIÓN DE COLUMNAS (VISTA TABLA) ---
  const columns = [
    {
      title: 'Nombre del Espacio',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          {getTypeIcon(record.type)}
          <Text strong>{text}</Text>
        </Space>
      )
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
      render: (type) => <Tag color="blue">{getTypeLabel(type)}</Tag>
    },
    {
      title: 'Capacidad',
      dataIndex: 'capacity',
      key: 'capacity',
      render: (cap) => `${cap} personas`
    },
    {
      title: 'Disponibilidad',
      dataIndex: 'available',
      key: 'available',
      render: (available) => (
        <Tag icon={available ? <CheckCircleOutlined /> : <CloseCircleOutlined />} color={available ? 'success' : 'error'}>
          {available ? 'DISPONIBLE' : 'OCUPADO / MANTENIMIENTO'}
        </Tag>
      )
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: () => (
        <Space>
          <Button type="text" icon={<EditOutlined />} />
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Space>
      )
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5', padding: '40px' }}>

      {/* Header de la Sección */}
      <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <Title level={2} style={{ color: colors.primary, margin: 0 }}>Gestión de Espacios Educativos</Title>
          <Text type="secondary">Administración de aulas, laboratorios y áreas comunes.</Text>
        </div>
        <Space>
          <Input
            placeholder="Buscar aula..."
            prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
            onChange={e => setSearchText(e.target.value)}
            style={{ width: 250 }}
          />

          {/* Toggle de Vistas */}
          <div style={{ background: '#fff', padding: '4px', borderRadius: '6px', border: '1px solid #d9d9d9' }}>
            <Tooltip title="Vista de Tarjetas">
              <Button
                type={viewMode === 'grid' ? 'primary' : 'text'}
                icon={<AppstoreOutlined />}
                onClick={() => setViewMode('grid')}
                style={{ background: viewMode === 'grid' ? colors.primary : 'transparent' }}
              />
            </Tooltip>
            <Tooltip title="Vista de Lista">
              <Button
                type={viewMode === 'list' ? 'primary' : 'text'}
                icon={<BarsOutlined />}
                onClick={() => setViewMode('list')}
                style={{ background: viewMode === 'list' ? colors.primary : 'transparent' }}
              />
            </Tooltip>
          </div>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => setIsModalOpen(true)}
            style={{ background: colors.accent, borderColor: colors.accent, color: '#000', fontWeight: 'bold' }}
          >
            Nueva Aula
          </Button>
        </Space>
      </div>

      {/* --- CONTENIDO PRINCIPAL --- */}

      {filteredClassrooms.length === 0 ? (
        <Empty description="No se encontraron aulas" style={{ marginTop: '100px' }} />
      ) : viewMode === 'grid' ? (
        /* VISTA GRID (BENTO STYLE) */
        <Row gutter={[24, 24]}>
          {filteredClassrooms.map((room) => (
            <Col xs={24} sm={12} md={8} lg={6} key={room.id}>
              <Card
                hoverable
                style={{
                  borderRadius: '12px',
                  borderTop: `4px solid ${room.available ? colors.success : colors.error}`,
                  height: '100%'
                }}
                actions={[
                  <Tooltip title="Editar"><EditOutlined key="edit" /></Tooltip>,
                  <Tooltip title="Ver Horario"><CalendarOutlined key="calendar" /></Tooltip>,
                  <Tooltip title="Eliminar"><DeleteOutlined key="delete" style={{ color: colors.error }} /></Tooltip>
                ]}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                  <div style={{
                    width: '48px', height: '48px',
                    background: '#f0f5ff', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {getTypeIcon(room.type)}
                  </div>
                  <Tag color={room.available ? 'success' : 'error'} style={{ margin: 0 }}>
                    {room.available ? 'DISPONIBLE' : 'OCUPADO'}
                  </Tag>
                </div>

                <Title level={4} style={{ margin: '0 0 5px 0' }}>{room.name}</Title>
                <Text type="secondary" style={{ display: 'block', marginBottom: '15px' }}>{getTypeLabel(room.type)}</Text>

                <div style={{ background: '#fafafa', padding: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: '12px', color: '#888' }}>CAPACIDAD</Text>
                  <Text strong>{room.capacity} Personas</Text>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        /* VISTA LISTA (TABLA) */
        <Card style={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <Table
            columns={columns}
            dataSource={filteredClassrooms}
            rowKey="id"
            pagination={{ pageSize: 6 }}
          />
        </Card>
      )}

      {/* --- MODAL FORMULARIO --- */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: colors.primary, width: '4px', height: '20px', borderRadius: '2px' }}></div>
            <span style={{ fontSize: '20px' }}>Registrar Nuevo Espacio</span>
          </div>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
      >
        <div style={{ background: '#e6f7ff', padding: '10px 15px', borderRadius: '6px', marginBottom: '20px', border: '1px solid #91d5ff' }}>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            <span style={{ color: '#1890ff', fontWeight: 'bold' }}>Nota:</span> Asegúrese de verificar el tipo de aula para la correcta asignación de inventario.
          </Text>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddClassroom}
          initialValues={{ available: 'true', type: 'teoria' }}
        >
          {/* Campo NOMBRE (Input Texto Normal) */}
          <Form.Item
            label="Nombre del Salón / Aula"
            name="name"
            rules={[{ required: true, message: 'Por favor ingrese el nombre del salón' }]}
          >
            <Input
              placeholder="Ej. Edificio A - Aula 102"
              size="large"
              prefix={<BankOutlined style={{ color: '#bfbfbf' }} />}
            />
          </Form.Item>

          <Row gutter={16}>
            {/* Campo DISPONIBLE (Select Booleano) */}
            <Col span={12}>
              <Form.Item
                label="Estado Actual"
                name="available"
                rules={[{ required: true, message: 'Seleccione la disponibilidad' }]}
              >
                <Select size="large">
                  <Option value="true">
                    <Space><CheckCircleOutlined style={{ color: colors.success }} /> Disponible</Space>
                  </Option>
                  <Option value="false">
                    <Space><CloseCircleOutlined style={{ color: colors.error }} /> No Disponible</Space>
                  </Option>
                </Select>
              </Form.Item>
            </Col>

            {/* Campo TIPO (Select) */}
            <Col span={12}>
              <Form.Item
                label="Tipo de Espacio"
                name="type"
                rules={[{ required: true, message: 'Seleccione el tipo' }]}
              >
                <Select size="large" placeholder="Seleccione tipo">
                  <Option value="teoria">Aula Teórica</Option>
                  <Option value="laboratorio">Laboratorio de Cómputo</Option>
                  <Option value="taller">Taller / Laboratorio</Option>
                  <Option value="auditorio">Auditorio</Option>
                  <Option value="admin">Oficina Administrativa</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Campo Extra Opcional para realismo */}
          <Form.Item
            label="Capacidad (Personas)"
            name="capacity"
            rules={[{ required: true, message: 'Ingrese capacidad' }]}
          >
            <InputNumber style={{ width: '100%' }} size="large" min={1} max={500} placeholder="Ej. 30" />
          </Form.Item>

          <Divider />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <Button size="large" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ background: colors.primary }}
            >
              Guardar Aula
            </Button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default ClassroomManager;