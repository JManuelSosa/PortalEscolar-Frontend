import { useState } from 'react';
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
    Badge
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
    CloseOutlined,
    SendOutlined
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;
const { Meta } = Card;
const { TextArea } = Input;

const LandingPageEscolar = () => {
    const [loginVisible, setLoginVisible] = useState(false);
    const [chatVisible, setChatVisible] = useState(false);
    const [pricingVisible, setPricingVisible] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const navigate = useNavigate();

    // Datos para las características
    const features = [
        {
            icon: <TeamOutlined style={{ fontSize: '48px', color: '#1890ff' }} />,
            title: 'Gestión de Usuarios',
            description: 'Administra estudiantes, profesores y personal administrativo de manera eficiente.'
        },
        {
            icon: <BookOutlined style={{ fontSize: '48px', color: '#52c41a' }} />,
            title: 'Plataforma Académica',
            description: 'Accede a materiales, calificaciones y recursos educativos en un solo lugar.'
        },
        {
            icon: <CalendarOutlined style={{ fontSize: '48px', color: '#faad14' }} />,
            title: 'Horarios Inteligentes',
            description: 'Organiza y visualiza horarios de clases y actividades escolares.'
        },
        {
            icon: <TrophyOutlined style={{ fontSize: '48px', color: '#eb2f96' }} />,
            title: 'Seguimiento Académico',
            description: 'Monitorea el progreso y rendimiento de los estudiantes en tiempo real.'
        }
    ];

    // Datos para estad├¡sticas
    const statistics = [
        {
            title: 'Estudiantes Activos',
            value: 1250,
            suffix: '+'
        },
        {
            title: 'Profesores',
            value: 85,
            suffix: '+'
        },
        {
            title: 'Carreras',
            value: 12,
            suffix: ''
        },
        {
            title: 'Años de Experiencia',
            value: 15,
            suffix: '+'
        }
    ];

    // Testimonios
    const testimonials = [
        {
            name: 'María González',
            role: 'Estudiante de Ingeniería',
            avatar: '­ƒæ®ÔÇì­ƒÄô',
            content: 'La plataforma ha mejorado mi organización académica significativamente.'
        },
        {
            name: 'Carlos Rodríguez',
            role: 'Profesor de Matemáticas',
            avatar: '­ƒæ¿ÔÇì­ƒÅ½',
            content: 'Herramienta esencial para la gestión de mis clases y seguimiento de estudiantes.'
        },
        {
            name: 'Ana Martínez',
            role: 'Directora Académica',
            avatar: '­ƒæ®ÔÇì­ƒÆ╝',
            content: 'Sistema robusto que ha optimizado todos nuestros procesos administrativos.'
        }
    ];

    // Planes de precios
    const pricingPlans = [
        {
            name: 'Básico',
            price: '$99',
            period: 'por mes',
            description: 'Perfecto para instituciones pequeñas',
            features: [
                'Hasta 100 usuarios',
                'Gestión básica de cursos',
                'Soporte por email',
                'Reportes básicos'
            ],
            recommended: false
        },
        {
            name: 'Profesional',
            price: '$199',
            period: 'por mes',
            description: 'Ideal para instituciones medianas',
            features: [
                'Hasta 500 usuarios',
                'Gestión avanzada de cursos',
                'Soporte prioritario',
                'Reportes avanzados',
                'Integración API'
            ],
            recommended: true
        },
        {
            name: 'Empresarial',
            price: '$399',
            period: 'por mes',
            description: 'Para grandes instituciones educativas',
            features: [
                'Usuarios ilimitados',
                'Todas las funcionalidades',
                'Soporte 24/7',
                'Personalización',
                'Capacitación incluida'
            ],
            recommended: false
        }
    ];

    const showLoginModal = () => {
        setLoginVisible(true);
    };

    const handleLoginCancel = () => {
        setLoginVisible(false);
    };

    const showChatModal = () => {
        setChatVisible(true);
    };

    const handleChatCancel = () => {
        setChatVisible(false);
    };

    const showPricingModal = () => {
        setPricingVisible(true);
    };

    const handlePricingCancel = () => {
        setPricingVisible(false);
    };

    const onLoginFinish = (values) => {
        console.log('Login values:', values);
        message.success('Inicio de sesión exitoso');
        setLoginVisible(false);
    };

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const userMessage = {
                id: Date.now(),
                text: newMessage,
                sender: 'user',
                timestamp: new Date().toLocaleTimeString()
            };
            
            setMessages([...messages, userMessage]);
            setNewMessage('');

            // Simular respuesta automática del administrador
            setTimeout(() => {
                const adminMessage = {
                    id: Date.now() + 1,
                    text: 'Gracias por tu mensaje. Un administrador se comunicará contigo pronto.',
                    sender: 'admin',
                    timestamp: new Date().toLocaleTimeString()
                };
                setMessages(prev => [...prev, adminMessage]);
            }, 1000);
        }
    };

    const handlePlanSelect = (planName) => {
        message.success(`Has seleccionado el plan ${planName}. Te contactaremos pronto.`);
        setPricingVisible(false);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* Header */}
            <Header style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '0 50px',
                position: 'fixed',
                width: '100%',
                zIndex: 1000
            }}>
                <Row justify="space-between" align="middle" style={{ height: '64px' }}>
                    <Col>
                        <Space>
                            {/* Logo de la plataforma */}
                            <div style={{
                                width: '40px',
                                height: '40px',
                                background: 'white',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                color: '#667eea'
                            }}>
                                PE
                            </div>
                            <Title level={3} style={{ color: 'white', margin: 0 }}>
                                EduConnect
                            </Title>
                        </Space>
                    </Col>
                    <Col>
                        <Space size="middle">
                            <Button 
                                type="default"
                                size="large"
                                onClick={showPricingModal}
                                icon={<DollarOutlined />}
                                style={{
                                    background: 'rgba(255,255,255,0.9)',
                                    border: 'none',
                                    fontWeight: '600'
                                }}
                            >
                                Ver Precios
                            </Button>
                            <Button 
                                type="primary" 
                                size="large"
                                onClick={() => {
                                    navigate('/login');
                                }}
                                style={{
                                    background: 'rgba(255,255,255,0.2)',
                                    border: '1px solid rgba(255,255,255,0.3)',
                                    fontWeight: '600'
                                }}
                            >
                                Iniciar Sesión
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Header>

            {/* Hero Section */}
            <Content style={{ marginTop: '64px' }}>
                <section style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '100px 50px',
                    textAlign: 'center'
                }}>
                    <Title level={1} style={{ color: 'white', fontSize: '3.5rem', marginBottom: '24px' }}>
                        EduConnect
                    </Title>
                    <Paragraph style={{ 
                        fontSize: '1.5rem', 
                        marginBottom: '40px',
                        opacity: 0.9
                    }}>
                        La solución integral para la gestión educativa moderna
                    </Paragraph>
                    <Space size="large">
                        <Button 
                            type="primary" 
                            size="large"
                            onClick={showLoginModal}
                            style={{
                                height: '50px',
                                padding: '0 40px',
                                fontSize: '16px',
                                fontWeight: '600'
                            }}
                        >
                            Acceder al Portal
                        </Button>
                        <Button 
                            size="large"
                            onClick={showPricingModal}
                            style={{
                                height: '50px',
                                padding: '0 40px',
                                fontSize: '16px',
                                borderColor: 'white',
                                color: 'white',
                                background: 'transparent'
                            }}
                        >
                            Ver Planes y Precios
                        </Button>
                    </Space>
                </section>

                {/* Estadísticas */}
                <section style={{ padding: '80px 50px', background: '#fafafa' }}>
                    <Row gutter={[32, 32]} justify="center">
                        {statistics.map((stat, index) => (
                            <Col xs={12} sm={12} md={6} key={index}>
                                <Statistic
                                    title={stat.title}
                                    value={stat.value}
                                    suffix={stat.suffix}
                                    valueStyle={{ color: '#1890ff' }}
                                />
                            </Col>
                        ))}
                    </Row>
                </section>

                {/* Caracter├¡sticas Principales */}
                <section style={{ padding: '80px 50px' }}>
                    <Title level={2} style={{ textAlign: 'center', marginBottom: '60px' }}>
                        ¿Por qué elegir EduConnect?
                    </Title>
                    <Row gutter={[32, 32]}>
                        {features.map((feature, index) => (
                            <Col xs={24} md={12} lg={6} key={index}>
                                <Card 
                                    hoverable
                                    style={{ 
                                        textAlign: 'center',
                                        height: '300px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center'
                                    }}
                                    bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                                >
                                    <div style={{ marginBottom: '24px' }}>
                                        {feature.icon}
                                    </div>
                                    <Title level={4}>{feature.title}</Title>
                                    <Paragraph type="secondary">
                                        {feature.description}
                                    </Paragraph>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </section>

                {/* Demo Section */}
                <section style={{ padding: '80px 50px', background: '#f0f2f5' }}>
                    <Row gutter={[48, 48]} align="middle">
                        <Col xs={24} lg={12}>
                            <Title level={2}>Experiencia de Usuario Optimizada</Title>
                            <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
                                EduConnect está diseñado pensando en la facilidad de uso y la eficiencia. 
                                Con una interfaz intuitiva y herramientas poderosas, transformamos la experiencia 
                                educativa digital.
                            </Paragraph>
                            <List
                                size="large"
                                dataSource={[
                                    'Interfaz moderna y responsive',
                                    'Acceso desde cualquier dispositivo',
                                    'Navegación intuitiva',
                                    'Tiempos de carga optimizados'
                                ]}
                                renderItem={item => (
                                    <List.Item>
                                        <Space>
                                            <StarOutlined style={{ color: '#52c41a' }} />
                                            <Text>{item}</Text>
                                        </Space>
                                    </List.Item>
                                )}
                            />
                            <Button type="primary" size="large" style={{ marginTop: '24px' }} onClick={showPricingModal}>
                                Ver Planes <RightOutlined />
                            </Button>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Card>
                                <div style={{ 
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    height: '300px',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white'
                                }}>
                                    <Title level={3} style={{ color: 'white' }}>
                                        Vista Previa de EduConnect
                                    </Title>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </section>

                {/* Testimonios */}
                <section style={{ padding: '80px 50px' }}>
                    <Title level={2} style={{ textAlign: 'center', marginBottom: '60px' }}>
                        Lo que dicen nuestras instituciones
                    </Title>
                    <Row gutter={[32, 32]}>
                        {testimonials.map((testimonial, index) => (
                            <Col xs={24} md={8} key={index}>
                                <Card>
                                    <Meta
                                        avatar={
                                            <Avatar 
                                                size={64} 
                                                style={{ 
                                                    fontSize: '24px',
                                                    backgroundColor: '#f0f2f5'
                                                }}
                                            >
                                                {testimonial.avatar}
                                            </Avatar>
                                        }
                                        title={testimonial.name}
                                        description={
                                            <>
                                                <Tag color="blue">{testimonial.role}</Tag>
                                                <Paragraph style={{ marginTop: '16px' }}>
                                                    "{testimonial.content}"
                                                </Paragraph>
                                            </>
                                        }
                                    />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </section>

                {/* CTA Final */}
                <section style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '80px 50px',
                    textAlign: 'center',
                    borderRadius: '16px',
                    margin: '0 50px 80px 50px'
                }}>
                    <Title level={2} style={{ color: 'white', marginBottom: '24px' }}>
                        ¿Listo para transformar tu institución?
                    </Title>
                    <Paragraph style={{ 
                        fontSize: '1.2rem', 
                        marginBottom: '40px',
                        opacity: 0.9
                    }}>
                        Únete a las más de 100 instituciones que ya usan EduConnect.
                    </Paragraph>
                    <Space size="large">
                        <Button 
                            type="primary" 
                            size="large"
                            onClick={showLoginModal}
                            style={{
                                height: '50px',
                                padding: '0 40px',
                                fontSize: '16px',
                                fontWeight: '600',
                                background: 'white',
                                color: '#667eea',
                                border: 'none'
                            }}
                        >
                            Comenzar Ahora
                        </Button>
                        <Button 
                            size="large"
                            onClick={showPricingModal}
                            style={{
                                height: '50px',
                                padding: '0 40px',
                                fontSize: '16px',
                                borderColor: 'white',
                                color: 'white',
                                background: 'transparent'
                            }}
                        >
                            Ver Precios
                        </Button>
                    </Space>
                </section>
            </Content>

            {/* Footer */}
            <Footer style={{ 
                background: '#001529', 
                color: 'white',
                padding: '50px'
            }}>
                <Row gutter={[32, 32]}>
                    <Col xs={24} md={8}>
                        <Space direction="vertical">
                            <Title level={4} style={{ color: 'white' }}>
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    background: 'white',
                                    borderRadius: '6px',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    color: '#667eea',
                                    marginRight: '8px'
                                }}>
                                    PE
                                </div>
                                EduConnect
                            </Title>
                            <Paragraph type="secondary" style={{ color: 'rgba(255,255,255,0.7)' }}>
                                La plataforma educativa líder en gestión escolar integral.
                            </Paragraph>
                        </Space>
                    </Col>
                    <Col xs={24} md={8}>
                        <Title level={5} style={{ color: 'white' }}>Contacto</Title>
                        <Space direction="vertical">
                            <Text style={{ color: 'rgba(255,255,255,0.7)' }}>
                                <PhoneOutlined /> +1 (555) 123-4567
                            </Text>
                            <Text style={{ color: 'rgba(255,255,255,0.7)' }}>
                                <MailOutlined /> info@portalescolarpro.com
                            </Text>
                            <Text style={{ color: 'rgba(255,255,255,0.7)' }}>
                                <EnvironmentOutlined /> Ciudad Educativa, CP 12345
                            </Text>
                        </Space>
                    </Col>
                    <Col xs={24} md={8}>
                        <Title level={5} style={{ color: 'white' }}>Enlaces Rápidos</Title>
                        <Space direction="vertical">
                            <Button type="link" style={{ color: 'rgba(255,255,255,0.7)', padding: 0 }}>
                                Acerca de Nosotros
                            </Button>
                            <Button type="link" style={{ color: 'rgba(255,255,255,0.7)', padding: 0 }} onClick={showPricingModal}>
                                Planes y Precios
                            </Button>
                            <Button type="link" style={{ color: 'rgba(255,255,255,0.7)', padding: 0 }} onClick={showChatModal}>
                                Soporte en Vivo
                            </Button>
                        </Space>
                    </Col>
                </Row>
                <Divider style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
                    ® 2024 EduConnect. Todos los derechos reservados.
                </div>
            </Footer>

            {/* Bot├│n flotante del chat */}
            <FloatButton
                icon={<MessageOutlined />}
                type="primary"
                style={{ right: 24, bottom: 24 }}
                onClick={showChatModal}
                badge={{ count: messages.length > 0 ? messages.length : 0 }}
            />

            {/* Modal de Login */}
            <Modal
                title="Iniciar Sesi├│n - EduConnect"
                open={loginVisible}
                onCancel={handleLoginCancel}
                footer={null}
                width={400}
            >
                <Form
                    name="login"
                    onFinish={onLoginFinish}
                    layout="vertical"
                    size="large"
                >
                    <Form.Item
                        label="Usuario"
                        name="username"
                        rules={[{ required: true, message: 'Por favor ingresa tu usuario' }]}
                    >
                        <Input 
                            prefix={<UserOutlined />} 
                            placeholder="Usuario o email" 
                        />
                    </Form.Item>

                    <Form.Item
                        label="Contraseña"
                        name="password"
                        rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
                    >
                        <Input.Password 
                            prefix={<LockOutlined />} 
                            placeholder="Contraseña" 
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Ingresar al Portal
                        </Button>
                    </Form.Item>

                    <div style={{ textAlign: 'center' }}>
                        <Text type="secondary">
                            ¿Problemas para acceder?{' '}
                            <Button type="link" style={{ padding: 0 }} onClick={showChatModal}>
                                Contactar soporte
                            </Button>
                        </Text>
                    </div>
                </Form>
            </Modal>

            {/* Modal del Chat */}
            <Modal
                title={
                    <Space>
                        <MessageOutlined />
                        Chat de Soporte
                        <Badge status="processing" text="En línea" />
                    </Space>
                }
                open={chatVisible}
                onCancel={handleChatCancel}
                footer={null}
                width={500}
                style={{ height: '600px' }}
            >
                <div style={{ 
                    height: '400px', 
                    border: '1px solid #d9d9d9',
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '16px',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                }}>
                    {messages.length === 0 ? (
                        <div style={{ 
                            textAlign: 'center', 
                            color: '#999',
                            marginTop: '50%',
                            transform: 'translateY(-50%)'
                        }}>
                            <MessageOutlined style={{ fontSize: '32px', marginBottom: '8px' }} />
                            <div>Inicia una conversación con nuestro equipo de soporte</div>
                        </div>
                    ) : (
                        messages.map(message => (
                            <div
                                key={message.id}
                                style={{
                                    alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                                    background: message.sender === 'user' ? '#1890ff' : '#f0f0f0',
                                    color: message.sender === 'user' ? 'white' : 'black',
                                    padding: '8px 12px',
                                    borderRadius: '12px',
                                    maxWidth: '80%'
                                }}
                            >
                                <div>{message.text}</div>
                                <div style={{ 
                                    fontSize: '10px', 
                                    opacity: 0.7,
                                    textAlign: message.sender === 'user' ? 'right' : 'left',
                                    marginTop: '4px'
                                }}>
                                    {message.timestamp}
                                </div>
                            </div>
                        ))
                    )}
                </div>
                
                <Space.Compact style={{ width: '100%' }}>
                    <Input
                        placeholder="Escribe tu mensaje..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onPressEnter={handleSendMessage}
                    />
                    <Button 
                        type="primary" 
                        icon={<SendOutlined />}
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                    >
                        Enviar
                    </Button>
                </Space.Compact>
            </Modal>

            {/* Modal de Precios */}
            <Modal
                title="Planes y Precios - EduConnect"
                open={pricingVisible}
                onCancel={handlePricingCancel}
                footer={null}
                width={1000}
            >
                <Row gutter={[24, 24]}>
                    {pricingPlans.map((plan, index) => (
                        <Col xs={24} md={8} key={index}>
                            <Card
                                style={{
                                    border: plan.recommended ? '2px solid #1890ff' : '1px solid #d9d9d9',
                                    position: 'relative'
                                }}
                                hoverable
                            >
                                {plan.recommended && (
                                    <Tag color="blue" style={{ 
                                        position: 'absolute', 
                                        top: '-10px', 
                                        left: '50%', 
                                        transform: 'translateX(-50%)',
                                        fontWeight: 'bold'
                                    }}>
                                        MÁS POPULAR
                                    </Tag>
                                )}
                                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                                    <Title level={3}>{plan.name}</Title>
                                    <div style={{ marginBottom: '8px' }}>
                                        <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1890ff' }}>
                                            {plan.price}
                                        </span>
                                        <span style={{ color: '#666' }}>/{plan.period}</span>
                                    </div>
                                    <Text type="secondary">{plan.description}</Text>
                                </div>
                                
                                <List
                                    size="small"
                                    dataSource={plan.features}
                                    renderItem={feature => (
                                        <List.Item>
                                            <StarOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                            {feature}
                                        </List.Item>
                                    )}
                                />
                                
                                <Button 
                                    type={plan.recommended ? 'primary' : 'default'}
                                    block 
                                    size="large"
                                    style={{ marginTop: '24px' }}
                                    onClick={() => handlePlanSelect(plan.name)}
                                >
                                    {plan.recommended ? 'Seleccionar Plan' : 'Más Información'}
                                </Button>
                            </Card>
                        </Col>
                    ))}
                </Row>
                
                <Divider />
                
                <div style={{ textAlign: 'center' }}>
                    <Text type="secondary">
                        ¿Necesitas un plan personalizado?{' '}
                        <Button type="link" onClick={showChatModal}>
                            Contáctanos
                        </Button>
                    </Text>
                </div>
            </Modal>
        </Layout>
    );
};

export default LandingPageEscolar;
