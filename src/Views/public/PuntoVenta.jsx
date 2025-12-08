import { useState } from 'react';
import { 
    Layout, 
    Card, 
    Form, 
    Input, 
    Select, 
    Button, 
    Table, 
    Tag, 
    Row, 
    Col, 
    Typography, 
    Space,
    Divider,
    Statistic,
    Modal,
    List,
    Descriptions,
    Badge,
    message,
    InputNumber,
    DatePicker,
    Switch
} from 'antd';
import { 
    ShoppingCartOutlined,
    UserOutlined,
    DollarOutlined,
    PrinterOutlined,
    SearchOutlined,
    PlusOutlined,
    DeleteOutlined,
    SaveOutlined,
    FileTextOutlined,
    CheckCircleOutlined,
    CalendarOutlined,
    IdcardOutlined
} from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const PuntoVentaColegiaturas = () => {
    const [form] = Form.useForm();
    const [conceptos, setConceptos] = useState([]);
    const [clienteInfo, setClienteInfo] = useState(null);
    const [reciboVisible, setReciboVisible] = useState(false);
    const [reciboData, setReciboData] = useState(null);

    // Datos de ejemplo - estudiantes/padres de familia
    const estudiantes = [
        {
            id: 1,
            matricula: '2024001',
            nombre: 'Ana García López',
            grado: '3ro Primaria',
            grupo: 'A',
            tutor: 'Carlos García',
            telefono: '555-1234',
            saldo: 1500.00
        },
        {
            id: 2,
            matricula: '2024002',
            nombre: 'Luis Martínez Ruiz',
            grado: '5to Primaria',
            grupo: 'B',
            tutor: 'María Martínez',
            telefono: '555-5678',
            saldo: 2300.00
        },
        {
            id: 3,
            matricula: '2024003',
            nombre: 'Sofía Hernández Díaz',
            grado: '2ndo Secundaria',
            grupo: 'C',
            tutor: 'Roberto Hernández',
            telefono: '555-9012',
            saldo: 1800.00
        }
    ];

    // Conceptos de pago disponibles
    const conceptosDisponibles = [
        { id: 1, concepto: 'Colegiatura Mensual', precio: 1500.00, tipo: 'obligatorio' },
        { id: 2, concepto: 'Inscripción Anual', precio: 2500.00, tipo: 'anual' },
        { id: 3, concepto: 'Materiales Educativos', precio: 800.00, tipo: 'opcional' },
        { id: 4, concepto: 'Actividades Extraescolares', precio: 600.00, tipo: 'opcional' },
        { id: 5, concepto: 'Transporte Escolar', precio: 1200.00, tipo: 'opcional' },
        { id: 6, concepto: 'Uniforme Escolar', precio: 950.00, tipo: 'unico' },
        { id: 7, concepto: 'Examen de Admisión', precio: 500.00, tipo: 'unico' },
        { id: 8, concepto: 'Constancia', precio: 20.00, tipo:'opcional'},
        { id: 9, concepto: 'Constancia con foto', precio: 30.00, tipo:'opcional'},
        { id: 10, concepto: 'Seguimiento academico (Kardex)', precio: 50.00, tipo:'opcional'},
        { id: 11, concepto: 'Certificado Parcial', precio: 30.00, tipo:'opcional'},
        { id: 12, concepto: 'Impresion de credenciales', precio: 30.00, tipo:'opcional'},
        { id: 13, concepto: 'Duplicados de credenciales', precio: 500.00, tipo:'opcional'},
        { id: 14, concepto: 'Cobro de inscripcion a nuevo ingreso', precio: 1750.00, tipo:'opcional'},
        { id: 15, concepto: 'Cobro de inscripcion a continuidad', precio: 1950.00, tipo:'opcional'},
        { id: 16, concepto: 'Derecho impresion titulo (TSU)', precio: 750.00, tipo:'opcional'},
        { id: 17, concepto: 'Derecho impresion titulo (ING)', precio: 1000.00, tipo:'opcional'}
    ];

    const buscarEstudiante = (matricula) => {
        const estudiante = estudiantes.find(est => est.matricula === matricula);
        if (estudiante) {
            setClienteInfo(estudiante);
            message.success(`Estudiante encontrado: ${estudiante.nombre}`);
        } else {
            setClienteInfo(null);
            message.error('No se encontró el estudiante con esa matrícula');
        }
    };

    const agregarConcepto = (conceptoId) => {
        const concepto = conceptosDisponibles.find(c => c.id === conceptoId);
        if (concepto) {
            const nuevoConcepto = {
                key: Date.now(),
                id: concepto.id,
                concepto: concepto.concepto,
                precio: concepto.precio,
                cantidad: 1,
                subtotal: concepto.precio
            };
            setConceptos([...conceptos, nuevoConcepto]);
        }
    };

    const eliminarConcepto = (key) => {
        setConceptos(conceptos.filter(item => item.key !== key));
    };

    const calcularTotal = () => {
        return conceptos.reduce((total, item) => total + item.subtotal, 0);
    };

    const generarRecibo = () => {
        if (!clienteInfo) {
            message.error('Primero debe seleccionar un estudiante');
            return;
        }
        if (conceptos.length === 0) {
            message.error('Agregue al menos un concepto de pago');
            return;
        }

        const recibo = {
            folio: `REC-${Date.now()}`,
            fecha: new Date().toLocaleDateString(),
            hora: new Date().toLocaleTimeString(),
            estudiante: clienteInfo,
            conceptos: conceptos,
            total: calcularTotal(),
            efectivo: 0,
            cambio: 0
        };

        setReciboData(recibo);
        setReciboVisible(true);
    };

    const procesarPago = (efectivo) => {
        if (efectivo < calcularTotal()) {
            message.error('El efectivo debe ser mayor o igual al total');
            return;
        }

        const cambio = efectivo - calcularTotal();
        setReciboData({
            ...reciboData,
            efectivo: efectivo,
            cambio: cambio
        });

        message.success('Pago procesado exitosamente');
    };

    const imprimirRecibo = () => {
        message.success('Recibo enviado a impresión');
        // Aquí iría la lógica real de impresión
        setTimeout(() => {
            setReciboVisible(false);
            setConceptos([]);
            setClienteInfo(null);
            form.resetFields();
        }, 2000);
    };

    const columns = [
        {
            title: 'Concepto',
            dataIndex: 'concepto',
            key: 'concepto',
        },
        {
            title: 'Precio Unitario',
            dataIndex: 'precio',
            key: 'precio',
            render: (precio) => `$${precio.toFixed(2)}`
        },
        {
            title: 'Cantidad',
            dataIndex: 'cantidad',
            key: 'cantidad',
            render: (cantidad, record) => (
                <InputNumber
                    min={1}
                    max={10}
                    value={cantidad}
                    onChange={(value) => {
                        const nuevosConceptos = conceptos.map(item => 
                            item.key === record.key 
                                ? { ...item, cantidad: value, subtotal: value * item.precio }
                                : item
                        );
                        setConceptos(nuevosConceptos);
                    }}
                />
            )
        },
        {
            title: 'Subtotal',
            dataIndex: 'subtotal',
            key: 'subtotal',
            render: (subtotal) => `$${subtotal.toFixed(2)}`
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (_, record) => (
                <Button 
                    type="link" 
                    danger 
                    icon={<DeleteOutlined />}
                    onClick={() => eliminarConcepto(record.key)}
                >
                    Eliminar
                </Button>
            )
        }
    ];

    return (
        <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
            <Header style={{ 
                padding: '0 24px'
            }}>
                <Space>
                    <ShoppingCartOutlined style={{ fontSize: '24px', color: 'white' }} />
                    <Title level={3} style={{ color: 'white', margin: 0, lineHeight: '64px' }}>
                        Punto de Venta - Colegiaturas
                    </Title>
                </Space>
            </Header>

            <Content style={{ padding: '24px' }}>
                <Row gutter={[24, 24]}>
                    {/* Columna izquierda - Información del cliente y conceptos */}
                    <Col xs={24} lg={16}>
                        <Row gutter={[24, 24]}>
                            {/* Búsqueda de estudiante */}
                            <Col xs={24}>
                                <Card 
                                    title="Búsqueda de Estudiante" 
                                    extra={<UserOutlined />}
                                >
                                    <Space.Compact style={{ width: '100%' }}>
                                        <Input
                                            placeholder="Ingrese matrícula del estudiante"
                                            onPressEnter={(e) => buscarEstudiante(e.target.value)}
                                        />
                                        <Button 
                                            type="primary" 
                                            icon={<SearchOutlined />}
                                            onClick={() => {
                                                const matricula = form.getFieldValue('matricula');
                                                if (matricula) buscarEstudiante(matricula);
                                            }}
                                        >
                                            Buscar
                                        </Button>
                                    </Space.Compact>
                                </Card>
                            </Col>

                            {/* Información del estudiante */}
                            {clienteInfo && (
                                <Col xs={24}>
                                    <Card title="Información del Estudiante">
                                        <Descriptions size="small" column={2}>
                                            <Descriptions.Item label="Matrícula">
                                                <Tag color="blue">{clienteInfo.matricula}</Tag>
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Nombre">
                                                {clienteInfo.nombre}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Grado y Grupo">
                                                {clienteInfo.grado} - {clienteInfo.grupo}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Tutor">
                                                {clienteInfo.tutor}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Teléfono">
                                                {clienteInfo.telefono}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Saldo Pendiente">
                                                <Text type="danger">${clienteInfo.saldo.toFixed(2)}</Text>
                                            </Descriptions.Item>
                                        </Descriptions>
                                    </Card>
                                </Col>
                            )}

                            {/* Agregar conceptos */}
                            <Col xs={24}>
                                <Card 
                                    title="Conceptos de Pago" 
                                    extra={
                                        <Select
                                            placeholder="Seleccionar concepto"
                                            style={{ width: 250 }}
                                            onChange={agregarConcepto}
                                        >
                                            {conceptosDisponibles.map(concepto => (
                                                <Option key={concepto.id} value={concepto.id}>
                                                    {concepto.concepto} - ${concepto.precio.toFixed(2)}
                                                </Option>
                                            ))}
                                        </Select>
                                    }
                                >
                                    <Table
                                        columns={columns}
                                        dataSource={conceptos}
                                        pagination={false}
                                        size="small"
                                        locale={{
                                            emptyText: 'No hay conceptos agregados'
                                        }}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </Col>

                    {/* Columna derecha - Resumen y acciones */}
                    <Col xs={24} lg={8}>
                        <Row gutter={[24, 24]}>
                            {/* Resumen del pago */}
                            <Col xs={24}>
                                <Card title="Resumen del Pago">
                                    <Space direction="vertical" style={{ width: '100%' }} size="large">
                                        <Statistic
                                            title="Total a Pagar"
                                            value={calcularTotal()}
                                            precision={2}
                                            prefix="$"
                                            valueStyle={{ color: '#3f8600' }}
                                        />
                                        
                                        <Divider />
                                        
                                        <Text strong>Conceptos seleccionados:</Text>
                                        <List
                                            size="small"
                                            dataSource={conceptos}
                                            renderItem={item => (
                                                <List.Item>
                                                    <Text>{item.concepto}</Text>
                                                    <Text>${item.subtotal.toFixed(2)}</Text>
                                                </List.Item>
                                            )}
                                            locale={{ emptyText: 'Sin conceptos' }}
                                        />

                                        <Button
                                            type="primary"
                                            size="large"
                                            icon={<DollarOutlined />}
                                            block
                                            onClick={generarRecibo}
                                            disabled={!clienteInfo || conceptos.length === 0}
                                        >
                                            Generar Recibo
                                        </Button>
                                    </Space>
                                </Card>
                            </Col>

                            {/* Estadísticas rápidas */}
                            <Col xs={24}>
                                <Card title="Estadísticas del Día">
                                    <Space direction="vertical" style={{ width: '100%' }}>
                                        <Statistic title="Ventas Hoy" value={8} prefix="$" valueStyle={{ color: '#1890ff' }} />
                                        <Statistic title="Transacciones" value={12} />
                                        <Statistic title="Estudiantes Atendidos" value={9} />
                                    </Space>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                {/* Modal de Recibo */}
                <Modal
                    title={
                        <Space>
                            <FileTextOutlined />
                            Recibo de Pago
                            <Badge status="processing" text="Pendiente de pago" />
                        </Space>
                    }
                    open={reciboVisible}
                    onCancel={() => setReciboVisible(false)}
                    width={700}
                    footer={[
                        <Button key="cancel" onClick={() => setReciboVisible(false)}>
                            Cancelar
                        </Button>,
                        <Button 
                            key="print" 
                            type="primary" 
                            icon={<PrinterOutlined />}
                            onClick={imprimirRecibo}
                            disabled={!reciboData?.efectivo}
                        >
                            Imprimir Recibo
                        </Button>
                    ]}
                >
                    {reciboData && (
                        <div style={{ padding: '20px', border: '2px dashed #d9d9d9', borderRadius: '8px' }}>
                            {/* Encabezado del recibo */}
                            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                                <Title level={3} style={{ margin: 0 }}>COLEGIO EJEMPLO</Title>
                                <Text type="secondary">Sistema de Pagos Escolares</Text>
                                <br />
                                <Text strong>RECIBO DE PAGO</Text>
                                <br />
                                <Text>Folio: {reciboData.folio}</Text>
                            </div>

                            <Divider />

                            {/* Información del estudiante */}
                            <Descriptions column={1} size="small">
                                <Descriptions.Item label="Estudiante">
                                    {reciboData.estudiante.nombre}
                                </Descriptions.Item>
                                <Descriptions.Item label="Matrícula">
                                    {reciboData.estudiante.matricula}
                                </Descriptions.Item>
                                <Descriptions.Item label="Fecha">
                                    {reciboData.fecha} {reciboData.hora}
                                </Descriptions.Item>
                            </Descriptions>

                            <Divider />

                            {/* Detalle de conceptos */}
                            <Table
                                columns={[
                                    { title: 'Concepto', dataIndex: 'concepto', key: 'concepto' },
                                    { title: 'Cantidad', dataIndex: 'cantidad', key: 'cantidad' },
                                    { title: 'Precio', dataIndex: 'precio', key: 'precio', render: (p) => `$${p.toFixed(2)}` },
                                    { title: 'Subtotal', dataIndex: 'subtotal', key: 'subtotal', render: (s) => `$${s.toFixed(2)}` }
                                ]}
                                dataSource={reciboData.conceptos}
                                pagination={false}
                                size="small"
                                summary={() => (
                                    <Table.Summary>
                                        <Table.Summary.Row>
                                            <Table.Summary.Cell index={0} colSpan={3}>
                                                <Text strong>Total</Text>
                                            </Table.Summary.Cell>
                                            <Table.Summary.Cell index={1}>
                                                <Text strong>${reciboData.total.toFixed(2)}</Text>
                                            </Table.Summary.Cell>
                                        </Table.Summary.Row>
                                    </Table.Summary>
                                )}
                            />

                            {/* Sección de pago en efectivo */}
                            {!reciboData.efectivo ? (
                                <div style={{ marginTop: '24px' }}>
                                    <Text strong>Pago en Efectivo:</Text>
                                    <Space.Compact style={{ width: '100%', marginTop: '8px' }}>
                                        <InputNumber
                                            style={{ width: '100%' }}
                                            placeholder="Ingrese monto en efectivo"
                                            min={reciboData.total}
                                            step={50}
                                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                            onChange={(value) => value && procesarPago(value)}
                                        />
                                    </Space.Compact>
                                </div>
                            ) : (
                                <div style={{ marginTop: '24px' }}>
                                    <Row gutter={16}>
                                        <Col span={8}>
                                            <Statistic title="Efectivo" value={reciboData.efectivo} prefix="$" />
                                        </Col>
                                        <Col span={8}>
                                            <Statistic title="Cambio" value={reciboData.cambio} prefix="$" />
                                        </Col>
                                        <Col span={8}>
                                            <div style={{ textAlign: 'center' }}>
                                                <CheckCircleOutlined style={{ fontSize: '32px', color: '#52c41a' }} />
                                                <div style={{ marginTop: '8px' }}>
                                                    <Text type="success">Pago Completado</Text>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            )}

                            {/* Pie del recibo */}
                            <Divider />
                            <div style={{ textAlign: 'center' }}>
                                <Text type="secondary">
                                    ** Este recibo es su comprobante de pago **
                                    <br />
                                    Gracias por su preferencia
                                </Text>
                            </div>
                        </div>
                    )}
                </Modal>
            </Content>
        </Layout>
    );
};

export default PuntoVentaColegiaturas;