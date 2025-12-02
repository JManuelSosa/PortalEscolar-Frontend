// AttendanceView.jsx
import React, { useState, useEffect } from 'react';
import attendancecss from '@css/Views/AttendanceView.module.css';

import {
    Row, Col, Card, Table, Tag, Button, Modal, Form, Input,
    Select, DatePicker, Space, message, Popconfirm, Tabs,
    Descriptions, Statistic, Divider, Avatar, Radio, Alert,
    Progress, Tooltip, Badge, Timeline
} from 'antd';
import {
    UserOutlined, TeamOutlined, HistoryOutlined, CheckCircleOutlined,
    ClockCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined,
    CalendarOutlined, BookOutlined, EnvironmentOutlined,
    SaveOutlined, ReloadOutlined, FileTextOutlined, BarChartOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;

// Configuración de API - usa window.location para determinar la URL base
const getApiBaseUrl = () => {
    // Si estás en desarrollo
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:8000/api';
    }
    // Si estás en producción, usa la misma URL del frontend
    return '/api';
};

const API_BASE_URL = getApiBaseUrl();

export default function AttendanceView() {
    // Estados principales
    const [attendanceData, setAttendanceData] = useState(null);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    // Estados para modales y vistas
    const [modalJustificationVisible, setModalJustificationVisible] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [activeTab, setActiveTab] = useState('today');
    const [attendanceHistory, setAttendanceHistory] = useState({});
    const [justificationForm] = Form.useForm();

    // Cargar datos iniciales
    useEffect(() => {
        loadAttendanceForm();
    }, []);

    // Función para obtener el token de autenticación
    const getAuthToken = () => {
        return localStorage.getItem('token') || sessionStorage.getItem('token');
    };

    // Función para hacer peticiones HTTP con autenticación
    const fetchWithAuth = async (url, options = {}) => {
        const token = getAuthToken();
        console.log()
        if (!token) {
            message.error('No se encontró token de autenticación');
            throw new Error('No authentication token found');
        }

        const defaultOptions = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                ...options.headers,
            },
        };

        try {
            const fullUrl = `${API_BASE_URL}${url}`;
            console.log('Making request to:', fullUrl);

            const response = await fetch(fullUrl, {
                ...defaultOptions,
                ...options,
            });

            if (!response.ok) {
                if (response.status === 401) {
                    // Token expirado o inválido
                    localStorage.removeItem('token');
                    sessionStorage.removeItem('token');
                    message.error('Sesión expirada. Redirigiendo al login...');
                    setTimeout(() => {
                        window.location.href = '/login';
                    }, 2000);
                    throw new Error('Authentication failed');
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    };

    const loadAttendanceForm = async () => {
        setLoading(true);
        try {
            const result = await fetchWithAuth('/teacher/attendance/form');
            console.log(result);

            if (result.success) {
                setAttendanceData(result.data);
                setStudents(result.data.students || []);
                message.success('Datos de asistencia cargados correctamente');
            } else {
                message.error(result.error || 'Error al cargar el formulario');
                // Si no hay clase activa, establecer attendanceData como null
                setAttendanceData(null);
            }
        } catch (error) {
            console.error('Error loading attendance form:', error);
            message.error(error.message || 'Error al cargar el formulario de asistencia');
            setAttendanceData(null);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = (studentId, newStatus) => {
        const updatedStudents = students.map(student =>
            student.group_enrollment_id === studentId
                ? { ...student, current_status: newStatus }
                : student
        );
        setStudents(updatedStudents);
        setHasChanges(true);
    };

    const saveAttendance = async () => {
        if (!hasChanges) {
            message.info('No hay cambios para guardar');
            return;
        }

        if (!attendanceData) {
            message.error('No hay datos de clase disponibles');
            return;
        }

        setSaving(true);
        try {
            const attendanceDataToSend = students.map(student => ({
                group_enrollment_id: student.group_enrollment_id,
                status: student.current_status
            }));

            const result = await fetchWithAuth('/teacher/attendance/store', {
                method: 'POST',
                body: JSON.stringify({
                    attendance_data: attendanceDataToSend,
                    schedule_id: attendanceData.schedule.id,
                    historic_period_id: attendanceData.historic_period.id
                })
            });

            if (result.success) {
                message.success(result.message || 'Asistencia guardada correctamente');
                setHasChanges(false);

                // Recargar los datos para obtener información actualizada
                await loadAttendanceForm();
            } else {
                message.error(result.error || 'Error al guardar la asistencia');
            }
        } catch (error) {
            console.error('Error saving attendance:', error);
            message.error(error.message || 'Error al guardar la asistencia');
        } finally {
            setSaving(false);
        }
    };

    const loadAttendanceHistory = async (groupId) => {
        try {
            const result = await fetchWithAuth(`/teacher/attendance/history/${groupId}`);

            if (result.success) {
                setAttendanceHistory(result.data || {});
                message.success('Historial cargado correctamente');
            } else {
                message.error(result.error || 'Error al cargar el historial');
            }
        } catch (error) {
            console.error('Error loading attendance history:', error);
            message.error(error.message || 'Error al cargar el historial');
        }
    };

    const loadJustifications = async (groupId) => {
        try {
            const result = await fetchWithAuth(`/teacher/attendance/justifications/${groupId}`);

            if (result.success) {
                message.success('Justificaciones cargadas correctamente');
                // Aquí puedes manejar las justificaciones si las necesitas
                console.log('Justifications:', result.data);
            } else {
                message.error(result.error || 'Error al cargar las justificaciones');
            }
        } catch (error) {
            console.error('Error loading justifications:', error);
            message.error('Error al cargar las justificaciones');
        }
    };

    const submitJustification = async (values) => {
        if (!selectedStudent) return;

        try {
            // Aquí puedes implementar la llamada a la API para enviar justificaciones
            // Por ahora es un ejemplo
            const justificationData = {
                group_enrollment_id: selectedStudent.group_enrollment_id,
                ...values,
                request_date: new Date().toISOString().split('T')[0]
            };

            console.log('Enviando justificación:', justificationData);

            // Simular éxito por ahora
            message.success('Justificación enviada correctamente');
            setModalJustificationVisible(false);
            justificationForm.resetFields();
        } catch (error) {
            console.error('Error submitting justification:', error);
            message.error('Error al enviar la justificación');
        }
    };

    // Estadísticas en tiempo real
    const getAttendanceStats = () => {
        const total = students.length;
        const attendance = students.filter(s => s.current_status === 'attendance').length;
        const absence = students.filter(s => s.current_status === 'absence').length;
        const delay = students.filter(s => s.current_status === 'attendance_delay').length;
        const pending = students.filter(s => s.current_status === 'pending').length;

        return {
            total,
            attendance,
            absence,
            delay,
            pending,
            percentage: total > 0 ? Math.round((attendance / total) * 100) : 0
        };
    };

    const stats = getAttendanceStats();

    const getStatusColor = (status) => {
        const colors = {
            attendance: 'green',
            absence: 'red',
            attendance_delay: 'orange',
            pending: 'default'
        };
        return colors[status] || 'default';
    };

    const getStatusIcon = (status) => {
        const icons = {
            attendance: <CheckCircleOutlined />,
            absence: <CloseCircleOutlined />,
            attendance_delay: <ClockCircleOutlined />,
            pending: <ExclamationCircleOutlined />
        };
        return icons[status] || <ExclamationCircleOutlined />;
    };

    const getStatusText = (status) => {
        const texts = {
            attendance: 'Asistió',
            absence: 'Falta',
            attendance_delay: 'Retardo',
            pending: 'Pendiente'
        };
        return texts[status] || 'Pendiente';
    };

    // Columnas para la tabla de asistencia
    const attendanceColumns = [
        {
            title: 'Estudiante',
            dataIndex: 'student_name',
            key: 'student_name',
            render: (text, record) => (
                <Space>
                    <Avatar icon={<UserOutlined />} size="small" />
                    <div>
                        <div style={{ fontWeight: '500' }}>{text}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                            Matrícula: {record.enrollment_code}
                        </div>
                    </div>
                </Space>
            ),
            width: 250
        },
        {
            title: 'Estado Actual',
            dataIndex: 'current_status',
            key: 'current_status',
            render: (status) => (
                <Tag
                    color={getStatusColor(status)}
                    icon={getStatusIcon(status)}
                    style={{ minWidth: '100px', textAlign: 'center' }}
                >
                    {getStatusText(status)}
                </Tag>
            ),
            width: 150
        },
        {
            title: 'Acción',
            key: 'action',
            render: (_, record) => (
                <Radio.Group
                    value={record.current_status}
                    onChange={(e) => handleStatusChange(record.group_enrollment_id, e.target.value)}
                    buttonStyle="solid"
                    size="small"
                >
                    <Radio.Button value="attendance" className={attendancecss.radioSuccess}>
                        <CheckCircleOutlined /> Asistió
                    </Radio.Button>
                    <Radio.Button value="absence" className={attendancecss.radioDanger}>
                        <CloseCircleOutlined /> Falta
                    </Radio.Button>
                    <Radio.Button value="attendance_delay" className={attendancecss.radioWarning}>
                        <ClockCircleOutlined /> Retardo
                    </Radio.Button>
                </Radio.Group>
            ),
            width: 300
        },
        {
            title: 'Justificación',
            key: 'justification',
            render: (_, record) => (
                <Button
                    size="small"
                    icon={<FileTextOutlined />}
                    onClick={() => {
                        setSelectedStudent(record);
                        setModalJustificationVisible(true);
                    }}
                    disabled={record.current_status !== 'absence'}
                >
                    Justificar
                </Button>
            ),
            width: 120
        }
    ];

    // Columnas para el historial
    const historyColumns = [
        {
            title: 'Fecha',
            dataIndex: 'attendance_date',
            key: 'attendance_date',
            render: (date) => (
                <Space>
                    <CalendarOutlined />
                    {new Date(date).toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </Space>
            )
        },
        {
            title: 'Estudiante',
            dataIndex: 'student_name',
            key: 'student_name'
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={getStatusColor(status)} icon={getStatusIcon(status)}>
                    {getStatusText(status)}
                </Tag>
            )
        },
        {
            title: 'Registrado',
            dataIndex: 'recorded_at',
            key: 'recorded_at',
            render: (datetime) => datetime ? new Date(datetime).toLocaleString('es-ES') : 'No registrado'
        }
    ];

    if (loading) {
        return (
            <div className={attendancecss.loadingContainer}>
                <Card loading={true}>
                    <div style={{ height: '400px' }}></div>
                </Card>
            </div>
        );
    }

    if (!attendanceData) {
        return (
            <div className={attendancecss.errorContainer}>
                <Alert
                    message="No hay clase activa"
                    description="No se encontró una clase programada para este horario o no tienes permisos para acceder."
                    type="info"
                    showIcon
                    action={
                        <Button size="small" onClick={loadAttendanceForm}>
                            Reintentar
                        </Button>
                    }
                />
            </div>
        );
    }

    return (
        <div className={attendancecss.attendanceView}>
            {/* Header con información de la clase */}
            <Card className={attendancecss.classHeader}>
                <Row gutter={16} align="middle">
                    <Col span={16}>
                        <Space direction="vertical" size="small">
                            <h1 className={attendancecss.classTitle}>
                                <BookOutlined /> {attendanceData.class_info?.subject || 'Clase'}
                            </h1>
                            <Space size="large">
                                <span className={attendancecss.classInfo}>
                                    <TeamOutlined /> {attendanceData.class_info?.group || 'Grupo'}
                                </span>
                                <span className={attendancecss.classInfo}>
                                    <ClockCircleOutlined /> {attendanceData.class_info?.time || 'Horario'}
                                </span>
                                <span className={attendancecss.classInfo}>
                                    <EnvironmentOutlined /> {attendanceData.class_info?.classroom || 'Aula'}
                                </span>
                                <span className={attendancecss.classInfo}>
                                    <CalendarOutlined /> {attendanceData.class_info?.day || 'Día'}
                                </span>
                            </Space>
                        </Space>
                    </Col>
                    <Col span={8} style={{ textAlign: 'right' }}>
                        <Space direction="vertical" size="small">
                            <div className={attendancecss.dateDisplay}>
                                {new Date().toLocaleDateString('es-ES', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                            <Button
                                type="primary"
                                icon={<SaveOutlined />}
                                loading={saving}
                                onClick={saveAttendance}
                                disabled={!hasChanges}
                                size="large"
                            >
                                Guardar Asistencia
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Card>

            {/* Estadísticas en tiempo real */}
            <Row gutter={16} className={attendancecss.statsRow}>
                <Col span={6}>
                    <Card className={attendancecss.statCard}>
                        <Statistic
                            title="Total Estudiantes"
                            value={stats.total}
                            prefix={<TeamOutlined />}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card className={attendancecss.statCard}>
                        <Statistic
                            title="Asistencia"
                            value={stats.attendance}
                            valueStyle={{ color: '#52c41a' }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card className={attendancecss.statCard}>
                        <Statistic
                            title="Faltas"
                            value={stats.absence}
                            valueStyle={{ color: '#ff4d4f' }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card className={attendancecss.statCard}>
                        <Statistic
                            title="Porcentaje Asistencia"
                            value={stats.percentage}
                            suffix="%"
                            valueStyle={{ color: stats.percentage >= 80 ? '#52c41a' : '#faad14' }}
                        />
                        <Progress
                            percent={stats.percentage}
                            size="small"
                            status={stats.percentage >= 80 ? 'success' : 'normal'}
                        />
                    </Card>
                </Col>
            </Row>

            <Divider className={attendancecss.sectionDivider} />

            {/* Tabs principales */}
            <Card>
                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    type="card"
                >
                    {/* Tab de Asistencia del Día */}
                    <TabPane
                        tab={
                            <span>
                                <CheckCircleOutlined />
                                Asistencia de Hoy
                                {hasChanges && <Badge dot style={{ marginLeft: 8 }} />}
                            </span>
                        }
                        key="today"
                    >
                        <div className={attendancecss.tabActions}>
                            <Space>
                                <Button
                                    icon={<ReloadOutlined />}
                                    onClick={loadAttendanceForm}
                                    loading={loading}
                                >
                                    Actualizar
                                </Button>
                                <span className={attendancecss.changesIndicator}>
                                    {hasChanges ? '⚠️ Cambios sin guardar' : '✅ Todo guardado'}
                                </span>
                            </Space>
                        </div>

                        <Table
                            columns={attendanceColumns}
                            dataSource={students}
                            rowKey="group_enrollment_id"
                            pagination={false}
                            scroll={{ x: 800 }}
                            className={attendancecss.attendanceTable}
                            loading={loading}
                        />
                    </TabPane>

                    {/* Tab de Historial */}
                    <TabPane
                        tab={
                            <span>
                                <HistoryOutlined />
                                Historial
                            </span>
                        }
                        key="history"
                    >
                        <div className={attendancecss.tabActions}>
                            <Button
                                icon={<BarChartOutlined />}
                                onClick={() => loadAttendanceHistory(attendanceData.schedule.group_id)}
                            >
                                Cargar Historial
                            </Button>
                            <Button
                                icon={<FileTextOutlined />}
                                onClick={() => loadJustifications(attendanceData.schedule.group_id)}
                            >
                                Cargar Justificaciones
                            </Button>
                        </div>

                        {Object.keys(attendanceHistory).length > 0 ? (
                            Object.entries(attendanceHistory).map(([date, records]) => (
                                <div key={date} className={attendancecss.historyDay}>
                                    <h3 className={attendancecss.historyDate}>
                                        {new Date(date).toLocaleDateString('es-ES', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </h3>
                                    <Table
                                        columns={historyColumns}
                                        dataSource={records}
                                        rowKey="id"
                                        size="small"
                                        pagination={false}
                                    />
                                    <Divider />
                                </div>
                            ))
                        ) : (
                            <div className={attendancecss.emptyState}>
                                <HistoryOutlined style={{ fontSize: '48px', color: '#d9d9d9' }} />
                                <p>No hay historial de asistencia disponible</p>
                                <Button
                                    type="primary"
                                    onClick={() => loadAttendanceHistory(attendanceData.schedule.group_id)}
                                >
                                    Cargar Historial
                                </Button>
                            </div>
                        )}
                    </TabPane>

                    {/* Tab de Resumen */}
                    <TabPane
                        tab={
                            <span>
                                <BarChartOutlined />
                                Resumen
                            </span>
                        }
                        key="summary"
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Card title="Distribución de Asistencia" size="small">
                                    <Space direction="vertical" style={{ width: '100%' }}>
                                        <div className={attendancecss.statItem}>
                                            <span>Asistencia:</span>
                                            <Tag color="green">{stats.attendance}</Tag>
                                        </div>
                                        <div className={attendancecss.statItem}>
                                            <span>Faltas:</span>
                                            <Tag color="red">{stats.absence}</Tag>
                                        </div>
                                        <div className={attendancecss.statItem}>
                                            <span>Retardos:</span>
                                            <Tag color="orange">{stats.delay}</Tag>
                                        </div>
                                        <div className={attendancecss.statItem}>
                                            <span>Pendientes:</span>
                                            <Tag color="default">{stats.pending}</Tag>
                                        </div>
                                    </Space>
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card title="Acciones Rápidas" size="small">
                                    <Space direction="vertical" style={{ width: '100%' }}>
                                        <Button
                                            block
                                            type="dashed"
                                            onClick={() => {
                                                const updated = students.map(s => ({
                                                    ...s,
                                                    current_status: 'attendance'
                                                }));
                                                setStudents(updated);
                                                setHasChanges(true);
                                            }}
                                        >
                                            Marcar Todos como Presentes
                                        </Button>
                                        <Button
                                            block
                                            type="dashed"
                                            danger
                                            onClick={() => {
                                                const updated = students.map(s => ({
                                                    ...s,
                                                    current_status: 'absence'
                                                }));
                                                setStudents(updated);
                                                setHasChanges(true);
                                            }}
                                        >
                                            Marcar Todos como Ausentes
                                        </Button>
                                        <Button
                                            block
                                            type="dashed"
                                            onClick={() => {
                                                const updated = students.map(s => ({
                                                    ...s,
                                                    current_status: 'pending'
                                                }));
                                                setStudents(updated);
                                                setHasChanges(true);
                                            }}
                                        >
                                            Limpiar Todos
                                        </Button>
                                    </Space>
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
            </Card>

            {/* Modal para Justificaciones */}
            <Modal
                title={`Justificar Ausencia - ${selectedStudent?.student_name}`}
                open={modalJustificationVisible}
                onCancel={() => {
                    setModalJustificationVisible(false);
                    justificationForm.resetFields();
                }}
                footer={null}
                width={500}
            >
                <Form
                    form={justificationForm}
                    layout="vertical"
                    onFinish={submitJustification}
                >
                    <Form.Item
                        label="Tipo de Justificación"
                        name="reason"
                        rules={[{ required: true, message: 'Selecciona el tipo de justificación' }]}
                    >
                        <Select placeholder="Selecciona el tipo de justificación">
                            <Option value="medical">Médica</Option>
                            <Option value="family">Familiar</Option>
                            <Option value="official">Asunto Oficial</Option>
                            <Option value="other">Otro</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Fecha de Inicio"
                        name="start_justified_date"
                        rules={[{ required: true, message: 'Selecciona la fecha de inicio' }]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Fecha de Fin"
                        name="end_justified_date"
                        rules={[{ required: true, message: 'Selecciona la fecha de fin' }]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Comentarios"
                        name="comments"
                    >
                        <TextArea
                            rows={4}
                            placeholder="Describe la razón de la justificación..."
                        />
                    </Form.Item>

                    <Form.Item label="Evidencia (Opcional)" name="evidence">
                        <Input type="file" />
                    </Form.Item>

                    <Form.Item style={{ textAlign: 'right' }}>
                        <Space>
                            <Button
                                onClick={() => {
                                    setModalJustificationVisible(false);
                                    justificationForm.resetFields();
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Enviar Justificación
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}