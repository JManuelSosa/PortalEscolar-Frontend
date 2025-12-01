import React, { useState } from 'react';
import { Card, Row, Col, Button, Tag, Statistic, Divider, Typography } from 'antd';
import { CheckOutlined, CrownFilled, StarFilled, RocketFilled, TrophyFilled } from '@ant-design/icons';

const { Title, Text } = Typography;

const SubscriptionPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState('anual');

  const plans = {
    mensual: {
      name: 'Mensual',
      price: 1600,
      period: 'mes',
      icon: <StarFilled />,
      color: '#1890ff',
      popular: false
    },
    trimestral: {
      name: 'Trimestral',
      price: 1300,
      period: 'trimestre',
      icon: <RocketFilled />,
      color: '#52c41a',
      popular: false
    },
    semestral: {
      name: 'Semestral',
      price: 1000,
      period: 'semestre',
      icon: <CrownFilled />,
      color: '#faad14',
      popular: true
    },
    anual: {
      name: 'Anual',
      price: 800,
      period: 'año',
      icon: <TrophyFilled />,
      color: '#f5222d',
      popular: false
    }
  };

  const features = [
    'Acceso completo a la plataforma',
    'Soporte técnico 24/7',
    'Actualizaciones gratuitas',
    'Backup automático',
    'Seguridad avanzada',
    'Reportes detallados'
  ];

  const getMonthlyEquivalent = (planKey) => {
    const plan = plans[planKey];
    if (planKey === 'mensual') return plan.price;

    const periods = {
      trimestral: 3,
      semestral: 6,
      anual: 12
    };

    return plan.price / periods[planKey];
  };

  const getSavings = (planKey) => {
    if (planKey === 'mensual') return 0;

    const monthlyPrice = plans.mensual.price;
    const currentPrice = plans[planKey].price;

    const periods = {
      trimestral: 3,
      semestral: 6,
      anual: 12
    };

    const equivalentMonthly = (monthlyPrice * periods[planKey]) - currentPrice;
    return equivalentMonthly;
  };

  return (
    <div style={{ padding: '40px 20px', background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <Title level={1} style={{ color: '#1890ff', marginBottom: 16 }}>
          Planes de Suscripción
        </Title>
        <Text style={{ fontSize: '16px', color: '#666' }}>
          Elige el plan que mejor se adapte a tus necesidades y escala tu negocio
        </Text>
      </div>

      <Row gutter={[24, 24]} justify="center">
        {Object.entries(plans).map(([key, plan]) => {
          const monthlyEquivalent = getMonthlyEquivalent(key);
          const savings = getSavings(key);

          return (
            <Col xs={24} sm={12} lg={6} key={key}>
              <Card
                style={{
                  border: `2px solid ${selectedPlan === key ? plan.color : '#e8e8e8'}`,
                  borderRadius: '12px',
                  transition: 'all 0.3s',
                  transform: selectedPlan === key ? 'scale(1.05)' : 'scale(1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                hoverable
                onClick={() => setSelectedPlan(key)}
              >
                {plan.popular && (
                  <Tag
                    color={plan.color}
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      fontWeight: 'bold'
                    }}
                  >
                    MÁS POPULAR
                  </Tag>
                )}

                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                  <div style={{ fontSize: '24px', color: plan.color, marginBottom: 8 }}>
                    {plan.icon}
                  </div>
                  <Title level={3} style={{ color: plan.color, margin: 0 }}>
                    {plan.name}
                  </Title>
                </div>

                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                  <Statistic
                    title={`Precio por ${plan.period}`}
                    value={plan.price}
                    prefix="$"
                    valueStyle={{ color: plan.color, fontSize: '28px' }}
                  />
                  {/* Eliminado: equivalente mensual */}
                </div>
                <Divider />

                <div style={{ marginBottom: 20 }}>
                  <Text strong>Incluye:</Text>
                  {features.map((feature, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
                      <CheckOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                      <Text>{feature}</Text>
                    </div>
                  ))}
                </div>

                <Button
                  type={selectedPlan === key ? "primary" : "default"}
                  size="large"
                  block
                  style={{
                    background: selectedPlan === key ? plan.color : undefined,
                    borderColor: selectedPlan === key ? plan.color : undefined,
                    height: '50px',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  {selectedPlan === key ? 'PLAN SELECCIONADO' : 'SELECCIONAR PLAN'}
                </Button>
              </Card>
            </Col>
          );
        })}
      </Row>

      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <Text type="secondary">
          Todos los planes incluyen garantía de satisfacción de 30 días
        </Text>
      </div>
    </div>
  );
};

export default SubscriptionPlans;