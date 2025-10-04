// BibliotecaView.js
import React, { useState, useEffect } from 'react';
import {
    Row,
    Col,
    Card,
    Input,
    Button,
    Modal,
    Form,
    Select,
    Tag,
    Space,
    Divider,
    Statistic,
    Grid,
    Avatar,
    List,
    Descriptions,
    DatePicker,
    message
} from 'antd';
import {
    SearchOutlined,
    BookOutlined,
    UserOutlined,
    TeamOutlined,
    CalendarOutlined,
    IdcardOutlined,
    ApartmentOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined
} from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;
const { Meta } = Card;
const { useBreakpoint } = Grid;

const BibliotecaView = () => {
    const [libros, setLibros] = useState([]);
    const [librosFiltrados, setLibrosFiltrados] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [libroSeleccionado, setLibroSeleccionado] = useState(null);
    const [loading, setLoading] = useState(false);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas');
    const [estadoSeleccionado, setEstadoSeleccionado] = useState('todos'); // ← NUEVO ESTADO
    const [form] = Form.useForm();
    const screens = useBreakpoint();

    // Datos de ejemplo mejorados
    const librosEjemplo = [
        {
            id: 1,
            titulo: 'Cien Años de Soledad',
            autor: 'Gabriel García Márquez',
            categoria: 'literatura',
            estado: 'disponible',
            imagen: 'https://via.placeholder.com/200x250/4CAF50/FFFFFF?text=Cien+Años',
            isbn: '978-8439728372',
            descripcion: 'Una obra maestra del realismo mágico que narra la historia de la familia Buendía.',
            año: 1967
        },
        {
            id: 2,
            titulo: 'Física Universitaria Vol. 1',
            autor: 'Sears & Zemansky',
            categoria: 'ciencias',
            estado: 'prestado',
            imagen: 'https://via.placeholder.com/200x250/2196F3/FFFFFF?text=Física',
            isbn: '978-6073221245',
            descripcion: 'Texto fundamental para el estudio de la física a nivel universitario.',
            año: 2016
        },
        {
            id: 3,
            titulo: 'Álgebra Lineal',
            autor: 'Stanley Grossman',
            categoria: 'matematicas',
            estado: 'disponible',
            imagen: 'https://via.placeholder.com/200x250/FF9800/FFFFFF?text=Álgebra',
            isbn: '978-6073214179',
            descripcion: 'Comprehensive guide to linear algebra concepts and applications.',
            año: 2019
        },
        {
            id: 4,
            titulo: 'Química General',
            autor: 'Raymond Chang',
            categoria: 'ciencias',
            estado: 'disponible',
            imagen: 'https://via.placeholder.com/200x250/9C27B0/FFFFFF?text=Química',
            isbn: '978-6071513170',
            descripcion: 'Introducción completa a los principios fundamentales de la química.',
            año: 2020
        },
        {
            id: 5,
            titulo: 'Historia de México',
            autor: 'Daniel Cosío Villegas',
            categoria: 'historia',
            estado: 'disponible',
            imagen: 'https://via.placeholder.com/200x250/F44336/FFFFFF?text=Historia',
            isbn: '978-6074557890',
            descripcion: 'Análisis histórico completo de México desde la época prehispánica.',
            año: 2018
        },
        {
            id: 6,
            titulo: 'Programación en Python',
            autor: 'John Smith',
            categoria: 'tecnologia',
            estado: 'prestado',
            imagen: 'https://via.placeholder.com/200x250/607D8B/FFFFFF?text=Python',
            isbn: '978-6071234567',
            descripcion: 'Guía completa para aprender programación en Python desde cero.',
            año: 2021
        }
    ];

    const categorias = [
        { value: 'todas', label: 'Todas las categorías', count: 6 },
        { value: 'literatura', label: 'Literatura', count: 1 },
        { value: 'ciencias', label: 'Ciencias', count: 2 },
        { value: 'matematicas', label: 'Matemáticas', count: 1 },
        { value: 'historia', label: 'Historia', count: 1 },
        { value: 'tecnologia', label: 'Tecnología', count: 1 }
    ];

    const estados = [
        { value: 'todos', label: '📋 Todos los estados', count: 6 },
        { value: 'disponible', label: '✅ Disponibles', count: 4 },
        { value: 'prestado', label: '📖 Prestados', count: 2 }
    ];

    const carreras = [
        'Ingeniería en Sistemas',
        'Administración de Empresas',
        'Ingeniería Industrial',
        'Psicología',
        'Derecho',
        'Medicina',
        'Entornos Virtuales Y Negocios Digitales',
        'Administración',
        'Desarrollo En Software'

    ];


    const grupos = ['A', 'B', 'C', 'D', 'E', 'F'];
    const grados = ['1°', '2°', '3°', '4°', '5°', '6°'];

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLibros(librosEjemplo);
            setLibrosFiltrados(librosEjemplo);
            setLoading(false);
        }, 1000);
    }, []);

    // Agrega este useEffect para actualizar contadores
    useEffect(() => {
        // Actualizar contadores de estados
        const disponiblesCount = libros.filter(l => l.estado === 'disponible').length;
        const prestadosCount = libros.filter(l => l.estado === 'prestado').length;

        estados[0].count = libros.length;
        estados[1].count = disponiblesCount;
        estados[2].count = prestadosCount;
    }, [libros]);

    // Agrega este useEffect para actualizar contadores de categorías también
    useEffect(() => {
        // Actualizar contadores de categorías
        categorias.forEach(cat => {
            if (cat.value === 'todas') {
                cat.count = libros.length;
            } else {
                cat.count = libros.filter(l => l.categoria === cat.value).length;
            }
        });
    }, [libros]);
    // Reemplaza las funciones handleSearch y handleCategoriaChange con estas:

    const handleSearch = (value) => {
        aplicarFiltros(value, categoriaSeleccionada, estadoSeleccionado);
    };

    const handleCategoriaChange = (categoria) => {
        setCategoriaSeleccionada(categoria);
        aplicarFiltros('', categoria, estadoSeleccionado);
    };

    // NUEVA FUNCIÓN para manejar cambio de estado
    const handleEstadoChange = (estado) => {
        setEstadoSeleccionado(estado);
        aplicarFiltros('', categoriaSeleccionada, estado);
    };

    // NUEVA FUNCIÓN que combina todos los filtros
    const aplicarFiltros = (searchValue, categoria, estado) => {
        let filtered = libros;

        // Filtro de búsqueda
        if (searchValue.trim()) {
            filtered = filtered.filter(libro =>
                libro.titulo.toLowerCase().includes(searchValue.toLowerCase()) ||
                libro.autor.toLowerCase().includes(searchValue.toLowerCase()) ||
                libro.isbn.includes(searchValue) ||
                libro.categoria.toLowerCase().includes(searchValue.toLowerCase())
            );
        }

        // Filtro de categoría
        if (categoria !== 'todas') {
            filtered = filtered.filter(libro => libro.categoria === categoria);
        }

        // Filtro de estado
        if (estado !== 'todos') {
            filtered = filtered.filter(libro => libro.estado === estado);
        }

        setLibrosFiltrados(filtered);
    };

    const handlePrestarLibro = (libro) => {
        setLibroSeleccionado(libro);
        setIsModalVisible(true);
        form.setFieldsValue({
            fechaPrestamo: null,
            fechaDevolucion: null
        });
    };

    const handleSubmitPrestamo = async (values) => {
        try {
            setLoading(true);

            // Simular procesamiento
            await new Promise(resolve => setTimeout(resolve, 1500));

            const datosPrestamo = {
                ...values,
                libro: libroSeleccionado,
                fechaPrestamo: values.fechaPrestamo.format('YYYY-MM-DD'),
                fechaDevolucion: values.fechaDevolucion.format('YYYY-MM-DD'),
                idPrestamo: Math.random().toString(36).substr(2, 9)
            };

            console.log('Datos del préstamo:', datosPrestamo);

            // Actualizar estado del libro
            const librosActualizados = libros.map(lib =>
                lib.id === libroSeleccionado.id ? { ...lib, estado: 'prestado' } : lib
            );

            setLibros(librosActualizados);
            setLibrosFiltrados(librosActualizados);

            setIsModalVisible(false);
            form.resetFields();
            setLoading(false);

            message.success({
                content: `Préstamo registrado exitosamente para ${values.nombreAlumno}`,
                duration: 4,
                icon: <CheckCircleOutlined />
            });
        } catch (error) {
            setLoading(false);
            message.error({
                content: 'Error al registrar el préstamo. Intente nuevamente.',
                duration: 3,
                icon: <CloseCircleOutlined />
            });
        }
    };

    const getEstadoConfig = (estado) => {
        return estado === 'disponible'
            ? { color: 'green', text: 'Disponible', icon: <CheckCircleOutlined /> }
            : { color: 'red', text: 'Prestado', icon: <CloseCircleOutlined /> };
    };

    const calcularDiasPrestamo = (fechaPrestamo, fechaDevolucion) => {
        if (!fechaPrestamo || !fechaDevolucion) return 0;
        const diffTime = Math.abs(fechaDevolucion - fechaPrestamo);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const librosDisponibles = libros.filter(l => l.estado === 'disponible').length;
    const librosPrestados = libros.filter(l => l.estado === 'prestado').length;

    return (
        <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
            {/* Header con Estadísticas */}
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                <Col xs={24} md={8}>
                    <Card>
                        <Statistic
                            title="Total de Libros"
                            value={libros.length}
                            prefix={<BookOutlined />}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card>
                        <Statistic
                            title="Libros Disponibles"
                            value={librosDisponibles}
                            prefix={<CheckCircleOutlined />}
                            valueStyle={{ color: '#52c41a' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card>
                        <Statistic
                            title="Libros Prestados"
                            value={librosPrestados}
                            prefix={<CloseCircleOutlined />}
                            valueStyle={{ color: '#ff4d4f' }}
                        />
                    </Card>
                </Col>
            </Row>

            <Divider />

            {/* Buscador y Filtros */}
            {/* Buscador y Filtros - MODIFICAR ESTA SECCIÓN */}
            <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
                <Col xs={24} lg={10}>
                    <Search
                        placeholder="Buscar por título, autor, ISBN o categoría..."
                        allowClear
                        enterButton={
                            <Button type="primary" icon={<SearchOutlined />}>
                                Buscar
                            </Button>
                        }
                        size="large"
                        onSearch={handleSearch}
                        onChange={(e) => !e.target.value && aplicarFiltros('', categoriaSeleccionada, estadoSeleccionado)}
                        style={{ width: '100%' }}
                    />
                </Col>
                <Col xs={24} lg={6}>
                    <Select
                        value={categoriaSeleccionada}
                        onChange={handleCategoriaChange}
                        style={{ width: '100%' }}
                        size="large"
                        optionLabelProp="label"
                    >
                        {categorias.map(cat => (
                            <Option key={cat.value} value={cat.value} label={cat.label}>
                                <Space>
                                    <span>{cat.label.split(' ')[0]}</span>
                                    <span>{cat.label}</span>
                                    <Tag>{cat.count}</Tag>
                                </Space>
                            </Option>
                        ))}
                    </Select>
                </Col>
                <Col xs={24} lg={6}>
                    {/* NUEVO FILTRO DE ESTADO */}
                    <Select
                        value={estadoSeleccionado}
                        onChange={handleEstadoChange}
                        style={{ width: '100%' }}
                        size="large"
                        optionLabelProp="label"
                    >
                        {estados.map(estado => (
                            <Option key={estado.value} value={estado.value} label={estado.label}>
                                <Space>
                                    <span>{estado.label.split(' ')[0]}</span>
                                    <span>{estado.label}</span>
                                    <Tag>{estado.count}</Tag>
                                </Space>
                            </Option>
                        ))}
                    </Select>
                </Col>
                <Col xs={24} lg={2}>
                    <Tag color="blue" style={{ fontSize: '14px', padding: '8px 16px', width: '100%', textAlign: 'center' }}>
                        {librosFiltrados.length} libro(s)
                    </Tag>
                </Col>
            </Row>

            {/* Grid de Libros */}
            <Row gutter={[16, 16]}>
                {librosFiltrados.map(libro => {
                    const estadoConfig = getEstadoConfig(libro.estado);
                    return (
                        <Col key={libro.id} xs={24} sm={12} md={8} lg={6}>
                            <Card
                                hoverable
                                loading={loading}
                                cover={
                                    <div style={{ height: '200px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <img
                                            alt={libro.titulo}
                                            src={libro.imagen}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                            onError={(e) => {
                                                e.target.src = `https://via.placeholder.com/200x250/cccccc/969696?text=${encodeURIComponent(libro.titulo)}`;
                                            }}
                                        />
                                    </div>
                                }
                                actions={[
                                    <Button
                                        type="primary"
                                        disabled={libro.estado !== 'disponible'}
                                        onClick={() => handlePrestarLibro(libro)}
                                        icon={<UserOutlined />}

                                        size="small"
                                        style={{
                                            fontSize: '15px',
                                            padding: '6px 12px',
                                            height: '30px'
                                        }}
                                    >
                                        {libro.estado === 'disponible' ? 'Solicitar Libro' : 'No Disponible'}
                                    </Button>
                                ]}
                            >
                                <Meta
                                    avatar={<Avatar icon={<BookOutlined />} />}
                                    title={
                                        <div>
                                            <div style={{ marginBottom: 8, fontWeight: 'bold' }}>{libro.titulo}</div>
                                            <Tag
                                                color={estadoConfig.color}
                                                icon={estadoConfig.icon}
                                                style={{
                                                    margin: 0,
                                                    fontSize: '12px',
                                                    padding: '2px 8px',
                                                    lineHeight: '1.5'
                                                }}
                                            >
                                                {estadoConfig.text}
                                            </Tag>
                                        </div>
                                    }
                                    description={
                                        <div>
                                            <p><strong>Autor:</strong> {libro.autor}</p>
                                            <p><strong>Categoría:</strong> {libro.categoria}</p>
                                            <p><strong>ISBN:</strong> {libro.isbn}</p>
                                            <p><strong>Año:</strong> {libro.año}</p>
                                        </div>
                                    }
                                />
                            </Card>
                        </Col>
                    );
                })}
            </Row>

            {/* Modal de Préstamo */}
            <Modal
                title={
                    <Space>
                        <UserOutlined />
                        Registrar Préstamo de Libro
                    </Space>
                }
                open={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    form.resetFields();
                }}
                footer={null}
                width={700}
                centered
            >
                {libroSeleccionado && (
                    <Card
                        size="small"
                        style={{ marginBottom: 24 }}
                        title={
                            <Space>
                                <BookOutlined />
                                Información del Libro
                            </Space>
                        }
                    >
                        <Descriptions column={2} bordered size="small">
                            <Descriptions.Item label="Título" span={2}>
                                {libroSeleccionado.titulo}
                            </Descriptions.Item>
                            <Descriptions.Item label="Autor">
                                {libroSeleccionado.autor}
                            </Descriptions.Item>
                            <Descriptions.Item label="ISBN">
                                {libroSeleccionado.isbn}
                            </Descriptions.Item>
                            <Descriptions.Item label="Categoría">
                                {libroSeleccionado.categoria}
                            </Descriptions.Item>
                            <Descriptions.Item label="Año">
                                {libroSeleccionado.año}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                )}

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmitPrestamo}
                    requiredMark="optional"
                >
                    <Row gutter={16}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label="Nombre Completo del Alumno"
                                name="nombreAlumno"
                                rules={[{
                                    required: true,
                                    message: 'El nombre completo es obligatorio'
                                }]}
                            >
                                <Input
                                    placeholder="Escribe tu nombre completo"
                                    prefix={<UserOutlined />}
                                    size="large"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label="Matrícula"
                                name="matricula"
                                rules={[{
                                    required: true,
                                    message: 'La matrícula es obligatoria'
                                }]}
                            >
                                <Input
                                    placeholder="Ingresa tu matrícula"
                                    prefix={<IdcardOutlined />}
                                    size="large"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} md={8}>
                            <Form.Item
                                label="Carrera"
                                name="carrera"
                                rules={[{
                                    required: true,
                                    message: 'Selecciona tu carrera'
                                }]}
                            >
                                <Select
                                    placeholder="Elige tu carrera"
                                    suffixIcon={<ApartmentOutlined />}
                                    size="large"
                                >
                                    {carreras.map(carrera => (
                                        <Option key={carrera} value={carrera}>{carrera}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item
                                label="Grado"
                                name="grado"
                                rules={[{
                                    required: true,
                                    message: 'Selecciona tu grado'
                                }]}
                            >
                                <Select
                                    placeholder="Selecciona grado"
                                    suffixIcon={<TeamOutlined />}
                                    size="large"
                                >
                                    {grados.map(grado => (
                                        <Option key={grado} value={grado}>{grado}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item
                                label="Grupo"
                                name="grupo"
                                rules={[{
                                    required: true,
                                    message: 'Selecciona tu grupo'
                                }]}
                            >
                                <Select
                                    placeholder="Elige tu grupo"
                                    suffixIcon={<TeamOutlined />}
                                    size="large"
                                >
                                    {grupos.map(grupo => (
                                        <Option key={grupo} value={grupo}>{grupo}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label="Fecha de Préstamo"
                                name="fechaPrestamo"
                                rules={[{
                                    required: true,
                                    message: 'Selecciona la fecha de préstamo'
                                }]}
                            >
                                <DatePicker
                                    style={{ width: '100%' }}
                                    size="large"
                                    suffixIcon={<CalendarOutlined />}
                                    format="YYYY-MM-DD"
                                    placeholder="Elige fecha de préstamo"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label="Fecha de Devolución"
                                name="fechaDevolucion"
                                rules={[{
                                    required: true,
                                    message: 'Selecciona la fecha de devolución'
                                }]}
                            >
                                <DatePicker
                                    style={{ width: '100%' }}
                                    size="large"
                                    suffixIcon={<CalendarOutlined />}
                                    format="YYYY-MM-DD"
                                    placeholder="Elige fecha de devolución"
                                />
                            </Form.Item>
                            {/* QUITA ESTE Form.Item DE AQUÍ Y PONLO FUERA DEL Row */}
                            <Form.Item>
                                <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                                    <Button
                                        onClick={() => {
                                            setIsModalVisible(false);
                                            form.resetFields();
                                        }}
                                        size="large"
                                        disabled={loading}
                                    >
                                        Cancelar Préstamo
                                    </Button>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        size="large"
                                        loading={loading}
                                        icon={<CheckCircleOutlined />}
                                    >
                                        Prestar Libro
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default BibliotecaView;