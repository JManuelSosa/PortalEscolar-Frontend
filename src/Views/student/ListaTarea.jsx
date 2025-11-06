// ActividadesAlumnoView.js
import React, { useState, useEffect } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Button, 
  Tag, 
  Space, 
  Divider, 
  List,
  Badge,
  Descriptions,
  Modal,
  Upload,
  message,
  Progress,
  Timeline
} from 'antd';
import { 
  FileTextOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  UploadOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  DownloadOutlined,
  EyeOutlined
} from '@ant-design/icons';

const { Meta } = Card;

const ActividadesAlumnoView = () => {
  const [actividades, setActividades] = useState([]);
  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);
  const [isDetalleModalVisible, setIsDetalleModalVisible] = useState(false);
  const [isEntregaModalVisible, setIsEntregaModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Datos falsos de actividades para el alumno
  const actividadesAlumnoEjemplo = [
    {
      id: 1,
      titulo: 'Proyecto Final - Sistema de Gestión',
      descripcion: 'Desarrollar un sistema de gestión completo utilizando los patrones de diseño vistos en clase.',
      materia: 'Programación Avanzada',
      profesor: 'Dr. Carlos Rodríguez',
      valor: 30,
      fechaCreacion: '2024-10-15',
      fechaEntrega: '2024-11-20',
      estado: 'pendiente',
      tipo: 'proyecto',
      tiempoRestante: '35 días',
      archivos: ['requisitos.pdf', 'plantilla.zip'],
      entregaAlumno: null
    },
    {
      id: 2,
      titulo: 'Examen Parcial - Unidades 1-3',
      descripcion: 'Examen que cubre los temas de las primeras tres unidades del curso.',
      materia: 'Programación Avanzada',
      profesor: 'Dr. Carlos Rodríguez',
      valor: 25,
      fechaCreacion: '2024-10-10',
      fechaEntrega: '2024-10-25',
      estado: 'pendiente',
      tipo: 'examen',
      tiempoRestante: '10 días',
      archivos: ['guia_estudio.pdf'],
      entregaAlumno: null
    },
    {
      id: 3,
      titulo: 'Tarea - Análisis de Algoritmos',
      descripcion: 'Resolver los problemas de análisis de complejidad algorítmica.',
      materia: 'Matemáticas Financieras',
      profesor: 'Mtro. Javier López',
      valor: 15,
      fechaCreacion: '2024-10-12',
      fechaEntrega: '2024-10-19',
      estado: 'entregada',
      tipo: 'tarea',
      tiempoRestante: '4 días',
      archivos: ['problemas.pdf'],
      entregaAlumno: {
        fecha: '2024-10-18',
        archivos: ['solucion.pdf'],
        calificacion: 14,
        comentarios: 'Buen trabajo, solo falta detallar el análisis de complejidad.'
      }
    },
    {
      id: 4,
      titulo: 'Práctica de Laboratorio - Bases de Datos',
      descripcion: 'Creación y manipulación de bases de datos relacionales.',
      materia: 'Desarrollo Web Avanzado',
      profesor: 'Ing. Ana Martínez',
      valor: 20,
      fechaCreacion: '2024-10-08',
      fechaEntrega: '2024-10-22',
      estado: 'pendiente',
      tipo: 'laboratorio',
      tiempoRestante: '7 días',
      archivos: ['script_bd.sql', 'manual.pdf'],
      entregaAlumno: null
    },
    {
      id: 5,
      titulo: 'Investigación - Frameworks Modernos',
      descripcion: 'Investigación sobre frameworks de desarrollo web modernos.',
      materia: 'Desarrollo Web Avanzado',
      profesor: 'Ing. Ana Martínez',
      valor: 10,
      fechaCreacion: '2024-09-28',
      fechaEntrega: '2024-10-05',
      estado: 'vencida',
      tipo: 'investigacion',
      tiempoRestante: 'Vencida',
      archivos: ['instrucciones.pdf'],
      entregaAlumno: null
    }
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setActividades(actividadesAlumnoEjemplo);
      setLoading(false);
    }, 1000);
  }, []);

  const handleVerDetalles = (actividad) => {
    setActividadSeleccionada(actividad);
    setIsDetalleModalVisible(true);
  };

  const handleEntregar = (actividad) => {
    setActividadSeleccionada(actividad);
    setIsEntregaModalVisible(true);
  };

  const getEstadoColor = (estado) => {
    const colores = {
      pendiente: 'blue',
      entregada: 'green',
      vencida: 'red',
      calificada: 'gold'
    };
    return colores[estado] || 'default';
  };

  const getTipoColor = (tipo) => {
    const colores = {
      proyecto: 'purple',
      examen: 'red',
      tarea: 'blue',
      laboratorio: 'green',
      investigacion: 'orange'
    };
    return colores[tipo] || 'default';
  };

  const getEstadoIcon = (estado) => {
    const iconos = {
      pendiente: <ExclamationCircleOutlined />,
      entregada: <CheckCircleOutlined />,
      vencida: <ExclamationCircleOutlined />,
      calificada: <CheckCircleOutlined />
    };
    return iconos[estado] || <FileTextOutlined />;
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h1 style={{ color: '#1890ff', marginBottom: 8 }}>
          <FileTextOutlined /> Mis Actividades
        </h1>
        <p style={{ fontSize: '16px', color: '#666' }}>
          Revisa y entrega tus actividades asignadas
        </p>
      </div>

      {/* Filtros Rápidos */}
      <Card style={{ marginBottom: 24 }}>
        <Space>
          <Tag color="blue" style={{ cursor: 'pointer' }}>Todas ({actividades.length})</Tag>
          <Tag color="orange" style={{ cursor: 'pointer' }}>
            Pendientes ({actividades.filter(a => a.estado === 'pendiente').length})
          </Tag>
          <Tag color="green" style={{ cursor: 'pointer' }}>
            Entregadas ({actividades.filter(a => a.estado === 'entregada').length})
          </Tag>
          <Tag color="red" style={{ cursor: 'pointer' }}>
            Vencidas ({actividades.filter(a => a.estado === 'vencida').length})
          </Tag>
        </Space>
      </Card>

      {/* Lista de Actividades */}
      <Row gutter={[16, 16]}>
        {actividades.map(actividad => (
          <Col key={actividad.id} xs={24} lg={12}>
            <Card
              loading={loading}
              actions={[
                <Button 
                  type="link" 
                  icon={<EyeOutlined />}
                  onClick={() => handleVerDetalles(actividad)}
                >
                  Ver Detalles
                </Button>,
                <Button 
                  type={actividad.estado === 'pendiente' ? 'primary' : 'default'}
                  icon={<UploadOutlined />}
                  onClick={() => handleEntregar(actividad)}
                  disabled={actividad.estado === 'vencida'}
                >
                  {actividad.estado === 'entregada' ? 'Reentregar' : 'Entregar'}
                </Button>
              ]}
            >
              <Meta
                avatar={
                  <Badge 
                    count={getEstadoIcon(actividad.estado)} 
                    style={{ 
                      backgroundColor: getEstadoColor(actividad.estado),
                      fontSize: '16px'
                    }}
                  >
                    <FileTextOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                  </Badge>
                }
                title={
                  <Space direction="vertical" size="small" style={{ width: '100%' }}>
                    <div>{actividad.titulo}</div>
                    <Space>
                      <Tag color={getTipoColor(actividad.tipo)}>{actividad.tipo}</Tag>
                      <Tag color={getEstadoColor(actividad.estado)}>{actividad.estado}</Tag>
                      <Tag color="gold">{actividad.valor} pts</Tag>
                    </Space>
                  </Space>
                }
                description={
                  <div>
                    <p style={{ marginBottom: 8 }}>{actividad.descripcion}</p>
                    
                    <Divider style={{ margin: '12px 0' }} />
                    
                    <Space direction="vertical" size="small" style={{ width: '100%' }}>
                      <div>
                        <strong>Materia:</strong> {actividad.materia}
                      </div>
                      <div>
                        <strong>Profesor:</strong> {actividad.profesor}
                      </div>
                      <div>
                        <CalendarOutlined /> Creada: {actividad.fechaCreacion}
                      </div>
                      <div>
                        <ClockCircleOutlined /> Entrega: {actividad.fechaEntrega}
                      </div>
                      <div>
                        <strong>Tiempo restante:</strong> {actividad.tiempoRestante}
                      </div>
                      
                      {actividad.entregaAlumno && (
                        <div style={{ marginTop: 8 }}>
                          <Progress 
                            percent={(actividad.entregaAlumno.calificacion / actividad.valor) * 100}
                            format={percent => `${actividad.entregaAlumno.calificacion}/${actividad.valor}`}
                            status="active"
                          />
                        </div>
                      )}
                    </Space>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal de Detalles */}
      <Modal
        title={actividadSeleccionada?.titulo}
        open={isDetalleModalVisible}
        onCancel={() => setIsDetalleModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsDetalleModalVisible(false)}>
            Cerrar
          </Button>,
          <Button 
            key="entrega" 
            type="primary"
            disabled={actividadSeleccionada?.estado === 'vencida'}
            onClick={() => {
              setIsDetalleModalVisible(false);
              handleEntregar(actividadSeleccionada);
            }}
          >
            {actividadSeleccionada?.estado === 'entregada' ? 'Reentregar' : 'Entregar'}
          </Button>
        ]}
        width={700}
      >
        {actividadSeleccionada && (
          <div>
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="Descripción">
                {actividadSeleccionada.descripcion}
              </Descriptions.Item>
              <Descriptions.Item label="Materia">
                {actividadSeleccionada.materia}
              </Descriptions.Item>
              <Descriptions.Item label="Profesor">
                {actividadSeleccionada.profesor}
              </Descriptions.Item>
              <Descriptions.Item label="Valor">
                {actividadSeleccionada.valor} puntos
              </Descriptions.Item>
              <Descriptions.Item label="Fecha de Creación">
                {actividadSeleccionada.fechaCreacion}
              </Descriptions.Item>
              <Descriptions.Item label="Fecha de Entrega">
                {actividadSeleccionada.fechaEntrega}
              </Descriptions.Item>
              <Descriptions.Item label="Estado">
                <Tag color={getEstadoColor(actividadSeleccionada.estado)}>
                  {actividadSeleccionada.estado}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Tipo">
                <Tag color={getTipoColor(actividadSeleccionada.tipo)}>
                  {actividadSeleccionada.tipo}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
            
            {actividadSeleccionada.archivos && actividadSeleccionada.archivos.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <h4>Archivos de la actividad:</h4>
                <List
                  size="small"
                  dataSource={actividadSeleccionada.archivos}
                  renderItem={archivo => (
                    <List.Item
                      actions={[
                        <Button type="link" icon={<DownloadOutlined />} size="small">
                          Descargar
                        </Button>
                      ]}
                    >
                      <FileTextOutlined /> {archivo}
                    </List.Item>
                  )}
                />
              </div>
            )}

            {actividadSeleccionada.entregaAlumno && (
              <div style={{ marginTop: 16 }}>
                <h4>Tu entrega:</h4>
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="Fecha de entrega">
                    {actividadSeleccionada.entregaAlumno.fecha}
                  </Descriptions.Item>
                  <Descriptions.Item label="Calificación">
                    <strong>{actividadSeleccionada.entregaAlumno.calificacion}/{actividadSeleccionada.valor}</strong>
                  </Descriptions.Item>
                  <Descriptions.Item label="Comentarios">
                    {actividadSeleccionada.entregaAlumno.comentarios}
                  </Descriptions.Item>
                </Descriptions>
                
                <h5 style={{ marginTop: 8 }}>Archivos entregados:</h5>
                <List
                  size="small"
                  dataSource={actividadSeleccionada.entregaAlumno.archivos}
                  renderItem={archivo => (
                    <List.Item>
                      <FileTextOutlined /> {archivo}
                    </List.Item>
                  )}
                />
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Modal de Entrega */}
      <Modal
        title={`Entregar: ${actividadSeleccionada?.titulo}`}
        open={isEntregaModalVisible}
        onCancel={() => setIsEntregaModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsEntregaModalVisible(false)}>
            Cancelar
          </Button>,
          <Button key="submit" type="primary" loading={loading}>
            Enviar Entrega
          </Button>
        ]}
        width={600}
      >
        {actividadSeleccionada && (
          <div>
            <p><strong>Actividad:</strong> {actividadSeleccionada.titulo}</p>
            <p><strong>Valor:</strong> {actividadSeleccionada.valor} puntos</p>
            <p><strong>Fecha límite:</strong> {actividadSeleccionada.fechaEntrega}</p>
            
            <Divider />
            
            <div style={{ marginBottom: 16 }}>
              <h4>Subir archivos de entrega:</h4>
              <Upload.Dragger 
                multiple
                beforeUpload={() => false} // Prevenir subida automática
                style={{ padding: '20px' }}
              >
                <p className="ant-upload-drag-icon">
                  <UploadOutlined />
                </p>
                <p className="ant-upload-text">
                  Haz clic o arrastra archivos para subirlos
                </p>
                <p className="ant-upload-hint">
                  Puedes subir múltiples archivos para esta entrega
                </p>
              </Upload.Dragger>
            </div>

            <div>
              <h4>Comentarios (opcional):</h4>
              <Input.TextArea 
                rows={3}
                placeholder="Agrega cualquier comentario adicional sobre tu entrega..."
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ActividadesAlumnoView;