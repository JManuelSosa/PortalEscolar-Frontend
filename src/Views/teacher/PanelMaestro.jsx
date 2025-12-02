import React, { useState } from 'react';
import {
  Layout,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Form,
  Input,
  Select,
  Modal,
  message,
  Badge,
  Avatar,
  Dropdown,
  Space
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  BookOutlined,
  ReadOutlined,
  ApartmentOutlined
} from '@ant-design/icons';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const GestionMateriasCards = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();

  // Datos simulados con colores asignados por carrera
  const [materias, setMaterias] = useState([
    { id: 1, nombre: 'Matemáticas Discretas', grado: '1° Cuatrimestre', carrera: 'Ing. Software', color: '#1890ff' }, // Azul
    { id: 2, nombre: 'Derecho Romano I', grado: '1° Cuatrimestre', carrera: 'Lic. Derecho', color: '#ff4d4f' }, // Rojo
    { id: 3, nombre: 'Programación Web', grado: '4° Cuatrimestre', carrera: 'Ing. Software', color: '#1890ff' },
    { id: 4, nombre: 'Contabilidad de Costos', grado: '3° Cuatrimestre', carrera: 'Lic. Administración', color: '#52c41a' }, // Verde
    { id: 5, nombre: 'Base de Datos Avanzada', grado: '5° Cuatrimestre', carrera: 'Ing. Software', color: '#1890ff' },
    { id: 6, nombre: 'Mercadotecnia Digital', grado: '2° Cuatrimestre', carrera: 'Lic. Administración', color: '#52c41a' },
  ]);

  // Manejo del Formulario
  const handleAddMateria = (values) => {
    // Asignar color según carrera (Simulación)
    let colorCarrera = '#8c8c8c';
    if (values.carrera.includes('Software')) colorCarrera = '#1890ff';
    if (values.carrera.includes('Derecho')) colorCarrera = '#ff4d4f';
    if (values.carrera.includes('Administración')) colorCarrera = '#52c41a';

    const nuevaMateria = {
      id: Date.now(),
      nombre: values.nombre,
      grado: values.grado,
      carrera: values.carrera,
      color: colorCarrera
    };

    setMaterias([...materias, nuevaMateria]);
    message.success('Materia creada exitosamente');
    setIsModalOpen(false);
    form.resetFields();
  };

  // Filtrado
  const materiasFiltradas = materias.filter(m =>
    m.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
    m.carrera.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5', padding: '30px' }}>
      <Content>

        {/* --- HEADER --- */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <Title level={2} style={{ color: '#002766', marginBottom: '10px' }}>Catálogo de Asignaturas</Title>
          <Text type="secondary" style={{ fontSize: '16px' }}>Gestión del plan de estudios escolar</Text>

          <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
            <Input
              size="large"
              placeholder="Buscar materia o carrera..."
              prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
              onChange={e => setSearchText(e.target.value)}
              style={{ maxWidth: '500px', borderRadius: '50px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}
            />
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={() => setIsModalOpen(true)}
              style={{ borderRadius: '50px', background: '#002766', borderColor: '#002766' }}
            >
              Nueva Materia
            </Button>
          </div>
        </div>

        {/* --- GRID DE TARJETAS --- */}
        <Row gutter={[24, 24]}>
          {materiasFiltradas.map((materia) => (
            <Col xs={24} sm={12} md={8} lg={6} key={materia.id}>
              {/* Badge.Ribbon crea el listón con el grado */}
              <Badge.Ribbon text={materia.grado} color={materia.color}>
                <Card
                  hoverable
                  style={{
                    borderRadius: '16px',
                    // Borde izquierdo de color para identificar carrera visualmente
                    borderLeft: `6px solid ${materia.color}`,
                    height: '100%'
                  }}
                  actions={[
                    <EditOutlined key="edit" style={{ color: '#666' }} />,
                    <DeleteOutlined key="delete" style={{ color: '#ff4d4f' }} />,
                    <Dropdown
                      menu={{ items: [{ key: '1', label: 'Ver detalles' }, { key: '2', label: 'Asignar Profesor' }] }}
                      placement="bottomRight"
                    >
                      <MoreOutlined key="more" style={{ fontSize: '18px' }} />
                    </Dropdown>
                  ]}
                >
                  <div style={{ display: 'flex', alignItems: 'start', marginBottom: '15px', marginTop: '10px' }}>
                    <Avatar
                      shape="square"
                      size={48}
                      icon={<BookOutlined />}
                      style={{ backgroundColor: '#f0f5ff', color: materia.color, borderRadius: '10px', marginRight: '15px' }}
                    />
                    <div>
                      <Text type="secondary" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {materia.carrera}
                      </Text>
                      <Title level={5} style={{ margin: '4px 0 0 0', lineHeight: '1.2' }}>
                        {materia.nombre}
                      </Title>
                    </div>
                  </div>

                  {/* Pequeña info extra visual */}
                  <div style={{ background: '#fafafa', padding: '8px', borderRadius: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <ApartmentOutlined style={{ color: '#bfbfbf' }} />
                    <Text style={{ fontSize: '12px', color: '#888' }}>ID: MAT-{materia.id.toString().slice(-4)}</Text>
                  </div>

                </Card>
              </Badge.Ribbon>
            </Col>
          ))}
        </Row>

        {/* --- MODAL FORMULARIO --- */}
        <Modal
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '40px', height: '40px', background: '#e6f7ff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ReadOutlined style={{ fontSize: '20px', color: '#1890ff' }} />
              </div>
              <span style={{ fontSize: '18px' }}>Nueva Asignatura</span>
            </div>
          }
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          centered
          width={500}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleAddMateria}
            style={{ marginTop: '25px' }}
          >
            {/* Input Nombre */}
            <Form.Item
              label="Nombre de la Materia"
              name="nombre"
              rules={[{ required: true, message: 'Requerido' }]}
            >
              <Input placeholder="Ej. Introducción al Derecho" size="large" />
            </Form.Item>

            {/* Select Grado */}
            <Form.Item
              label="Grado Académico"
              name="grado"
              rules={[{ required: true, message: 'Seleccione el grado' }]}
            >
              <Select placeholder="Seleccionar cuatrimestre" size="large">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                  <Option key={num} value={`${num}° Cuatrimestre`}>{num}° Cuatrimestre</Option>
                ))}
              </Select>
            </Form.Item>

            {/* Select Carrera */}
            <Form.Item
              label="Programa Educativo (Carrera)"
              name="carrera"
              rules={[{ required: true, message: 'Seleccione la carrera' }]}
            >
              <Select placeholder="Seleccionar carrera" size="large">
                <Option value="Ing. Software">Ingeniería de Software</Option>
                <Option value="Lic. Derecho">Licenciatura en Derecho</Option>
                <Option value="Lic. Administración">Licenciatura en Administración</Option>
                <Option value="Ing. Industrial">Ingeniería Industrial</Option>
              </Select>
            </Form.Item>

            <Form.Item style={{ marginBottom: 0, marginTop: 30 }}>
              <Button type="primary" htmlType="submit" block size="large" style={{ background: '#002766', fontWeight: 'bold' }}>
                Registrar Materia
              </Button>
            </Form.Item>
          </Form>
        </Modal>

      </Content>
    </Layout>
  );
};

export default GestionMateriasCards;