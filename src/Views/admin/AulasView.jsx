import React, { useState } from 'react';
import {
    Layout,
    Card,
    Row,
    Col,
    Button,
    Typography,
    Tag,
    Space,
    Modal,
    Form,
    Input,
    Select,
    Table,
    Empty,
    message,
    Tooltip
} from 'antd';
import {
    PlusOutlined,
    AppstoreOutlined, // Icono para Grid/Bento
    BarsOutlined,     // Icono para Lista
    CheckCircleOutlined,
    CloseCircleOutlined,
    LaptopOutlined,   // Icono Lab
    ReadOutlined,     // Icono Teoría
    ExperimentOutlined, // Icono Taller
    BankOutlined,     // Icono Auditorio
    EditOutlined,
    DeleteOutlined,
    SearchOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;
const { Content } = Layout;

const GestionAulas = () => {
    // --- 1. ESTADOS ---
    const [viewMode, setViewMode] = useState('grid'); // 'grid' o 'list'
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [form] = Form.useForm();

    // Datos iniciales simulados
    const [aulas, setAulas] = useState([
        { id: 1, nombre: 'Aula 101 - Edificio A', tipo: 'teoria', disponible: true },
        { id: 2, nombre: 'Laboratorio de Redes Cisco', tipo: 'laboratorio', disponible: false },
        { id: 3, nombre: 'Auditorio Principal', tipo: 'auditorio', disponible: true },
        { id: 4, nombre: 'Taller de Electrónica', tipo: 'taller', disponible: true },
        { id: 5, nombre: 'Sala de Juntas B', tipo: 'admin', disponible: true },
    ]);

    // --- 2. LÓGICA ---

    // Agregar nueva aula
    const handleAddAula = (values) => {
        const nuevaAula = {
            id: Date.now(),
            nombre: values.nombre,
            // Convertimos el valor del select a booleano real
            disponible: values.disponible === 'true',
            tipo: values.tipo,
        };

        setAulas([...aulas, nuevaAula]);
        message.success('Aula registrada exitosamente');
        setIsModalOpen(false);
        form.resetFields();
    };

    // Filtrado simple por nombre
    const aulasFiltradas = aulas.filter(aula =>
        aula.nombre.toLowerCase().includes(searchText.toLowerCase())
    );

    // Helper para iconos según tipo
    const getIconoTipo = (tipo) => {
        switch (tipo) {
            case 'laboratorio': return <LaptopOutlined style={{ fontSize: '20px', color: '#1890ff' }} />;
            case 'auditorio': return <BankOutlined style={{ fontSize: '20px', color: '#722ed1' }} />;
            case 'taller': return <ExperimentOutlined style={{ fontSize: '20px', color: '#fa8c16' }} />;
            default: return <ReadOutlined style={{ fontSize: '20px', color: '#002766' }} />;
        }
    };

    // Helper para etiqueta de tipo
    const getLabelTipo = (tipo) => {
        const map = {
            teoria: 'Aula Teórica',
            laboratorio: 'Laboratorio',
            auditorio: 'Auditorio',
            taller: 'Taller',
            admin: 'Administrativo'
        };
        return map[tipo] || tipo;
    };

    // --- 3. CONFIGURACIÓN DE TABLA (VISTA LISTA) ---
    const columns = [
        {
            title: 'Nombre del Espacio',
            dataIndex: 'nombre',
            key: 'nombre',
            render: (text, record) => (
                <Space>
                    {getIconoTipo(record.tipo)}
                    <Text strong>{text}</Text>
                </Space>
            )
        },
        {
            title: 'Tipo',
            dataIndex: 'tipo',
            key: 'tipo',
            render: (tipo) => <Tag color="blue">{getLabelTipo(tipo)}</Tag>
        },
        {
            title: 'Estado',
            dataIndex: 'disponible',
            key: 'disponible',
            render: (disponible) => (
                <Tag icon={disponible ? <CheckCircleOutlined /> : <CloseCircleOutlined />} color={disponible ? 'success' : 'error'}>
                    {disponible ? 'Disponible' : 'Ocupado'}
                </Tag>
            )
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: () => (
                <Space>
                    <Button icon={<EditOutlined />} size="small" />
                    <Button icon={<DeleteOutlined />} size="small" danger />
                </Space>
            )
        }
    ];

    return (
        <Layout style={{ minHeight: '100vh', background: '#f5f7fa', padding: '24px' }}>
            <Content>

                {/* --- HEADER DE LA VISTA --- */}
                <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                    <div>
                        <Title level={2} style={{ margin: 0, color: '#002766' }}>Gestión de Aulas</Title>
                        <Text type="secondary">Administración de espacios físicos e inventario</Text>
                    </div>

                    <Space wrap>
                        {/* Buscador */}
                        <Input
                            prefix={<SearchOutlined style={{ color: '#ccc' }} />}
                            placeholder="Buscar aula..."
                            onChange={e => setSearchText(e.target.value)}
                            style={{ width: 200 }}
                        />

                        {/* Toggle de Vistas (Grid vs Lista) */}
                        <div style={{ background: '#fff', border: '1px solid #d9d9d9', borderRadius: '6px', padding: '2px' }}>
                            <Tooltip title="Vista Tarjetas">
                                <Button
                                    type={viewMode === 'grid' ? 'primary' : 'text'}
                                    icon={<AppstoreOutlined />}
                                    onClick={() => setViewMode('grid')}
                                    style={{ background: viewMode === 'grid' ? '#002766' : 'transparent' }}
                                />
                            </Tooltip>
                            <Tooltip title="Vista Lista">
                                <Button
                                    type={viewMode === 'list' ? 'primary' : 'text'}
                                    icon={<BarsOutlined />}
                                    onClick={() => setViewMode('list')}
                                    style={{ background: viewMode === 'list' ? '#002766' : 'transparent' }}
                                />
                            </Tooltip>
                        </div>

                        {/* Botón Agregar */}
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setIsModalOpen(true)}
                            style={{ background: '#faad14', borderColor: '#faad14', color: '#000', fontWeight: 'bold' }}
                        >
                            Nueva Aula
                        </Button>
                    </Space>
                </div>

                {/* --- CONTENIDO PRINCIPAL --- */}
                {aulasFiltradas.length === 0 ? (
                    <Empty description="No se encontraron aulas" />
                ) : viewMode === 'grid' ? (
                    // VISTA GRID (CARDS / BENTO)
                    <Row gutter={[16, 16]}>
                        {aulasFiltradas.map((aula) => (
                            <Col xs={24} sm={12} md={8} lg={6} key={aula.id}>
                                <Card
                                    hoverable
                                    style={{ borderRadius: '12px', borderTop: `4px solid ${aula.disponible ? '#52c41a' : '#ff4d4f'}` }}
                                    actions={[
                                        <Tooltip title="Editar"><EditOutlined key="edit" /></Tooltip>,
                                        <Tooltip title="Eliminar"><DeleteOutlined key="delete" style={{ color: '#ff4d4f' }} /></Tooltip>
                                    ]}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                                        <div style={{ padding: '8px', background: '#f0f2f5', borderRadius: '50%' }}>
                                            {getIconoTipo(aula.tipo)}
                                        </div>
                                        <Tag color={aula.disponible ? 'success' : 'error'}>
                                            {aula.disponible ? 'DISPONIBLE' : 'OCUPADO'}
                                        </Tag>
                                    </div>
                                    <Title level={5} style={{ margin: 0 }}>{aula.nombre}</Title>
                                    <Text type="secondary">{getLabelTipo(aula.tipo)}</Text>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    // VISTA LISTA (TABLE)
                    <Card style={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                        <Table
                            dataSource={aulasFiltradas}
                            columns={columns}
                            rowKey="id"
                            pagination={{ pageSize: 5 }}
                        />
                    </Card>
                )}

                {/* --- MODAL FORMULARIO --- */}
                <Modal
                    title="Agregar Nuevo Espacio"
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    footer={null}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleAddAula}
                        initialValues={{ disponible: 'true', tipo: 'teoria' }}
                    >
                        {/* 1. INPUT TEXTO NORMAL: Nombre */}
                        <Form.Item
                            label="Nombre del Salón"
                            name="nombre"
                            rules={[{ required: true, message: 'El nombre es obligatorio' }]}
                        >
                            <Input placeholder="Ej. Aula 101" />
                        </Form.Item>

                        {/* 2. SELECT: Disponible (True/False) */}
                        <Form.Item
                            label="Disponibilidad"
                            name="disponible"
                            rules={[{ required: true, message: 'Seleccione disponibilidad' }]}
                        >
                            <Select>
                                <Option value="true">
                                    <Space><CheckCircleOutlined style={{ color: '#52c41a' }} /> Disponible</Space>
                                </Option>
                                <Option value="false">
                                    <Space><CloseCircleOutlined style={{ color: '#ff4d4f' }} /> No Disponible / Mantenimiento</Space>
                                </Option>
                            </Select>
                        </Form.Item>

                        {/* 3. SELECT: Tipo de Aula */}
                        <Form.Item
                            label="Tipo de Espacio"
                            name="tipo"
                            rules={[{ required: true, message: 'Seleccione el tipo' }]}
                        >
                            <Select placeholder="Seleccione una opción">
                                <Option value="teoria">Aula Teórica</Option>
                                <Option value="laboratorio">Laboratorio de Cómputo</Option>
                                <Option value="taller">Taller</Option>
                                <Option value="auditorio">Auditorio</Option>
                                <Option value="admin">Administrativo</Option>
                            </Select>
                        </Form.Item>

                        <div style={{ textAlign: 'right', marginTop: '24px' }}>
                            <Space>
                                <Button onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                                <Button type="primary" htmlType="submit" style={{ background: '#002766', borderColor: '#002766' }}>
                                    Guardar
                                </Button>
                            </Space>
                        </div>
                    </Form>
                </Modal>

            </Content>
        </Layout>
    );
};

export default GestionAulas;