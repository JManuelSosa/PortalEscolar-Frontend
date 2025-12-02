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
    Select,
    Empty,
    message,
    Tooltip,
    Popconfirm
} from 'antd';
import {
    PlusOutlined,
    AppstoreOutlined,
    BarsOutlined,
    SearchOutlined,
    EditOutlined,
    DeleteOutlined,
    TeamOutlined,
    CalendarOutlined,
    ClockCircleOutlined // Nuevo icono para el turno
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;
const { Content } = Layout;

const GestionGrupos = () => {
    // --- ESTADOS ---
    const [viewMode, setViewMode] = useState('grid');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingGroup, setEditingGroup] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [form] = Form.useForm();

    // --- DATOS SIMULADOS (CON TURNO) ---
    const [grupos, setGrupos] = useState([
        { id: 1, nombre: 'A', grado: '1°', carrera: 'Ing. Software', periodo: 'Ene-Abr 2025', turno: 'Matutino', activo: true },
        { id: 2, nombre: 'B', grado: '3°', carrera: 'Lic. Derecho', periodo: 'Ene-Abr 2025', turno: 'Vespertino', activo: true },
        { id: 3, grado: '9°', carrera: 'Ing. Civil', periodo: 'Ago-Dic 2024', turno: 'Matutino', activo: false },
        { id: 4, nombre: 'C', grado: '1°', carrera: 'Lic. Administración', periodo: 'Ene-Abr 2025', turno: 'Vespertino', activo: true },
    ]);

    // --- LÓGICA CRUD ---

    const handleSave = (values) => {
        if (editingGroup) {
            setGrupos(grupos.map(g => (g.id === editingGroup.id ? { ...g, ...values } : g)));
            message.success('Grupo actualizado correctamente');
        } else {
            const newGroup = {
                id: Date.now(),
                ...values,
                activo: true
            };
            setGrupos([...grupos, newGroup]);
            message.success('Grupo creado exitosamente');
        }
        setIsModalOpen(false);
        form.resetFields();
        setEditingGroup(null);
    };

    const handleDelete = (id) => {
        setGrupos(grupos.filter(g => g.id !== id));
        message.success('Grupo eliminado');
    };

    const openModal = (grupo = null) => {
        setEditingGroup(grupo);
        if (grupo) {
            form.setFieldsValue(grupo);
        } else {
            form.resetFields();
        }
        setIsModalOpen(true);
    };

    // Filtrado
    const filteredGrupos = grupos.filter(g =>
        g.carrera.toLowerCase().includes(searchText.toLowerCase()) ||
        g.grado.includes(searchText) ||
        g.turno.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <Layout style={{ minHeight: '100vh', background: '#ffffff', padding: '20px 40px' }}>
            <Content>

                {/* --- HEADER --- */}
                <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                    <div>
                        <Title level={2} style={{ margin: 0, color: '#002766' }}>Gestión de Grupos</Title>
                        <Text type="secondary">Administración académica de grupos y turnos</Text>
                    </div>

                    <Space wrap>
                        {/* Buscador */}
                        <div style={{ position: 'relative' }}>
                            <SearchOutlined style={{ position: 'absolute', left: 10, top: 10, color: '#ccc', zIndex: 1 }} />
                            <Select
                                showSearch
                                placeholder="Buscar grupo, turno..."
                                optionFilterProp="children"
                                onChange={(val) => setSearchText(val)}
                                onSearch={(val) => setSearchText(val)}
                                style={{ width: 280 }}
                                size="large"
                                allowClear
                            >
                                {grupos.map(g => (
                                    <Option key={g.id} value={g.carrera}>{g.grado} {g.nombre} - {g.carrera} ({g.turno})</Option>
                                ))}
                            </Select>
                        </div>

                        {/* Toggle Vistas */}
                        <div style={{ border: '1px solid #d9d9d9', borderRadius: '6px', padding: '2px', display: 'flex' }}>
                            <Tooltip title="Vista Tarjetas">
                                <Button
                                    type={viewMode === 'grid' ? 'primary' : 'text'}
                                    icon={<AppstoreOutlined />}
                                    onClick={() => setViewMode('grid')}
                                    style={{ background: viewMode === 'grid' ? '#002766' : 'transparent', borderRadius: '4px' }}
                                />
                            </Tooltip>
                            <Tooltip title="Vista Lista">
                                <Button
                                    type={viewMode === 'list' ? 'primary' : 'text'}
                                    icon={<BarsOutlined />}
                                    onClick={() => setViewMode('list')}
                                    style={{ background: viewMode === 'list' ? '#002766' : 'transparent', borderRadius: '4px' }}
                                />
                            </Tooltip>
                        </div>

                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => openModal(null)}
                            size="large"
                            style={{
                                background: '#faad14',
                                borderColor: '#faad14',
                                color: '#000',
                                fontWeight: '600',
                                borderRadius: '6px'
                            }}
                        >
                            Nuevo Grupo
                        </Button>
                    </Space>
                </div>

                {/* --- CONTENIDO --- */}
                {filteredGrupos.length === 0 ? (
                    <Empty description="No se encontraron grupos" />
                ) : (
                    <Row gutter={[24, 24]}>
                        {filteredGrupos.map((group) => (
                            <Col xs={24} sm={12} md={8} lg={6} xl={6} key={group.id}>
                                <Card
                                    hoverable
                                    style={{
                                        borderRadius: '12px',
                                        borderTop: `4px solid ${group.activo ? '#52c41a' : '#ff4d4f'}`,
                                        cursor: 'default'
                                    }}
                                    bodyStyle={{ padding: '20px 24px 10px 24px' }}
                                    actions={[
                                        <Tooltip title="Editar" key="edit">
                                            <EditOutlined onClick={() => openModal(group)} style={{ fontSize: '16px', color: '#8c8c8c' }} />
                                        </Tooltip>,
                                        <Popconfirm title="¿Eliminar grupo?" onConfirm={() => handleDelete(group.id)} key="delete" okText="Sí" cancelText="No">
                                            <Tooltip title="Eliminar">
                                                <DeleteOutlined style={{ fontSize: '16px', color: '#ff4d4f' }} />
                                            </Tooltip>
                                        </Popconfirm>
                                    ]}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                                        <div style={{
                                            padding: '10px',
                                            background: '#f0f5ff',
                                            borderRadius: '8px',
                                            color: '#1890ff',
                                            fontSize: '20px',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <TeamOutlined />
                                        </div>
                                        <Space direction="vertical" align="end" size={0}>
                                            <Tag color={group.activo ? 'success' : 'error'} style={{ marginBottom: 4, borderRadius: '4px' }}>
                                                {group.activo ? 'ACTIVO' : 'CERRADO'}
                                            </Tag>
                                            <Tag color={group.turno === 'Matutino' ? 'orange' : 'purple'} style={{ borderRadius: '4px', margin: 0 }}>
                                                {group.turno}
                                            </Tag>
                                        </Space>
                                    </div>

                                    <div style={{ marginBottom: '10px' }}>
                                        <Title level={4} style={{ margin: 0, fontSize: '18px' }}>
                                            {group.grado} "{group.nombre}"
                                        </Title>
                                        <Text type="secondary" style={{ fontSize: '13px', display: 'block', marginTop: '4px' }}>
                                            {group.carrera}
                                        </Text>
                                        <div style={{ marginTop: '8px', fontSize: '12px', color: '#bfbfbf' }}>
                                            <CalendarOutlined style={{ marginRight: 5 }} /> {group.periodo}
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}

                {/* --- MODAL FORMULARIO --- */}
                <Modal
                    title={editingGroup ? "Editar Grupo" : "Crear Nuevo Grupo"}
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    footer={null}
                    centered
                    width={600}
                >
                    <Form form={form} layout="vertical" onFinish={handleSave} initialValues={{ activo: true }}>
                        {/* ⭐ NUEVO CAMPO INSERTADO — Nombre */}
                        <Form.Item name="nombreGrupo" label="Nombre" rules={[{ required: true, message: 'Ingresa el nombre' }]}>
                            <input
                                type="text"
                                placeholder="Escribe el nombre"
                                style={{
                                    width: "100%",
                                    height: "40px",
                                    borderRadius: "6px",
                                    border: "1px solid #d9d9d9",
                                    padding: "0 10px"
                                }}
                            />
                        </Form.Item>

                        {/* 1. SELECT CARRERA */}
                        <Form.Item name="carrera" label="Carrera" rules={[{ required: true, message: 'Selecciona carrera' }]}>
                            <Select placeholder="Selecciona una carrera" size="large">
                                <Option value="Ing. Software">Ing. Software</Option>
                                <Option value="Lic. Derecho">Lic. Derecho</Option>
                                <Option value="Lic. Administración">Lic. Administración</Option>
                                <Option value="Ing. Civil">Ing. Civil</Option>
                                <Option value="Arquitectura">Arquitectura</Option>
                            </Select>
                        </Form.Item>

                        {/* 2. FILA DE DETALLES (GRADO, GRUPO, TURNO) */}
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item name="grado" label="Grado" rules={[{ required: true, message: 'Requerido' }]}>
                                    <Select placeholder="Grado" size="large">
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <Option key={n} value={`${n}°`}>{n}°</Option>)}
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item name="nombre" label="Grupo" rules={[{ required: true, message: 'Requerido' }]}>
                                    <Select placeholder="Letra" size="large">
                                        <Option value="A">A</Option>
                                        <Option value="B">B</Option>
                                        <Option value="C">C</Option>
                                        <Option value="D">D</Option>
                                        <Option value="Único">Único</Option>
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item name="turno" label="Turno" rules={[{ required: true, message: 'Requerido' }]}>
                                    <Select placeholder="Selecciona" size="large">
                                        <Option value="Matutino">
                                            <Space><ClockCircleOutlined style={{ color: '#fa8c16' }} /> Matutino</Space>
                                        </Option>
                                        <Option value="Vespertino">
                                            <Space><ClockCircleOutlined style={{ color: '#722ed1' }} /> Vespertino</Space>
                                        </Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* 3. SELECT PERIODO */}
                        <Form.Item name="periodo" label="Periodo Escolar" rules={[{ required: true, message: 'Selecciona periodo' }]}>
                            <Select placeholder="Selecciona el ciclo" size="large">
                                <Option value="Ene-Abr 2025">Ene-Abr 2025</Option>
                                <Option value="May-Ago 2025">May-Ago 2025</Option>
                                <Option value="Sep-Dic 2025">Sep-Dic 2025</Option>
                                <Option value="Ene-Jun 2026">Ene-Jun 2026</Option>
                            </Select>
                        </Form.Item>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '30px' }}>
                            <Button size="large" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                style={{ background: '#faad14', borderColor: '#faad14', color: '#000', fontWeight: 'bold' }}
                            >
                                {editingGroup ? "Actualizar" : "Guardar"}
                            </Button>
                        </div>
                    </Form>
                </Modal>

            </Content>
        </Layout>
    );
};

export default GestionGrupos;
