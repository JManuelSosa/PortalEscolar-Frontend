// BibliotecaAdminView.jsx
import React, { useState, useEffect } from 'react';
import admincss from '@css/Components/BibliotecaAdministracion.module.css';

import {
    Row, Col, Card, Table, Tag, Button, Modal, Form, Input,
    Select, DatePicker, Space, message, Popconfirm, Tabs,
    Descriptions, Statistic, Divider, Avatar, InputNumber
} from 'antd';
import {
    SearchOutlined, BookOutlined, UserOutlined, PlusOutlined,
    EditOutlined, DeleteOutlined, EyeOutlined, CheckCircleOutlined,
    ClockCircleOutlined, TeamOutlined, HistoryOutlined
} from '@ant-design/icons';

// ... (todo tu mismo código sin tocar lógica)
const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Search } = Input;

// Datos libros 
const librosIniciales = [
    {
        id: 1,
        titulo: 'Cien Años de Soledad',
        autor: 'Gabriel García Márquez',
        isbn: '978-8437604947',
        categoria: 'Literatura',
        estado: 'disponible',
        editorial: 'Editorial Sudamericana',
        año: 1967,
        ejemplares: 5,

    },
    {
        id: 2,
        titulo: 'Física Universitaria Vol. 1',
        autor: 'Sears & Zemansky',
        isbn: '978-6073221245',
        categoria: 'ciencias',
        estado: 'prestado',
        editorial: '',
        año: 2016,
        ejemplares: 5,
    },
    {
        id: 3,
        titulo: 'Álgebra Lineal',
        autor: 'Stanley Grossman',
        isbn: '978-6073214179',
        categoria: 'matematicas',
        estado: 'disponible',
        editorial: '',
        año: 2019,
        ejemplares: 5,
    },
    {
        id: 4,
        titulo: 'Química General',
        autor: 'Raymond Chang',
        isbn: '978-6071513170',
        categoria: 'ciencias',
        estado: 'disponible',
        editorial: '',
        año: 2020,
        ejemplares: 5,
    },
    {
        id: 5,
        titulo: 'Historia de México',
        autor: 'Daniel Cosío Villegas',
        isbn: '978-6074557890',
        categoria: 'historia',
        estado: 'disponible',
        editorial: '',
        año: 2018,
        ejemplares: 5,
    },
    {
        id: 6,
        titulo: 'Programación en Python',
        autor: 'John Smith',
        isbn: '978-6071234567',
        categoria: 'tecnologia',
        estado: 'prestado',
        editorial: '',
        año: 2021,
        ejemplares: 5,
    }
];

const alumnosIniciales = [
    {
        id: 1,
        nombre: 'Ana García López',
        matricula: '2023001',
        carrera: 'Ingeniería en Sistemas',
        grupo: 'A',
        grado: '3',
        email: 'ana.garcia@escuela.edu',

    },
    {
        id: 2,
        nombre: 'Emilia Hernandes Quintales',
        matricula: '2011000',
        carrera: 'Entornos Virtuales Y Negocios Digitales',
        grupo: 'C',
        grado: '6',
        email: 'Emilia.Hernandes@escuela.edu',
    }
];

const prestamosIniciales = [
    {
        id: 1,
        libroId: 1,
        alumnoId: 1,
        fechaPrestamo: '2024-01-10',
        fechaDevolucion: '2024-01-24',
        fechaDevolucionReal: null,
        estado: 'prestado',
        observaciones: ''
    },
    {
        id: 2,
        libroId: 3,
        alumnoId: 2,
        fechaPrestamo: '2024-01-10',
        fechaDevolucion: '2024-01-24',
        fechaDevolucionReal: null,
        estado: 'prestado',
        observaciones: ''
    },
    {
        id: 3,
        libroId: 6,
        alumnoId: 3,
        fechaPrestamo: '2024-01-10',
        fechaDevolucion: '2024-01-24',
        fechaDevolucionReal: null,
        estado: 'prestado',
        observaciones: ''
    }

];

export default function BibliotecaAdminView() {
    // Estados principales
    const [libros, setLibros] = useState(librosIniciales);
    const [alumnos, setAlumnos] = useState(alumnosIniciales);
    const [prestamos, setPrestamos] = useState(prestamosIniciales);

    // Estados de modales
    const [modalLibroVisible, setModalLibroVisible] = useState(false);
    const [modalAlumnoVisible, setModalAlumnoVisible] = useState(false);
    const [modalPrestamoVisible, setModalPrestamoVisible] = useState(false);
    const [modalDetallesVisible, setModalDetallesVisible] = useState(false);

    // Estados de selección
    const [libroSeleccionado, setLibroSeleccionado] = useState(null);
    const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);
    const [modoEdicion, setModoEdicion] = useState(false);

    // Forms
    const [formLibro] = Form.useForm();
    const [formAlumno] = Form.useForm();
    const [formPrestamo] = Form.useForm();

    // Estadísticas
    const totalLibros = libros.length;
    const librosDisponibles = libros.filter(libro => libro.estado === 'disponible').length;
    const prestamosActivos = prestamos.filter(p => p.estado === 'prestado').length;
    const prestamosCompletados = prestamos.filter(p => p.estado === 'devuelto').length;

    // Obtener datos combinados para display
    const getPrestamosConDetalles = () => {
        return prestamos.map(prestamo => {
            const libro = libros.find(l => l.id === prestamo.libroId);
            const alumno = alumnos.find(a => a.id === prestamo.alumnoId);
            return {
                ...prestamo,
                libroTitulo: libro?.titulo,
                libroAutor: libro?.autor,
                alumnoNombre: alumno?.nombre,
                alumnoMatricula: alumno?.matricula,
                alumnoCarrera: alumno?.carrera
            };
        });
    };

    const getAlumnosConPrestamos = () => {
        return alumnos.map(alumno => {
            const prestamosAlumno = prestamos.filter(p => p.alumnoId === alumno.id);
            const prestamosActivos = prestamosAlumno.filter(p => p.estado === 'prestado');

            return {
                ...alumno,
                totalPrestamos: prestamosAlumno.length,
                prestamosActivos: prestamosActivos.length,
                ultimoPrestamo: prestamosAlumno.length > 0 ?
                    prestamosAlumno[prestamosAlumno.length - 1].fechaPrestamo : 'N/A'
            };
        });
    };

    // Funciones para Libros
    const handleNuevoLibro = () => {
        setLibroSeleccionado(null);
        setModoEdicion(false);
        formLibro.resetFields();
        setModalLibroVisible(true);
    };

    const handleEditarLibro = (libro) => {
        setLibroSeleccionado(libro);
        setModoEdicion(true);
        formLibro.setFieldsValue(libro);
        setModalLibroVisible(true);
    };

    const handleEliminarLibro = (libroId) => {
        // Verificar si el libro tiene préstamos activos
        const prestamosActivos = prestamos.filter(p => p.libroId === libroId && p.estado === 'prestado');

        if (prestamosActivos.length > 0) {
            message.error('No se puede eliminar un libro con préstamos activos');
            return;
        }

        setLibros(libros.filter(libro => libro.id !== libroId));
        message.success('Libro eliminado exitosamente');
    };

    const handleSubmitLibro = async (values) => {
        try {
            if (modoEdicion) {
                setLibros(libros.map(libro =>
                    libro.id === libroSeleccionado.id
                        ? { ...libro, ...values }
                        : libro
                ));
                message.success('Libro actualizado exitosamente');
            } else {
                const nuevoLibro = {
                    id: Math.max(...libros.map(l => l.id), 0) + 1,
                    estado: 'disponible',
                    ...values
                };
                setLibros([...libros, nuevoLibro]);
                message.success('Libro agregado exitosamente');
            }

            setModalLibroVisible(false);
            formLibro.resetFields();
        } catch (error) {
            message.error('Error al guardar el libro');
        }
    };

    // Funciones para Alumnos
    const handleNuevoAlumno = () => {
        setAlumnoSeleccionado(null);
        setModoEdicion(false);
        formAlumno.resetFields();
        setModalAlumnoVisible(true);
    };

    const handleEditarAlumno = (alumno) => {
        setAlumnoSeleccionado(alumno);
        setModoEdicion(true);
        formAlumno.setFieldsValue(alumno);
        setModalAlumnoVisible(true);
    };

    const handleEliminarAlumno = (alumnoId) => {
        // Verificar si el alumno tiene préstamos activos
        const prestamosActivos = prestamos.filter(p => p.alumnoId === alumnoId && p.estado === 'prestado');

        if (prestamosActivos.length > 0) {
            message.error('No se puede eliminar un alumno con préstamos activos');
            return;
        }

        setAlumnos(alumnos.filter(alumno => alumno.id !== alumnoId));
        message.success('Alumno eliminado exitosamente');
    };

    const handleSubmitAlumno = async (values) => {
        try {
            if (modoEdicion) {
                setAlumnos(alumnos.map(alumno =>
                    alumno.id === alumnoSeleccionado.id
                        ? { ...alumno, ...values }
                        : alumno
                ));
                message.success('Alumno actualizado exitosamente');
            } else {
                const nuevoAlumno = {
                    id: Math.max(...alumnos.map(a => a.id), 0) + 1,
                    ...values
                };
                setAlumnos([...alumnos, nuevoAlumno]);
                message.success('Alumno agregado exitosamente');
            }

            setModalAlumnoVisible(false);
            formAlumno.resetFields();
        } catch (error) {
            message.error('Error al guardar el alumno');
        }
    };

    // Funciones para Préstamos
    const handleNuevoPrestamo = () => {
        setModalPrestamoVisible(true);
    };

    const handleSubmitPrestamo = async (values) => {
        try {
            const nuevoPrestamo = {
                id: Math.max(...prestamos.map(p => p.id), 0) + 1,
                libroId: values.libroId,
                alumnoId: values.alumnoId,
                fechaPrestamo: values.fechaPrestamo.format('YYYY-MM-DD'),
                fechaDevolucion: values.fechaDevolucion.format('YYYY-MM-DD'),
                fechaDevolucionReal: null,
                estado: 'prestado',
                observaciones: values.observaciones || ''
            };

            // Actualizar estado del libro
            setLibros(libros.map(libro =>
                libro.id === values.libroId
                    ? { ...libro, estado: 'prestado' }
                    : libro
            ));

            setPrestamos([...prestamos, nuevoPrestamo]);
            setModalPrestamoVisible(false);
            formPrestamo.resetFields();
            message.success('Préstamo registrado exitosamente');
        } catch (error) {
            message.error('Error al registrar el préstamo');
        }
    };

    const handleDevolverLibro = (prestamoId) => {
        const prestamo = prestamos.find(p => p.id === prestamoId);

        setPrestamos(prestamos.map(p =>
            p.id === prestamoId
                ? { ...p, estado: 'devuelto', fechaDevolucionReal: new Date().toISOString().split('T')[0] }
                : p
        ));

        // Actualizar estado del libro
        setLibros(libros.map(libro =>
            libro.id === prestamo.libroId
                ? { ...libro, estado: 'disponible' }
                : libro
        ));

        message.success('Libro devuelto exitosamente');
    };

    const getEstadoColor = (estado) => {
        return estado === 'disponible' || estado === 'devuelto' ? 'green' : 'red';
    };

    const getEstadoIcon = (estado) => {
        return estado === 'disponible' || estado === 'devuelto' ? <CheckCircleOutlined /> : <ClockCircleOutlined />;
    };

    // Columnas para las tablas
    const columnasLibros = [
        {
            title: 'Portada',
            dataIndex: 'imagen',
            key: 'imagen',
            render: (imagen) => (
                <Avatar
                    size={50}
                    src={imagen}
                    icon={<BookOutlined />}
                    shape="square"
                />
            ),
            width: 70
        },
        {
            title: 'Título',
            dataIndex: 'titulo',
            key: 'titulo',
            sorter: (a, b) => a.titulo.localeCompare(b.titulo)
        },
        {
            title: 'Autor',
            dataIndex: 'autor',
            key: 'autor'
        },
        {
            title: 'ISBN',
            dataIndex: 'isbn',
            key: 'isbn'
        },
        {
            title: 'Categoría',
            dataIndex: 'categoria',
            key: 'categoria'
        },
        {
            title: 'Ejemplares',
            dataIndex: 'ejemplares',
            key: 'ejemplares'
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado',
            render: (estado) => (
                <Tag color={getEstadoColor(estado)} icon={getEstadoIcon(estado)}>
                    {estado.toUpperCase()}
                </Tag>
            )
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (_, record) => (
                <Space size="small">
                    <Button
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => handleEditarLibro(record)}
                    >
                        Editar
                    </Button>
                    <Popconfirm
                        title="¿Eliminar libro?"
                        description="¿Estás seguro de que quieres eliminar este libro?"
                        onConfirm={() => handleEliminarLibro(record.id)}
                        okText="Sí"
                        cancelText="No"
                    >
                        <Button icon={<DeleteOutlined />} size="small" danger>
                            Eliminar
                        </Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    const columnasAlumnos = [
        {
            title: 'Alumno',
            dataIndex: 'nombre',
            key: 'nombre',
            render: (text, record) => (
                <Space>
                    <Avatar icon={<UserOutlined />} />
                    <div>
                        <div style={{ fontWeight: 'bold' }}>{text}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>{record.matricula}</div>
                    </div>
                </Space>
            )
        },
        {
            title: 'Carrera',
            dataIndex: 'carrera',
            key: 'carrera'
        },
        {
            title: 'Grupo/Grado',
            key: 'grupoGrado',
            render: (_, record) => `${record.grupo} - ${record.grado}°`
        },
        {
            title: 'Total Préstamos',
            dataIndex: 'totalPrestamos',
            key: 'totalPrestamos'
        },
        {
            title: 'Préstamos Activos',
            dataIndex: 'prestamosActivos',
            key: 'prestamosActivos',
            render: (activos) => (
                <Tag color={activos > 0 ? 'orange' : 'green'}>
                    {activos} activos
                </Tag>
            )
        },
        {
            title: 'Último Préstamo',
            dataIndex: 'ultimoPrestamo',
            key: 'ultimoPrestamo'
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (_, record) => (
                <Space size="small">
                    <Button
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => handleEditarAlumno(record)}
                    >
                        Editar
                    </Button>
                    <Popconfirm
                        title="¿Eliminar alumno?"
                        description="¿Estás seguro de que quieres eliminar este alumno?"
                        onConfirm={() => handleEliminarAlumno(record.id)}
                        okText="Sí"
                        cancelText="No"
                    >
                        <Button icon={<DeleteOutlined />} size="small" danger>
                            Eliminar
                        </Button>
                    </Popconfirm>
                    <Button
                        icon={<EyeOutlined />}
                        size="small"
                        onClick={() => {
                            setAlumnoSeleccionado(record);
                            setModalDetallesVisible(true);
                        }}
                    >
                        Historial
                    </Button>
                </Space>
            )
        }
    ];

    const columnasPrestamos = [
        {
            title: 'Libro',
            dataIndex: 'libroTitulo',
            key: 'libroTitulo',
            render: (text, record) => (
                <div>
                    <div style={{ fontWeight: 'bold' }}>{text}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>{record.libroAutor}</div>
                </div>
            )
        },
        {
            title: 'Alumno',
            dataIndex: 'alumnoNombre',
            key: 'alumnoNombre',
            render: (text, record) => (
                <div>
                    <div>{text}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                        {record.alumnoMatricula} - {record.alumnoCarrera}
                    </div>
                </div>
            )
        },
        {
            title: 'Fecha Préstamo',
            dataIndex: 'fechaPrestamo',
            key: 'fechaPrestamo'
        },
        {
            title: 'Fecha Devolución',
            dataIndex: 'fechaDevolucion',
            key: 'fechaDevolucion'
        },
        {
            title: 'Fecha Dev. Real',
            dataIndex: 'fechaDevolucionReal',
            key: 'fechaDevolucionReal',
            render: (fecha) => fecha || 'Pendiente'
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado',
            render: (estado) => (
                <Tag color={getEstadoColor(estado)} icon={getEstadoIcon(estado)}>
                    {estado.toUpperCase()}
                </Tag>
            )
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (_, record) => (
                <Space size="small">
                    {record.estado === 'prestado' && (
                        <Button
                            type="primary"
                            size="small"
                            onClick={() => handleDevolverLibro(record.id)}
                        >
                            Registrar Devolución
                        </Button>
                    )}
                    <Button
                        icon={<EyeOutlined />}
                        size="small"
                    >
                        Detalles
                    </Button>
                </Space>
            )
        }
    ];

    return (
        <div className={admincss["biblioteca-admin"]}>
            {/* Estadísticas */}
            <Row gutter={16} className={admincss["stats-row"]}>
                <Col span={6}>
                    <Card className={admincss["stats-card"]}>
                        <Statistic
                            title="Total Libros"
                            value={totalLibros}
                            prefix={<BookOutlined />}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Libros Disponibles"
                            value={librosDisponibles}
                            valueStyle={{ color: '#52c41a' }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Préstamos Activos"
                            value={prestamosActivos}
                            prefix={<ClockCircleOutlined />}
                            valueStyle={{ color: '#faad14' }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Préstamos Completados"
                            value={prestamosCompletados}
                            prefix={<CheckCircleOutlined />}
                            valueStyle={{ color: '#52c41a' }}
                        />
                    </Card>
                </Col>
            </Row>

            <Divider className={admincss["section-divider"]} />

            {/* Tabs principales */}
            <Card>
                <Tabs defaultActiveKey="libros">
                    {/* Tab de Libros */}
                    <Tabs.TabPane
                        tab={<span><BookOutlined />Gestión de Libros</span>}
                        key="libros"
                    >
                        <div className={admincss["tab-actions"]}>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={handleNuevoLibro}
                            >
                                Agregar Libro
                            </Button>
                        </div>
                        <Table
                            columns={columnasLibros}
                            dataSource={libros}
                            rowKey="id"
                            scroll={{ x: 800 }}
                        />
                    </Tabs.TabPane>

                    {/* Tab de Alumnos */}
                    <Tabs.TabPane
                        tab={<span><TeamOutlined />Alumnos con Préstamos</span>}
                        key="alumnos"
                    >
                        <div className={admincss["tab-actions"]}>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={handleNuevoAlumno}
                            >
                                Agregar Alumno
                            </Button>
                        </div>
                        <Table
                            columns={columnasAlumnos}
                            dataSource={getAlumnosConPrestamos()}
                            rowKey="id"
                            scroll={{ x: 1000 }}
                        />
                    </Tabs.TabPane>

                    {/* Tab de Préstamos */}
                    <Tabs.TabPane
                        tab={<span><HistoryOutlined />Historial de Préstamos</span>}
                        key="prestamos"
                    >
                        <div className={admincss["tab-actions"]}>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={handleNuevoPrestamo}
                            >
                                Nuevo Préstamo
                            </Button>
                        </div>
                        <Table
                            columns={columnasPrestamos}
                            dataSource={getPrestamosConDetalles()}
                            rowKey="id"
                            scroll={{ x: 1200 }}
                        />
                    </Tabs.TabPane>
                </Tabs>
            </Card>

            <Modal
                title={modoEdicion ? 'Editar Libro' : 'Agregar Nuevo Libro'}
                open={modalLibroVisible}
                onCancel={() => {
                    setModalLibroVisible(false);
                    formLibro.resetFields();
                }}
                footer={null}
                width={700}
            >
                <Form
                    form={formLibro}
                    layout="vertical"
                    onFinish={handleSubmitLibro}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Título del Libro"
                                name="titulo"
                                rules={[{ required: true, message: 'Ingresa el título del libro' }]}
                            >
                                <Input placeholder="Título del libro" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Autor"
                                name="autor"
                                rules={[{ required: true, message: 'Ingresa el autor' }]}
                            >
                                <Input placeholder="Nombre del autor" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="ISBN"
                                name="isbn"
                                rules={[{ required: true, message: 'Ingresa el ISBN' }]}
                            >
                                <Input placeholder="Número ISBN" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Categoría"
                                name="categoria"
                                rules={[{ required: true, message: 'Selecciona la categoría' }]}
                            >
                                <Select placeholder="Selecciona categoría">
                                    <Option value="Literatura">Literatura</Option>
                                    <Option value="Ciencias">Ciencias</Option>
                                    <Option value="Matemáticas">Matemáticas</Option>
                                    <Option value="Historia">Historia</Option>
                                    <Option value="Tecnología">Tecnología</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Editorial"
                                name="editorial"
                            >
                                <Input placeholder="Nombre de la editorial" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Año"
                                name="año"
                            >
                                <InputNumber
                                    style={{ width: '100%' }}
                                    placeholder="Año"
                                    min={1900}
                                    max={new Date().getFullYear()}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Ejemplares"
                                name="ejemplares"
                                rules={[{ required: true, message: 'Ingresa el número de ejemplares' }]}
                            >
                                <InputNumber
                                    style={{ width: '100%' }}
                                    placeholder="Ejemplares"
                                    min={1}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        label="URL de la Imagen"
                        name="imagen"
                    >
                        <Input placeholder="https://ejemplo.com/imagen.jpg" />
                    </Form.Item>

                    <Form.Item
                        label="Descripción"
                        name="descripcion"
                    >
                        <TextArea rows={3} placeholder="Descripción del libro..." />
                    </Form.Item>

                    <Form.Item style={{ textAlign: 'right' }}>
                        <Button style={{ marginRight: 8 }} onClick={() => setModalLibroVisible(false)}>
                            Cancelar
                        </Button>
                        <Button type="primary" htmlType="submit">
                            {modoEdicion ? 'Guardar Cambios' : 'Agregar Libro'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Modal para Gestión de Alumnos */}
            <Modal
                title={modoEdicion ? 'Editar Alumno' : 'Agregar Nuevo Alumno'}
                open={modalAlumnoVisible}
                onCancel={() => {
                    setModalAlumnoVisible(false);
                    formAlumno.resetFields();
                }}
                footer={null}
                width={600}
            >
                <Form
                    form={formAlumno}
                    layout="vertical"
                    onFinish={handleSubmitAlumno}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Nombre Completo"
                                name="nombre"
                                rules={[{ required: true, message: 'Ingresa el nombre del alumno' }]}
                            >
                                <Input placeholder="Nombre completo" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Matrícula"
                                name="matricula"
                                rules={[{ required: true, message: 'Ingresa la matrícula' }]}
                            >
                                <Input placeholder="Número de matrícula" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        label="Carrera"
                        name="carrera"
                        rules={[{ required: true, message: 'Ingresa la carrera' }]}
                    >
                        <Input placeholder="Carrera del alumno" />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Grupo"
                                name="grupo"
                                rules={[{ required: true, message: 'Ingresa el grupo' }]}
                            >
                                <Input placeholder="Grupo" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Grado"
                                name="grado"
                                rules={[{ required: true, message: 'Ingresa el grado' }]}
                            >
                                <Input placeholder="Grado" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ type: 'email', message: 'Email no válido' }]}
                            >
                                <Input placeholder="email@ejemplo.com" />
                            </Form.Item>
                        </Col>

                    </Row>

                    <Form.Item style={{ textAlign: 'right' }}>
                        <Button style={{ marginRight: 8 }} onClick={() => setModalAlumnoVisible(false)}>
                            Cancelar
                        </Button>
                        <Button type="primary" htmlType="submit">
                            {modoEdicion ? 'Guardar Cambios' : 'Agregar Alumno'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Modal para Nuevo Préstamo */}
            <Modal
                title="Registrar Nuevo Préstamo"
                open={modalPrestamoVisible}
                onCancel={() => {
                    setModalPrestamoVisible(false);
                    formPrestamo.resetFields();
                }}
                footer={null}
                width={600}
            >
                <Form
                    form={formPrestamo}
                    layout="vertical"
                    onFinish={handleSubmitPrestamo}
                >
                    <Form.Item
                        label="Libro"
                        name="libroId"
                        rules={[{ required: true, message: 'Selecciona un libro' }]}
                    >
                        <Select placeholder="Selecciona un libro">
                            {libros.filter(libro => libro.estado === 'disponible').map(libro => (
                                <Option key={libro.id} value={libro.id}>
                                    {libro.titulo} - {libro.autor}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Alumno"
                        name="alumnoId"
                        rules={[{ required: true, message: 'Selecciona un alumno' }]}
                    >
                        <Select placeholder="Selecciona un alumno">
                            {alumnos.map(alumno => (
                                <Option key={alumno.id} value={alumno.id}>
                                    {alumno.nombre} - {alumno.matricula}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Fecha de Préstamo"
                                name="fechaPrestamo"
                                rules={[{ required: true, message: 'Selecciona la fecha de préstamo' }]}
                            >
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Fecha de Devolución"
                                name="fechaDevolucion"
                                rules={[{ required: true, message: 'Selecciona la fecha de devolución' }]}
                            >
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        label="Observaciones"
                        name="observaciones"
                    >
                        <TextArea rows={3} placeholder="Observaciones adicionales..." />
                    </Form.Item>

                    <Form.Item style={{ textAlign: 'right' }}>
                        <Button style={{ marginRight: 8 }} onClick={() => setModalPrestamoVisible(false)}>
                            Cancelar
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Registrar Préstamo
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Modal de Detalles del Alumno */}
            <Modal
                title={`Historial de Préstamos - ${alumnoSeleccionado?.nombre}`}
                open={modalDetallesVisible}
                onCancel={() => setModalDetallesVisible(false)}
                width={800}
                footer={[
                    <Button key="close" onClick={() => setModalDetallesVisible(false)}>
                        Cerrar
                    </Button>
                ]}
            >
                {alumnoSeleccionado && (
                    <div>
                        <Descriptions column={2} bordered size="small">
                            <Descriptions.Item label="Matrícula">{alumnoSeleccionado.matricula}</Descriptions.Item>
                            <Descriptions.Item label="Carrera">{alumnoSeleccionado.carrera}</Descriptions.Item>
                            <Descriptions.Item label="Grupo">{alumnoSeleccionado.grupo}</Descriptions.Item>
                            <Descriptions.Item label="Grado">{alumnoSeleccionado.grado}</Descriptions.Item>
                        </Descriptions>

                        <Divider />

                        <Table
                            columns={columnasPrestamos.filter(col => col.key !== 'alumnoNombre')}
                            dataSource={getPrestamosConDetalles().filter(p => p.alumnoId === alumnoSeleccionado.id)}
                            rowKey="id"
                            size="small"
                            pagination={false}
                        />
                    </div>
                )}
            </Modal>
        </div>
    );
}