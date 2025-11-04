import React from "react";
import {
  Card,
  Table,
  Typography,
  Row,
  Col,
  Divider,
  Space,
} from "antd";
import {
  CheckCircleOutlined,
  StarFilled,
  TrophyOutlined,
} from "@ant-design/icons";
import planes from '@css/Components/PlanEscolar.module.css';

const { Title, Text } = Typography;

const PlanEscolar = () => {
  const columns = [
    {
      title: "Periodo de facturación",
      dataIndex: "periodo",
      key: "periodo",
      align: "center",
      render: (text) => <Text strong className={planes["col-periodo"]}>{text}</Text>,
    },
    {
      title: "Precio base",
      dataIndex: "precio",
      key: "precio",
      align: "center",
      render: (precio) => <Text strong className={planes["col-precio"]}>${precio}</Text>,
    },
  ];

  const superiorData = [
    { key: "1", periodo: "Mensual", precio: 1000 },
    { key: "2", periodo: "Trimestral", precio: 900 },
    { key: "3", periodo: "Semestral", precio: 800 },
    { key: "4", periodo: "Anual", precio: 700 },
  ];

  const basicoData = [
    { key: "1", periodo: "Mensual", precio: 400 },
    { key: "2", periodo: "Trimestral", precio: 360 },
    { key: "3", periodo: "Semestral", precio: 320 },
    { key: "4", periodo: "Anual", precio: 280 },
  ];

  return (
    <div className={planes["plan-container"]}>
      {/* Fondos decorativos */}
      <div className={planes["decor-ball blue"]}></div>
      <div className={planes["decor-ball green"]}></div>

      <div className={planes["plan-header"]}>
        <div className={planes["plan-badge"]}>
          <TrophyOutlined className={planes["badge-icon"]} />
          SOLUCIONES EDUCATIVAS
        </div>

        <Title level={1} className={planes["plan-title"]}>
          Planes Escolares
        </Title>

        <div className={planes["plan-line"]}></div>

        <div className={planes["plan-subtitle"]}>
          <Text className={planes["plan-subtitle-text"]}>
            <StarFilled className={planes["star-icon"]} />
            Descubre el plan perfecto para impulsar la excelencia educativa de tu institución
            <StarFilled className={planes["star-icon"]} />
          </Text>
        </div>
      </div>

      <Row gutter={[32, 32]} justify="center">
        {/* PLAN SUPERIOR */}
        <Col xs={24} md={10} lg={8}>
          <Card bordered={false} className={`${planes["card"]} ${planes["card-superior"]}`} bodyStyle={{ padding: "24px" }}>
            <div className={`${planes["card-header"]} ${planes["card-header-superior"]}`}>
              <Title level={3} className={planes["card-title"]}>Plan Escolar Superior</Title>
              <Text className={planes["card-subtitle"]}>Para instituciones de nivel preparatoria y universitario.</Text>
            </div>

            <Table
              columns={columns}
              dataSource={superiorData}
              pagination={false}
              bordered={false}
              size="middle"
              className={planes["custom-table"]}
            />

            <Divider className={planes["card-divider-superior"]} />

            <div className={planes["benefits"]}>
              <Title level={5} className={`${planes["benefits-title"]} ${planes["superior"]}`}>Beneficios</Title>
              <Space direction="vertical" style={{ width: "100%" }}>
                <div className={planes["benefit-item"]}>
                  <Text><CheckCircleOutlined className={planes["check-icon"]} />Acceso a módulos premium</Text>
                </div>
                <div className={planes["benefit-item"]}>
                  <Text><CheckCircleOutlined className={planes["check-icon"]} />Gestión avanzada de usuarios</Text>
                </div>
                <div className={planes["benefit-item"]}>
                  <Text><CheckCircleOutlined className={planes["check-icon"]} />Reportes detallados</Text>
                </div>
              </Space>
            </div>
          </Card>
        </Col>

        {/* PLAN BÁSICO */}
        <Col xs={24} md={10} lg={8}>
          <Card bordered={false} className={`${planes["card"]} ${planes["card-basico"]}`} bodyStyle={{ padding: "24px" }}>
            <div className={`${planes["card-header"]} ${planes["card-header-basico"]}`}>
              <Title level={3} className={planes["card-title"]}>Plan Escolar Básico</Title>
              <Text className={planes["card-subtitle"]}>Para instituciones de nivel preescolar, primaria y secundaria.</Text>
            </div>

            <Table
              columns={columns}
              dataSource={basicoData}
              pagination={false}
              bordered={false}
              size="middle"
              className={`${planes["custom-table"]} ${planes["basico"]}`} />

            <Divider className={planes["card-divider-basico"]} />

            <div className={planes["benefits"]}>
              <Title level={5} className={`${planes["benefits-title"]} ${planes["basico"]}`}>Beneficios</Title>
              <Space direction="vertical" style={{ width: "100%" }}>
                <div className={`${planes["benefit-item"]} ${planes["basico"]}`}>
                  <Text><CheckCircleOutlined className={planes["check-icon"]} />Soporte técnico básico</Text>
                </div>
                <div className={`${planes["benefit-item"]} ${planes["basico"]}`}>
                  <Text><CheckCircleOutlined className={planes["check-icon"]} />Sistema fácil de usar</Text>
                </div>
                <div className={`${planes["benefit-item"]} ${planes["basico"]}`}>
                  <Text><CheckCircleOutlined className={planes["check-icon"]} />Actualizaciones automáticas</Text>
                </div>
              </Space>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Preguntas Frecuentes */}
      <div className={planes["faq-section"]}>
        <Title level={3} className={planes["faq-title"]}>Preguntas Frecuentes</Title>
        <div className={planes["faq-container"]}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <Title level={5} className={planes["faq-question"]}>¿Cuáles son los beneficios al tener un plan?</Title>
              <Text className={planes["faq-answer"]}>
                El usuario tiene acceso completo a todas las funciones de la plataforma, incluyendo soporte técnico,
                reportes avanzados, gestión de usuarios y actualizaciones automáticas, dependiendo del plan seleccionado.
              </Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanEscolar;