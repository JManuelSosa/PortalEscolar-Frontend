import React, { useState } from 'react';
import {
    Layout,
    Card,
    Row,
    Col,
    Select,
    Typography,
    Button,
    Avatar,
    Tag,
    Space,
    Badge
} from 'antd';
import {
    SearchOutlined,
    UserOutlined,
    EnvironmentOutlined,
    BookOutlined,
    ClearOutlined,
    ClockCircleFilled
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;
const { Content } = Layout;

const HorarioA = () => {
    // --- 1. DICCIONARIOS DE DATOS (Mismos datos) ---
    // Usamos colores más vibrantes para este diseño
    const subjectsMap = {
        1: { name: 'Matemáticas I', color: '#1890ff' }, // Azul brillante
        2: { name: 'Historia Universal', color: '#fa8c16' }, // Naranja vibrante
        3: { name: 'Inglés Avanzado', color: '#52c41a' }, // Verde vivo
        4: { name: 'Química Orgánica', color: '#eb2f96' } // Rosa fuerte
    };

    const teachersMap = {
        11: { name: 'Lic. Maria González' },
        16: { name: 'Prof. Alejandro Ruiz' },
        20: { name: 'Ing. Sofia López' }
    };

    const classroomsMap = {
        1: { name: 'A-101' },
        2: { name: 'B-202' },
        3: { name: 'Lab 1' }
    };

    // --- 2. TU JSON DE DATOS REALES ---
    const rawData = {
        "group_id": 1,
        "schedules": [
            { "subject_id": 1, "teacher_id": 16, "classroom_id": 1, "day": "monday", "start_hour": "16:00", "end_hour": "17:40" },
            { "subject_id": 4, "teacher_id": 20, "classroom_id": 3, "day": "monday", "start_hour": "17:40", "end_hour": "18:30" },
            { "subject_id": 1, "teacher_id": 16, "classroom_id": 1, "day": "monday", "start_hour": "18:30", "end_hour": "19:20" },
            { "subject_id": 2, "teacher_id": 11, "classroom_id": 2, "day": "monday", "start_hour": "19:20", "end_hour": "21:00" },

            { "subject_id": 1, "teacher_id": 16, "classroom_id": 1, "day": "tuesday", "start_hour": "16:00", "end_hour": "17:40" },
            { "subject_id": 4, "teacher_id": 20, "classroom_id": 3, "day": "tuesday", "start_hour": "17:40", "end_hour": "18:30" },
            { "subject_id": 1, "teacher_id": 16, "classroom_id": 1, "day": "tuesday", "start_hour": "18:30", "end_hour": "19:20" },
            { "subject_id": 2, "teacher_id": 11, "classroom_id": 2, "day": "tuesday", "start_hour": "19:20", "end_hour": "21:00" },

            { "subject_id": 1, "teacher_id": 16, "classroom_id": 1, "day": "wednesday", "start_hour": "16:00", "end_hour": "17:40" },
            { "subject_id": 4, "teacher_id": 20, "classroom_id": 3, "day": "wednesday", "start_hour": "17:40", "end_hour": "18:30" },
            { "subject_id": 1, "teacher_id": 16, "classroom_id": 1, "day": "wednesday", "start_hour": "18:30", "end_hour": "19:20" },
            { "subject_id": 2, "teacher_id": 11, "classroom_id": 2, "day": "wednesday", "start_hour": "19:20", "end_hour": "21:00" },

            { "subject_id": 1, "teacher_id": 16, "classroom_id": 1, "day": "thursday", "start_hour": "16:00", "end_hour": "17:40" },
            { "subject_id": 4, "teacher_id": 20, "classroom_id": 3, "day": "thursday", "start_hour": "17:40", "end_hour": "18:30" },
            { "subject_id": 1, "teacher_id": 16, "classroom_id": 1, "day": "thursday", "start_hour": "18:30", "end_hour": "19:20" },
            { "subject_id": 2, "teacher_id": 11, "classroom_id": 2, "day": "thursday", "start_hour": "19:20", "end_hour": "21:00" },

            { "subject_id": 1, "teacher_id": 16, "classroom_id": 1, "day": "friday", "start_hour": "16:00", "end_hour": "17:40" },
            { "subject_id": 4, "teacher_id": 20, "classroom_id": 3, "day": "friday", "start_hour": "17:40", "end_hour": "18:30" },
            { "subject_id": 1, "teacher_id": 16, "classroom_id": 1, "day": "friday", "start_hour": "18:30", "end_hour": "19:20" },
            { "subject_id": 2, "teacher_id": 11, "classroom_id": 2, "day": "friday", "start_hour": "19:20", "end_hour": "21:00" }
        ]
    };

    // --- 3. PROCESAMIENTO DE DATOS ---
    const processedSchedule = rawData.schedules.map((item, index) => ({
        id: index,
        day: item.day,
        startTime: item.start_hour,
        endTime: item.end_hour,
        subject: subjectsMap[item.subject_id]?.name || 'Desconocida',
        teacher: teachersMap[item.teacher_id]?.name || 'Por asignar',
        room: classroomsMap[item.classroom_id]?.name || 'Sin Aula',
        color: subjectsMap[item.subject_id]?.color || '#8c8c8c'
    }));

    // --- 4. CONFIGURACIÓN DEL GRID ---
    const uniqueTimeSlots = [...new Set(processedSchedule.map(s => s.startTime))].sort();
    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    const dayLabels = { monday: 'Lunes', tuesday: 'Martes', wednesday: 'Miércoles', thursday: 'Jueves', friday: 'Viernes' };

    // --- 5. ESTADOS Y FILTROS ---
    const [selectedTeacherId, setSelectedTeacherId] = useState(null);
    const [selectedSubjectId, setSelectedSubjectId] = useState(null);

    const getEvent = (day, startTime) => {
        let event = processedSchedule.find(e => e.day === day && e.startTime === startTime);
        if (event) {
            const originalItem = rawData.schedules.find(s => s.day === day && s.start_hour === startTime);
            if (selectedTeacherId && originalItem.teacher_id !== selectedTeacherId) return null;
            if (selectedSubjectId && originalItem.subject_id !== selectedSubjectId) return null;
        }
        return event;
    };

    const clearFilters = () => {
        setSelectedTeacherId(null);
        setSelectedSubjectId(null);
    };

    // Helper para oscurecer el color del texto sobre el fondo tintado
    const getDarkerColor = (hexColor) => {
        // Esta es una simplificación, en un proyecto real usarías una librería como 'tinycolor2'
        // para oscurecer el color un 20-30% para el texto.
        // Por ahora, usaremos el mismo color vibrante que se verá bien sobre el tinte claro.
        return hexColor;
    };

    return (
        <Layout style={{ minHeight: '100vh', background: '#f8faff', padding: '30px 40px' }}>
            <Content>

                {/* --- HEADER MODERNO --- */}
                <div style={{ marginBottom: '35px', textAlign: 'center' }}>
                    <Badge.Ribbon text="Ciclo Vespertino" color="purple">
                        <Card bordered={false} style={{ borderRadius: '20px', background: 'linear-gradient(135deg, #002766 0%, #0050b3 100%)', color: 'white', boxShadow: '0 8px 20px rgba(0,39,102,0.2)' }}>
                            <Title level={2} style={{ margin: '10px 0 5px 0', color: 'white', fontWeight: 800, letterSpacing: '1px' }}>
                                HORARIO ACADÉMICO
                            </Title>
                            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px' }}>
                                Grupo {rawData.group_id} • Semestre 2025-A
                            </Text>
                        </Card>
                    </Badge.Ribbon>
                </div>

                {/* --- ÁREA DE FILTROS (Tarjeta Flotante) --- */}
                <Card
                    bordered={false}
                    style={{ borderRadius: '16px', marginBottom: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}
                    bodyStyle={{ padding: '24px' }}
                >
                    <Row gutter={[24, 24]} align="middle">
                        <Col xs={24} md={8}>
                            <Text strong style={{ fontSize: '15px' }}><UserOutlined style={{ color: '#1890ff' }} /> Filtrar Docente:</Text>
                            <Select
                                placeholder="Todos los maestros"
                                style={{ width: '100%', marginTop: 8 }}
                                size="large"
                                allowClear
                                value={selectedTeacherId}
                                onChange={setSelectedTeacherId}
                                className="rounded-select" // Clase CSS personalizada si fuera necesario
                            >
                                {Object.entries(teachersMap).map(([id, data]) => (
                                    <Option key={id} value={parseInt(id)}>{data.name}</Option>
                                ))}
                            </Select>
                        </Col>

                        <Col xs={24} md={8}>
                            <Text strong style={{ fontSize: '15px' }}><BookOutlined style={{ color: '#eb2f96' }} /> Filtrar Materia:</Text>
                            <Select
                                placeholder="Todas las materias"
                                style={{ width: '100%', marginTop: 8 }}
                                size="large"
                                allowClear
                                value={selectedSubjectId}
                                onChange={setSelectedSubjectId}
                            >
                                {Object.entries(subjectsMap).map(([id, data]) => (
                                    <Option key={id} value={parseInt(id)}>{data.name}</Option>
                                ))}
                            </Select>
                        </Col>

                        <Col xs={24} md={8} style={{ display: 'flex', alignItems: 'flex-end' }}>
                            {(selectedTeacherId || selectedSubjectId) ? (
                                <Button
                                    icon={<ClearOutlined />}
                                    onClick={clearFilters}
                                    block
                                    size="large"
                                    type="primary"
                                    danger
                                    style={{ borderRadius: '8px', height: '45px', fontWeight: 'bold', marginTop: '30px' }}
                                >
                                    Limpiar Filtros Activos
                                </Button>
                            ) : (
                                <div style={{ marginTop: '30px', width: '100%', textAlign: 'center', color: '#ccc' }}>
                                    <Text disabled>Sin filtros aplicados</Text>
                                </div>
                            )}
                        </Col>
                    </Row>
                </Card>

                {/* --- GRID DEL HORARIO (ESTILO VIBRANTE) --- */}
                <div style={{ overflowX: 'auto', paddingBottom: '20px' }}>
                    {/* Usamos border-spacing grande para separar las "tarjetas" */}
                    <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '15px 15px' }}>

                        {/* Encabezados (Días) */}
                        <thead>
                            <tr>
                                <th style={{ width: '80px' }}></th> {/* Espacio para la columna de horas */}
                                {daysOfWeek.map(day => (
                                    <th key={day} style={{
                                        textAlign: 'center',
                                        padding: '15px',
                                        fontSize: '16px',
                                        fontWeight: 800,
                                        color: '#002766',
                                        letterSpacing: '1px'
                                    }}>
                                        {dayLabels[day].toUpperCase()}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        {/* Cuerpo */}
                        <tbody>
                            {uniqueTimeSlots.map((time, index) => (
                                <tr key={index}>
                                    {/* Columna Hora (Minimalista) */}
                                    <td style={{
                                        textAlign: 'right',
                                        paddingRight: '15px',
                                        fontWeight: 'bold',
                                        color: '#999',
                                        fontSize: '14px',
                                        verticalAlign: 'top',
                                        paddingTop: '20px'
                                    }}>
                                        {time}
                                    </td>

                                    {/* Celdas de Clases (TARJETAS VIBRANTES) */}
                                    {daysOfWeek.map(day => {
                                        const event = getEvent(day, time);

                                        return (
                                            <td key={day} style={{ verticalAlign: 'top', height: '140px' }}>
                                                {event ? (
                                                    <div style={{
                                                        height: '100%',
                                                        // Tinte del color de fondo (usando opacidad hex)
                                                        backgroundColor: `${event.color}15`, // 15% de opacidad
                                                        // Borde izquierdo grueso y sólido
                                                        borderLeft: `6px solid ${event.color}`,
                                                        borderRadius: '16px',
                                                        padding: '16px',
                                                        boxShadow: '0 6px 15px rgba(0,0,0,0.06)',
                                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                                        cursor: 'default',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'space-between'
                                                    }}
                                                        // Efecto hover simple (puedes quitarlo si prefieres estático)
                                                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)'; }}
                                                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.06)'; }}
                                                    >
                                                        <div>
                                                            {/* Título de Materia Grande y Colorido */}
                                                            <Text style={{
                                                                color: getDarkerColor(event.color),
                                                                fontSize: '18px',
                                                                fontWeight: 800,
                                                                lineHeight: 1.2,
                                                                display: 'block',
                                                                marginBottom: '8px'
                                                            }}>
                                                                {event.subject}
                                                            </Text>
                                                            {/* Horario con icono */}
                                                            <Tag color={event.color} style={{ borderRadius: '12px', fontWeight: 'bold', border: 'none' }}>
                                                                <ClockCircleFilled /> {event.startTime} - {event.endTime}
                                                            </Tag>
                                                        </div>

                                                        {/* Detalles Inferiores */}
                                                        <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: `1px solid ${event.color}30` }}>
                                                            <Space direction="vertical" size={4} style={{ width: '100%' }}>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                                    <Avatar size={24} icon={<UserOutlined />} style={{ backgroundColor: event.color, color: 'white' }} />
                                                                    <Text strong style={{ fontSize: '13px', color: '#555' }}>{event.teacher}</Text>
                                                                </div>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '4px' }}>
                                                                    <EnvironmentOutlined style={{ color: '#999' }} />
                                                                    <Text style={{ fontSize: '12px', color: '#777' }}>Salón: {event.room}</Text>
                                                                </div>
                                                            </Space>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    // Celda Vacía (Transparente)
                                                    <div style={{
                                                        height: '100%',
                                                        borderRadius: '16px',
                                                        // Fondo muy sutil para indicar el espacio
                                                        background: 'rgba(0,0,0,0.01)',
                                                        border: '2px dashed rgba(0,0,0,0.05)'
                                                    }} />
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </Content>
        </Layout>
    );
};

export default HorarioA;