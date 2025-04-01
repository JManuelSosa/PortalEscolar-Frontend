import { useForm } from "react-hook-form";
import { useState } from "react";
import { Flex, Typography, Card, Input, Button, Space } from "antd";
import { MailOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm();

  const [mensaje, setMensaje] = useState("");

  const email = watch("email"); // Detectar cambios en el email

  const onSubmit = async (data) => {
    clearErrors("email");

    try {
      const usuario = await obtenerUsuarioPorEmail(data.email);

      if (!usuario) {
        setError("email", { message: "El correo no está registrado" });
        return;
      }

      setMensaje("Se ha enviado un enlace de recuperación a tu correo.");
    } catch (error) {
      console.error("Error en la recuperación:", error);
    }
  };

  return (
    <Flex align="center" justify="center" style={{ height: "100vh" }}>
      <Card style={{ height: 'auto'}}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Space direction="vertical" size="middle">
            <Title>Recuperar Contraseña</Title>

            <Input
              type="email"
              placeholder="Ingresa tu email"
              prefix={<MailOutlined />}
              {...register("email", { required: "El email es obligatorio" })}
            />
            {errors.email && <span>{errors.email.message}</span>}

            <Button type="primary" htmlType="submit">
              Enviar correo de recuperación
            </Button>

            {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
          </Space>
        </form>
      </Card>
    </Flex>
  );
}