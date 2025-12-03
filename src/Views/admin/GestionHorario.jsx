import React, { useState, useMemo } from 'react';
import {
    Button, Modal, Form, Select, TimePicker, Input,
    message, Popconfirm, Tooltip, Tag, Divider
} from "antd";
import {
    PlusOutlined, EditOutlined, DeleteOutlined,
    ClockCircleOutlined, UserOutlined, EnvironmentOutlined,
    FilterOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
// Asegúrate de que este import apunte a tu archivo CSS moderno
import '@css/Views/admin/GestionHorario.css';

const { Option } = Select;

export default function GestionHorarioGruposModern() {
    // --- ESTADOS DE FILTROS (Contexto Global) ---
    const [selectedGrade, setSelectedGrade] = useState('1°');
    const [selectedGroup, setSelectedGroup] = useState('A');
    const [selectedShift, setSelectedShift] = useState('Matutino');

    // --- ESTADOS DE UI ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [form] = Form.useForm();

    // --- DATOS SIMULADOS (CATÁLOGOS) ---
    // Listas para los Selects
    const teachersList = [
        { label: 'Ing. Roberto Perez', value: 'Ing. Roberto Perez' },
        { label: 'Lic. Ana Luisa Salas', value: 'Lic. Ana Luisa Salas' },
        { label: 'Lic. Carlos Lopez', value: 'Lic. Carlos Lopez' },
        { label: 'Ing. Dev', value: 'Ing. Dev' },
        { label: 'Entrenador Mike', value: 'Entrenador Mike' }
    ];

    const classroomsList = [
        { label: 'Aula A-1', value: 'Aula A-1' },
        { label: 'Aula A-2', value: 'Aula A-2' },
        { label: 'Laboratorio 1', value: 'Laboratorio 1' },
        { label: 'Laboratorio 2', value: 'Laboratorio 2' },
        { label: 'Cancha Principal', value: 'Cancha Principal' },
        { label: 'Sala Audiovisual', value: 'Sala Audiovisual' }
    ];

    const subjectsList = [
        { label: 'Matemáticas', value: 'Matemáticas' },
        { label: 'Español', value: 'Español' },
        { label: 'Historia', value: 'Historia' },
        { label: 'Programación', value: 'Programación' },
        { label: 'Química', value: 'Química' },
        { label: 'Educación Física', value: 'Educación Física' }
    ];

    // --- DATOS DE HORARIOS ---
    const [allSchedules, setAllSchedules] = useState([
        { id: 1, grado: '1°', grupo: 'A', turno: 'Matutino', dia: 'Lunes', materia: 'Matemáticas', maestro: 'Ing. Roberto Perez', aula: 'Aula A-1', start: '08:00', end: '10:00', color: '#4776E6' },
        { id: 2, grado: '1°', grupo: 'A', turno: 'Matutino', dia: 'Lunes', materia: 'Español', maestro: 'Lic. Ana Luisa Salas', aula: 'Aula A-1', start: '10:30', end: '12:00', color: '#00b894' },
        { id: 3, grado: '1°', grupo: 'A', turno: 'Matutino', dia: 'Martes', materia: 'Historia', maestro: 'Lic. Carlos Lopez', aula: 'Aula A-1', start: '08:00', end: '09:30', color: '#fd79a8' },
        { id: 4, grado: '3°', grupo: 'B', turno: 'Vespertino', dia: 'Lunes', materia: 'Programación', maestro: 'Ing. Dev', aula: 'Laboratorio 2', start: '14:00', end: '16:00', color: '#6c5ce7' },
    ]);

    const daysOfWeek = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];

    // --- FILTRADO AUTOMÁTICO ---
    const filteredSchedules = useMemo(() => {
        return allSchedules.filter(s =>
            s.grado === selectedGrade &&
            s.grupo === selectedGroup &&
            s.turno === selectedShift
        );
    }, [allSchedules, selectedGrade, selectedGroup, selectedShift]);

    // --- CRUD ---
    const openModal = (item = null, day = 'Lunes') => {
        setEditingItem(item);
        if (item) {
            form.setFieldsValue({
                ...item,
                rangoHora: [dayjs(item.start, 'HH:mm'), dayjs(item.end, 'HH:mm')]
            });
        } else {
            form.resetFields();
            form.setFieldsValue({ dia: day, turno: selectedShift });
        }
        setIsModalOpen(true);
    };

    const handleSave = (values) => {
        const start = values.rangoHora[0].format('HH:mm');
        const end = values.rangoHora[1].format('HH:mm');

        // Colores modernos automáticos
        const colors = { 'Matemáticas': '#4776E6', 'Historia': '#fd79a8', 'Español': '#00b894', 'Programación': '#6c5ce7', 'Química': '#e17055', 'Educación Física': '#fdcb6e' };
        const color = colors[values.materia] || '#4776E6';

        const newItem = {
            id: editingItem ? editingItem.id : Date.now(),
            ...values,
            grado: selectedGrade,
            grupo: selectedGroup,
            turno: values.turno,
            start,
            end,
            color
        };

        if (editingItem) {
            setAllSchedules(prev => prev.map(item => item.id === editingItem.id ? newItem : item));
            message.success('Clase actualizada');
        } else {
            setAllSchedules(prev => [...prev, newItem]);
            message.success('Clase agregada');
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        setAllSchedules(prev => prev.filter(item => item.id !== id));
        message.success('Clase eliminada');
    };

    return (
        <div className="group-schedule-container">

            {/* BARRA DE FILTROS SUPERIOR */}
            <div className="context-bar">
                <div className="filter-group">
                    <FilterOutlined style={{ fontSize: 20, color: '#4776E6' }} />
                    <div>
                        <span className="filter-label">Grado</span>
                        <Select value={selectedGrade} onChange={setSelectedGrade} style={{ width: 70, marginLeft: 8 }} bordered={false} options={['1°', '2°', '3°'].map(g => ({ value: g, label: g }))} />
                    </div>
                    <Divider type="vertical" style={{ height: '30px' }} />
                    <div>
                        <span className="filter-label">Grupo</span>
                        <Select value={selectedGroup} onChange={setSelectedGroup} style={{ width: 70, marginLeft: 8 }} bordered={false} options={['A', 'B', 'C'].map(g => ({ value: g, label: g }))} />
                    </div>
                    <Divider type="vertical" style={{ height: '30px' }} />
                    <div>
                        <span className="filter-label">Turno</span>
                        <Select value={selectedShift} onChange={setSelectedShift} style={{ width: 110, marginLeft: 8 }} bordered={false} options={['Matutino', 'Vespertino'].map(t => ({ value: t, label: t }))} />
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                    <div className="viewing-tag">
                        Viendo: {selectedGrade} "{selectedGroup}" - {selectedShift}
                    </div>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        className="btn-add-context"
                        onClick={() => openModal(null)}
                    >
                        Agregar Clase
                    </Button>
                </div>
            </div>

            {/* TABLERO VISUAL (GRID) */}
            <div className="board-grid">
                {daysOfWeek.map(day => {
                    const dayClasses = filteredSchedules
                        .filter(s => s.dia === day)
                        .sort((a, b) => a.start.localeCompare(b.start));

                    return (
                        <div key={day} className="day-column">
                            <div className="day-title">{day}</div>

                            {dayClasses.map(item => (
                                <div key={item.id} className="schedule-card" style={{ borderLeftColor: item.color }}>

                                    <div className="card-time">
                                        <ClockCircleOutlined /> {item.start} - {item.end}
                                    </div>

                                    <h4 className="card-subject">{item.materia}</h4>

                                    <div className="card-details">
                                        <div className="card-detail-item">
                                            <UserOutlined style={{ color: '#4776E6' }} /> {item.maestro}
                                        </div>
                                        <div className="card-detail-item">
                                            <EnvironmentOutlined style={{ color: '#fd79a8' }} /> {item.aula}
                                        </div>
                                    </div>

                                    <div className="card-hover-actions">
                                        <Tooltip title="Editar">
                                            <Button shape="circle" size="small" icon={<EditOutlined />} onClick={() => openModal(item)} style={{ border: '1px solid #d9d9d9', color: '#555' }} />
                                        </Tooltip>
                                        <Popconfirm title="Borrar?" onConfirm={() => handleDelete(item.id)}>
                                            <Button shape="circle" size="small" danger icon={<DeleteOutlined />} style={{ border: '1px solid #ff4d4f' }} />
                                        </Popconfirm>
                                    </div>
                                </div>
                            ))}

                            <Button
                                className="btn-quick-add"
                                block
                                icon={<PlusOutlined />}
                                onClick={() => openModal(null, day)}
                            >
                                Añadir
                            </Button>
                        </div>
                    );
                })}
            </div>

            {/* MODAL FORMULARIO ACTUALIZADO */}
            <Modal
                title={editingItem ? "Editar Clase" : `Nueva Clase`}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                centered
                width={500}
                styles={{ mask: { backdropFilter: 'blur(4px)' } }}
            >
                <Form form={form} layout="vertical" onFinish={handleSave} style={{ marginTop: 25 }}>

                    <Form.Item name="materia" label="Materia" rules={[{ required: true }]}>
                        <Select placeholder="Selecciona..." size="large" options={subjectsList} />
                    </Form.Item>

                    <div style={{ display: 'flex', gap: 15 }}>
                        <Form.Item name="dia" label="Día" style={{ flex: 1 }} rules={[{ required: true }]}>
                            <Select size="large" options={daysOfWeek.map(d => ({ value: d, label: d }))} />
                        </Form.Item>

                        <Form.Item name="turno" label="Turno" style={{ flex: 1 }} rules={[{ required: true }]}>
                            <Select size="large" options={[{ value: 'Matutino', label: 'Matutino' }, { value: 'Vespertino', label: 'Vespertino' }]} />
                        </Form.Item>
                    </div>

                    {/* AQUÍ ESTÁ EL CAMBIO PRINCIPAL: SELECTS EN LUGAR DE INPUTS */}
                    <div style={{ display: 'flex', gap: 15 }}>
                        <Form.Item name="maestro" label="Maestro" style={{ flex: 1 }} rules={[{ required: true, message: 'Selecciona un docente' }]}>
                            <Select
                                size="large"
                                placeholder="Docente"
                                options={teachersList}
                                showSearch
                                optionFilterProp="label"
                            />
                        </Form.Item>
                        <Form.Item name="aula" label="Aula" style={{ flex: 1 }} rules={[{ required: true, message: 'Selecciona un aula' }]}>
                            <Select
                                size="large"
                                placeholder="Salón"
                                options={classroomsList}
                                showSearch
                                optionFilterProp="label"
                            />
                        </Form.Item>
                    </div>

                    <Form.Item name="rangoHora" label="Horario" rules={[{ required: true }]}>
                        <TimePicker.RangePicker size="large" format="HH:mm" style={{ width: '100%' }} minuteStep={10} />
                    </Form.Item>

                    <div style={{ textAlign: 'right', marginTop: 25 }}>
                        <Button size="large" onClick={() => setIsModalOpen(false)} style={{ marginRight: 10, borderRadius: '8px' }}>Cancelar</Button>
                        <Button type="primary" size="large" htmlType="submit" className="btn-add-context">
                            {editingItem ? "Guardar Cambios" : "Crear Clase"}
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
}