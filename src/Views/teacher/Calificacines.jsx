import React, { useState, useEffect } from 'react';
import {
  Layout,
  Table,
  InputNumber,
  Typography,
  Card,
  Select,
  Button,
  Row,
  Col,
  Statistic,
  Tag,
  Space,
  Divider,
  message,
  Tooltip,
  Alert
} from 'antd';
import {
  SaveOutlined,
  PrinterOutlined,
  ExportOutlined,
  TeamOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SearchOutlined
} from '@ant-design/icons';

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const AsentarCalificaciones = () => {
  // --- CONFIGURACIÓN ---
  const CALIFICACION_MINIMA = 7.0; // Configuración centralizada

  // --- ESTADOS ---
  const [loading, setLoading] = useState(false);

  // Filtros seleccionados
  const [selectedGrade, setSelectedGrade] = useState('1°');
  const [selectedGroup, setSelectedGroup] = useState('A');
  const [selectedSubject, setSelectedSubject] = useState('Matemáticas I');

  // Datos de Alumnos (Simulados)
  const [students, setStudents] = useState([
    { key: '1', matricula: '2023001', name: 'Alvarez, Sofia', p1: 8.5, p2: 9.0, p3: null },
    { key: '2', matricula: '2023002', name: 'Benitez, Carlos', p1: 6.5, p2: 6.0, p3: null }, // Reprobado con nuevo criterio
    { key: '3', matricula: '2023003', name: 'Castro, Luis', p1: 9.0, p2: 9.5, p3: 10.0 },
    { key: '4', matricula: '2023004', name: 'Díaz, Ana', p1: 7.5, p2: 7.0, p3: null },
    { key: '5', matricula: '2023005', name: 'Estrada, Jorge', p1: 5.0, p2: 6.0, p3: null },
  ]);

  // --- LÓGICA DE CÁLCULO ---

  // Calcular promedio de un alumno
  const calculateAverage = (p1, p2, p3) => {
    if (p1 === null || p2 === null || p3 === null) return null;
    const avg = (p1 + p2 + p3) / 3;
    return parseFloat(avg.toFixed(1));
  };

  // Manejar cambio en inputs
  const handleGradeChange = (value, key, field) => {
    const newData = [...students];
    const index = newData.findIndex((item) => key === item.key);
    if (index > -1) {
      const item = newData[index];
      item[field] = value;
      setStudents(newData);
    }
  };

  // Guardar calificaciones
  const handleSave = () => {
    setLoading(true);
    const incomplete = students.some(s => s.p3 === null);

    setTimeout(() => {
      setLoading(false);
      if (incomplete) {
        message.warning('Se guardó el avance, pero faltan alumnos por calificar.');
      } else {
        message.success('Calificaciones finales asentadas correctamente.');
      }
    }, 1000);
  };

  // Estadísticas del Grupo (AJUSTADO A 7.0)
  const getGroupStats = () => {
    const finishedStudents = students.filter(s => s.p1 !== null && s.p2 !== null && s.p3 !== null);
    if (finishedStudents.length === 0) return { avg: 0, pass: 0, fail: 0 };

    let totalSum = 0;
    let passCount = 0;
    let failCount = 0;

    finishedStudents.forEach(s => {
      const avg = calculateAverage(s.p1, s.p2, s.p3);
      totalSum += avg;
      // CAMBIO AQUÍ: Validación contra 7.0
      if (avg >= CALIFICACION_MINIMA) passCount++; else failCount++;
    });

    return {
      avg: (totalSum / finishedStudents.length).toFixed(1),
      pass: passCount,
      fail: failCount,
      total: students.length
    };
  };

  const stats = getGroupStats();

  // --- COLUMNAS DE LA TABLA ---
  const columns = [
    {
      title: 'Matrícula',
      dataIndex: 'matricula',
      key: 'matricula',
      width: 100,
      fixed: 'left',
      render: (text) => <Text type="secondary">{text}</Text>
    },
    {
      title: 'Nombre del Alumno',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      fixed: 'left',
      render: (text) => <Text strong>{text}</Text>
    },
    {
      title: 'Parcial 1',
      dataIndex: 'p1',
      key: 'p1',
      width: 100,
      align: 'center',
      render: (val, record) => (
        <InputNumber
          min={0} max={10} step={0.1}
          value={val}
          onChange={(v) => handleGradeChange(v, record.key, 'p1')}
          // CAMBIO VISUAL: Se marca error si es menor a 7
          status={val < CALIFICACION_MINIMA ? 'error' : ''}
        />
      )
    },
    {
      title: 'Parcial 2',
      dataIndex: 'p2',
      key: 'p2',
      width: 100,
      align: 'center',
      render: (val, record) => (
        <InputNumber
          min={0} max={10} step={0.1}
          value={val}
          onChange={(v) => handleGradeChange(v, record.key, 'p2')}
          // CAMBIO VISUAL: Se marca error si es menor a 7
          status={val < CALIFICACION_MINIMA ? 'error' : ''}
        />
      )
    },
    {
      title: 'Parcial 3',
      dataIndex: 'p3',
      key: 'p3',
      width: 120,
      align: 'center',
      render: (val, record) => (
        <InputNumber
          min={0} max={10} step={0.1}
          value={val}
          onChange={(v) => handleGradeChange(v, record.key, 'p3')}
          // CAMBIO VISUAL: Se marca error si es menor a 7
          status={val < CALIFICACION_MINIMA ? 'error' : ''}
          placeholder="-"
          style={{ width: '80px', fontWeight: 'bold' }}
        />
      )
    },
    {
      title: 'Promedio Final',
      key: 'average',
      width: 120,
      align: 'center',
      render: (_, record) => {
        const avg = calculateAverage(record.p1, record.p2, record.p3);

        if (avg === null) return <Tag>Pendiente</Tag>;

        // CAMBIO LÓGICO: Reprobatorio si es menor a 7
        const isFailing = avg < CALIFICACION_MINIMA;
        return (
          <div style={{
            fontWeight: 'bold',
            fontSize: '16px',
            color: isFailing ? '#ff4d4f' : '#3f8600'
          }}>
            {avg}
          </div>
        );
      }
    },
    {
      title: 'Estatus',
      key: 'status',
      width: 120,
      align: 'center',
      render: (_, record) => {
        const avg = calculateAverage(record.p1, record.p2, record.p3);
        if (avg === null) return null;
        // CAMBIO LÓGICO: Estatus basado en 7
        return avg >= CALIFICACION_MINIMA
          ? <Tag color="success" icon={<CheckCircleOutlined />}>Aprobado</Tag>
          : <Tag color="error" icon={<CloseCircleOutlined />}>Reprobado</Tag>;
      }
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5', padding: '24px' }}>
      <Content>

        {/* --- HEADER Y FILTROS --- */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <Title level={2} style={{ margin: 0 }}>Cierre de Ciclo Escolar</Title>
              <Text type="secondary">Asentar Calificaciones Finales</Text>
            </div>
            <Space>
              <Button icon={<ExportOutlined />}>Exportar Excel</Button>
              <Button icon={<PrinterOutlined />}>Imprimir Acta</Button>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                loading={loading}
                onClick={handleSave}
                style={{ background: '#002766', borderColor: '#002766' }}
              >
                Guardar Acta
              </Button>
            </Space>
          </div>

          <Card bordered={false} style={{ borderRadius: '8px', marginBottom: '24px' }}>
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} md={6}>
                <Text strong>Seleccionar Curso:</Text>
                <Select
                  value={selectedSubject}
                  style={{ width: '100%', marginTop: '5px' }}
                  onChange={setSelectedSubject}
                >
                  <Option value="Matemáticas I">Matemáticas I</Option>
                  <Option value="Historia Universal">Historia Universal</Option>
                  <Option value="Física">Física</Option>
                </Select>
              </Col>
              <Col xs={12} md={4}>
                <Text strong>Grado:</Text>
                <Select value={selectedGrade} style={{ width: '100%', marginTop: '5px' }} onChange={setSelectedGrade}>
                  <Option value="1°">1er Grado</Option>
                  <Option value="2°">2do Grado</Option>
                  <Option value="3°">3er Grado</Option>
                </Select>
              </Col>
              <Col xs={12} md={4}>
                <Text strong>Grupo:</Text>
                <Select value={selectedGroup} style={{ width: '100%', marginTop: '5px' }} onChange={setSelectedGroup}>
                  <Option value="A">Grupo A</Option>
                  <Option value="B">Grupo B</Option>
                </Select>
              </Col>
              <Col xs={24} md={10} style={{ textAlign: 'right' }}>
                <div style={{ background: '#f6ffed', display: 'inline-flex', padding: '10px 20px', borderRadius: '8px', border: '1px solid #b7eb8f' }}>
                  <Space size="large">
                    <Statistic
                      title="Promedio Grupo"
                      value={stats.avg}
                      valueStyle={{ color: '#3f8600', fontWeight: 'bold' }}
                      prefix={<BarChartOutlined />}
                    />
                    <Divider type="vertical" style={{ height: '40px' }} />
                    <Statistic
                      title="Aprobados (≥7)"
                      value={stats.pass}
                      suffix={`/ ${stats.total}`}
                      valueStyle={{ fontSize: '16px' }}
                    />
                    <Statistic
                      title="Reprobados (<7)"
                      value={stats.fail}
                      valueStyle={{ color: '#ff4d4f', fontSize: '16px' }}
                    />
                  </Space>
                </div>
              </Col>
            </Row>
          </Card>
        </div>

        {/* --- TABLA DE CAPTURA --- */}
        <Card bordered={false} style={{ borderRadius: '8px' }}>
          <Alert
            message="Modo de Captura Final"
            description={`Está editando las calificaciones del 3er Parcial. El promedio se calcula automáticamente. Calificación mínima aprobatoria: ${CALIFICACION_MINIMA}.`}
            type="info"
            showIcon
            style={{ marginBottom: '20px' }}
          />

          <Table
            dataSource={students}
            columns={columns}
            pagination={false}
            scroll={{ x: 800 }}
            rowClassName={(record) => {
              // Resaltar fila si el alumno está reprobado (< 7)
              const avg = calculateAverage(record.p1, record.p2, record.p3);
              return avg !== null && avg < CALIFICACION_MINIMA ? 'row-failing' : '';
            }}
          />
        </Card>

      </Content>
    </Layout>
  );
};

export default AsentarCalificaciones;