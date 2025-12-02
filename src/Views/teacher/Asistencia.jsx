import React, { useState } from 'react';
import {
    Layout,
    Card,
    Table,
    Button,
    DatePicker,
    Radio,
    Avatar,
    Typography,
    Row,
    Col,
    Statistic,
    Space,
    Input,
    message,
    Divider,
    Tag
} from 'antd';
import {
    UserOutlined,
    SaveOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    ClockCircleOutlined,
    FileProtectOutlined,
    CalendarOutlined,
    SearchOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // Asegúrate de configurar el idioma si lo necesitas

const { Content } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;

const PaseDeListaView = () => {
    // --- ESTADOS ---
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');

    // Datos Simulados de Alumnos
    const [students, setStudents] = useState([
        { id: 1, name: 'Arguello Juan', matricula: '2023001', status: 'present', notes: '' },
        { id: 2, name: 'Benitez Laura', matricula: '2023002', status: 'present', notes: '' },
        { id: 3, name: 'Castro Pedro', matricula: '2023003', status: 'absent', notes: '' },
        { id: 4, name: 'Diaz Sofia', matricula: '2023004', status: 'late', notes: 'Llegó 15 min tarde' },
        { id: 5, name: 'Fernandez Luis', matricula: '2023005', status: 'present', notes: '' },
        { id: 6, name: 'Gomez Maria', matricula: '2023006', status: 'excused', notes: 'Cita médica' },
    ]);

    // --- LÓGICA ---

    // Cambiar estado de un alumno individual
    const handleStatusChange = (id, newStatus) => {
        const updatedStudents = students.map(student =>
            student.id === id ? { ...student, status: newStatus } : student
        );
        setStudents(updatedStudents);
    };

    // Marcar todos como presentes (Acción rápida)
    const markAllPresent = () => {
        const allPresent = students.map(student => ({ ...student, status: 'present' }));
        setStudents(allPresent);
        message.info('Todos marcados como presentes');
    };

    // Guardar lista
    const handleSave = () => {
        setLoading(true);
        // Simulación de petición al backend
        setTimeout(() => {
            setLoading(false);
            message.success(`Asistencia guardada para el día ${selectedDate.format('DD/MM/YYYY')}`);
        }, 1000);
    };

    // Calcular estadísticas
    const stats = {
        present: students.filter(s => s.status === 'present').length,
        absent: students.filter(s => s.status === 'absent').length,
        late: students.filter(s => s.status === 'late').length,
        excused: students.filter(s => s.status === 'excused').length,
    };

    // Filtrado por búsqueda
    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchText.toLowerCase()) ||
        s.matricula.includes(searchText)
    );

    // --- COLUMNAS DE LA TABLA ---
    const columns = [
        {
            title: 'Estudiante',
            dataIndex: 'name',
            key: 'name',
            width: 300,
            render: (text, record) => (
                <Space>
                    <Avatar style={{ backgroundColor: '#1890ff' }} icon={<UserOutlined />} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Text strong>{text}</Text>
                        <Text type="secondary" style={{ fontSize: '12px' }}>{record.matricula}</Text>
                    </div>
                </Space>
            ),
        },
        {
            title: 'Estado de Asistencia',
            key: 'status',
            align: 'center',
            render: (_, record) => (
                <Radio.Group
                    value={record.status}
                    onChange={(e) => handleStatusChange(record.id, e.target.value)}
                    buttonStyle="solid"
                    size="middle"
                >
                    <Radio.Button value="present" style={{ color: record.status === 'present' ? '#fff' : '#52c41a', borderColor: '#52c41a', backgroundColor: record.status === 'present' ? '#52c41a' : 'transparent' }}>
                        <CheckCircleOutlined /> P
                    </Radio.Button>
                    <Radio.Button value="late" style={{ color: record.status === 'late' ? '#fff' : '#faad14', borderColor: '#faad14', backgroundColor: record.status === 'late' ? '#faad14' : 'transparent' }}>
                        <ClockCircleOutlined /> R
                    </Radio.Button>
                    <Radio.Button value="absent" style={{ color: record.status === 'absent' ? '#fff' : '#ff4d4f', borderColor: '#ff4d4f', backgroundColor: record.status === 'absent' ? '#ff4d4f' : 'transparent' }}>
                        <CloseCircleOutlined /> F
                    </Radio.Button>
                    <Radio.Button value="excused" style={{ color: record.status === 'excused' ? '#fff' : '#1890ff', borderColor: '#1890ff', backgroundColor: record.status === 'excused' ? '#1890ff' : 'transparent' }}>
                        <FileProtectOutlined /> J
                    </Radio.Button>
                </Radio.Group>
            ),
        },
        {
            title: 'Observaciones',
            key: 'notes',
            render: (_, record) => (
                <Input
                    placeholder="Nota opcional..."
                    bordered={false}
                    style={{ borderBottom: '1px solid #f0f0f0' }}
                    defaultValue={record.notes}
                    onBlur={(e) => {
                        // Aquí podrías actualizar el estado de notas si lo deseas
                        console.log(`Nota para ${record.name}: ${e.target.value}`);
                    }}
                />
            ),
            responsive: ['md'],
        }
    ];

    return (
        <Layout style={{ minHeight: '100vh', background: '#f0f2f5', padding: '24px' }}>
            <Content>

                {/* --- HEADER SUPERIOR --- */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '15px' }}>
                    <div>
                        <Title level={2} style={{ margin: 0 }}>Pase de Lista</Title>
                        <Space>
                            <Tag color="blue">Matemáticas I</Tag>
                            <Tag color="cyan">Grupo 3°A</Tag>
                        </Space>
                    </div>
                    <Space>
                        <Button onClick={markAllPresent}>Marcar Todos Presentes</Button>
                        <DatePicker
                            defaultValue={dayjs()}
                            format="DD/MM/YYYY"
                            onChange={setSelectedDate}
                            style={{ width: '150px' }}
                            allowClear={false}
                        />
                        <Button type="primary" icon={<SaveOutlined />} loading={loading} onClick={handleSave}>
                            Guardar
                        </Button>
                    </Space>
                </div>

                {/* --- BARRA DE ESTADÍSTICAS --- */}
                <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                    <Col xs={12} sm={6}>
                        <Card bordered={false} bodyStyle={{ padding: '15px' }}>
                            <Statistic
                                title="Presentes"
                                value={stats.present}
                                valueStyle={{ color: '#52c41a' }}
                                prefix={<CheckCircleOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Card bordered={false} bodyStyle={{ padding: '15px' }}>
                            <Statistic
                                title="Faltas"
                                value={stats.absent}
                                valueStyle={{ color: '#ff4d4f' }}
                                prefix={<CloseCircleOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Card bordered={false} bodyStyle={{ padding: '15px' }}>
                            <Statistic
                                title="Retardos"
                                value={stats.late}
                                valueStyle={{ color: '#faad14' }}
                                prefix={<ClockCircleOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Card bordered={false} bodyStyle={{ padding: '15px' }}>
                            <Statistic
                                title="Justificados"
                                value={stats.excused}
                                valueStyle={{ color: '#1890ff' }}
                                prefix={<FileProtectOutlined />}
                            />
                        </Card>
                    </Col>
                </Row>

                {/* --- TABLA PRINCIPAL --- */}
                <Card style={{ borderRadius: '8px' }}>

                    {/* Buscador dentro de la tarjeta */}
                    <div style={{ marginBottom: '16px', maxWidth: '300px' }}>
                        <Input
                            prefix={<SearchOutlined style={{ color: '#ccc' }} />}
                            placeholder="Buscar alumno..."
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>

                    <Table
                        dataSource={filteredStudents}
                        columns={columns}
                        rowKey="id"
                        pagination={false}
                        scroll={{ x: 600 }}
                    />
                </Card>

                {/* --- LEYENDA (Opcional) --- */}
                <div style={{ marginTop: '20px', color: '#888', fontSize: '12px', textAlign: 'center' }}>
                    <Space split={<Divider type="vertical" />}>
                        <span><CheckCircleOutlined /> P: Presente</span>
                        <span><ClockCircleOutlined /> R: Retardo</span>
                        <span><CloseCircleOutlined /> F: Falta</span>
                        <span><FileProtectOutlined /> J: Justificante</span>
                    </Space>
                </div>

            </Content>
        </Layout>
    );
};

export default PaseDeListaView;