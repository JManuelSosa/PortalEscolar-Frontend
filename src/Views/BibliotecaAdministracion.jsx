// BibliotecaAdminView.jsx
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
    DatePicker,
    Tag,
    Statistic,
    Divider,
    Avatar,
    Table,
    Space,
    message,
    Popconfirm,
    Tabs,
    Upload,
    Descriptions
} from 'antd';
import {
    SearchOutlined,
    BookOutlined,
    UserOutlined,
    CalendarOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    UploadOutlined,
    EyeOutlined
} from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;

// Datos iniciales de ejemplo
const librosIniciales = [
    {
        id: 1,
        titulo: 'Cien Años de Soledad',
        autor: 'Gabriel García Márquez',
        imagen: 'https://via.placeholder.com/150x200/4CAF50/white?text=Cien+Años',
        estado: 'disponible',
        categoria: 'Literatura',
        isbn: '978-8437604947',
        editorial: 'Editorial Sudamericana',
        año: 1967,
        descripcion: 'Una obra maestra del realismo mágico'
    },
    {
        id: 2,
        titulo: 'El Quijote de la Mancha',
        autor: 'Miguel de Cervantes',
        imagen: 'https://via.placeholder.com/150x200/2196F3/white?text=Quijote',
        estado: 'prestado',
        categoria: 'Clásicos',
        isbn: '978-8467031256',
        editorial: 'Francisco de Robles',
        año: 1605,
        descripcion: 'La obra cumbre de la literatura española',
        prestamo: {
            nombreAlumno: 'Juan Pérez',
            matricula: '2023001',
            grupo: 'A',
            grado: '3',
            carrera: 'Ingeniería',
            fechaPrestamo: '2024-01-15',
            fechaDevolucion: '2024-01-30'
        }
    }
];

const categorias = ['Literatura', 'Ciencias', 'Matemáticas', 'Clásicos', 'Historia', 'Tecnología'];

export default function BibliotecaAdminView() {
    const [libros, setLibros] = useState(librosIniciales);
    const [libroSeleccionado, setLibroSeleccionado] = useState(null);
    const [modalPrestamoVisible, setModalPrestamoVisible] = useState(false);
    const [modalGestionVisible, setModalGestionVisible] = useState(false);
    const [modalDetallesVisible, setModalDetallesVisible] = useState(false);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const [modoEdicion, setModoEdicion] = useState(false);

    const [formPrestamo] = Form.useForm();
    const [formGestion] = Form.useForm();

    // Estadísticas
    const totalLibros = libros.length;
    const librosDisponibles = libros.filter(libro => libro.estado === 'disponible').length;
    const librosPrestados = libros.filter(libro => libro.estado === 'prestado').length;

    // Filtrar libros
    const librosFiltrados = libros.filter(libro => {
        const coincideCategoria = categoriaSeleccionada === 'Todos' || libro.categoria === categoriaSeleccionada;
        const coincideBusqueda = libro.titulo.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
            libro.autor.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
            libro.isbn.includes(terminoBusqueda);
        return coincideCategoria && coincideBusqueda;
    });

    const getEstadoColor = (estado) => {
        return estado === 'disponible' ? 'green' : 'red';
    };

    const getEstadoIcon = (estado) => {
        return estado === 'disponible' ? <CheckCircleOutlined /> : <ClockCircleOutlined />;
    };

    // Columnas para la tabla de libros
    const columns = [
        {
            title: 'Portada',
            dataIndex: 'imagen',
            key: 'imagen',
            render: (imagen, record) => (
                <Avatar
                    size={64}
                    src={imagen}
                    icon={<BookOutlined />}
                    shape="square"
                />
            ),
            width: 80
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
            title: 'Categoría',
            dataIndex: 'categoria',
            key: 'categoria',
            filters: categorias.map(cat => ({ text: cat, value: cat })),
            onFilter: (value, record) => record.categoria === value
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
        }
    ];

    // Columnas para historial de préstamos / devoluciones
    const columnsHistorial = [
        { title: 'Alumno', dataIndex: 'alumno', key: 'alumno' },
        { title: 'Matrícula', dataIndex: 'matricula', key: 'matricula' },
        { title: 'Grado', dataIndex: 'grado', key: 'grado' },
        { title: 'Grupo', dataIndex: 'grupo', key: 'grupo' },
        { title: 'Libro', dataIndex: 'libro', key: 'libro' },
        { title: 'Clasificación', dataIndex: 'categoria', key: 'categoria' },
        { 
            title: 'Tipo', 
            dataIndex: 'tipo', 
            key: 'tipo',
            render: (tipo) => (
                <Tag color={tipo === 'préstamo' ? 'blue' : 'green'}>
                    {tipo.toUpperCase()}
                </Tag>
            )
        },
        { title: 'Fecha', dataIndex: 'fecha', key: 'fecha' }
    ];

    // Datos de ejemplo para historial
    const historialEjemplo = [
        {
            alumno: 'Juan Pérez',
            matricula: '2023001',
            grado: '3',
            grupo: 'A',
            libro: 'El Quijote de la Mancha',
            categoria: 'Clásicos',
            tipo: 'préstamo',
            fecha: '15/01/2024'
        },
        {
            alumno: 'Juan Pérez',
            matricula: '2023001',
            grado: '3',
            grupo: 'A',
            libro: 'El Quijote de la Mancha',
            categoria: 'Clásicos',
            tipo: 'devolución',
            fecha: '30/01/2024'
        },
        {
            alumno: 'María López',
            matricula: '2023010',
            grado: '2',
            grupo: 'B',
            libro: 'Cien Años de Soledad',
            categoria: 'Literatura',
            tipo: 'préstamo',
            fecha: '20/02/2024'
        }
    ];

    return (
        <div style={{ padding: '20px' }}>
            {/* Header con estadísticas */}
            <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Total de Libros"
                            value={totalLibros}
                            prefix={<BookOutlined />}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Disponibles"
                            value={librosDisponibles}
                            valueStyle={{ color: '#52c41a' }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Prestados"
                            value={librosPrestados}
                            valueStyle={{ color: '#f5222d' }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Porcentaje Disponible"
                            value={totalLibros > 0 ? ((librosDisponibles / totalLibros) * 100).toFixed(1) : 0}
                            suffix="%"
                            valueStyle={{ color: '#faad14' }}
                        />
                    </Card>
                </Col>
            </Row>

            <Divider />

            {/* Tabla de libros */}
            <Card>
                <Table
                    columns={columns}
                    dataSource={librosFiltrados}
                    rowKey="id"
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: 800 }}
                />
            </Card>

            {/* NUEVA SECCIÓN: Historial */}
            <Divider>Historial de Movimientos</Divider>
            <Card>
                <Table
                    columns={columnsHistorial}
                    dataSource={historialEjemplo}
                    rowKey={(record, index) => index}
                    pagination={{ pageSize: 5 }}
                />
            </Card>
        </div>
    );
}
