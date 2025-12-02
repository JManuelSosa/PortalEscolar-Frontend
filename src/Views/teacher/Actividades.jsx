import React, { useState } from 'react';
import {
    Layout,
    Card,
    Button,
    Row,
    Col,
    Typography,
    Tag,
    Drawer,
    Table,
    InputNumber,
    Input,
    Form,
    Select,
    DatePicker,
    Modal,
    message,
    Divider,
    Space,
    Tooltip,
    Badge,
    Empty
} from 'antd';
import {
    PlusOutlined,
    EditOutlined,
    CheckCircleOutlined,
    UserOutlined,
    CalendarOutlined,
    TeamOutlined,
    FileTextOutlined,
    FileExcelOutlined,
    FileWordOutlined,
    FileImageOutlined,
    FilePdfOutlined,
    DownloadOutlined,
    EyeOutlined,
    SaveOutlined,
    ClockCircleOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const GestorTareasGrupal = () => {
    // --- ESTADOS ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isGradingOpen, setIsGradingOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null); // Tarea seleccionada para calificar
    const [selectedGroupFilter, setSelectedGroupFilter] = useState(null); // Filtro dentro del drawer
    const [form] = Form.useForm();

    // --- DATOS SIMULADOS: TAREAS (5 a 10 ejemplos) ---
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Investigación: Ciclo del Agua', groups: ['3°A', '3°B'], deadline: '2025-10-15', maxScore: 10, pending: 5 },
        { id: 2, title: 'Ejercicios de Fracciones', groups: ['3°A'], deadline: '2025-10-18', maxScore: 100, pending: 12 },
        { id: 3, title: 'Maqueta del Sistema Solar', groups: ['3°B', '3°C'], deadline: '2025-10-20', maxScore: 20, pending: 8 },
        { id: 4, title: 'Ensayo: Héroes Patrios', groups: ['3°A', '3°B', '3°C'], deadline: '2025-11-01', maxScore: 10, pending: 45 },
        { id: 5, title: 'Reporte de Lectura', groups: ['3°C'], deadline: '2025-11-05', maxScore: 10, pending: 0 },
        { id: 6, title: 'Práctica de Laboratorio 1', groups: ['3°A'], deadline: '2025-11-10', maxScore: 50, pending: 20 },
    ]);

    // --- DATOS SIMULADOS: ALUMNOS Y ARCHIVOS ---
    // submission: null (sin entrega) o objeto con type y name
    const [studentsDB, setStudentsDB] = useState([
        // Grupo 3°A
        { id: 1, name: 'Alvarez Juan', group: '3°A', score: null, feedback: '', submission: { type: 'word', name: 'Investigacion_Agua.docx' } },
        { id: 2, name: 'Benitez Sofia', group: '3°A', score: 9, feedback: 'Bien hecho', submission: { type: 'pdf', name: 'CicloAgua.pdf' } },
        { id: 3, name: 'Castro Luis', group: '3°A', score: null, feedback: '', submission: { type: 'image', name: 'Foto_Cuaderno.jpg' } },
        // Grupo 3°B
        { id: 4, name: 'Diaz Ana', group: '3°B', score: null, feedback: '', submission: { type: 'excel', name: 'Tabla_Datos.xlsx' } },
        { id: 5, name: 'Estrada Jorge', group: '3°B', score: null, feedback: '', submission: null }, // Sin entrega
        // Grupo 3°C
        { id: 6, name: 'Fernandez Maria', group: '3°C', score: 10, feedback: 'Excelente', submission: { type: 'word', name: 'Ensayo_Final.docx' } },
    ]);

    // --- HELPER: ICONOS DE ARCHIVO ---
    const getFileIcon = (type) => {
        const style = { fontSize: '22px' };
        switch (type) {
            case 'word': return <FileWordOutlined style={{ ...style, color: '#1890ff' }} />; // Azul Word
            case 'excel': return <FileExcelOutlined style={{ ...style, color: '#52c41a' }} />; // Verde Excel
            case 'pdf': return <FilePdfOutlined style={{ ...style, color: '#ff4d4f' }} />; // Rojo PDF
            case 'image': return <FileImageOutlined style={{ ...style, color: '#faad14' }} />; // Amarillo Imagen
            default: return <FileTextOutlined style={{ ...style, color: '#8c8c8c' }} />;
        }
    };

    // --- LÓGICA ---

    // 1. Crear Tarea
    const handleCreateTask = (values) => {
        const newTask = {
            id: Date.now(),
            title: values.title,
            groups: values.groups, // Array de grupos seleccionados
            deadline: values.deadline ? values.deadline.format('YYYY-MM-DD') : 'Sin fecha',
            maxScore: values.maxScore,
            pending: 0
        };
        setTasks([newTask, ...tasks]);
        message.success('Tarea asignada a los grupos seleccionados');
        setIsModalOpen(false);
        form.resetFields();
    };

    // 2. Abrir Calificador
    const openGrading = (task) => {
        setCurrentTask(task);
        // Por defecto seleccionamos el primer grupo asignado a la tarea para filtrar
        setSelectedGroupFilter(task.groups[0]);
        setIsGradingOpen(true);
    };

    // 3. Filtrar Alumnos (Solo mostrar los del grupo seleccionado y que tengan esta tarea teórica)
    // Nota: En un sistema real, habría una relación Tarea-Alumno. Aquí filtramos por el grupo del alumno.
    const filteredStudents = studentsDB.filter(s => s.group === selectedGroupFilter);

    // 4. Actualizar Nota
    const updateGrade = (id, val) => {
        setStudentsDB(studentsDB.map(s => s.id === id ? { ...s, score: val } : s));
    };

    // 5. Guardar
    const saveAll = () => {
        message.loading('Guardando calificaciones...', 1).then(() => {
            message.success('Calificaciones actualizadas');
            setIsGradingOpen(false);
        });
    };

    // --- COLUMNAS TABLA DE REVISIÓN ---
    const columns = [
        {
            title: 'Alumno',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <Space><UserOutlined /> {text}</Space>
        },
        {
            title: 'Archivo Entregado',
            key: 'submission',
            width: 250,
            render: (_, record) => {
                if (!record.submission) return <Tag icon={<ClockCircleOutlined />} color="warning">Pendiente</Tag>;

                const { type, name } = record.submission;
                return (
                    <div style={{ display: 'flex', alignItems: 'center', background: '#f5f5f5', padding: '5px 10px', borderRadius: '6px', border: '1px solid #e0e0e0' }}>
                        <div style={{ marginRight: '10px' }}>{getFileIcon(type)}</div>
                        <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: '120px', fontSize: '12px' }}>
                            <Tooltip title={name}>{name}</Tooltip>
                        </div>
                        <Button type="text" size="small" icon={<EyeOutlined />} style={{ marginLeft: 'auto' }} />
                    </div>
                );
            }
        },
        {
            title: 'Calif.',
            key: 'score',
            width: 100,
            render: (_, record) => (
                <InputNumber
                    min={0} max={currentTask?.maxScore}
                    value={record.score}
                    onChange={(v) => updateGrade(record.id, v)}
                    disabled={!record.submission}
                    style={{ width: '100%' }}
                />
            )
        },
        {
            title: 'Retroalimentación',
            key: 'feedback',
            render: (_, record) => (
                <Input
                    placeholder="Comentario..."
                    defaultValue={record.feedback}
                    disabled={!record.submission}
                    bordered={false}
                    style={{ borderBottom: '1px solid #f0f0f0' }}
                />
            )
        }
    ];

    return (
        <div style={{ padding: '30px', background: '#f0f2f5', minHeight: '100vh' }}>

            {/* HEADER PRINCIPAL */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Tareas y Actividades</Title>
                    <Text type="secondary">Asigna, revisa y califica las entregas por grupo.</Text>
                </div>
                <Button
                    type="primary"
                    size="large"
                    icon={<PlusOutlined />}
                    onClick={() => setIsModalOpen(true)}
                    style={{ background: '#002766', borderColor: '#002766' }}
                >
                    Nueva Tarea
                </Button>
            </div>

            {/* LISTA DE TAREAS (CARDS) */}
            <Row gutter={[24, 24]}>
                {tasks.map(task => (
                    <Col xs={24} sm={12} lg={8} key={task.id}>
                        <Card
                            hoverable
                            style={{ borderRadius: '12px', borderColor: '#d9d9d9' }}
                            actions={[
                                <Tooltip title="Editar Tarea"><EditOutlined key="edit" /></Tooltip>,
                                <Button type="link" onClick={() => openGrading(task)}>
                                    <CheckCircleOutlined /> Calificar Entregas
                                </Button>
                            ]}
                        >
                            <div style={{ marginBottom: '15px' }}>
                                <Text type="secondary" style={{ fontSize: '12px' }}>GRUPOS ASIGNADOS:</Text>
                                <div style={{ marginTop: '5px' }}>
                                    {task.groups.map(g => <Tag color="blue" key={g}>{g}</Tag>)}
                                </div>
                            </div>

                            <Title level={4} style={{ margin: '0 0 10px 0', minHeight: '50px' }}>{task.title}</Title>

                            <Space split={<Divider type="vertical" />}>
                                <span><CalendarOutlined /> {task.deadline}</span>
                                <span>Max: {task.maxScore} pts</span>
                            </Space>

                            {task.pending > 0 && (
                                <div style={{ marginTop: '15px' }}>
                                    <Badge status="processing" text={`${task.pending} Entregas nuevas por revisar`} />
                                </div>
                            )}
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* --- MODAL CREAR TAREA --- */}
            <Modal
                title="Asignar Nueva Tarea"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width={600}
            >
                <Form form={form} layout="vertical" onFinish={handleCreateTask}>
                    <Form.Item name="title" label="Título de la Actividad" rules={[{ required: true }]}>
                        <Input placeholder="Ej. Resumen del Libro..." />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="groups" label="Asignar a Grupos" rules={[{ required: true, message: 'Selecciona al menos uno' }]}>
                                {/* SELECT MULTIPLE PARA ASIGNAR A VARIOS GRUPOS */}
                                <Select mode="multiple" placeholder="Selecciona grupos" allowClear>
                                    <Option value="3°A">3°A</Option>
                                    <Option value="3°B">3°B</Option>
                                    <Option value="3°C">3°C</Option>
                                    <Option value="2°A">2°A</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="maxScore" label="Valor (Puntos)" rules={[{ required: true }]}>
                                <InputNumber style={{ width: '100%' }} defaultValue={10} min={1} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item name="deadline" label="Fecha de Entrega" rules={[{ required: true }]}>
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item name="desc" label="Instrucciones">
                        <TextArea rows={3} placeholder="Detalles de la tarea..." />
                    </Form.Item>

                    <div style={{ textAlign: 'right', marginTop: '20px' }}>
                        <Button onClick={() => setIsModalOpen(false)} style={{ marginRight: '10px' }}>Cancelar</Button>
                        <Button type="primary" htmlType="submit" style={{ background: '#002766' }}>Publicar Tarea</Button>
                    </div>
                </Form>
            </Modal>

            {/* --- DRAWER DE CALIFICACIÓN --- */}
            <Drawer
                title={
                    <div>
                        <div style={{ fontSize: '12px', color: '#888' }}>REVISANDO:</div>
                        <Title level={4} style={{ margin: 0 }}>{currentTask?.title}</Title>
                    </div>
                }
                width={800}
                onClose={() => setIsGradingOpen(false)}
                open={isGradingOpen}
                extra={
                    <Button type="primary" icon={<SaveOutlined />} onClick={saveAll}>
                        Guardar Avance
                    </Button>
                }
            >
                {/* FILTRO DE GRUPO DENTRO DEL DRAWER */}
                <Card size="small" style={{ marginBottom: '20px', background: '#f9f9f9' }}>
                    <Space>
                        <Text strong>Seleccionar Grupo a Calificar:</Text>
                        <Select
                            value={selectedGroupFilter}
                            onChange={setSelectedGroupFilter}
                            style={{ width: 150 }}
                        >
                            {/* Solo mostramos los grupos asignados a esta tarea */}
                            {currentTask?.groups.map(g => (
                                <Option key={g} value={g}>{g}</Option>
                            ))}
                        </Select>
                    </Space>
                </Card>

                {/* TABLA DE ALUMNOS FILTRADA POR GRUPO */}
                {filteredStudents.length > 0 ? (
                    <Table
                        dataSource={filteredStudents}
                        columns={columns}
                        rowKey="id"
                        pagination={false}
                        scroll={{ x: 600 }}
                    />
                ) : (
                    <Empty description="No hay alumnos en este grupo" />
                )}
            </Drawer>

        </div>
    );
};

export default GestorTareasGrupal;