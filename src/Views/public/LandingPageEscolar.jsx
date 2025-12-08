import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Layout,
    Button,
    Card,
    Row,
    Col,
    Typography,
    Space,
    Divider,
    List,
    Avatar,
    Statistic,
    Tag,
    Form,
    Input,
    Modal,
    FloatButton,
    message,
    Badge,
    Spin
} from 'antd';
import {
    TeamOutlined,
    BookOutlined,
    TrophyOutlined,
    CalendarOutlined,
    StarOutlined,
    RightOutlined,
    UserOutlined,
    LockOutlined,
    PhoneOutlined,
    MailOutlined,
    EnvironmentOutlined,
    MessageOutlined,
    DollarOutlined,
    SendOutlined,
    CheckOutlined,
    BankOutlined,
    LaptopOutlined,
    CloseOutlined,
    RobotOutlined
} from '@ant-design/icons';
import SupersetDashboard from '../../Components/SupersetDashboard';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;
const { Meta } = Card;

const LandingPageEscolar = () => {
    // --- ESTADOS GLOBALES ---
    const [loginVisible, setLoginVisible] = useState(false);
    const [pricingVisible, setPricingVisible] = useState(false);

    // --- ESTADOS DEL CHATBOT ---
    const [chatOpen, setChatOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);

    const navigate = useNavigate();

    const goToSuperset = () => {
        navigate("/supersetdashboard");
    };
    const [chatMessages, setChatMessages] = useState([
        {
            id: 1,
            sender: 'bot',
            text: '¡Hola! Bienvenido al portal de EduConnect. Soy su asistente virtual institucional. ¿En qué puedo apoyarle hoy?'
        }
    ]);

    // Opciones rápidas para el usuario
    const quickOptions = [
        "Información de Inscripción",
        "Problemas de Acceso",
        "Contactar a Control Escolar"
    ];

    // --- COLORES CORPORATIVOS (FORMALES) ---
    const colors = {
        primary: '#002766', // Azul oscuro académico
        accent: '#faad14',  // Dorado/Amarillo institucional
        bgLight: '#f0f2f5',
        textHeading: '#001529',
        chatBg: '#f0f2f5'
    };

    // --- DATOS ESTÁTICOS ---
    const features = [
        { icon: <TeamOutlined style={{ fontSize: '40px', color: colors.primary }} />, title: 'Gestión Administrativa', description: 'Control total de expedientes de alumnos y docentes.' },
        { icon: <LaptopOutlined style={{ fontSize: '40px', color: colors.primary }} />, title: 'Aula Virtual', description: 'Entorno digital para recursos y tareas.' },
        { icon: <CalendarOutlined style={{ fontSize: '40px', color: colors.primary }} />, title: 'Planeación Escolar', description: 'Generación de cargas horarias y calendarios.' },
        { icon: <TrophyOutlined style={{ fontSize: '40px', color: colors.primary }} />, title: 'Kardex Digital', description: 'Seguimiento de trayectoria académica.' }
    ];

    const statistics = [
        { title: 'Alumnos Matriculados', value: 2500, suffix: '+' },
        { title: 'Cuerpo Docente', value: 120, suffix: '' },
        { title: 'Programas Educativos', value: 15, suffix: '' },
        { title: 'Egresados Exitosos', value: 5000, suffix: '+' }
    ];

    const testimonials = [
        { name: 'Dra. Elena R.', role: 'Rectora Universitaria', avatar: 'https://xsgames.co/randomusers/avatar.php?g=female', content: 'La implementación optimizó nuestros procesos un 40%.' },
        { name: 'Ing. Marco P.', role: 'Coord. Sistemas', avatar: 'https://xsgames.co/randomusers/avatar.php?g=male', content: 'Plataforma estable y segura, ideal para universidades.' },
        { name: 'Lic. Sarah J.', role: 'Control Escolar', avatar: 'https://xsgames.co/randomusers/avatar.php?g=female&v=2', content: 'La generación de actas es automática y sin errores.' }
    ];

    const pricingPlans = [
        { name: 'Institucional Básico', price: '$2,500', period: 'MXN / mes', features: ['Hasta 300 alumnos', 'Portal básico', 'Soporte 8/5'], recommended: false },
        { name: 'Campus Pro', price: '$5,000', period: 'MXN / mes', features: ['Hasta 1500 alumnos', 'Módulo finanzas', 'Soporte 24/7', 'App Móvil'], recommended: true },
        { name: 'Multi-Campus', price: 'A medida', period: '', features: ['Alumnos ilimitados', 'Gestión multi-sede', 'Servidor dedicado'], recommended: false }
    ];

    // --- LÓGICA DEL CHATBOT ---
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages, isTyping]);

    const handleBotResponse = (userText) => {
        setIsTyping(true);
        let botReply = "";

        // Lógica simple de respuestas (Simulación de IA)
        const lowerText = userText.toLowerCase();
        if (lowerText.includes('inscripci')) {
            botReply = "El periodo de inscripciones para el ciclo 2025 inicia el 1 de Agosto. Puede consultar los requisitos en el menú 'Aspirantes'.";
        } else if (lowerText.includes('acceso') || lowerText.includes('contraseña') || lowerText.includes('entrar')) {
            botReply = "Si tiene problemas para acceder al portal, por favor verifique que su matrícula esté activa o solicite un restablecimiento de contraseña en Control Escolar.";
        } else if (lowerText.includes('costo') || lowerText.includes('precio') || lowerText.includes('pago')) {
            botReply = "Manejamos diferentes esquemas de becas y pagos. Le invito a revisar nuestra sección de Planes o contactar a Finanzas.";
        } else if (lowerText.includes('contacto') || lowerText.includes('ubicacion')) {
            botReply = "Estamos ubicados en Ciudad Universitaria, Edificio B. Tel: (953) 555-0000. Horario: Lunes a Viernes 8:00 - 16:00.";
        } else {
            botReply = "Entiendo. Para brindarle una atención más personalizada, un asesor académico revisará su consulta y le contactará a la brevedad.";
        }

        setTimeout(() => {
            setChatMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text: botReply }]);
            setIsTyping(false);
        }, 1500); // Retraso para simular escritura
    };

    const handleSendMessage = (text = inputValue) => {
        if (!text.trim()) return;

        // Agregar mensaje del usuario
        setChatMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: text }]);
        setInputValue('');

        // Disparar respuesta del bot
        handleBotResponse(text);
    };

    // --- OTRAS FUNCIONES ---
    const showLoginModal = () => setLoginVisible(true);
    const handleLoginCancel = () => setLoginVisible(false);
    const showPricingModal = () => setPricingVisible(true);
    const handlePricingCancel = () => setPricingVisible(false);

    const onLoginFinish = () => {
        message.loading('Verificando credenciales...', 1).then(() => {
            message.success('Bienvenido al Portal Institucional');
            setLoginVisible(false);
        });
    };

    return (
        <Layout style={{ minHeight: '100vh', fontFamily: "'Roboto', sans-serif" }}>
            {/* Header Formal */}
            <Header style={{ background: '#fff', padding: '0 50px', position: 'fixed', width: '100%', zIndex: 1000, boxShadow: '0 2px 15px rgba(0,0,0,0.08)', borderBottom: `3px solid ${colors.primary}` }}>
                <Row justify="space-between" align="middle" style={{ height: '64px' }}>
                    <Col>
                        <Space align="center">
                            <BankOutlined style={{ fontSize: '28px', color: colors.primary }} />
                            <Title level={3} style={{ color: colors.primary, margin: 0, fontWeight: 800, letterSpacing: '-0.5px' }}>
                                EDU<span style={{ color: colors.accent }}>CONNECT</span>
                            </Title>
                        </Space>
                    </Col>
                    <Col>
                        <Space size="large">
                            {/*    <Button type="text" className="hidden-mobile">Soluciones</Button>*/}
                            <Button
                                type="primary"
                                onClick={goToSuperset}
                                className="hidden-mobile"
                            >
                                Dashboard
                            </Button>
                            <Button type="primary" onClick={() => { navigate('/login') }} style={{ background: colors.primary, borderColor: colors.primary, fontWeight: '600', padding: '0 25px' }}>
                                Portal Académico
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Header>

            <Content style={{ marginTop: '64px', background: '#fff' }}>
                {/* Hero Section */}
                <section style={{
                    position: 'relative',
                    background: `linear-gradient(rgba(0, 39, 102, 0.85), rgba(0, 21, 41, 0.8)), url('https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80') center/cover fixed`,
                    color: 'white', padding: '160px 20px 120px', textAlign: 'center'
                }}>
                    <Row justify="center">
                        <Col xs={24} md={18} lg={14}>
                            <Tag color={colors.accent} style={{ color: '#000', fontWeight: 'bold', marginBottom: '20px' }}>NUEVO CICLO 2025</Tag>
                            <Title level={1} style={{ color: 'white', fontSize: '3.5rem', fontWeight: 700, marginBottom: '24px' }}>Excelencia Tecnológica para la Educación Superior</Title>
                            <Paragraph style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)', marginBottom: '40px' }}>Plataforma integral de gestión escolar diseñada para universidades tecnológicas.</Paragraph>
                            <Space size="middle" wrap>
                                <Button type="primary" size="large" onClick={() => { navigate('/login')}} style={{ background: colors.accent, borderColor: colors.accent, color: '#000', fontWeight: 'bold', height: '50px', padding: '0 40px' }}>Acceso Institucional</Button>
                                <Button ghost size="large" onClick={showPricingModal} style={{ height: '50px', padding: '0 40px' }}>Solicitar suscripción</Button>
                            </Space>
                        </Col>
                    </Row>
                </section>

                {/* Barra de Aliados */}
                <div style={{ background: '#f5f5f5', padding: '30px 0', borderBottom: '1px solid #e8e8e8' }}>
                    <Row justify="center" align="middle" gutter={[48, 24]} style={{ opacity: 0.6, filter: 'grayscale(100%)' }}>
                        <Col><Title level={4} style={{ margin: 0, color: '#666' }}>U.T.M.</Title></Col>
                        <Col><Title level={4} style={{ margin: 0, color: '#666' }}>TECNOLÓGICO NACIONAL</Title></Col>
                        <Col><Title level={4} style={{ margin: 0, color: '#666' }}>UNAM</Title></Col>
                        <Col><Title level={4} style={{ margin: 0, color: '#666' }}>POLITÉCNICO</Title></Col>
                    </Row>
                </div>

                {/* Estadísticas */}
                <section style={{ padding: '80px 50px', background: '#fff' }}>
                    <Row gutter={[32, 32]} justify="center">
                        {statistics.map((stat, index) => (
                            <Col xs={12} sm={6} key={index} style={{ textAlign: 'center' }}>
                                <Statistic title={stat.title} value={stat.value} suffix={stat.suffix} valueStyle={{ color: colors.primary, fontSize: '42px', fontWeight: '700' }} />
                            </Col>
                        ))}
                    </Row>
                </section>

                {/* Features */}
                <section style={{ padding: '100px 50px', background: colors.bgLight }}>
                    <Title level={2} style={{ textAlign: 'center', color: colors.textHeading, marginBottom: '60px' }}>Ecosistema Educativo Integral</Title>
                    <Row gutter={[24, 24]}>
                        {features.map((feature, index) => (
                            <Col xs={24} sm={12} lg={6} key={index}>
                                <Card hoverable bordered={false} style={{ height: '100%', borderRadius: '8px' }}>
                                    <div style={{ marginBottom: '20px' }}>{feature.icon}</div>
                                    <Title level={4} style={{ fontSize: '18px' }}>{feature.title}</Title>
                                    <Paragraph type="secondary" style={{ fontSize: '14px' }}>{feature.description}</Paragraph>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </section>

                {/* Demo Visual */}
                <section style={{ padding: '100px 50px' }}>
                    <Row gutter={[64, 48]} align="middle">
                        <Col xs={24} lg={12}>
                            <Title level={2} style={{ color: colors.textHeading }}>Innovación en el Aprendizaje</Title>
                            <Paragraph style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
                                EduConnect transforma la experiencia educativa mediante interfaces intuitivas y análisis de datos en tiempo real, permitiendo a instituciones como la <b>UTM</b> mantenerse a la vanguardia tecnológica.
                            </Paragraph>
                            <List dataSource={['Control de asistencia biométrico', 'Gestión de laboratorios y talleres', 'Biblioteca digital integrada', 'Vinculación con el sector productivo']} renderItem={item => <List.Item style={{ border: 'none', padding: '8px 0' }}><Space><CheckOutlined style={{ color: colors.primary }} /> {item}</Space></List.Item>} />
                        </Col>
                        <Col xs={24} lg={12}>
                            <Card hoverable style={{ padding: 0, overflow: 'hidden', borderRadius: '12px', border: `1px solid #d9d9d9` }} bodyStyle={{ padding: 0 }}>
                                <img alt="Laboratorio" src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" style={{ width: '100%', display: 'block' }} />
                                <div style={{ padding: '20px', background: '#fff' }}>
                                    <Text strong style={{ color: colors.primary, fontSize: '16px' }}>Módulo de Laboratorios de Cómputo</Text>
                                    <Paragraph type="secondary" style={{ margin: 0, fontSize: '13px' }}>Gestión de equipos en tiempo real.</Paragraph>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </section>

                {/* Testimonios */}
                <section style={{ padding: '80px 50px', background: '#001529' }}>
                    <Title level={2} style={{ textAlign: 'center', color: 'white', marginBottom: '60px' }}>Voces de la Academia</Title>
                    <Row gutter={[32, 32]}>
                        {testimonials.map((t, i) => (
                            <Col xs={24} md={8} key={i}>
                                <Card bordered={false} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                                    <Meta avatar={<Avatar src={t.avatar} size="large" style={{ border: `2px solid ${colors.accent}` }} />} title={<Text style={{ color: 'white' }}>{t.name}</Text>} description={<Text style={{ color: '#rgba(255,255,255,0.5)', fontSize: '12px' }}>{t.role}</Text>} />
                                    <Paragraph style={{ color: 'rgba(255,255,255,0.8)', marginTop: '20px', fontStyle: 'italic' }}>"{t.content}"</Paragraph>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </section>

                {/* CTA */}
                <section style={{ padding: '100px 20px', textAlign: 'center', background: '#fff' }}>
                    <Title level={2}>Lleve su institución al siguiente nivel</Title>
                    <Button type="primary" size="large" style={{ height: '50px', padding: '0 50px', background: colors.primary }} onClick={showLoginModal}>Comenzar Ahora</Button>
                </section>
            </Content>

            <Footer style={{ background: '#000b14', color: '#8c8c8c', padding: '60px 50px' }}>
                <Row gutter={[64, 32]}>
                    <Col xs={24} md={8}>
                        <Space align="center" style={{ marginBottom: '20px' }}>
                            <BankOutlined style={{ fontSize: '24px', color: '#fff' }} />
                            <Text strong style={{ color: '#fff', fontSize: '18px' }}>EDUCONNECT</Text>
                        </Space>
                        <Paragraph style={{ color: '#8c8c8c' }}>Soluciones tecnológicas integrales para la educación superior.</Paragraph>
                    </Col>
                    <Col xs={24} md={8}>
                        <Title level={5} style={{ color: '#fff' }}>Contacto</Title>
                        <Space direction="vertical">
                            <Text style={{ color: '#8c8c8c' }}><EnvironmentOutlined /> Ciudad Universitaria, Edificio B</Text>
                            <Text style={{ color: '#8c8c8c' }}><PhoneOutlined /> (953) 555-0000</Text>
                        </Space>
                    </Col>
                </Row>
                <Divider style={{ borderColor: '#333' }} />
                <div style={{ textAlign: 'center', fontSize: '12px' }}>© {new Date().getFullYear()} EduConnect Systems.</div>
            </Footer>

            {/* --- WIDGET DE CHATBOT --- */}

            {/* Ventana del Chat (Solo visible si chatOpen es true) */}
            {chatOpen && (
                <div style={{
                    position: 'fixed',
                    bottom: '100px',
                    right: '24px',
                    width: '350px',
                    height: '500px',
                    backgroundColor: '#fff',
                    borderRadius: '16px',
                    boxShadow: '0 5px 20px rgba(0,0,0,0.15)',
                    zIndex: 1001,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    border: '1px solid #f0f0f0'
                }}>
                    {/* Header del Chat 
                    <div style={{ background: colors.primary, padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff' }}>
                        <Space>
                            <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#fff', color: colors.primary }} />
                            <div>
                                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Asistente EduConnect</div>
                                <div style={{ fontSize: '11px', opacity: 0.8 }}>● En línea</div>
                            </div>
                        </Space>
                        <Button type="text" icon={<CloseOutlined style={{ color: '#fff' }} />} onClick={() => setChatOpen(false)} />
                    </div>*/}

                    {/* Área de Mensajes */}
                    <div style={{ flex: 1, padding: '16px', overflowY: 'auto', background: '#fafafa' }}>
                        {chatMessages.map((msg) => (
                            <div key={msg.id} style={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start', marginBottom: '12px' }}>
                                <div style={{
                                    maxWidth: '80%',
                                    padding: '10px 14px',
                                    borderRadius: '12px',
                                    backgroundColor: msg.sender === 'user' ? colors.primary : '#fff',
                                    color: msg.sender === 'user' ? '#fff' : '#333',
                                    boxShadow: msg.sender === 'bot' ? '0 2px 5px rgba(0,0,0,0.05)' : 'none',
                                    fontSize: '14px',
                                    borderBottomRightRadius: msg.sender === 'user' ? '2px' : '12px',
                                    borderTopLeftRadius: msg.sender === 'bot' ? '2px' : '12px'
                                }}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {/* Indicador de "Escribiendo..." */}
                        {isTyping && (
                            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '12px' }}>
                                <div style={{ padding: '8px 12px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                                    <Spin size="small" /> <span style={{ fontSize: '12px', color: '#999', marginLeft: '8px' }}>Escribiendo...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Opciones Rápidas (Si es el inicio) */}
                    {chatMessages.length < 3 && (
                        <div style={{ padding: '0 16px 8px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {quickOptions.map((opt, i) => (
                                <Tag key={i} color="blue" style={{ cursor: 'pointer', borderRadius: '12px' }} onClick={() => handleSendMessage(opt)}>
                                    {opt}
                                </Tag>
                            ))}
                        </div>
                    )}

                    {/* Input Area */}
                    <div style={{ padding: '12px', borderTop: '1px solid #f0f0f0', background: '#fff' }}>
                        <Space.Compact style={{ width: '100%' }}>
                            <Input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onPressEnter={() => handleSendMessage()}
                                placeholder="Escriba su consulta..."
                                style={{ borderRadius: '20px 0 0 20px' }}
                            />
                            <Button type="primary" icon={<SendOutlined />} onClick={() => handleSendMessage()} style={{ background: colors.primary, borderRadius: '0 20px 20px 0' }} />
                        </Space.Compact>
                    </div>
                </div>
            )}

            {/* Botón Flotante para abrir/cerrar Chat *
            <FloatButton
                icon={chatOpen ? <CloseOutlined /> : <MessageOutlined />}
                type="primary"
                onClick={() => setChatOpen(!chatOpen)}
                style={{ right: 24, bottom: 24, width: '60px', height: '60px' }}
                tooltip={chatOpen ? "Cerrar Chat" : "Ayuda en línea"}
                badge={{ count: 1, color: 'red' }} 
            />*/}

            {/* --- OTROS MODALES --- */}
            {/* Login Modal */}
            <Modal open={loginVisible} onCancel={handleLoginCancel} footer={null} title="Acceso al Portal" centered width={400}>
                <Form layout="vertical" onFinish={onLoginFinish} size="large">
                    <Form.Item name="user" rules={[{ required: true, message: 'Requerido' }]}><Input prefix={<UserOutlined />} placeholder="Matrícula o ID" /></Form.Item>
                    <Form.Item name="pass" rules={[{ required: true, message: 'Requerido' }]}><Input.Password prefix={<LockOutlined />} placeholder="Contraseña" /></Form.Item>
                    <Button type="primary" htmlType="submit" block style={{ background: colors.primary }}>Entrar</Button>
                </Form>
            </Modal>

            {/* Pricing Modal */}
            <Modal open={pricingVisible} onCancel={handlePricingCancel} footer={null} width={1000} centered title="Oferta Académica">
                <Row gutter={[24, 24]}>
                    {pricingPlans.map((plan, i) => (
                        <Col xs={24} md={8} key={i}>
                            <Card hoverable style={{ border: plan.recommended ? `2px solid ${colors.primary}` : '1px solid #f0f0f0', textAlign: 'center' }}>
                                {plan.recommended && <Tag color={colors.accent} style={{ marginBottom: '15px' }}>RECOMENDADO</Tag>}
                                <Title level={4}>{plan.name}</Title>
                                <Title level={2} style={{ color: colors.primary }}>{plan.price}</Title>
                                <List dataSource={plan.features} renderItem={item => <List.Item><CheckOutlined style={{ color: 'green', marginRight: '5px' }} /> {item}</List.Item>} />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Modal>
        </Layout>
    );
};

export default LandingPageEscolar;