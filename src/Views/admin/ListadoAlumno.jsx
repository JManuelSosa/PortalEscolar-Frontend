import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Space, Popconfirm, message, Card, Typography } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UserAddOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ListadoAlumno = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);

    // 1. Datos iniciales de prueba (Mock Data)
    const [students, setStudents] = useState([
        { key: '1', nombre: 'Juan Pérez', matricula: '2023001', correo: 'juan@escuela.edu', grado: '3° A' },
        { key: '2', nombre: 'Maria Lopez', matricula: '2023002', correo: 'maria@escuela.edu', grado: '2° B' },
        { key: '3', nombre: 'Carlos Ruiz', matricula: '2023003', correo: 'carlos@escuela.edu', grado: '1° C' },
    ]);

    // 2. Funciones Lógicas (CRUD)

    // ABRIR MODAL (Para crear o editar)
    const showModal = (student = null) => {
        setEditingStudent(student);
        if (student) {
            form.setFieldsValue(student); // Rellena el formulario si es edición
        } else {
            form.resetFields(); // Limpia si es nuevo
        }
        setIsModalOpen(true);
    };

    // CERRAR MODAL
    const handleCancel = () => {
        setIsModalOpen(false);
        setEditingStudent(null);
        form.resetFields();
    };

    // GUARDAR (Crear o Actualizar)
    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                if (editingStudent) {
                    // Lógica de Actualizar (Update)
                    const updatedStudents = students.map((s) =>
                        s.key === editingStudent.key ? { ...s, ...values } : s
                    );
                    setStudents(updatedStudents);
                    message.success('Alumno actualizado correctamente');
                } else {
                    // Lógica de Crear (Create)
                    const newStudent = {
                        key: Date.now().toString(), // Generamos un ID único temporal
                        ...values,
                    };
                    setStudents([...students, newStudent]);
                    message.success('Alumno agregado correctamente');
                }
                handleCancel();
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    // ELIMINAR
    const handleDelete = (key) => {
        const newData = students.filter((item) => item.key !== key);
        setStudents(newData);
        message.success('Alumno eliminado');
    };

    // 3. Configuración de columnas de la Tabla
    const columns = [
        {
            title: 'Matrícula',
            dataIndex: 'matricula',
            key: 'matricula',
            sorter: (a, b) => a.matricula - b.matricula,
        },
        {
            title: 'Nombre Completo',
            dataIndex: 'nombre',
            key: 'nombre',
            // Filtro simple para buscar por nombre
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder="Buscar nombre"
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => confirm()}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Space>
                        <Button onClick={() => confirm()} type="primary" size="small" style={{ width: 90 }}>
                            Buscar
                        </Button>
                        <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
                            Reset
                        </Button>
                    </Space>
                </div>
            ),
            onFilter: (value, record) => record.nombre.toLowerCase().includes(value.toLowerCase()),
        },
        {
            title: 'Correo',
            dataIndex: 'correo',
            key: 'correo',
        },
        {
            title: 'Grado/Grupo',
            dataIndex: 'grado',
            key: 'grado',
        },
        {
            title: 'Acciones',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => showModal(record)}
                    >
                        Editar
                    </Button>
                    <Popconfirm
                        title="¿Estás seguro de eliminar este alumno?"
                        onConfirm={() => handleDelete(record.key)}
                        okText="Sí"
                        cancelText="No"
                    >
                        <Button type="link" danger icon={<DeleteOutlined />}>
                            Eliminar
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Card
            style={{ margin: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <Title level={3} style={{ margin: 0 }}>Listado de Alumnos</Title>
                <Button
                    type="primary"
                    icon={<UserAddOutlined />}
                    onClick={() => showModal(null)}
                    size="large"
                >
                    Nuevo Alumno
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={students}
                pagination={{ pageSize: 5 }}
                bordered
            />

            {/* Modal para Agregar/Editar */}
            <Modal
                title={editingStudent ? "Editar Alumno" : "Agregar Nuevo Alumno"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Guardar"
                cancelText="Cancelar"
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                >
                    <Form.Item
                        name="nombre"
                        label="Nombre Completo"
                        rules={[{ required: true, message: 'Por favor ingresa el nombre!' }]}
                    >
                        <Input prefix={<UserAddOutlined />} placeholder="Ej: Juan Pérez" />
                    </Form.Item>

                    <Form.Item
                        name="matricula"
                        label="Matrícula"
                        rules={[{ required: true, message: 'Ingresa la matrícula!' }]}
                    >
                        <Input placeholder="Ej: 20230099" />
                    </Form.Item>

                    <Form.Item
                        name="correo"
                        label="Correo Electrónico"
                        rules={[
                            { required: true, message: 'Ingresa el correo!' },
                            { type: 'email', message: 'El correo no es válido!' }
                        ]}
                    >
                        <Input placeholder="alumno@ejemplo.com" />
                    </Form.Item>

                    <Form.Item
                        name="grado"
                        label="Grado y Grupo"
                        rules={[{ required: true, message: 'Ingresa el grado!' }]}
                    >
                        <Input placeholder="Ej: 4° B" />
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
};

export default ListadoAlumno;